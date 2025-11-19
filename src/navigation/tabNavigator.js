import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { 
    Home,
    Wallet,
    Calculator,
    Users,
    BookOpen
} from "lucide-react-native";

import MainScreen from "../screens/MainScreen/MainScreen";
import LedgerScreen from "../screens/MainScreen/LedgerScreen";
import ImpactScreen from "../screens/MainScreen/ImpactScreen";
import GrouScreen from "../screens/MainScreen/groupScreen";
import LearnScreen from "../screens/MainScreen/learnScreen";
import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";

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
                tabBarActiveTintColor: "#C68CF5",
                tabBarInactiveTintColor: "#777",
            }}>

                <Tab.Screen 
                    name="Home"
                    component={MainScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Home  color={color} size={24}/>
                    }}
                />


                <Tab.Screen 
                    name="Ledgers"
                    component={LedgerScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Wallet  color={color} size={24}/>
                    }}
                />

                <Tab.Screen 
                    name="Impact"
                    component={ImpactScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Calculator  color={color} size={24}/>
                    }}
                />


                <Tab.Screen 
                    name="Groups"
                    component={GrouScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Users  color={color} size={24}/>
                    }}
                />

                <Tab.Screen 
                    name="Learn"
                    component={LearnScreen}
                    options={{
                        tabBarIcon: ({ color }) => <BookOpen  color={color} size={24}/>
                    }}
                />
            </Tab.Navigator>
    )
};

export default TabNavigator;