import { StyleSheet } from "react-native";

const getResourceStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic Background
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.background,
    // Optional: Add top padding for Android
    paddingTop: 10, 
  },
  heading: {
    color: colors.text, // Dynamic Text
    fontSize: 32,
    fontWeight: "700",
  },
  subHeading: {
    color: colors.textSecondary, // Dynamic Secondary Text
    fontSize: 15,
    marginTop: 4,
  },
});

export default getResourceStyles;