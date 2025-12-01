import React, { useRef, useEffect, useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  StatusBar
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MainLogo } from "../../Assets/Images";
import { getData } from "../../Redux/storage"; 
import CustomInput from "../../components/CustomInput"; 
import getLoginStyle from "../../styles/authenthication/LoginStyle";
import { ThemeContext } from "../../components/ThemeContext";

const SignInScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getLoginStyle(colors), [colors]);
  const fade = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    let mounted = true;
    const loadEmail = async () => {
      try {
        const user = await getData("user");
        if (mounted && user && user.email) {
          setEmail(String(user.email));
        }
      } catch (err) {
        console.log("Error loading user:", err);
      }
    };
    loadEmail();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  const handleSignIn = async () => {
    setEmailError("");
    setPasswordError("");
    navigation.replace("MainScreen");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
      style={{ backgroundColor: colors.background }}
    >
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ width: "100%", opacity: fade, alignItems: "center" }}>
          
          <Image source={MainLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.tagline}>Spend smarter. Live better.</Text>

          <View style={styles.formContainer}>
            <CustomInput
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError("");
              }}
              leftIcon="email-outline"
              keyboardType="email-address"
              error={emailError}
            />

            <CustomInput
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError("");
              }}
              leftIcon="lock-outline"
              password={true}
              error={passwordError}
            />

            <TouchableOpacity 
              onPress={() => navigation.navigate("forgotePassword")}
              style={styles.forgotContainer}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignIn}>
              <Text style={styles.primaryBtnText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.googleBtn}>
              {/* Google Icon Image laga sakte hain yahan */}
              <Text style={styles.googleBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;