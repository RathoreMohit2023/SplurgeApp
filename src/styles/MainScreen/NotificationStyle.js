import { StyleSheet } from "react-native";

const getNotificationStyle = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic Background
  },
  
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    backgroundColor: colors.background,
  },
  backBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.surface, // Dynamic Surface
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text, // Dynamic Text
    fontFamily: 'serif',
  },
  
  // Actions
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
    fontFamily: 'serif',
  },

  // List
  listContent: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: 'serif',
  },
  
  // Card
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface, // Dynamic Card
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "flex-start",
  },
  unreadCard: {
    backgroundColor: colors.tintedThemeColor, // Use dynamic tint
    borderColor: "rgba(124, 59, 236, 0.3)", // Keep border subtle
  },
  
  iconContainer: {
    marginRight: 14,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  unreadIconCircle: {
    borderColor: colors.theme,
    backgroundColor: colors.surface,
  },
  
  contentContainer: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
    fontFamily: 'serif',
  },
  unreadTitle: {
    color: colors.text,
    fontWeight: "700",
    fontFamily: 'serif',
  },
  time: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: 'serif',
  },
  message: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'serif',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.theme, // Dynamic dot color
    position: "absolute",
    top: 16,
    right: 16,
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
    fontFamily: 'serif',
  },
  emptySub: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 6,
    fontFamily: 'serif',
  }
});

export default getNotificationStyle;