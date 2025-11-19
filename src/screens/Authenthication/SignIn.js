import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { MainLogo } from "../../Assets/Images";
import signInStyle from "../../styles/authenthication/signInStyle";
import { getData } from "../../Redux/storage"; // ensure this returns parsed object or null

const SignInScreen = ({ navigation }) => {
  const fade = useRef(new Animated.Value(0)).current;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Load saved email only once
  useEffect(() => {
    let mounted = true;
    const loadEmail = async () => {
      try {
        const user = await getData("user");
        if (mounted) {
          if (user && user.email) {
            setEmail(String(user.email)); 
            console.log("[SignIn] Prefilled email:", user.email);
          } else {
            console.log("[SignIn] No saved user/email found");
          }
        }
      } catch (err) {
        console.log("[SignIn] error loading saved user:", err);
      }
    };
    loadEmail();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignIn = async () => {
    try {
      const trimmedEmail = (email || "").trim();
      const trimmedPassword = (password || "").trim();

      if (!trimmedEmail) {
        Alert.alert("Missing Email", "Please enter your email address.");
        return;
      }
      if (!trimmedPassword) {
        Alert.alert("Missing Password", "Please enter your password.");
        return;
      }

      const user = await getData("user");
      console.log("[SignIn] stored user:", user);

      if (!user) {
        Alert.alert("No Account", "No account found. Please sign up first.");
        return;
      }


      if (String(trimmedEmail).toLowerCase() !== String(user.email || "").toLowerCase()) {
        Alert.alert("Invalid Email", "No account found with this email.");
        return;
      }

      if (trimmedPassword !== String(user.password || "").trim()) {
        Alert.alert("Wrong Password", "Incorrect password. Try again.");
        return;
      }

      Alert.alert("Success", "Login successful!");
      navigation.replace("MainScreen");
    } catch (err) {
      console.log("[SignIn] handleSignIn error:", err);
      Alert.alert("Error", "Something went wrong. Try again.");
    }
  };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}}
    >
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={signInStyle.container}>
                <Animated.Image
                    source={MainLogo}
                    style={[signInStyle.logo, { opacity: fade }]}
                    resizeMode="contain"
                />

                <Text style={signInStyle.tagline}> Spend smarter. Live better.</Text>

                <Animated.View style={{ width: "100%", opacity: fade }}>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={signInStyle.input}
                    />
        
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#888"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={signInStyle.input}
                    />

                    <TouchableOpacity style={signInStyle.btn} onPress={handleSignIn}>
                        <Text style={signInStyle.btnText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
                        <Text style={signInStyle.forgot}>Create an account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("forgotePassword")}>
                        <Text style={signInStyle.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={signInStyle.googleBtn}>
                        <Text style={signInStyle.googleText}>Continue with Google</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;


