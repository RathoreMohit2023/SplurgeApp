import React from "react";
// import { View, Text } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from "../src/navigation/rootNavigator";

const MainApp = () => {
    return(
        // <View>
        //     <Text style={{fontSize:25}}>Splurge App</Text>
        // </View>
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}

export default MainApp;