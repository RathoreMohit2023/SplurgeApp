import { StyleSheet } from "react-native";

const getLedgerStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic Background
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.tintedThemeColor, // Card color (White in Light, Dark Grey in Dark)
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    // Shadow for Light Mode depth
   
  },
  summaryLabel: { 
    color: colors.textSecondary, 
    fontSize: 14, 
    marginBottom: 4 
  },
  summaryValue: { 
    color: colors.text, 
    fontSize: 32, 
    fontWeight: "700" 
  },
  addButton: {
    backgroundColor: colors.theme,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.tintedThemeColor, // Consistent card background
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  leftSection: { 
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1 
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.background, // Inset look (Darker than card in Light mode)
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textInfo: { 
    flex: 1 
  },
  itemTitle: { 
    color: colors.text, 
    fontSize: 16, 
    fontWeight: "600" 
  },
  itemSub: { 
    color: colors.textSecondary, 
    fontSize: 12, 
    marginTop: 2 
  },
  amountText: { 
    color: colors.text, 
    fontSize: 16, 
    fontWeight: "700" 
  },
});

export default getLedgerStyles;