import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from "../src/navigation/rootNavigator";
import { PaperProvider } from "react-native-paper";

const MainApp = () => {
    return(
        <PaperProvider>
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </PaperProvider>
    )
}

export default MainApp;