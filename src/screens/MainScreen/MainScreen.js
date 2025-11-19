import React from 'react'
import { View } from 'react-native';
import AppHeader from "../../components/Header";
import TabNavigator from "../../navigation/tabNavigator";



const MainScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
      
      <AppHeader navigation={navigation} />

      <TabNavigator />
    </View>
  );
}

export default MainScreen