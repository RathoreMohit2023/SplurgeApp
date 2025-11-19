import { StyleSheet } from "react-native";

const signInStyle = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 25,
    },
    logo: {
        width: 160,
        height: 160,
        // marginBottom: 20,
    },
    tagline: {
        fontSize: 22,
        color: "#C68CF5",
        fontWeight: "600",
        letterSpacing: 1,
        // marginTop: 10,
        textAlign: "center",
        opacity: 0.8,
    },
    input: {
        backgroundColor: "#1A1A1A",
        padding: 15,
        borderRadius: 12,
        color: "#fff",
         marginTop: 10,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#333",
    },
    btn: {
        backgroundColor: "#C68CF5",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    btnText: {
        color: "#0D0D0D",
        fontWeight: "bold",
        fontSize: 17,
    },
    forgot: {
        color: "#C68CF5",
        fontWeight: 600,
        marginTop: 10,
        textAlign: "center",
    },
    googleBtn: {
        borderWidth: 1,
        borderColor: "#444",
        padding: 15,
        borderRadius: 12,
        marginTop: 15,
        alignItems: "center",
    },
    googleText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default signInStyle;