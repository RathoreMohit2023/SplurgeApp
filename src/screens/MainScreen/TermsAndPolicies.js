import React, { useContext, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Imports
import AppHeader from '../../components/Header';
import getTermsAndPoliciesStyle from "../../styles/MainScreen/TermsAndPoliciesStyle"; // Import Style Function
import { ThemeContext } from "../../components/ThemeContext"; // Import Context

const TermsAndPolicies = ({ navigation }) => {
  // 1. Context Hook
  const { colors, themeType } = useContext(ThemeContext);

  // 2. Styles Memoization
  const styles = useMemo(() => getTermsAndPoliciesStyle(colors), [colors]);

  const insets = useSafeAreaInsets();

  // Data structure
  const policies = [
    {
      id: 1,
      title: 'User Agreement',
      icon: 'file-document-outline',
      content: 'By using our app, you agree to follow all rules and guidelines. We may update these terms anytime to ensure the safety of our community.',
    },
    {
      id: 2,
      title: 'Privacy Policy',
      icon: 'shield-lock-outline',
      content: 'Your data is handled securely. We never share your personal information without consent. We prioritize your digital privacy.',
    },
    {
      id: 3,
      title: 'Usage Restrictions',
      icon: 'alert-octagon-outline',
      content: 'Misuse of the app, including fraudulent activities, spamming, or harassment, may result in immediate account suspension.',
    },
  ];

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@splurgeapp.com');
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      {/* Header */}
      <AppHeader
        showThemeToggle={false}
        navigation={navigation}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Section */}
        <View style={styles.headerSection}>
          <Text style={styles.mainTitle}>Terms & Policies</Text>
          <Text style={styles.subTitle}>
            Last updated: November 2025
          </Text>
          <Text style={styles.description}>
            Welcome to Splurge. Transparency is key to our relationship. Please read how we operate below.
          </Text>
        </View>

        {/* Policy Cards */}
        <View style={styles.cardsContainer}>
          {policies.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons 
                    name={item.icon} 
                    size={24} 
                    // Dynamic Icon Color
                    color={colors.theme} 
                  />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <Text style={styles.cardContent}>{item.content}</Text>
            </View>
          ))}
        </View>

        {/* Contact / Support Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactHeader}>Have Questions?</Text>
          <TouchableOpacity 
            style={styles.contactCard} 
            onPress={handleEmailSupport}
            activeOpacity={0.8}
          >
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'transparent' }]}>
              <MaterialCommunityIcons name="email-outline" size={24} color="#FFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactTitle}>Contact Support</Text>
              <Text style={styles.contactSubtitle}>support@splurgeapp.com</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="rgba(255,255,255,0.7)" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default TermsAndPolicies;