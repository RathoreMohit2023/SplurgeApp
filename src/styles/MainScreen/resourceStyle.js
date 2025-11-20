import { StyleSheet } from "react-native";

const resourceStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
        padding: 16,
      },
    
      heading: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "700",
      },
      subHeading: {
        color: "#aaa",
        fontSize: 14,
        marginBottom: 14,
      },
    
      /* Card */
      card: {
        backgroundColor: "#221634",
        padding: 16,
        borderRadius: 14,
        marginVertical: 12,
      },
      cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
      },
      cardTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
      },
    
      /* Leaderboard Rows */
      friendRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        gap: 12,
      },
      friendRowHighlight: {
        backgroundColor: "rgba(198,140,245,0.1)",
        borderRadius: 8,
        marginHorizontal: -10,
        paddingHorizontal: 10,
      },
      rankCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
      },
      rankText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
      },
      avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#7C3BEC",
        alignItems: "center",
        justifyContent: "center",
      },
      avatarText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
      },
      friendName: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
      },
      friendPoints: {
        color: "#aaa",
        fontSize: 12,
      },
    
      /* Progress Section */
      progressSection: {
        marginTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#333",
        paddingTop: 14,
      },
      progressTextRow: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      progressLabel: {
        color: "#aaa",
        fontSize: 12,
      },
      progressValue: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
      },
      progressFooter: {
        color: "#aaa",
        fontSize: 12,
        marginTop: 6,
      },
    
      /* Tabs */
      tabArea: {
        padding: 12,
        backgroundColor: "#0D0D0D",
      },
});

export default resourceStyle;