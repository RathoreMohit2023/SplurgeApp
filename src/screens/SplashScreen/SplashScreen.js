import React, { useEffect, useRef, useContext, useMemo } from "react";
import { View, Animated, StatusBar } from "react-native";
import { MainLogo } from "../../Assets/Images";

// Imports
import getSplashStyles from "../../styles/Splashstyle/splashStyle";
import { ThemeContext } from "../../components/ThemeContext";

const SplashScreen = ({ navigation }) => {
    // Context se Colors aur ThemeType lein
    const { colors, themeType } = useContext(ThemeContext);
    
    // Styles generate karein
    const styles = useMemo(() => getSplashStyles(colors), [colors]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            // Yahan check kar sakte hain user logged in hai ya nahi
            navigation.replace("signIn"); 
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {/* Status Bar ko Theme ke hisab se adjust karein */}
            <StatusBar 
                barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
                backgroundColor={colors.background} 
            />

            <Animated.Image
                source={MainLogo}
                style={[styles.logo, { opacity: fadeAnim }]}
                resizeMode="contain"
            />

            <Animated.Text
                style={[
                    styles.tagline,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                Spend smarter. Live better.
            </Animated.Text>
        </View>
    );
};

export default SplashScreen;