import { StyleSheet } from "react-native";

const getSplashStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background, // Dynamic Background (Dark: #080808, Light: #F4F6F9)
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 200, // Apne hisab se adjust karein
        height: 200,
        marginBottom: 20,
    },
    tagline: {
        fontSize: 18,
        color: colors.theme, // Tagline color usually branding color (Purple) hona chahiye
        fontWeight: "600",
        letterSpacing: 1.2,
        textAlign: "center",
    },
});

export default getSplashStyles;