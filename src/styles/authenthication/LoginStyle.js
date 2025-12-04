import { StyleSheet } from 'react-native';

const getLoginStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background, // Dynamic Background
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 24,
      paddingVertical: 40,
    },
    logo: {
      width: 140,
      height: 120,
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text, // Dynamic Text
      marginBottom: 8,
    },
    tagline: {
      fontSize: 16,
      color: colors.textSecondary, // Dynamic Secondary Text
      marginBottom: 40,
    },
    formContainer: {
      width: '100%',
    },
    forgotContainer: {
        alignSelf: "flex-end",
        marginBottom: 24,
    },
    forgotText: {
        color: colors.theme, // Dynamic Theme Color
        fontWeight: "600",
        fontSize: 14,
    },
    rowBetween: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
      marginTop: 10,
    },
    
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    
    rememberText: {
      color: colors.text,
      fontSize: 14,
      marginLeft: 8,
    },
    
    primaryBtn: {
      backgroundColor: colors.theme,
      height: 56,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      elevation: 5,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    primaryBtnText: {
      color: '#fff', // Button text always white usually
      fontSize: 18,
      fontWeight: 'bold',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border, // Dynamic Border
    },
    dividerText: {
      marginHorizontal: 10,
      color: colors.textDisabled, // Placeholder/Disabled color
      fontSize: 12,
    },
    googleBtn: {
      backgroundColor: colors.surface, // Surface color for cards/buttons
      height: 56,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors.border,
    },
    googleBtnText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    signUpText: {
      color: colors.theme,
      fontWeight: 'bold',
      fontSize: 14,
    },
    loaderContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    },
    loader: {
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: Colors.black_bg_Theme,
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      // elevation: 6,
      // borderWidth: 1,
      // borderColor: '#333',
    },
  });

export default getLoginStyle;
