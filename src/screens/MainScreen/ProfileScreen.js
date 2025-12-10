import React, { useState, useContext, useMemo, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar
} from "react-native";
import {
  Text,
  Avatar,
  Snackbar,
  Divider,
} from "react-native-paper";
import {
  User,
  Mail,
  Bell,
  ChevronRight,
  CreditCard,
  Shield,
  HelpCircle,
  Settings,
  LogOut,
  Phone
} from "lucide-react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import getProfileStyle from "../../styles/MainScreen/ProfileStyle"; 
import { ThemeContext } from "../../components/ThemeContext";
import { useSelector } from "react-redux";

const ProfileScreen = ({ navigation }) => {
  
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getProfileStyle(colors), [colors]);
  const { GetUserDetailsData } = useSelector((state) => state.GetUserDetails);
  const [user, setUser] = useState('');
  const { GetTransactionData, GetTransactionLoading } = useSelector(state => state.GetTransaction);
  const { GetFriendsData } = useSelector(state => state.GetFriends || {});
  
  
  const [snack, setSnack] = useState({ visible: false, message: "" });
  const insets = useSafeAreaInsets();
  const allTransactions = GetTransactionData?.get_transactions || [];
  const [totalFriends, setTotalFriends] = useState(0);


  const menuSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Personal Information",
          onPress: () => navigation.navigate("PersonalInfoScreen")
        },
        {
          icon: Bell,
          label: "Notifications",
          onPress: () => navigation.navigate("notificationScreen")
        }
      ]
    },
    {
      title: "Support",
      items: [
        {
          icon: HelpCircle,
          label: "Help & Support",
          onPress: () => navigation.navigate("HelpSupport")
        },
        {
          icon: Shield,
          label: "Terms & Policies",
          onPress: () => navigation.navigate("TermsPolicies")
        },
      ]
    }
  ];

  useEffect(() => {
    if (GetFriendsData?.friends?.length > 0) {
      setTotalFriends(GetFriendsData?.friends?.length);
    }
  })

  const { currentMonthTransactions, currentMonthTotal } = useMemo(() => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
  
      const filteredTransactions = allTransactions.filter(t => {
          if (!t.date) return false;
          const txnDate = new Date(t.date);
          return txnDate.getFullYear() === currentYear && txnDate.getMonth() === currentMonth;
      });
  
      const total = filteredTransactions.reduce(
          (sum, t) => sum + parseFloat(t.amount || 0),
          0,
      );
  
      // Sort transactions by date, newest first
      filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      return { currentMonthTransactions: filteredTransactions, currentMonthTotal: total };
    }, [allTransactions]);

    const stats = [
      { label: "Total Spent", value: currentMonthTotal, icon: CreditCard, color: "#FFD700" },
      { label: "Friends", value: totalFriends, icon: User, color: "#4FB6FF" },
    ];

  useEffect(() => {
    if (GetUserDetailsData) {
      setUser(GetUserDetailsData?.user_details[0]);
    }
    
  },[GetUserDetailsData]);
  

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          navigation.navigate("signIn");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
      >
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    <Avatar.Text
                        size={80}
                        label={user?.fullname?.split(" ").map((n) => n[0]).join("")}
                        style={styles.avatar}
                        labelStyle={styles.avatarLabel}
                    />
                </View>

                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user?.fullname}</Text>
                    <Text style={styles.userHandle}>{user?.code}</Text>
                    <View style={styles.contactRow}>
                        <Phone size={14} color={colors.textSecondary} />
                        <Text style={styles.contactText}>{user?.mobile}</Text>
                    </View>
                    
                    <View style={styles.contactRow}>
                        <Mail size={14} color={colors.textSecondary} />
                        <Text style={styles.contactText}>{user?.email}</Text>
                    </View>
                </View>

            </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <View key={idx} style={styles.statCard}>
                <View style={[styles.iconBox, { backgroundColor: '#000000' }]}>
                    <Icon size={20} color={s.color} />
                </View>
                <View>
                    <Text style={styles.statValue}>{s.value}</Text>
                    <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              </View>
            );
          })}
        </View>

        
        {menuSections.map((section, index) => (
            <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <View style={styles.menuCard}>
                    {section.items.map((item, i) => (
                        <View key={i}>
                            <TouchableOpacity 
                                style={styles.menuItem} 
                                activeOpacity={0.7}
                                onPress={item.onPress}
                            >
                                <View style={styles.menuLeft}>
                                    <View style={styles.menuIconBox}>
                                        <item.icon size={18} color={colors.text} />
                                    </View>
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                </View>
                                <ChevronRight size={18} color={colors.textSecondary} />
                            </TouchableOpacity>
                            {i < section.items.length - 1 && <Divider style={styles.divider} />}
                        </View>
                    ))}
                </View>
            </View>
        ))}

        <View style={styles.footer}>
            {/* <Text style={styles.versionText}>Version 1.0.0 • Build 2024</Text> */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <LogOut size={18} color={colors.error} />
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: "" })}
        duration={2000}
        style={{ backgroundColor: colors.surface, marginBottom: insets.bottom + 10 }}
        action={{ label: "OK", textColor: colors.theme, onPress: () => setSnack({ visible: false, message: "" }) }}
      >
        <Text style={{color: colors.text}}>{snack.message}</Text>
      </Snackbar>
    </View>
  );
};

export default ProfileScreen;