import React, { useContext, useMemo } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StatusBar,
  Alert
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux"; // Redux imports
import {
  Bell,
  Check,
  AlertTriangle,
  Wallet,
  ArrowUpRight,
  Edit3,
  ChevronLeft,
  Trash2,
  X // Decline icon
} from "lucide-react-native";

import getNotificationStyle from "../../styles/MainScreen/NotificationStyle";
import { ThemeContext } from "../../components/ThemeContext";
import { markAsRead, clearNotifications } from "../../Redux/Slice/NotificationSlice"; // Actions

const getIcon = (type, colors) => {
  switch (type) {
    case "settle_request": return <Wallet size={20} color={colors.primary} />; // Icon for payment
    case "reminder": return <Edit3 size={20} color={colors.theme} />;
    case "debt": return <ArrowUpRight size={20} color={colors.error} />;
    case "alert": return <AlertTriangle size={20} color={colors.warning} />;
    default: return <Bell size={20} color={colors.textSecondary} />;
  }
};

const NotificationScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getNotificationStyle(colors), [colors]);
  const insets = useSafeAreaInsets();
  
  const dispatch = useDispatch();
  // Redux se data nikala
  const rawNotifications = useSelector(state => state.Notifications.Notifications);

  // --- API CALL HANDLERS ---
  const handleAccept = async (itemData) => {
    const { settle_payment_id, amount, sender_id } = itemData;
    
    console.log("✅ Accepting Payment:", settle_payment_id, amount);
    
    try {
        // API Call Example
        // const res = await api.post('/accept-settlement', { id: settle_payment_id });
        Alert.alert("Success", `Payment of ₹${amount} accepted!`);
    } catch (error) {
        console.error(error);
    }
  };

  const handleDecline = async (itemData) => {
    const { settle_payment_id } = itemData;
    console.log("❌ Declining Payment:", settle_payment_id);
    // API Call logic here
  };
  // -------------------------

  // Data ko SectionList ke liye format karna (New vs Earlier)
  const sections = useMemo(() => {
    if (!rawNotifications || rawNotifications.length === 0) return [];
    
    // Example logic: Sabko 'New' mein daal rahe hain abhi ke liye
    // Real app mein date check karke 'Earlier' mein daal sakte ho
    return [{ title: "New", data: rawNotifications }];
  }, [rawNotifications]);


  const renderItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={[styles.card, !item.read && styles.unreadCard]}
      onPress={() => dispatch(markAsRead(item.id))} // Read mark on tap
    >
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

        {/* --- CUSTOM LOGIC FOR SETTLE REQUEST --- */}
        {item.type === 'settle_request' && (
           <View style={{ flexDirection: 'row', marginTop: 10, gap: 10 }}>
              
              {/* Accept Button */}
              <TouchableOpacity 
                onPress={() => handleAccept(item.data)}
                style={{ 
                   backgroundColor: colors.primary, 
                   paddingVertical: 6, 
                   paddingHorizontal: 12, 
                   borderRadius: 6,
                   flexDirection: 'row',
                   alignItems: 'center'
                }}
              >
                <Check size={14} color="#FFF" style={{ marginRight: 4 }}/>
                <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>Accept</Text>
              </TouchableOpacity>

              {/* Decline Button */}
              <TouchableOpacity 
                onPress={() => handleDecline(item.data)}
                style={{ 
                   backgroundColor: colors.background, 
                   borderWidth: 1, 
                   borderColor: colors.border,
                   paddingVertical: 6, 
                   paddingHorizontal: 12, 
                   borderRadius: 6,
                   flexDirection: 'row',
                   alignItems: 'center'
                }}
              >
                <X size={14} color={colors.textSecondary} style={{ marginRight: 4 }}/>
                <Text style={{ color: colors.text, fontSize: 12, fontWeight: '600' }}>Decline</Text>
              </TouchableOpacity>

           </View>
        )}
        {/* -------------------------------------- */}

      </View>
      
      {!item.read && <View style={styles.dot} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ChevronLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 40 }} /> 
      </View>

      {rawNotifications.length > 0 && (
        <View style={styles.actionsRow}>
           {/* Actions removed for brevity, can add back */}
           <TouchableOpacity onPress={() => dispatch(clearNotifications())} style={styles.actionBtn}>
            <Trash2 size={16} color={colors.textSecondary} />
            <Text style={styles.actionText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 20 }]}
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