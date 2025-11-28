import { StyleSheet, Platform } from 'react-native';

const getHeaderStyle = colors =>
  StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'android' ? 45 : 55,
      paddingBottom: 15,
      paddingHorizontal: 20,
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.background === '#080808' ? '#252525' : colors.border,
      elevation: 5,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
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
      color: colors.theme, // Dynamic Theme Color
      fontWeight: '600',
      letterSpacing: 0.5,
    },

    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default getHeaderStyle;
