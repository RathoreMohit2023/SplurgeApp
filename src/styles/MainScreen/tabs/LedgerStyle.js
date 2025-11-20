import { StyleSheet } from "react-native";

const LedgerStyle = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 12, 
        backgroundColor: "#0D0D0D"
    },
    topRow: {
        marginBottom: 10,
    },
    cardContainer:{
        backgroundColor: "#25202C",
        padding: 18,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardLeftSection: {
        flexDirection: "column",
        justifyContent: "center",
    },
    cardText: {
        color: "#aaa",
        fontSize: 14,
    },
    cardAmt: {
        fontSize: 26,
        fontWeight: "700",
        color: "#fff",
        marginTop: 5,
    },
    addIconBtn: {
        backgroundColor: "#7C3BEC",
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },  
    cardContainer2: {
        marginBottom: 10,
        backgroundColor: "#25202C"
    },
    section1: {
        flexDirection: "row", 
        justifyContent: "space-between",
    },
    sectionText1: {
        fontSize: 16, 
        fontWeight: "bold",
        color: "#777"
    },
    sectionText2: {
        color: "#fff"
    },
    section2:{
        alignItems: "flex-end", 
        flexDirection: "row",
        gap: 25
    },
    sectionText3:{
        fontSize: 16, 
        fontWeight: "bold",
        color: "#fff"
    },
    sectionText4: {
        flexDirection: "row",
        gap: 12,
    },  
});

export default LedgerStyle;