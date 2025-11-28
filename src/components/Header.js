import React, { useContext, useMemo } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Bell, Sun, Moon, ArrowLeft } from "lucide-react-native";
import getHeaderStyle from "../styles/Components/headerStyle";
import { ThemeContext } from "../components/ThemeContext";
import { MainLogo } from "../Assets/Images/index";

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

  const iconColor = colors.theme; 
  const textColor = colors.text;

  const handleThemeToggle = onThemeTogglePress || toggleTheme;

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
              source={MainLogo}
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
            style={{ marginRight: showNotification ? 15 : 0 }}
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
          >
            <Bell color={iconColor} size={28} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppHeader;