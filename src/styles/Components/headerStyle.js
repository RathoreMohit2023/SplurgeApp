import { StyleSheet, Platform, StatusBar } from 'react-native';

const ANDROID_STATUSBAR = Platform.OS === 'android'
  ? StatusBar.currentHeight || 24
  : 0;

const HEADER_TOP_PADDING = ANDROID_STATUSBAR + 10; // 🔥 fixed & safe
const HEADER_BOTTOM_PADDING = 14;

const getHeaderStyle = colors =>
  StyleSheet.create({
    container: {
      paddingTop: HEADER_TOP_PADDING,
      paddingBottom: HEADER_BOTTOM_PADDING,
      paddingHorizontal: 20,

      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      borderBottomWidth: 1,
      borderBottomColor:
        colors.background === '#080808' ? '#252525' : colors.border,

      elevation: 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },

    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    logo: {
      width: 70,
      height: 45,
      marginRight: 10,
    },

    tagline: {
      fontSize: 14,
      color: colors.theme,
      fontWeight: '600',
      letterSpacing: 0.5,
    },

    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default getHeaderStyle;
