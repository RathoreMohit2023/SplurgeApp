import React, { useRef, useEffect, useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Image,
  StatusBar,
  Alert
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MainLogo } from "../../Assets/Images";
// import { getData } from "../../Redux/storage"; 
import CustomInput from "../../components/CustomInput"; 
import getLoginStyle from "../../styles/authenthication/LoginStyle";
import { ThemeContext } from "../../components/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { LoginApi } from "../../Redux/Api/LoginApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";


const SignInScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getLoginStyle(colors), [colors]);
  const fade = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const {LoginData, LoginLoading} = useSelector(state => state.Login)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("savedEmail");
        const savedPassword = await AsyncStorage.getItem("savedPassword");
  
        if (savedEmail) {
          setEmail(savedEmail);
          setRememberMe(true);
        }
  
        if (savedPassword) {
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.log("Error loading saved credentials", error);
      }
    };
  
    loadSavedCredentials();
  }, []);
  
  // useEffect(() => {
  //   let mounted = true;
  //   const loadEmail = async () => {
  //     try {
  //       const user = await getData("user");
  //       if (mounted && user && user.email) {
  //         setEmail(String(user.email));
  //       }
  //     } catch (err) {
  //       console.log("Error loading user:", err);
  //     }
  //   };
  //   loadEmail();
  //   return () => { mounted = false; };
  // }, []);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  const handleSignIn = async () => {
    let valid = true;

    if(!email || !email.includes("@")){
      setEmailError("Enter Valid Email")
      valid = false;
    }

    if(!password){
      setPasswordError("Password Required")
      valid = false;
    }

    if(!valid) return;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await dispatch(LoginApi(formData));

    if (
      result?.payload?.token ||
      result?.payload?.message?.toLowerCase().includes("success")
    ) {
    
    // Remember Me functionality
    if (rememberMe) {
      await AsyncStorage.setItem("savedEmail", email);
      await AsyncStorage.setItem("savedPassword", password);
    } else {
      await AsyncStorage.removeItem("savedEmail");
      await AsyncStorage.removeItem("savedPassword");
    }

    navigation.replace("MainScreen"); }

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
                setEmailError("");
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
                setPasswordError("");
              }}
              leftIcon="lock-outline"
              password={true}
              error={passwordError}
            />

            <View style={styles.rowBetween}>
              <View style={styles.row}>
                <CheckBox
                  value={rememberMe}
                  onValueChange={(val) => setRememberMe(val)}
                  tintColors={{ true: colors.theme, false: colors.text }}
                />
                <Text style={styles.rememberText}>Remember Me</Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("forgotePassword")}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={handleSignIn}>
              <Text style={styles.primaryBtnText}>{LoginLoading ? "Please wait..." : "Sign In"}</Text>
            </TouchableOpacity>

            {/* <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View> */}

            {/* <TouchableOpacity style={styles.googleBtn}>
              <Text style={styles.googleBtnText}>Continue with Google</Text>
            </TouchableOpacity> */}

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