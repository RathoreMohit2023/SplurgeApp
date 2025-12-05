import React, { useEffect, useContext, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppHeader from '../../components/Header';
import getTermsAndPoliciesStyle from "../../styles/MainScreen/TermsAndPoliciesStyle";
import { ThemeContext } from "../../components/ThemeContext";
import { PrivacyPolicyApi } from '../../Redux/Api/PrivacyPolicyApi';
import { useDispatch, useSelector } from 'react-redux';
import RenderHTML from 'react-native-render-html';

const TermsAndPolicies = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getTermsAndPoliciesStyle(colors), [colors]);
  const insets = useSafeAreaInsets();
  const { LoginData } = useSelector(state => state.Login);
  const { PrivacyPolicyLoading, PrivacyPolicyData } = useSelector(
    state => state.PrivacyPolicy
  );
  const textColor = colors.text;   

  
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  useEffect(() => {
    dispatch(PrivacyPolicyApi(LoginData.token))
  }, []);

  const htmlContent = PrivacyPolicyData?.content?.[0]?.content || "";

  const htmlStyles = {
    body: { color: textColor },
    h2: { fontSize: 22, fontWeight: 'bold', marginTop: 12, color: textColor },
    h3: { fontSize: 18, fontWeight: '600', marginTop: 10, color: textColor },
    p:  { fontSize: 15, lineHeight: 24, color: textColor },
    li: { color: textColor },
  };
  

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@splurgeapp.com');
  };

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
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {PrivacyPolicyLoading && (
            <ActivityIndicator size="large" color={colors.theme} style={{ marginTop: 20 }} />
        )}

        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <RenderHTML
            contentWidth={width}      
            source={{ html: htmlContent }}
            tagsStyles={htmlStyles}
          />
        </View>

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