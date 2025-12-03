import { StyleSheet } from "react-native";

const getPersonalInfoStyle = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Dynamic Background
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  
  // Profile Avatar Styles
  profileSection: {
    alignItems: 'center',
    marginVertical: 25,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.tintedThemeColor, // Light purple tint
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.theme,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    resizeMode: "cover",
  },  
  avatarInitials: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.theme,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.theme,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.background, // Matches bg to create 'cutout' look
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  // Form Styles
  formSection: {
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface, // Changed to Surface for inputs
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
    height: 52,
  },
  multilineContainer: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
    marginTop: 2, 
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    height: '100%',
  },
  multilineInput: {
    textAlignVertical: 'top', 
  },

  // Chip Styles
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8, 
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface, // Surface for chips
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },

  // Button Styles
  saveButton: {
    backgroundColor: colors.theme,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: colors.theme,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFF', // Always white on theme button
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomSheetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  
  sheetButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  
  sheetButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  }
  
});

export default getPersonalInfoStyle;