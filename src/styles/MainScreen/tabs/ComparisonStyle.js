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
    color: "#B89600",
    fontWeight: "700", 
    fontSize: 14, 
    textTransform: "uppercase",
    fontFamily: 'serif',
  },
  heroText: { 
    color: colors.textSecondary, 
    fontSize: 16, 
    lineHeight: 24 ,
    fontFamily: 'serif',
  },
  heroHighlight: {
    color: colors.text,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  
  sectionTitle: { 
    color: colors.text, 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 16 ,
    fontFamily: 'serif',
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
    fontWeight: "600" ,
    fontFamily: 'serif',
  },
  itemPrice: { 
    color: colors.textSecondary, 
    fontSize: 12, 
    marginTop: 4 ,
    fontFamily: 'serif',
  },
  
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  badgeText: {
    fontWeight: "700",
    fontSize: 12,
    fontFamily: 'serif',
  }
});

export default getComparisonStyles;