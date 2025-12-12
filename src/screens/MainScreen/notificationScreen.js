import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions
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
  Calendar,
  ChevronLeft,
  Trash2,
  X,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react-native";

import { ThemeContext } from "../../components/ThemeContext";
import { markAsRead, clearNotifications, updateNotificationStatus } from "../../Redux/Slice/NotificationSlice";
import { SettleUpRespondApi } from "../../Redux/Api/SettleUpRespondApi";
import { GetPaymentLogApi } from "../../Redux/Api/GetPaymentLogApi";

const { width } = Dimensions.get('window');

const NotificationScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
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

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      fontFamily: 'Manrope-Bold', 
    },
    actionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    actionText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: 6,
      fontWeight: '600',
    },
    sectionHeader: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.textSecondary,
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    card: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      marginBottom: 16,
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: themeType === 'dark' ? 0.2 : 0.05,
      shadowRadius: 8,
      elevation: 3,
      borderWidth: 1,
      borderColor: colors.border,
    },
    unreadCard: {
      backgroundColor: themeType === 'dark' ? colors.card : '#F0F9FF', 
      borderColor: colors.primary,
      borderLeftWidth: 4,
    },
    iconBox: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    content: {
      flex: 1,
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 6,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      flex: 1,
      marginRight: 10,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    time: {
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: 4,
    },
    message: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      marginTop: 16,
      gap: 12,
    },
    acceptBtn: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    declineBtn: {
      flex: 1,
      backgroundColor: 'transparent',
      borderRadius: 12,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    btnTextPrimary: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: '700',
      marginLeft: 6,
    },
    btnTextSecondary: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '700',
      marginLeft: 6,
    },
    statusBadge: {
      marginTop: 12,
      alignSelf: 'flex-start',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    emptyState: {
      alignItems: 'center',
      marginTop: 100,
      opacity: 0.7,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginTop: 16,
    },
    emptySub: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 8,
    }
  }), [colors, themeType]);

  const getIconConfig = (type) => {
    switch (type) {
      case "settle_request": 
        return { icon: <Wallet size={24} color={colors.primary} />, bg: colors.primary + '15' };
      case "reminder": 
        return { icon: <Calendar size={24} color={colors.theme} />, bg: colors.theme + '15' };
      case "debt": 
        return { icon: <ArrowUpRight size={24} color={colors.error} />, bg: colors.error + '15' };
      case "alert": 
        return { icon: <AlertTriangle size={24} color={colors.warning} />, bg: colors.warning + '15' };
      default: 
        return { icon: <Bell size={24} color={colors.textSecondary} />, bg: colors.textSecondary + '15' };
    }
  };

  const renderItem = ({ item }) => {
    const { icon, bg } = getIconConfig(item.type);
    
    return (
      <TouchableOpacity 
        activeOpacity={0.9} 
        style={[styles.card, !item.read && styles.unreadCard]}
        onPress={() => dispatch(markAsRead(item.id))}
      >
        <View style={[styles.iconBox, { backgroundColor: bg }]}>
          {icon}
        </View>
        
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <View style={styles.timeContainer}>
              <Clock size={12} color={colors.textSecondary} />
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
          
          <Text style={styles.message} numberOfLines={2}>{item.message}</Text>

          {item.type === 'settle_request' && !item.status && (
            <View style={styles.buttonRow}>
               <TouchableOpacity onPress={() => handleDecline(item)} style={styles.declineBtn}>
                 <X size={16} color={colors.text} />
                 <Text style={styles.btnTextSecondary}>Decline</Text>
               </TouchableOpacity>

               <TouchableOpacity onPress={() => handleAccept(item)} style={styles.acceptBtn}>
                 <Check size={16} color="#FFF" />
                 <Text style={styles.btnTextPrimary}>Accept</Text>
               </TouchableOpacity>
            </View>
          )}

          {item.status && (
            <View style={[
              styles.statusBadge, 
              { backgroundColor: item.status === 'accepted' ? colors.success + '20' : colors.error + '20' }
            ]}>
              {item.status === 'accepted' ? (
                <CheckCircle2 size={14} color={colors.success} />
              ) : (
                <XCircle size={14} color={colors.error} />
              )}
              <Text style={{ 
                marginLeft: 6, 
                fontSize: 12, 
                fontWeight: '700',
                color: item.status === 'accepted' ? colors.success : colors.error
              }}>
                {item.status === 'accepted' ? "Request Accepted" : "Request Declined"}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.card} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={26} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 26 }} /> 
      </View>

      {rawNotifications.length > 0 && (
        <View style={styles.actionBtn}>
           <TouchableOpacity onPress={() => dispatch(clearNotifications())} style={{flexDirection: 'row', alignItems: 'center'}}>
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
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Bell size={64} color={colors.border} />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySub}>We'll let you know when something arrives.</Text>
          </View>
        }
      />

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: '' })}
        duration={2000}
        style={{
          backgroundColor: colors.text,
          marginBottom: insets.bottom + 20,
          marginHorizontal: 20,
          borderRadius: 8
        }}
        theme={{ colors: { inversePrimary: colors.background } }}
        action={{
          label: 'OK',
          textColor: colors.background,
          onPress: () => setSnack({ visible: false, message: '' }),
        }}
      >
        <Text style={{ color: colors.background, fontWeight: '600' }}>{snack.message}</Text>
      </Snackbar>
    </View>
  );
};

export default NotificationScreen;