import { StyleSheet } from "react-native";

const ComparisonStyle = StyleSheet.create({
    container:{
        flex: 1,
        padding: 12,
        backgroundColor: "#0D0D0D" 
    },
    cardContainer: {
        marginBottom: 15, 
        padding: 15,
        backgroundColor: "#231636",
    },
    cardText: {
        fontSize: 16, 
        fontWeight: "600",
        color: "#fff"
    },
    cardText2 :{
        marginTop: 5,
        color: "#fff"
    },
    cardText3: {
        color: "#777"
    },
    cardContainer2: {
        marginBottom: 10,
        backgroundColor: "#25202C"
    },
    textSection: {
        flexDirection: "row", 
        alignItems: "center"
    },
    textemoji:{
        fontSize: 40, 
        marginRight: 15
    },
    textSection1:{
        flex: 1
    },
    text1: {
        fontWeight: "bold",
        color: "#fff"
    },
    text2: {
        color: "#777"
    },
});

export default ComparisonStyle;