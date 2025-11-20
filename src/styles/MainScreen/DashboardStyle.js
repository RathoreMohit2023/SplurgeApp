import { StyleSheet } from "react-native";

const DashboardStyle = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D",
        padding: 16,
      },
      header: { marginBottom: 20 },
      title: { color: "#fff", fontSize: 26, fontWeight: "700" },
      subtitle: { color: "#999", marginTop: 4 },
    
      cardHighlight: {
        backgroundColor: "#1D1D1D",
        padding: 16,  
        borderRadius:  16,
        borderWidth: 1,
        borderColor: "#333",
        marginBottom: 20,
      },
      cardLabel: { color: "#aaa", fontSize: 14 },
      mainValue: { color: "#fff", fontSize: 32, fontWeight: "700", marginVertical: 4 },
    
      row: { flexDirection: "row", alignItems: "center", gap: 8 },
      trendText: { color: "#aaa", fontSize: 12 },
    
      rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      },
    
      cardSmall: {
        backgroundColor: "#1A1A1A",
        width: "48%",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#333",
      },
      smallLabel: { color: "#aaa", fontSize: 12 },
      smallValue: { color: "#fff", fontSize: 22, fontWeight: "700" },
    
      card: {
        backgroundColor: "#1A1A1A",
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#333",
        marginBottom: 20,
      },
    
      cardTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
      textMuted: { color: "#888" },
      textMutedSmall: { color: "#777", fontSize: 12 },
    
      amountMono: {
        color: "#fff",
        fontFamily: "monospace",
        fontWeight: "600",
      },
    
      progressBG: {
        backgroundColor: "#333",
        height: 6,
        borderRadius: 6,
        marginTop: 8,
        overflow: "hidden",
      },
      progressFill: {
        backgroundColor: "#7C3BEC",
        height: 6,
      },
    
      section: { marginBottom: 20 },
      sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginBottom: 12 },
      viewAll: { color: "#7C3BEC", fontSize: 14 },
    
      transactionCard: {
        backgroundColor: "#1A1A1A",
        padding: 16,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#333",
      },
      iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#222",
        justifyContent: "center",
        alignItems: "center",
      },
    
      flex1: { flex: 1 },
      transactionText: { color: "#fff", fontWeight: "600" },
});

export default DashboardStyle;