import React, {useState, useEffect, useRef} from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, FlatList,KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import SignUpStyle from "../../styles/authenthication/signUpStyle";
import { storeData } from "../../Redux/storage";

const interestsList = [
    "Fashion",
    "Gaming",
    "Fitness",
    "Technology",
    "Travel",
    "Music",
    "Movies",
    "Books",
    "Sports",
];

const SignUp = ({navigation}) => {
        const fade = useRef(new Animated.Value(0)).current;

        const [showPass, setShowPass] = useState(false);
        const [showConfirmPass, setShowConfirmPass] = useState(false);
        const [showInterestList, setShowInterestList] = useState(false);
    
        const [userData, setUserData] = useState({
            username: "",
            mobile: "",
            email: "",
            interest: "",
            password: "",
            confirmPassword: "",
        });
    
        useEffect(() => {
            Animated.timing(fade, {
                toValue: 1,
                duration: 900,
                useNativeDriver: true,
            }).start();
        }, []);
    
        const registerUser = async () => {
            if (userData.password !== userData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
    
            await storeData("user", userData);
    
            alert("Account created successfully!");
            navigation.replace("signIn");
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
                <View style={SignUpStyle.container}>
                    <Animated.Text style={[SignUpStyle.title, { opacity: fade }]}>
                    Create Your Account
                    </Animated.Text>
    
                    <Animated.View style={{ width: "100%", opacity: fade }}>
    
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#888"
                            style={SignUpStyle.input}
                            onChangeText={(val) => setUserData({ ...userData, username: val })}
                        />
    
                        <TextInput
                            placeholder="Mobile Number"
                            placeholderTextColor="#888"
                            keyboardType="phone-pad"
                            style={SignUpStyle.input}
                            onChangeText={(val) => setUserData({ ...userData, mobile: val })}
                        />
    
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#888"
                            keyboardType="email-address"
                            style={SignUpStyle.input}
                            onChangeText={(val) => setUserData({ ...userData, email: val })}
                        />
    
                        {/* Interest Dropdown */}
                        <TouchableOpacity
                            style={SignUpStyle.input}
                            onPress={() => setShowInterestList(!showInterestList)}
                        >
                            <Text style={{ color: userData.interest ? "#fff" : "#888" }}>
                                {userData.interest || "Select Your Interest"}
                            </Text>
                        </TouchableOpacity>
    
                        {showInterestList && (
                            <FlatList
                                data={interestsList}
                                style={SignUpStyle.dropdown}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={SignUpStyle.dropdownItem}
                                        onPress={() => {
                                            setUserData({ ...userData, interest: item });
                                            setShowInterestList(false);
                                        }}
                                    >
                                        <Text style={{ color: "#fff" }}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        )}
    
                        {/* Password */}
                        <View style={SignUpStyle.passwordWrapper}>
                            <TextInput
                                placeholder="Create Password"
                                placeholderTextColor="#888"
                                secureTextEntry={!showPass}
                                style={SignUpStyle.passwordInput}
                                onChangeText={(val) => setUserData({ ...userData, password: val })}
                            />
                            
                            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                                {showPass ? <EyeOff color="#fff" /> : <Eye color="#fff" />}
                            </TouchableOpacity>
                        </View>
    
                        {/* Confirm Password */}
                        <View style={SignUpStyle.passwordWrapper}>
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor="#888"
                                secureTextEntry={!showConfirmPass}
                                style={SignUpStyle.passwordInput}
                                onChangeText={(val) =>
                                    setUserData({ ...userData, confirmPassword: val })
                                }
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                                {showConfirmPass ? <EyeOff color="#fff" /> : <Eye color="#fff" />}
                            </TouchableOpacity>
                        </View>
    
                        <TouchableOpacity style={SignUpStyle.btn} onPress={registerUser}>
                            <Text style={SignUpStyle.btnText}>Sign Up</Text>
                        </TouchableOpacity>
    
                        <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
                            <Text style={SignUpStyle.loginText}>Already have an account? Sign in</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignUp;