import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  Alert,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { storeData } from "../../Redux/storage";
import CustomInput from "../../components/CustomInput";
import SelectionModal from "../../components/SelectionModal";
import { ThemeContext } from "../../components/ThemeContext";
import getSignUpStyle from "../../styles/authenthication/signUpStyle";
import MultiSelectionModal from "../../Modals/MultiSelectionModal";
const interestsList = [
  "Fashion", "Gaming", "Fitness", "Technology",
  "Travel", "Music", "Movies", "Books", "Sports", 
  "Art", "Cooking", "Finance", "Education"
];

const SignUp = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  
  const styles = useMemo(() => getSignUpStyle(colors), [colors]);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(50)).current;
  const insets = useSafeAreaInsets();

  const [isInterestModalVisible, setInterestModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    mobile: "",
    email: "",
    interest: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleOnChange = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const registerUser = async () => {
    let valid = true;
    let tempErrors = {};

    if (!userData.username) { tempErrors.username = "Username is required"; valid = false; }
    if (!userData.mobile) { tempErrors.mobile = "Mobile number is required"; valid = false; }
    if (!userData.email || !userData.email.includes("@")) { tempErrors.email = "Valid email is required"; valid = false; }
    if (!userData.interest.length) {
      tempErrors.interest = "Select at least 1 interest";
      valid = false;
    }
    if (!userData.password || userData.password.length < 6) { tempErrors.password = "Password min 6 chars"; valid = false; }
    if (userData.password !== userData.confirmPassword) { tempErrors.confirmPassword = "Passwords do not match"; valid = false; }

    setErrors(tempErrors);

    if (valid) {
      try {
        await storeData("user", userData);
        Alert.alert("Success", "Account created!", [{ text: "OK", onPress: () => navigation.replace("signIn") }]);
      } catch (error) {
        Alert.alert("Error", "Failed to save data");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40 + insets.bottom,
        backgroundColor: colors.background,
      }}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: colors.background }}
    >
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={28} color={colors.text} />
          </TouchableOpacity>
          <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started!</Text>
          </Animated.View>
        </View>

        {/* Form */}
        <Animated.View style={[styles.formContainer, { opacity: fade, transform: [{ translateY: slide }] }]}>
          <CustomInput
            label="Username"
            leftIcon="account-outline"
            value={userData.username}
            onChangeText={(val) => handleOnChange("username", val)}
            error={errors.username}
            // Pass colors props agar CustomInput support karta hai
          />
          <CustomInput
            label="Mobile Number"
            leftIcon="phone-outline"
            keyboardType="phone-pad"
            value={userData.mobile}
            onChangeText={(val) => handleOnChange("mobile", val)}
            error={errors.mobile}
          />
          <CustomInput
            label="Email"
            leftIcon="email-outline"
            keyboardType="email-address"
            value={userData.email}
            onChangeText={(val) => handleOnChange("email", val)}
            error={errors.email}
          />

          {/* === REUSABLE MODAL TRIGGER === */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={[
                styles.dropdownTrigger,
                { 
                    // Dynamic Border Color Logic
                    borderColor: errors.interest ? colors.error : colors.border 
                }
              ]}
              onPress={() => setInterestModalVisible(true)}
              activeOpacity={0.8}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon 
                  name="heart-outline" 
                  size={24} 
                  // Dynamic Icon Color
                  color={errors.interest ? colors.error : colors.textDisabled} 
                  style={{ marginRight: 12 }}
                />
                <Text
  style={[
    styles.dropdownText,
    {
      color: userData.interest.length
        ? colors.text
        : colors.textDisabled,
    },
  ]}
>
  {userData.interest.length
    ? userData.interest.join(", ")
    : "Select Interests"}
</Text>
              </View>
              <Icon name="chevron-down" size={24} color={colors.textDisabled} />
            </TouchableOpacity>
            {errors.interest && <Text style={styles.errorText}>{errors.interest}</Text>}
          </View>

          <CustomInput
            label="Password"
            leftIcon="lock-outline"
            password
            value={userData.password}
            onChangeText={(val) => handleOnChange("password", val)}
            error={errors.password}
          />
          <CustomInput
            label="Confirm Password"
            leftIcon="lock-check-outline"
            password
            value={userData.confirmPassword}
            onChangeText={(val) => handleOnChange("confirmPassword", val)}
            error={errors.confirmPassword}
          />

          <TouchableOpacity
            style={[styles.primaryBtn, { marginBottom: insets.bottom }]}
            onPress={registerUser}
          >
            <Text style={styles.primaryBtnText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      {/* === REUSABLE MODAL COMPONENT === */}
      <MultiSelectionModal
  visible={isInterestModalVisible}
  title="Choose Interests"
  data={interestsList}
  selectedItems={userData.interest}
  onClose={() => setInterestModalVisible(false)}
  onSelect={(items) => handleOnChange("interest", items)}
/>


    </KeyboardAwareScrollView>
  );
};

export default SignUp;