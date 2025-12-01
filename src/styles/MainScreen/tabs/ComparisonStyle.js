import { StyleSheet } from "react-native";

const getComparisonStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic Background
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  heroCard: {
    backgroundColor: colors.tintedThemeColor, // Dynamic Tint (Purple tint)
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.theme,
    marginBottom: 14,
  },
  heroHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8, 
    gap: 8 
  },
  heroTitle: { 
    // color: "#FFD700", // Gold color stays for the "Sparkle" effect
    color: "#B89600",
    fontWeight: "700", 
    fontSize: 14, 
    textTransform: "uppercase" 
  },
  heroText: { 
    color: colors.textSecondary, 
    fontSize: 16, 
    lineHeight: 24 
  },
  heroHighlight: {
    color: colors.text, // Important: Changed from #fff to dynamic text
    fontWeight: 'bold',
  },
  
  sectionTitle: { 
    color: colors.text, 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 16 
  },
  
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.tintedThemeColor, // Card background
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emojiBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background, // Inset background
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  centerInfo: { 
    flex: 1 
  },
  itemName: { 
    color: colors.text, 
    fontSize: 16, 
    fontWeight: "600" 
  },
  itemPrice: { 
    color: colors.textSecondary, 
    fontSize: 12, 
    marginTop: 4 
  },
  
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    fontWeight: "700",
    fontSize: 12,
  }
});

export default getComparisonStyles;