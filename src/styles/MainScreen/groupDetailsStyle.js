import { StyleSheet } from "react-native";

const groupDetailsStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
      },
      inner: {
        padding: 16,
      },
    
      headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
      },
      backBtn: {
        padding: 8,
        marginRight: 8,
        backgroundColor: "rgba(255,255,255,0.03)",
        borderRadius: 10,
      },
      titleWrap: {
        flex: 1,
      },
      title: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
      },
      subtitle: {
        color: "#999",
        marginTop: 4,
      },
    
      card: {
        backgroundColor: "#25202C",
        borderRadius: 12,
        marginBottom: 14,
      },
      budgetRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
      },
      budgetLabel: {
        color: "#aaa",
        fontSize: 14,
      },
      budgetValue: {
        color: "#fff",
        fontWeight: "700",
        fontFamily: Platform.OS === "android" ? "monospace" : "Menlo",
      },
      progress: {
        height: 8,
        borderRadius: 6,
        backgroundColor: "#111",
        marginTop: 6,
      },
      budgetMeta: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
      },
      smallMuted: {
        color: "#999",
        fontSize: 12,
      },
    
      section: {
        marginBottom: 14,
      },
      sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
      },
      sectionTitleWrap: {
        flexDirection: "row",
        alignItems: "center",
      },
      sectionTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
      },
      actionBtn: {
        backgroundColor: "#7C3BEC",
      },
    
      list: {
        marginTop: 6,
      },
    
      memberCard: {
        marginBottom: 10,
        backgroundColor: "#25202C",
        borderRadius: 12,
      },
      memberRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      memberLeft: {
        flexDirection: "row",
        alignItems: "center",
      },
      avatar: {
        backgroundColor: "#7C3BEC",
      },
      memberName: {
        color: "#fff",
        fontWeight: "700",
      },
      memberRole: {
        color: "#999",
        fontSize: 12,
      },
      memberRight: {
        alignItems: "flex-end",
        justifyContent: "center",
      },
      badge: {
        backgroundColor: "#222",
        color: "#fff",
        paddingHorizontal: 6,
        paddingVertical: 4,
      },
    
      expenseCard: {
        marginBottom: 10,
        backgroundColor: "#25202C",
        borderRadius: 12,
      },
      expenseRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
      },
      expenseTitle: {
        color: "#fff",
        fontWeight: "700",
      },
      expenseMeta: {
        color: "#999",
        fontSize: 12,
        marginTop: 6,
      },
      expenseRight: {
        alignItems: "flex-end",
        marginLeft: 12,
      },
      expenseAmount: {
        color: "#fff",
        fontWeight: "700",
      },
      expenseSplit: {
        color: "#999",
        fontSize: 12,
        marginTop: 6,
      },
      expenseActions: {
        flexDirection: "row",
        marginTop: 6,
      },
    
      splitInfo: {
        marginTop: 8,
      },
});

export default groupDetailsStyle;