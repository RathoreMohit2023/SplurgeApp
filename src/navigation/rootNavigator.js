import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack"
import SplashSCreen from "../screens/SplashScreen/SplashScreen";
import SignIn from "../screens/Authenthication/SignIn";
import SignUp from "../screens/Authenthication/SignUp";
import forgotePassword from "../screens/Authenthication/forgote";
import MainScreen from "../screens/MainScreen/MainScreen";
import notificationScreen from "../components/notificationScreen";
import profileScreen from "../components/profileScreen";
import ledgerScreen from "../screens/MainScreen/LedgerScreen";
import impactScreen from "../screens/MainScreen/ImpactScreen";
import groupScreen from "../screens/MainScreen/groupScreen";
import learnScreen from "../screens/MainScreen/learnScreen";

const RootNavigator = () => {
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="spalsh" component={SplashSCreen} />
            <Stack.Screen name="signIn" component={SignIn} />
            <Stack.Screen name="signUp" component={SignUp} />
            <Stack.Screen name="forgotePassword" component={forgotePassword} />
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="notificationScreen" component={notificationScreen} />
            <Stack.Screen name="profileScreen" component={profileScreen} />
            <Stack.Screen name="ledgerScreen" component={ledgerScreen} />
            <Stack.Screen name="impactScreen" component={impactScreen} />
            <Stack.Screen name="groupScreen" component={groupScreen} />
            <Stack.Screen name="learnScreen" component={learnScreen} />
        </Stack.Navigator>
    )
};

export default RootNavigator;