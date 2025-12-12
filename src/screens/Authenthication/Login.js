import React, { useRef, useEffect, useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  StatusBar,
  Alert,
  ScrollView
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { darkLogo, MainLogo } from "../../Assets/Images";
// import { getData } from "../../Redux/storage"; 
import CustomInput from "../../components/CustomInput"; 
import getLoginStyle from "../../styles/authenthication/LoginStyle";
import { ThemeContext } from "../../components/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { LoginApi } from "../../Redux/Api/LoginApi";
import ToastMessage from '../../components/ToastMessage';
import DashedLoader from "../../components/DashedLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const SignInScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getLoginStyle(colors), [colors]);
  const dispatch = useDispatch();
  const { LoginLoading } = useSelector(state => state.Login);
  const fade = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const appLogo = themeType === "dark" ? darkLogo : MainLogo;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

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

  const handleSignIn = async () => {
    setEmailError('');
    setPasswordError('');

    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append('email', email.trim());
    formData.append('password', password);

    try {
      const result = await dispatch(LoginApi(formData));
      const response = result?.payload;

      if (
        response?.token ||
        response?.status === 200 ||
        response?.message?.toLowerCase().includes('success')
      ) {
        setToastMsg(response?.message || 'Login Successful');
        setShowToast(true);

        if (rememberMe) {
          await AsyncStorage.setItem("savedEmail", email);
          await AsyncStorage.setItem("savedPassword", password);
        } else {
          await AsyncStorage.removeItem("savedEmail");
          await AsyncStorage.removeItem("savedPassword");
        }
        
        setTimeout(() => {
          navigation.replace('MainScreen');
        }, 1500);
      } else {
        setToastMsg(response?.message || 'Invalid credentials');
        setShowToast(true);
      }
    } catch (error) {
      setToastMsg('Something went wrong. Please try again.');
      setShowToast(true);
    } 
  };


  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();

      const user = userInfo?.data?.user;
      const postData = {
        first_name: user?.givenName,
        last_name: user?.familyName,
        email: user?.email,
        google_id: user?.id,
        password: user?.givenName,
      };

      console.log("postData:", postData);
      

      // try {
      //   AsyncStorage.setItem('userLoginData', JSON.stringify(postData));
      // } catch (error) {
      //   console.error('Error saving login data:', error);
      // }

      // dispatch(googleLoginApi(postData)).then(async data => {
      //   if (data?.payload?.status === true) {
      //     setModalToastVisible(true);
      //     await AsyncStorage.setItem(
      //       'User',
      //       JSON.stringify(data.payload?.user),
      //     );
      //     await AsyncStorage.setItem(
      //       'Token',
      //       JSON.stringify(data.payload?.token),
      //     );
      //     dispatch(UserDetailsApi(data.payload?.token));
      //     setTimeout(() => {
      //       setModalToastVisible(false);
      //     }, 1000);
      //   } else {
      //     setLoginFailed(true);
      //   }
      // });
    } catch (error) {
     console.log("Error:", error);
     
    }
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
        <Animated.View
          style={{ width: '100%', opacity: fade, alignItems: 'center' }}
        >
          <Image source={appLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.tagline}>Spend smarter. Live better.</Text>

          <View style={styles.formContainer}>
            <CustomInput
              label="Email"
              value={email}
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              leftIcon="email-outline"
              keyboardType="email-address"
              error={emailError}
            />

            <CustomInput
              label="Password"
              value={password}
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              leftIcon="lock-outline"
              password={true}
              error={passwordError}
            />

            {/* <TouchableOpacity 
              onPress={() => navigation.navigate("forgotePassword")}
              style={styles.forgotContainer}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity> */}

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
              <Text style={styles.primaryBtnText}>
                {LoginLoading ? 'Please wait...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleBtn}>
              <Text style={styles.googleBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
      {LoginLoading && <DashedLoader color={colors.primary} size={100} />}
      
      <ToastMessage
        visible={showToast}
        message={toastMsg}
        onHide={() => setShowToast(false)}
      />
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;