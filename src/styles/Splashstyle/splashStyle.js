import { StyleSheet } from "react-native";

const splashStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    tagline: {
        fontSize: 22,
        color: "#C68CF5",
        fontWeight: "600",
        letterSpacing: 1,
        marginTop: 10,
        textAlign: "center",
        opacity: 0.8,
    },
})

export default splashStyle;