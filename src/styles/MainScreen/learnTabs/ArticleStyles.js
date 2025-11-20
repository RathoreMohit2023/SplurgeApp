import { StyleSheet } from "react-native";

const ArticleStyle = StyleSheet.create({
    tabArea: {
        padding: 12,
        backgroundColor: "#0D0D0D",
      },
       /* Articles */
       articleCard: {
        flexDirection: "row",
        backgroundColor: "#1A1A1A",
        padding: 12,
        borderRadius: 12,
        marginBottom: 14,
        gap: 12,
      },
      articleIcon: {
        width: 48,
        height: 48,
        borderRadius: 10,
        backgroundColor: "#222",
        alignItems: "center",
        justifyContent: "center",
      },
      titleText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
      },
    
      subText: {
        color: "#aaa",
        fontSize: 12,
      },
      row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginVertical: 3,
      },
      badge: {
        flexDirection: "row",
        backgroundColor: "#7C3BEC",
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignItems: "center",
        gap: 4,
        alignSelf: "flex-start",
      },
      badgeText: {
        color: "#ffffff",
        fontSize: 11,
        fontWeight: "600",
      },
});

export default ArticleStyle;