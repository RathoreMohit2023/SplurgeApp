import { StyleSheet } from "react-native";

const WishlistStyle = StyleSheet.create({
    Container: {
        flex: 1, 
        padding: 12,
        backgroundColor: "#0D0D0D"
    },
    cardConatiner: {
        marginBottom: 10,
        backgroundColor: "#25202C",
    },
    topRow: {
        marginBottom: 10,
    },
    CardContainer:{
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
    addIconBtn: {
        backgroundColor: "#C68CF5",
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },  
    Section1: {
        flexDirection: "row", 
        justifyContent: "space-between"
    },
    Section2: {
        flex: 1 
    },
    section3: {
        flexDirection: "row",
        gap: 12,
    },
    SectionText1: {
        fontSize: 16, 
        fontWeight: "bold",
        color: "#fff"
    },
    SectionText2: {
        color: "#777"
    },
    SectionText3: {
        marginTop: 4, 
        color: "#7C3BEC"
    }
});

export default WishlistStyle;