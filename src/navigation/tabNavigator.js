import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { 
    Home,
    Calculator,
    Users,
    BookOpen,
    User
} from "lucide-react-native";

import DashBoardScreen from "../screens/MainScreen/DashBoardScreen";
import CalculatorScreen from "../screens/MainScreen/CalculatorScreen";
import groupSettle from "../screens/MainScreen/groupSettle";
import resourceScreen from "../screens/MainScreen/resourceScreen";
import ProfileScreen from "../screens/MainScreen/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown:false,
                tabBarStyle:{
                    backgroundColor: "#1A1A1A",
                    borderTopColor: "#333",
                    height: 60,
                    paddingBottom: 8,
                },
                tabBarActiveTintColor: "#7C3BEC",
                tabBarInactiveTintColor: "#777",
            }}>

                <Tab.Screen 
                    name="DashBoard"
                    component={DashBoardScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Home  color={color} size={24}/>
                    }}
                />


                <Tab.Screen 
                    name="Calculator"
                    component={CalculatorScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Calculator  color={color} size={24}/>
                    }}
                />

                <Tab.Screen 
                    name="Settle"
                    component={groupSettle}
                    options={{
                        tabBarIcon: ({ color }) => <Users  color={color} size={24}/>
                    }}
                />


                <Tab.Screen 
                    name="Resources"
                    component={resourceScreen}
                    options={{
                        tabBarIcon: ({ color }) => <BookOpen  color={color} size={24}/>
                    }}
                />

                <Tab.Screen 
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color }) => <User  color={color} size={24}/>
                    }}
                />
            </Tab.Navigator>
    )
};

export default TabNavigator;