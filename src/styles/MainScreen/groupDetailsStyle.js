import { StyleSheet, Platform } from "react-native";

const getGroupDetailsStyle = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background, // Dynamic Background
    },
    scrollContainer: {
        paddingHorizontal: 16,
    },

    // --- Header ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: colors.background,
    },
    iconButton: {
        padding: 8,
        backgroundColor: colors.tintedThemeColor,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    headerTitle: {
        color: colors.text, // Dynamic Text
        fontSize: 18,
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },

    // --- Hero Card ---
    heroCard: {
        backgroundColor: colors.theme, // Always Purple
        borderRadius: 24,
        padding: 20,
        marginTop: 10,
        marginBottom: 16,
        shadowColor: colors.theme,
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    heroRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    heroLabel: {
        color: "rgba(255,255,255,0.8)", // Always Light because bg is Purple
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    heroValue: {
        color: "#FFFFFF", // Fixed White
        fontSize: 32,
        fontWeight: '800',
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    circularIcon: {
        backgroundColor: colors.background, // Dynamic: White in Light, Black in Dark
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Progress Container inside Hero
    progressContainer: {
        backgroundColor: colors.background, // Dynamic: Matches circular icon
        borderRadius: 16,
        padding: 12,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressText: {
        color: colors.text, 
        fontSize: 12,
        fontWeight: '600',
    },
    progressBar: {
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.border, 
    },
    totalBudgetLabel: {
        color:  colors.text, 
        fontSize: 11,
        marginTop: 8,
        textAlign: 'right'
    },

    description: {
        color: colors.textSecondary,
        fontSize: 14,
        marginBottom: 20,
        lineHeight: 20,
    },

    // --- Sections ---
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '700',
    },
    smallBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: colors.tintedThemeColor,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.theme,
    },
    smallBtnText: {
        color: colors.theme,
        fontWeight: '600',
        fontSize: 12,
        marginLeft: 4,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: colors.tintedThemeColor,
        borderWidth: 1,
        borderColor: colors.theme,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        gap: 4
    },
    addButtonText: {
        color: colors.theme,
        fontWeight: '600',
        fontSize: 12,
    },

    // --- Members List ---
    listContainer: {
        backgroundColor: colors.tintedThemeColor, // Changed to tintedThemeColor for better Light mode contrast
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: colors.border,
    },
    memberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
    },
    avatarLabel: {
        color: colors.theme,
        fontWeight: '700',
    },
    memberName: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    adminBadge: {
        backgroundColor: colors.tintedThemeColor,
        alignSelf: 'flex-start',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    adminText: {
        color: colors.theme,
        fontSize: 10,
        fontWeight: '700',
    },
    divider: {
        backgroundColor: colors.border,
        height: 1,
    },

    // --- Expenses List ---
    expenseCard: {
        backgroundColor: colors.tintedThemeColor, // Changed to tintedThemeColor
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    expenseIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: colors.border,
    },
    expenseTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    expenseSub: {
        color: colors.textSecondary,
        fontSize: 12,
    },
    expenseAmount: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '700',
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    splitText: {
        color: colors.textSecondary,
        fontSize: 11,
        marginTop: 2,
    },
});

export default getGroupDetailsStyle;