import React, { useContext, useMemo } from 'react';
import { View, StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LedgerTab from './tabs/LedgerTab';
import WishlistTab from './tabs/Wishlisttab';
import ComparisonTab from './tabs/Comparisontab';
import { ThemeContext } from '../../components/ThemeContext';
import getCalculatorStyles from '../../styles/MainScreen/calculatorStyle';

const Tab = createMaterialTopTabNavigator();

const CalculatorScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getCalculatorStyles(colors), [colors]);
  const bottomPadding = insets.bottom + 60;

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding }]}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Impact Calculator</Text>
        <Text style={styles.subtitle}>See what your spending could buy</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.theme,
          tabBarInactiveTintColor: colors.textSecondary,

          tabBarStyle: {
            backgroundColor: colors.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.theme,
            height: 3,
            borderRadius: 3,
          },
          tabBarLabelStyle: {
            fontWeight: '700',
            textTransform: 'capitalize',
            fontSize: 14,
          },
          tabBarPressColor: colors.tintedThemeColor,
        }}
        style={{ backgroundColor: colors.background }}
      >
        <Tab.Screen name="Ledger" component={LedgerTab} />
        <Tab.Screen name="Wishlist" component={WishlistTab} />
        <Tab.Screen name="Comparison" component={ComparisonTab} />
      </Tab.Navigator>
    </View>
  );
};

export default CalculatorScreen;
