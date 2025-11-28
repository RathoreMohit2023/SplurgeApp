import React, { useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Bell,
  Check,
  AlertTriangle,
  Wallet,
  ArrowUpRight,
  Edit3,
  ChevronLeft,
  Trash2,
} from "lucide-react-native";

import getNotificationStyle from "../../styles/MainScreen/NotificationStyle";
import { ThemeContext } from "../../components/ThemeContext";

const initialNotifications = [
  {
    title: "New",
    data: [
      {
        id: "1",
        type: "reminder",
        title: "Track your spending",
        message: "Did you spend anything today? Please insert your daily transactions.",
        time: "2h ago",
        read: false,
      },
      {
        id: "2",
        type: "debt",
        title: "Settlement Reminder",
        message: "You owe Alex Kumar ₹450 for 'Weekend Trip'. Please pay to settle up.",
        time: "5h ago",
        read: false,
      },
    ],
  },
  {
    title: "Earlier",
    data: [
      {
        id: "3",
        type: "budget",
        title: "New Month, New Goals",
        message: "It's the 1st of the month! Create your monthly budget now.",
        time: "Yesterday",
        read: true,
      },
      {
        id: "4",
        type: "alert",
        title: "Budget Alert",
        message: "You've used 90% of your 'Food & Dining' budget.",
        time: "2 days ago",
        read: true,
      },
      {
        id: "5",
        type: "debt",
        title: "Payment Received",
        message: "Priya paid you ₹200. Your debt is settled.",
        time: "3 days ago",
        read: true,
      },
    ],
  },
];

const getIcon = (type, colors) => {
  switch (type) {
    case "reminder": return <Edit3 size={20} color={colors.theme} />; 
    case "debt": return <ArrowUpRight size={20} color={colors.error} />;
    case "budget": return <Wallet size={20} color={colors.success} />;
    case "alert": return <AlertTriangle size={20} color={colors.warning} />;
    default: return <Bell size={20} color={colors.textSecondary} />;
  }
};

const NotificationScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);

  const styles = useMemo(() => getNotificationStyle(colors), [colors]);

  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAllRead = () => {
    const updated = notifications.map(section => ({
      ...section,
      data: section.data.map(n => ({ ...n, read: true }))
    }));
    setNotifications(updated);
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.7} style={[styles.card, !item.read && styles.unreadCard]}>
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, !item.read && styles.unreadIconCircle]}>
          {getIcon(item.type, colors)}
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.rowBetween}>
          <Text style={[styles.title, !item.read && styles.unreadTitle]}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
      </View>
      
      {!item.read && <View style={styles.dot} />}
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title, data } }) => (
    data.length > 0 ? (
      <Text style={styles.sectionHeader}>{title}</Text>
    ) : null
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backBtn}
        >
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} /> 
      </View>

      {notifications.length > 0 && (
        <View style={styles.actionsRow}>
          <TouchableOpacity onPress={handleMarkAllRead} style={styles.actionBtn}>
            <Check size={16} color={colors.textSecondary} />
            <Text style={styles.actionText}>Mark all read</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleClearAll} style={styles.actionBtn}>
            <Trash2 size={16} color={colors.textSecondary} />
            <Text style={styles.actionText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      <SectionList
        sections={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 20 }]}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Bell size={48} color={colors.border} />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySub}>You have no new notifications.</Text>
          </View>
        }
      />
    </View>
  );
};

export default NotificationScreen;