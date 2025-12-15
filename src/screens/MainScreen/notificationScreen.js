import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "react-native-paper";
import {
  Bell,
  Check,
  AlertTriangle,
  Wallet,
  ArrowUpRight,
  Edit3,
  ChevronLeft,
  Trash2,
  X,
} from "lucide-react-native";

import getNotificationStyle from "../../styles/MainScreen/NotificationStyle";
import { ThemeContext } from "../../components/ThemeContext";
import { markAsRead, clearNotifications, updateNotificationStatus } from "../../Redux/Slice/NotificationSlice";
import { SettleUpRespondApi } from "../../Redux/Api/SettleUpRespondApi";
import { GetPaymentLogApi } from "../../Redux/Api/GetPaymentLogApi";

const getIcon = (type, colors) => {
  switch (type) {
    case "settle_request": return <Wallet size={20} color={colors.primary} />;
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

  const [snack, setSnack] = useState({ visible: false, message: "" });
  const showSnack = (message) => setSnack({ visible: true, message });

  const { LoginData } = useSelector((state) => state.Login || {});
  const rawNotifications = useSelector((state) => state.Notifications.Notifications);

  const fetchInitialData = () => {
    if (LoginData?.token) {
      dispatch(GetPaymentLogApi(LoginData.token));
    }
  };

  const handleAccept = async (item) => {
    const { data, id } = item;
    const { settle_payment_id, sender_id, receiver_id } = data;
    const token = LoginData?.token;

    if (!token) return;

    const formData = new FormData();
    formData.append("sender_id", sender_id);
    formData.append("receiver_id", receiver_id);
    formData.append("status", "accepted");
    formData.append("note", "Payment settled successfully");
    formData.append("settle_payment_id", settle_payment_id);                     

    try {
      const result = await dispatch(SettleUpRespondApi({ formData, token })).unwrap();
      if (result?.status === true || result?.status === "true") {
        showSnack(result?.message);
        dispatch(updateNotificationStatus({ id: id, status: 'accepted' }));
        fetchInitialData();
      } else {
        showSnack(result?.message || "Failed to accept");
      }
    } catch (error) {
      showSnack("Something went wrong. Please try again.");
    }
  };

  const handleDecline = async (item) => {
    const { data, id } = item;
    const { settle_payment_id, sender_id, receiver_id } = data;
    const token = LoginData?.token;

    if (!token) return;

    const formData = new FormData();
    formData.append("sender_id", sender_id);
    formData.append("receiver_id", receiver_id);
    formData.append("status", "rejected");
    formData.append("note", "Payment request declined");
    formData.append("settle_payment_id", settle_payment_id);

    try {
      const result = await dispatch(SettleUpRespondApi({ formData, token })).unwrap();
      if (result?.status === true || result?.status === "true") {
        showSnack("Request declined successfully");
        dispatch(updateNotificationStatus({ id: id, status: 'rejected' }));
        fetchInitialData();
      } else {
        showSnack(result?.message || "Failed to decline");
      }
    } catch (error) {
      showSnack("Something went wrong. Please try again.");
    }
  };

  const sections = useMemo(() => {
    if (!rawNotifications || rawNotifications.length === 0) return [];
    return [{ title: "New", data: rawNotifications }];
  }, [rawNotifications]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, !item.read && styles.unreadCard]}
      onPress={() => dispatch(markAsRead(item.id))}
    >
      <View style={styles.iconContainer}>
        <View style={[styles.iconCircle, !item.read && styles.unreadIconCircle]}>
          {getIcon(item.type, colors)}
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.rowBetween}>
          <Text style={[styles.title, !item.read && styles.unreadTitle]}>
            {item.title}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>

        {item.type === "settle_request" && !item.status && (
          <View style={{ flexDirection: "row", marginTop: 10, gap: 10 }}>
            <TouchableOpacity
              onPress={() => handleAccept(item)}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Check size={14} color="#FFF" style={{ marginRight: 4 }} />
              <Text style={{ color: "#FFF", fontSize: 12, fontWeight: "600" }}>
                Accept
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDecline(item)}
              style={{
                backgroundColor: colors.background,
                borderWidth: 1,
                borderColor: colors.border,
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 6,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <X size={14} color={colors.textSecondary} style={{ marginRight: 4 }} />
              <Text style={{ color: colors.text, fontSize: 12, fontWeight: "600" }}>
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status && (
          <Text style={{ 
            marginTop: 8, 
            fontSize: 12, 
            color: item.status === 'accepted' ? colors.success : colors.error,
            fontWeight: '600'
          }}>
            {item.status === 'accepted' ? "Request Accepted" : "Request Declined"}
          </Text>
        )}
      </View>

      {!item.read && <View style={styles.dot} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle={themeType === "dark" ? "light-content" : "dark-content"}
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

      {rawNotifications.length > 0 && (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={() => dispatch(clearNotifications())}
            style={styles.actionBtn}
          >
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
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 20 },
        ]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Bell size={48} color={colors.border} />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySub}>You have no new notifications.</Text>
          </View>
        }
      />

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: "" })}
        duration={2000}
        style={{
          backgroundColor: colors.card,
          marginBottom: insets.bottom + 20,
        }}
        theme={{ colors: { inversePrimary: colors.theme } }}
        action={{
          label: "OK",
          textColor: colors.theme,
          onPress: () => setSnack({ visible: false, message: "" }),
        }}
      >
        <Text style={{ color: colors.text }}>{snack.message}</Text>
      </Snackbar>
    </View>
  );
};

export default NotificationScreen;