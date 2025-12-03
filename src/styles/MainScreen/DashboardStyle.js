import { StyleSheet, Platform } from "react-native";

const getDashBoardStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    greetingText: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
    },
    userName: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '700',
    },
    profileButton: {
        width: 45,
        height: 45,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.tintedThemeColor,
    },
    profilePlaceholder: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.tintedThemeColor,
    },
    profileInitials: {
        color: colors.theme,
        fontWeight: '700',
    },

    // --- Hero Card ---
    heroCard: {
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.border,
       
    },
    heroIconBg: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.tintedThemeColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroContent: {
        marginTop: 20,
        marginBottom: 10,
    },
    heroLabel: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 6,
    },
    heroValue: {
        color: colors.text,
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    heroFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "rgba(0, 230, 118, 0.1)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    trendText: {
        color: colors.success,
        fontSize: 14,
        fontWeight: '600',
    },

    // --- Stats Grid ---
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    statCard: {
        width: '48%',
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    statLabel: {
        color: colors.textSecondary,
        fontSize: 12,
        marginBottom: 8,
    },
    statValue: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
    miniChartLine: {
        height: 3,
        width: '40%',
        backgroundColor: colors.theme,
        borderRadius: 2,
    },

    // --- Common Sections ---
    sectionContainer: {
        marginBottom: 28,
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
    },
    linkText: {
        color: colors.theme,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 16,
    },

    // --- Goal Card ---
    goalCard: {
        backgroundColor: colors.theme,
        borderRadius: 24,
        padding: 20,
        shadowColor: colors.theme,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    goalIconBg: {
        backgroundColor: "rgba(255,255,255,0.2)",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: '700',
    },
    percentageText: {
        color: "#FFFFFF",
        fontWeight: '700',
        fontSize: 16,
    },
    progressBarContainer: {
        height: 6,
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: 10,
        marginVertical: 16,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: "#9E9E9E",
        borderRadius: 10,
    },
    textMutedSmall: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 12,
        paddingTop: 6
    },

    // --- Transactions ---
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        borderWidth: 1,
        borderColor: colors.border,
    },
    iconCircleSuccess: {
        backgroundColor: "rgba(0, 230, 118, 0.1)",
        borderColor: "rgba(0, 230, 118, 0.2)",
    },
    transactionTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    transactionSub: {
        color: colors.textSecondary,
        fontSize: 12,
    },
    transactionAmount: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    textSuccess: {
        color: colors.success,
    },

    // --- Wishlist ---
    wishlistCard: {
        width: 140,
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 18,
        padding: 14,
        marginRight: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    addWishlistCard: {
        width: 80,
        backgroundColor: "transparent",
        borderRadius: 18,
        padding: 14,
        marginRight: 12,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    addWishlistText: {
        color: colors.textSecondary,
        fontSize: 12,
    },
    wishlistIcon: {
        marginBottom: 12,
    },
    wishlistPercent: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    },
    wishlistName: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    wishlistPrice: {
        color: colors.textSecondary,
        fontSize: 12,
        marginBottom: 12,
    },
    miniProgressBg: {
        height: 4,
        backgroundColor: colors.background,
        borderRadius: 2,
        overflow: 'hidden',
    },
    miniProgressFill: {
        height: '100%',
        backgroundColor: colors.theme,
        borderRadius: 2,
    },

    editIcon: {
        position: "absolute",
        top: 4,
        right: 8,
        padding: 2.5,
        backgroundColor: "#F2F2F2",
        borderRadius: 8,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      progressBarBackground: {
        height: 10,
        borderRadius: 10,
        backgroundColor: "#ddd",
        overflow: "hidden",
        marginTop: 6,
      },     
});

export default getDashBoardStyles;