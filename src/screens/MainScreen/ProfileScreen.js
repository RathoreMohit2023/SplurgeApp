import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Card,
  Text,
  Avatar,
  Button,
  Divider,
  Badge,
  Snackbar,
  IconButton,
} from "react-native-paper";
import {
  User,
  Mail,
  Phone,
  Award,
  Settings,
  LogOut,
  Bell,
  Lock,
} from "lucide-react-native";
import ProfileStyle from "../../styles/MainScreen/ProfileStyle";

const ProfileScreen = ({ navigation }) => {
  const [snack, setSnack] = useState({ visible: false, message: "" });

  const user = {
    name: "Arjun Patel",
    email: "arjun.patel@email.com",
    phone: "+91 98765 43210",
    code: "SPL-2K4X9",
    points: 1200,
    rank: 3,
    totalFriends: 8,
    totalGroups: 2,
  };

  const stats = [
    { label: "Total Spent", value: "₹45,230", icon: Award },
    { label: "Friends", value: user.totalFriends, icon: User },
    { label: "Points", value: user.points, icon: Award },
    { label: "Rank", value: `#${user.rank}`, icon: Award },
  ];

  const menuItems = [
    { icon: Bell, label: "Notifications", onPress: () => setSnack({ visible: true, message: "Notifications (placeholder)" }) },
    { icon: Lock, label: "Privacy & Security", onPress: () => setSnack({ visible: true, message: "Privacy (placeholder)" }) },
    { icon: Settings, label: "Settings", onPress: () => setSnack({ visible: true, message: "Settings (placeholder)" }) },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => setSnack({ visible: true, message: "Logged out (placeholder)" }),
      },
    ]);
  };

  return (
    <>
      <ScrollView style={ProfileStyle.container} contentContainerStyle={ProfileStyle.inner}>
        <View style={ProfileStyle.headerRow}>
          <Text style={ProfileStyle.heading}>Profile</Text>
          <Text style={ProfileStyle.subheading}>Manage your account</Text>
        </View>

        <Card style={ProfileStyle.profileCard}>
          <Card.Content style={ProfileStyle.profileCardContent}>
            <View style={ProfileStyle.row}>
              <Avatar.Text
                size={74}
                label={user.name.split(" ").map((n) => n[0]).join("")}
                style={ProfileStyle.avatar}
                color="#000"
              />
              <View style={ProfileStyle.profileInfo}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <Text style={ProfileStyle.name} numberOfLines={1}>{user.name}</Text>
                  <Badge style={ProfileStyle.rankBadge}>Rank #{user.rank}</Badge>
                </View>

                <View style={ProfileStyle.contactRow}>
                  <Mail width={14} height={14} color="#aaa" />
                  <Text style={ProfileStyle.contactText} numberOfLines={1}>{user.email}</Text>
                </View>

                <View style={ProfileStyle.contactRow}>
                  <Phone width={14} height={14} color="#aaa" />
                  <Text style={ProfileStyle.contactText}>{user.phone}</Text>
                </View>

                <View style={{ marginTop: 8 }}>
                  <Text style={ProfileStyle.code}>{user.code}</Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Stats Grid */}
        <View style={ProfileStyle.statsGrid}>
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Card key={idx} style={ProfileStyle.statCard}>
                <Card.Content style={ProfileStyle.statContent}>
                  <Icon width={20} height={20} color="#7C3BEC" />
                  <Text style={ProfileStyle.statValue}>{s.value}</Text>
                  <Text style={ProfileStyle.statLabel}>{s.label}</Text>
                </Card.Content>
              </Card>
            );
          })}
        </View>

        {/* Account Settings */}
        <Card style={ProfileStyle.card}>
          <Card.Content>
            <Text style={ProfileStyle.cardTitle}>Account Settings</Text>

            <View style={{ marginTop: 8 }}>
              {menuItems.map((m, i) => {
                const Icon = m.icon;
                return (
                  <View key={i}>
                    <TouchableOpacity
                      onPress={m.onPress}
                      style={ProfileStyle.menuRow}
                      activeOpacity={0.7}
                    >
                      <View style={ProfileStyle.menuLeft}>
                        <Icon width={18} height={18} color="#aaa" />
                        <Text style={ProfileStyle.menuLabel}>{m.label}</Text>
                      </View>
                      <IconButton
                        icon={() => <Settings width={16} height={16} color="#777" />}
                        size={20}
                        onPress={m.onPress}
                        style={ProfileStyle.menuIcon}
                      />
                    </TouchableOpacity>
                    {i < menuItems.length - 1 && <Divider />}
                  </View>
                );
              })}
            </View>
          </Card.Content>
        </Card>

        {/* About */}
        <Card style={ProfileStyle.card}>
          <Card.Content>
            <Text style={ProfileStyle.cardTitle}>About</Text>

            <View style={{ marginTop: 10 }}>
              <View style={ProfileStyle.aboutRow}>
                <Text style={ProfileStyle.aboutLabel}>Version</Text>
                <Text style={ProfileStyle.aboutValue}>1.0.0</Text>
              </View>
              <Divider style={{ marginVertical: 8 }} />
              <TouchableOpacity onPress={() => setSnack({ visible: true, message: "Terms (placeholder)" })} style={ProfileStyle.linkRow}>
                <Text style={ProfileStyle.linkText}>Terms of Service</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSnack({ visible: true, message: "Privacy (placeholder)" })} style={ProfileStyle.linkRow}>
                <Text style={ProfileStyle.linkText}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={handleLogout}
          contentStyle={{ flexDirection: "row", justifyContent: "center" }}
          style={ProfileStyle.logoutBtn}
          icon={() => <LogOut width={18} height={18} color="#fff" />}
        >
          Log Out
        </Button>

        <View style={{ height: 40 }} />
      </ScrollView>

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: "" })}
        duration={2000}
      >
        {snack.message}
      </Snackbar>
    </>
  );
};

export default ProfileScreen;
