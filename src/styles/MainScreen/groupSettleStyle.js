import { StyleSheet } from "react-native";

const groupSettleStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
      },
      inner: {
        padding: 16,
      },
    
      header: {
        marginBottom: 12,
      },
      title: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
      },
      subtitle: {
        color: "#999",
        marginTop: 4,
      },
    
      // Friend code card
      cardGradient: {
        backgroundColor: "#1E1724", // subtle dark gradient feel
        marginBottom: 12,
        borderRadius: 12,
        overflow: "hidden",
      },
      cardContent: {
        paddingVertical: 12,
        paddingHorizontal: 12,
      },
      codeRow: {
        gap: 10,
      },
      cardTitle: {
        color: "#ffffff",
        fontWeight: "700",
        marginBottom: 8,
      },
      codeBoxRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      codeBox: {
        backgroundColor: "rgba(255,255,255,0.03)",
        color: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontFamily: Platform.OS === "android" ? "monospace" : "Menlo",
        fontSize: 16,
        fontWeight: "700",
      },
      iconBtnSmall: {
        backgroundColor: "#7C3BEC",
        padding: 10,
        borderRadius: 10,
        marginLeft: 8,
      },
      copyLinkRow: {
        marginTop: 10,
      },
      copyLinkBtn: {
        borderColor: "#2a2430",
        borderWidth: 1,
      },
      copyLinkText: {
        color: "#ffffff",
      },
    
      // Add friend
      card: {
        backgroundColor: "#1A1A1A",
        marginBottom: 12,
        borderRadius: 12,
      },
      addFriendRow: {
        marginBottom: 8,
      },
      addFriendInputRow: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        marginTop: 6,
      },
      input: {
        flex: 1,
        backgroundColor: "#111",
        color: "#fff",
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#222",
      },
      addFriendBtn: {
        marginLeft: 8,
        backgroundColor: "#7C3BEC",
        padding: 8,
        borderRadius: 8,
      },
    
      // sections
      section: {
        marginBottom: 14,
      },
      sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
      },
      sectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
      },
      sectionActionBtn: {
        borderColor: "#2a2430",
        borderWidth: 1,
        backgroundColor: "#7C3BEC"
      },
      sectionActionText: {
        color: "#ffffff",
      },
      sectionActionTextLight: {
        color: "#fff",
      },
    
      // Friends card
      cardFriend: {
        marginBottom: 10,
        backgroundColor: "#25202C",
        borderRadius: 12,
      },
      friendRow: {
        justifyContent: "space-between",
      },
      friendLeft: {
        flexDirection: "row",
        alignItems: "center",
      },
      avatar: {
        backgroundColor: "#7C3BEC",
      },
      friendName: {
        color: "#fff",
        fontWeight: "700",
      },
      friendPoints: {
        color: "#999",
        fontSize: 12,
      },
      friendRight: {
        alignItems: "flex-end",
        justifyContent: "center",
        minWidth: 80,   
      },
      owedRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(76, 175, 80, 0.08)",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        marginBottom: 4,
      },
      owesRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 59, 48, 0.08)",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
      },
      owedText: {
        color: "#4CAF50",
        fontWeight: "700",
        marginLeft: 4,
      },
      owesText: {
        color: "#FF3B30",
        fontWeight: "700",
        marginLeft: 4,
      },      
      badge: {
        backgroundColor: "#222",
        color: "#fff",
        paddingHorizontal: 6,
        paddingVertical: 4,
      },
    
      // Groups
      cardGroup: {
        marginBottom: 10,
        backgroundColor: "#25202C",
        borderRadius: 12,
      },
      groupTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      groupName: {
        color: "#fff",
        fontWeight: "700",
      },
      groupMembers: {
        color: "#999",
        fontSize: 12,
      },
      budgetRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      mutedText: {
        color: "#999",
      },
      monoText: {
        color: "#fff",
        fontFamily: Platform.OS === "android" ? "monospace" : "Menlo",
        fontWeight: "700",
      },
      progress: {
        height: 8,
        borderRadius: 6,
        marginTop: 8,
        backgroundColor: "#111",
      },
      smallMuted: {
        color: "#999",
        fontSize: 12,
        marginTop: 6,
      },
    
      // Logs
      cardLog: {
        marginBottom: 10,
        backgroundColor: "#25202C",
        borderRadius: 12,
      },
      logRow: {
        flexDirection: "row",
        alignItems: "center",
      },
});

export default groupSettleStyle;