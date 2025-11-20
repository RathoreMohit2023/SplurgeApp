import { StyleSheet } from "react-native";

const calculatorStyle = StyleSheet.create ({
    container: {
        flex: 1
    },
    HeaderContainer: {
        backgroundColor: "#0D0D0D", 
        flexDirection: "column", 
        alignItems: "flex-start", 
        paddingHorizontal: 16, 
    },
    title:{
        color: "#fff", 
        fontSize: 22, 
        fontWeight: "bold"
    },
    subtitle: {
        color: "#fff", 
        fontSize: 14, 
        marginTop: 2,
    },
});

export default calculatorStyle;