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
        marginBottom: 20,
    },
    greetingText: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: '500',
        fontFamily : 'serif',
    },
    userName: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '700',
        fontFamily : 'serif',
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
        fontFamily : 'serif',
    },
    transactionDetails: {
        // justifyContent: 'space-between',
    },

    // --- Hero Card ---
    heroCard: {
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 24,
        padding: 20,
        marginBottom: 15,
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
        fontFamily : 'serif',
    },
    heroValue: {
        color: colors.text,
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: 0.5,
        fontFamily : 'serif',
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
        fontFamily : 'serif',
    },

    // --- Stats Grid ---
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
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
        fontFamily : 'serif',
    },
    statValue: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
        fontFamily : 'serif',
    },
    miniChartLine: {
        height: 3,
        width: '40%',
        backgroundColor: colors.theme,
        borderRadius: 2,
    },

    // --- Common Sections ---
    sectionContainer: {
        marginBottom: 20,
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
        fontFamily : 'serif',
    },
    linkButton: {
        borderWidth: 1,
        borderColor: colors.theme,
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    linkText: {
        color: colors.theme,
        fontSize: 14,
        fontWeight: '600',
        fontFamily : 'serif',
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
        fontFamily : 'serif',
    },
    percentageText: {
        color: "#FFFFFF",
        fontWeight: '700',
        fontSize: 16,
        fontFamily : 'serif',
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
        backgroundColor: colors.orange,
        borderRadius: 10,
    },
    textMutedSmall: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 12,
        paddingTop: 6,
        fontFamily : 'serif',
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
        backgroundColor: colors.tintedThemeColor,
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
        fontFamily : 'serif',
    },
    transactionSub: {
        color: colors.textSecondary,
        fontSize: 12,
        fontFamily : 'serif',
    },
    transactionAmount: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        fontFamily : 'serif',
        // fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    textSuccess: {
        color: colors.success,
        fontFamily : 'serif',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,

    },
    emptyText: {
        color: colors.textSecondary,
        fontSize: 15,
        fontFamily : 'serif',
    },

    // --- Wishlist ---
    wishlistCard: {
        width: 140,
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 18,
        padding: 14,
        marginRight: 12,
        borderWidth: 1,
        borderColor: colors.theme,
    },
    addWishlistCard: {
        width: 80,
        backgroundColor: "transparent",
        borderRadius: 18,
        padding: 14,
        marginRight: 12,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    addWishlistText: {
        color: colors.theme,
        fontSize: 12,
        fontFamily : 'serif',
    },
    wishlistIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 12,
    },
    wishlistPercent: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '600',
        fontFamily : 'serif',
    },
    wishlistName: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        fontFamily : 'serif',
    },
    wishlistPrice: {
        color: colors.theme,
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 12,
        fontFamily : 'serif',
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