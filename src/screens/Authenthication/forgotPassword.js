import React, { useRef, useEffect, useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import CustomInput from "../../components/CustomInput";
import getForgotPasswordStyle from "../../styles/authenthication/forgoteStyle"; // Import Style Function
import { ThemeContext } from "../../components/ThemeContext"; // Import Context

const ForgotPasswordScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getForgotPasswordStyle(colors), [colors]);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSend = () => {
    if (!email || !email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={28} color={colors.text} />
        </TouchableOpacity>

        <Animated.View 
          style={[
            styles.content, 
            { opacity: fade, transform: [{ translateY: slide }] }
          ]}
        >
          {!isSubmitted ? (
            <>
              <View style={styles.iconContainer}>
                <View style={styles.iconGlow} />
                <Icon name="lock-reset" size={64} color={colors.theme} />
              </View>

              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Enter the email associated with your account and we’ll send you an email with instructions to reset your password.
              </Text>

              <View style={styles.form}>
                <CustomInput
                  label="Email Address"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError("");
                  }}
                  leftIcon="email-outline"
                  keyboardType="email-address"
                  error={emailError}
                  // Pass colors props to CustomInput if supported
                />

                <TouchableOpacity 
                  style={styles.primaryBtn} 
                  onPress={handleSend}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryBtnText}>Send Instructions</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.iconContainer}>
                <View style={[styles.iconGlow, { backgroundColor: colors.success }]} />
                <Icon name="email-check-outline" size={64} color={colors.success} />
              </View>

              <Text style={styles.title}>Check your mail</Text>
              <Text style={styles.subtitle}>
                We have sent password recovery instructions to your email.
              </Text>

              <View style={styles.emailHighlight}>
                <Text style={styles.emailText}>{email}</Text>
              </View>

              <TouchableOpacity 
                style={styles.primaryBtn} 
                onPress={() => navigation.navigate("signIn")} 
              >
                <Text style={styles.primaryBtnText}>Back to Login</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.resendBtn} 
                onPress={() => setIsSubmitted(false)}
              >
                <Text style={styles.resendText}>Did not receive the email? Resend</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;