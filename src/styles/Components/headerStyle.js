import { StyleSheet } from "react-native";

const  headerStyle = StyleSheet.create({
    container: {
        paddingTop: 45,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: "#0D0D0D",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    
      leftSection: {
        flexDirection: "row",
        alignItems: "center",
      },
    
      logo: {
        width: 45,
        height: 45,
        marginRight: 10,
      },
    
      tagline: {
        fontSize: 14,
        color: "#7C3BEC",
        fontWeight: "600",
        letterSpacing: 0.5,
      },
    
      rightSection: {
        flexDirection: "row",
        alignItems: "center",
      },
});

export default headerStyle;