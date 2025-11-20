import React from "react";
import { View } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import calculatorStyle from "../../styles/MainScreen/calculatorStyle";

import LedgerTab from "./tabs/LedgerTab";
import WishlistTab from "./tabs/Wishlisttab";
import ComparisonTab from "./tabs/Comparisontab";

const Tab = createMaterialTopTabNavigator();

const CalculatorScreen = () => {
  return (
    <View style={calculatorStyle.container}>
      <Appbar.Header style={calculatorStyle.HeaderContainer}>
           <Text style={calculatorStyle.title}>
              Impact Calculator
            </Text>
            <Text style={calculatorStyle.subtitle}>
            See what your spending could buy
            </Text>
      </Appbar.Header>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#7C3BEC",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: { backgroundColor: "#25202C", borderRadius:10, padding: 5, marginLeft: 15, marginRight: 15  },
          tabBarIndicatorStyle: { backgroundColor: "#0D0D0D", padding: 20, margin: 5 },
        }}
        style={{backgroundColor: "#0D0D0D"}}
      >
        <Tab.Screen name="Ledger" component={LedgerTab} />
        <Tab.Screen name="Wishlist" component={WishlistTab} />
        <Tab.Screen name="Comparison" component={ComparisonTab} />
      </Tab.Navigator>
    </View>
  );
};

export default CalculatorScreen;
