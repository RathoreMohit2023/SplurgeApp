import React, { useRef, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Animated, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import forgoteStyle from "../../styles/authenthication/forgoteStyle"; 

const forgote = ({ navigation }) => {
    const fade = useRef(new Animated.Value(0)).current;
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    useEffect(() => {
        Animated.timing(fade, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleSend = () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }

        // Later integrate with backend
        setSent(true);

        setTimeout(() => {
            navigation.goBack();
        }, 2000);
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
                <View style={forgoteStyle.container}>
                    <Animated.Text style={[forgoteStyle.title, { opacity: fade }]}>
                        Reset Password
                    </Animated.Text>

                    <Animated.Text style={[forgoteStyle.subtitle, { opacity: fade }]}>
                        Enter your email and we’ll send a reset link.
                    </Animated.Text>

                    <Animated.View style={{ width: "100%", opacity: fade }}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#888"
                            keyboardType="email-address"
                            style={forgoteStyle.input}
                            onChangeText={(val) => setEmail(val)}
                        />

                        <TouchableOpacity style={forgoteStyle.btn} onPress={handleSend}>
                            <Text style={forgoteStyle.btnText}>Send Reset Link</Text>
                        </TouchableOpacity>

                        {sent && (
                            <Text style={forgoteStyle.success}>
                                Reset link sent to your email!
                            </Text>
                        )}

                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={forgoteStyle.back}>Back to Sign In</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
           </ScrollView>
        </KeyboardAvoidingView>

    );
};

export default forgote;
