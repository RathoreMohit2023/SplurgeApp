import React, { useContext, useMemo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Bell, Sun, Moon, ArrowLeft } from "lucide-react-native";
import { useSelector } from "react-redux"; // <--- 1. Import useSelector
import getHeaderStyle from "../styles/Components/headerStyle";
import { ThemeContext } from "../components/ThemeContext";
import { darkLogo, MainLogo } from "../Assets/Images/index";

const AppHeader = ({
  navigation,
  title = "",                   
  showBackButton = false,       
  showNotification = true,     
  showThemeToggle = true,       
  onBackPress,                  
  onNotificationPress,         
  onThemeTogglePress         
}) => {
  const { colors, themeType, toggleTheme } = useContext(ThemeContext);
  const headerStyle = useMemo(() => getHeaderStyle(colors), [colors]);

  // <--- 2. Redux se Notifications fetch karein
  const notificationList = useSelector((state) => state.Notifications.Notifications);

  // <--- 3. Unread count calculate karein
  const unreadCount = notificationList.filter((n) => !n.read).length;

  const iconColor = colors.theme; 
  // const textColor = colors.text; // Unused variable removed

  const handleThemeToggle = onThemeTogglePress || toggleTheme;
  const appLogo = themeType === "dark" ? darkLogo : MainLogo;

  return (
    <View style={headerStyle.container}>

      <View style={headerStyle.leftSection}>
        {showBackButton ? (
          <TouchableOpacity
            onPress={onBackPress || (() => navigation.goBack())}
            style={{ marginRight: 10 }}
          >
            <ArrowLeft color={iconColor} size={28} />
          </TouchableOpacity>
        ) : (
          <>
            <Image
              source={appLogo}
              style={headerStyle.logo}
              resizeMode="contain"
            />
            {title ? <Text style={headerStyle.tagline}>{title}</Text> : null}
          </>
        )}
      </View>

      <View style={headerStyle.rightSection}>
        {showThemeToggle && (
          <TouchableOpacity
            onPress={handleThemeToggle}
            style={{ marginRight: showNotification ? 20 : 0 }} // Thoda gap badhaya taki badge overlap na ho
          >
            {themeType === 'dark' ? (
               <Sun color={iconColor} size={28} />
            ) : (
               <Moon color={iconColor} size={28} />
            )}
          </TouchableOpacity>
        )}

        {showNotification && (
          <TouchableOpacity
            onPress={onNotificationPress || (() => navigation.navigate("notificationScreen"))}
            style={styles.notificationBtn}
          >
            <Bell color={iconColor} size={28} />
            
            {/* <--- 4. Badge Logic: Agar unread count 0 se zyada hai toh dikhao */}
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// <--- 5. Local Styles for Badge
const styles = StyleSheet.create({
  notificationBtn: {
    position: 'relative', // Zaroori hai taki absolute positioning kaam kare
    justifyContent: 'center',
    alignItems: 'center'
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -6,
    backgroundColor: '#FF3B30', // Red Alert Color
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff', // White border taaki icon se alag dikhe
    paddingHorizontal: 2,
    zIndex: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default AppHeader;