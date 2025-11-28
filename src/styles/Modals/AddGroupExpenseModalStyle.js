import { StyleSheet } from "react-native";

const getAddGroupExpenseModalStyle = (colors) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: colors.surface, // Dynamic Surface
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 10,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text, // Dynamic Text
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  closeBtn: {
    padding: 8,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  
  /* --- Custom Card Selector Styles --- */
  selectorCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background, // Inset look
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    height: 64,
  },
  selectorLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.tintedThemeColor, // Light Theme Tint
  },
  selectorLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  selectorValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: "600",
    marginTop: 2,
  },
  errorBorder: {
    borderColor: colors.error,
  },

  /* --- Split Section --- */
  splitContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 8,
  },
  splitItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  splitItemSelected: {
    backgroundColor: colors.tintedThemeColor, // Highlight selected item
    borderColor: colors.theme,
    borderWidth: 1,
  },
  splitItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarSelected: {
    backgroundColor: colors.theme,
    borderColor: colors.theme,
  },
  avatarText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "700",
  },
  avatarTextSelected: {
    color: "#FFF", // Text inside selected avatar
  },
  splitName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  splitNameSelected: {
    color: colors.text,
    fontWeight: "600",
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },

  /* --- Buttons --- */
  submitBtn: {
    backgroundColor: colors.theme,
    height: 54,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* --- Calendar Overlay --- */
  calendarOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    width: "85%",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  closeCalendarBtn: {
    padding: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 8,
  },
  closeCalendarText: {
    color: colors.textSecondary,
    fontWeight: "600",
  },
});

export default getAddGroupExpenseModalStyle;