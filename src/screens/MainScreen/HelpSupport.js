import React, { useEffect, useContext, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppHeader from '../../components/Header';
import getHelpSupportStyle from "../../styles/MainScreen/HelpSupportStyle"; 
import { ThemeContext } from "../../components/ThemeContext"; 
import { HelpAndSupportApi } from '../../Redux/Api/HelpAndSupportApi';
import { useDispatch, useSelector } from 'react-redux';

const HelpSupport = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getHelpSupportStyle(colors), [colors]);
  const insets = useSafeAreaInsets();
  const { LoginData } = useSelector(state => state.Login);
  const { HelpAndSupportLoading, HelpAndSupportData } = useSelector(state => state.HelpAndSupport);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(HelpAndSupportApi(LoginData.token))
  }, []);

  const support = HelpAndSupportData?.support?.[0] || {};

  const contactDetails = [          
    {
      id: 'email', 
      icon: 'email-outline',
      label: 'Email Support',
      value: support.email,
      action: () => Linking.openURL(`mailto:${support.email}`),
    },
    {
      id: 'phone',
      icon: 'phone-outline',
      label: 'Customer Care',
      value: support.contact,
      action: () => Linking.openURL(`tel:${support.contact}`),
    },
    {
      id: 'website',
      icon: 'web',
      label: 'Website',
      value: support.website,
      action: () => Linking.openURL(
          support.website.startsWith("http")
          ? support.website
          : `https://${support.website}`
      ),
    },
    {
      id: 'address',
      icon: 'map-marker-outline',
      label: 'Headquarters',
      value: support.location,
      action: () =>
        Linking.openURL(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            support.location
          )}`
        )
    },
  ].filter(item => item.value);

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <AppHeader
        showThemeToggle={true}
        navigation={navigation}
        showBackButton={true}
        title="Help & Support"
        onBackPress={() => navigation.goBack()}
      />

      {/* UPDATED SCROLLVIEW WITH BOTTOM PADDING */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[
            styles.content, 
            { paddingBottom: insets.bottom + 40 } // Adds safe area + 40px extra space
        ]}
      >
        {/* Company Branding Section */}
        <View style={styles.brandSection}>
            <View style={styles.logoContainer}>
                <MaterialCommunityIcons name="wallet-giftcard" size={40} color={colors.theme} />
            </View>
            <Text style={styles.appName}>Splurge</Text>
            {/* <Text style={styles.appVersion}>Version 2.0.1</Text> */}
            <Text style={styles.aboutText}>
              Empowering you to track expenses, save money, and spend wisely. 
              We are dedicated to providing the best financial tools for your lifestyle.
            </Text>
        </View>

        {HelpAndSupportLoading && (
          <ActivityIndicator size="large" color={colors.theme} style={{ marginTop: 20 }} />
        )}

        {/* Contact Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Contact Us</Text>
          
          {contactDetails.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.row, 
                index !== contactDetails.length - 1 && styles.separator
              ]}
              onPress={item.action}
              activeOpacity={0.7}
            >
              <View style={styles.iconBox}>
                <MaterialCommunityIcons name={item.icon} size={22} color={colors.theme} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>
              {item.id !== 'address' && (
                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textDisabled} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Media / Footer */}
        <View style={styles.footer}>
            <Text style={styles.footerText}>Follow us on social media</Text>
            <View style={styles.socialRow}>
                {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                    <TouchableOpacity key={social} style={styles.socialIcon}>
                        <MaterialCommunityIcons name={social} size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.copyright}>© 2025 Splurge Inc. All rights reserved.</Text>
        </View>

      </ScrollView>
    </View>
  );
};

export default HelpSupport;