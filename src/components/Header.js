import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Bell, Sun } from "lucide-react-native";
import headerStyle from "../styles/Components/headerStyle";
import { MainLogo } from "../Assets/Images/index";

const AppHeader = ({ navigation }) => {
  return (
    <View style={headerStyle.container}>
      
      {/* Logo + Tagline */}
      <View style={headerStyle.leftSection}>
        <Image source={MainLogo} style={headerStyle.logo} resizeMode="contain" />
        <Text style={headerStyle.tagline}>Spend smarter. Live better.</Text>
      </View>

      {/* Notification + Profile */}
      <View style={headerStyle.rightSection}>
        <TouchableOpacity 
            onPress={() => navigation.navigate("themeSwithcheScreen")}>
          <Sun color="#7C3BEC" size={28} style={{ marginRight: 15 }} />
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => navigation.navigate("notificationScreen")}>
          <Bell color="#7C3BEC" size={28} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default AppHeader;
