import React, { useContext, useMemo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Bell, Sun, Moon, ArrowLeft } from "lucide-react-native";
import { useSelector, useDispatch } from "react-redux";
import getHeaderStyle from "../styles/Components/headerStyle";
import { ThemeContext } from "../components/ThemeContext";
import { darkLogo, MainLogo } from "../Assets/Images/index";
import { markAllAsRead } from "../Redux/Slice/NotificationSlice";

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
  const dispatch = useDispatch();

  const notificationList = useSelector((state) => state.Notifications.Notifications);
  const unreadCount = notificationList.filter((n) => !n.read).length;

  const iconColor = colors.theme; 
  const handleThemeToggle = onThemeTogglePress || toggleTheme;
  const appLogo = themeType === "dark" ? darkLogo : MainLogo;

  const handleNotificationClick = () => {
    dispatch(markAllAsRead());
    if (onNotificationPress) {
      onNotificationPress();
    } else {
      navigation.navigate("notificationScreen");
    }
  };

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
            style={{ marginRight: showNotification ? 20 : 0 }}
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
            onPress={handleNotificationClick}
            style={styles.notificationBtn}
          >
            <Bell color={iconColor} size={28} />
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

const styles = StyleSheet.create({
  notificationBtn: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -6,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
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