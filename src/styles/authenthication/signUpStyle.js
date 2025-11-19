import { StyleSheet } from "react-native";

const signUpStyle = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
        paddingHorizontal: 25,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        color: "#C68CF5",
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        backgroundColor: "#1A1A1A",
        padding: 15,
        borderRadius: 12,
        color: "#fff",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#333",
        marginBottom: 15,
    },
    dropdown: {
        backgroundColor: "#1A1A1A",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#333",
        marginBottom: 15,
        maxHeight: 150,
    },
    dropdownItem: {
        padding: 12,
        borderBottomColor: "#333",
        borderBottomWidth: 1,
    },
    passwordWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1A1A1A",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#333",
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        padding: 15,
        color: "#fff",
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
    loginText: {
        color: "#C68CF5",
        marginTop: 15,
        textAlign: "center",
        fontWeight: "600",
    },
});

export default signUpStyle;