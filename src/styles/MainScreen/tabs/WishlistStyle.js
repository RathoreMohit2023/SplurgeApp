import { StyleSheet } from "react-native";

const getWishlistStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic Background
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: { 
    color: colors.text, 
    fontSize: 20, 
    fontWeight: "700" 
  },
  addBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.surface, // Changed from #000 to Surface for better Light mode look
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.theme,
  },
  addBtnText: { 
    color: colors.theme, 
    fontWeight: "600" 
  },
  
  card: {
    flexDirection: 'row',
    backgroundColor: colors.tintedThemeColor, // Dynamic tint (e.g., light purple)
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background, // Inset look
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contentContainer: { 
    flex: 1 
  },
  rowBetween: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  name: { 
    color: colors.text, 
    fontSize: 16, 
    fontWeight: "600" 
  },
  price: { 
    color: colors.theme, 
    fontSize: 16, 
    fontWeight: "700" 
  },
  desc: { 
    color: colors.textSecondary, 
    fontSize: 13, 
    marginTop: 4 
  },
  divider: { 
    height: 1, 
    backgroundColor: colors.border, 
    marginVertical: 12 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  status: { 
    color: colors.textDisabled, 
    fontSize: 12, 
    textTransform: 'uppercase', 
    letterSpacing: 1 
  },
  actions: { 
    flexDirection: 'row', 
    gap: 16 
  },
  iconBtn: { 
    opacity: 0.8 
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,   // theme based
    marginBottom: 8,
    textAlign: 'center',
  },
  
  emptySubText: {
    fontSize: 14,
    color: colors.darkPrimary, // softer text
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 240,               // better readable width
  },
  
});

export default getWishlistStyles;