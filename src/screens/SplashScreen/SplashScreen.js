// import React, { useEffect, useRef } from "react";
// import { View, Text, Animated } from "react-native";
// import splashStyle from "../../styles/Splashstyle/splashStyle";
// import { splurgeLogo } from "../../Assets/Images";
// import { MainLogo } from "../../Assets/Images";

// const SplashSCreen = ({navigation}) => {

//     const fadeAnim = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         Animated.timing(fadeAnim, {
//             toValue: 1,
//             duration: 1200,
//             useNativeDriver: true,
//         }).start();

//         setTimeout(() => {
//             navigation.replace("signIn")
//         }, 250000)
//     }, []);

//     return(
//         <View style={splashStyle.container}>
//             <Animated.Image 
//                 source={MainLogo}
//                 style={[splashStyle.logo, { opacity: fadeAnim }]}
//                 resizeMode="contain"
//             />
//             <Text style={splashStyle.txt}>Splash Screen Open Here</Text>
//         </View>
//     )
// };
 
// export default SplashSCreen;


import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { MainLogo } from "../../Assets/Images";
import splashStyle from "../../styles/Splashstyle/splashStyle";

const SplashScreen = ({ navigation }) => {
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
            navigation.replace("signIn");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={splashStyle.container}>
            <Animated.Image
                source={MainLogo}
                style={[splashStyle.logo, { opacity: fadeAnim }]}
                resizeMode="contain"
            />

            <Animated.Text
                style={[
                    splashStyle.tagline,
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
