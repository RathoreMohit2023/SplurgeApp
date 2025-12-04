import { StyleSheet } from "react-native";

const getAddWishListModalStyle = (colors) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    fontFamily: 'serif',
  },
  form: {
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: colors.theme,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    elevation: 2,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: 'serif',
  },
});

export default getAddWishListModalStyle;