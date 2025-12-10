import React, { useState, useContext, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';

// Components
import AppHeader from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import DashedLoader from '../../components/DashedLoader';
import MultiSelectionModal from '../../Modals/MultiSelectionModal';
import ImagePickerModal from '../../components/ImagePickerModal';
import { ThemeContext } from '../../components/ThemeContext';

// API
import { EditProfileApi } from '../../Redux/Api/EditProfileApi';
import { GetInterestApi } from '../../Redux/Api/GetInterestApi';
import { Snackbar } from 'react-native-paper';
import { GetUserDetailsApi } from '../../Redux/Api/GetUserDetailsApi';
import { Img_url } from '../../Redux/NWConfig';

const PersonalInfoScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getStyles(colors), [colors]);
  const dispatch = useDispatch();
    const insets = useSafeAreaInsets();

  // Redux State
  const { GetUserDetailsData, GetUserDetailsLoading } = useSelector(
    state => state.GetUserDetails,
  );
  const { LoginData } = useSelector(state => state.Login);
  const { EditProfileLoading } = useSelector(state => state.EditProfile);
  const { GetInterestData } = useSelector(state => state.GetInterest);
  const [snack, setSnack] = useState({ visible: false, message: '' });

  // Local State
  const [profileImage, setProfileImage] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  // Modal States
  const [isInterestModalVisible, setInterestModalVisible] = useState(false);
  const [isImagePickerVisible, setImagePickerVisible] = useState(false); // <--- NEW STATE
  const [clickedInterest, setClickedInterest] = useState(false);

  // Prepare Interest List
  const interestsList =
    GetInterestData?.interests?.map(item => item.interest_name) || [];
  const showSnack = message => setSnack({ visible: true, message });

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    mobile: '',
    location: '',
    bio: '',
    interest: [],
  });

    const fetchInitialData = () => {
      if (LoginData?.token && LoginData?.user?.id) {
        dispatch(GetUserDetailsApi(LoginData.token));
      }
    };


  // Populate Data
  useEffect(() => {
    if (GetUserDetailsData?.user_details?.length > 0) {
      const user = GetUserDetailsData.user_details[0];

      let parsedInterests = [];

      try {
        if (user.interest) {
          let interestValue = user.interest;

          // Parse 1
          if (typeof interestValue === 'string') {
            interestValue = JSON.parse(interestValue);
          }

          // Parse 2
          if (typeof interestValue === 'string') {
            interestValue = JSON.parse(interestValue);
          }

          // If it's array, normalize it
          if (Array.isArray(interestValue)) {
            parsedInterests = interestValue.flatMap(item =>
              typeof item === 'string' && item.includes(',')
                ? item.split(',').map(i => i.trim())
                : item,
            );
          }
        }
      } catch (err) {
        console.log('Error parsing interests:', err);
      }

      setForm({
        fullname: user.fullname || '',
        email: user.email || '',
        mobile: user.mobile || '',
        location: user.location || '',
        bio: user.bio || '',
        interest: parsedInterests,
      });

      if (user.profile_photo) {
        setProfileImage(user.profile_photo);
      }
    }
  }, [GetUserDetailsData]);

  // Fetch Interests
  useEffect(() => {
    if (clickedInterest && GetInterestData?.interests?.length > 0) {
      setInterestModalVisible(true);
    }
  }, [GetInterestData, clickedInterest]);

  // --- Image Handling ---
  const handleImageResponse = response => {
    if (response.didCancel || response.errorMessage) return;

    const asset = response.assets[0];
    setProfileImage(asset.uri);
    setPhotoFile({
      uri: asset.uri,
      type: asset.type,
      name: asset.fileName || `profile_${Date.now()}.jpg`,
    });
  };

  const openCamera = () => {
    launchCamera(
      { mediaType: 'photo', saveToPhotos: true, quality: 0.8 },
      handleImageResponse,
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      handleImageResponse,
    );
  };

  const handleInputChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const token = LoginData?.token;
    const userId = LoginData?.user?.id;
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('fullname', form.fullname);
    formData.append('email', form.email);
    formData.append('mobile', form.mobile);
    formData.append('location', form.location);
    formData.append('bio', form.bio);
    formData.append('interest', JSON.stringify(form.interest));

    

    if (photoFile) {
      formData.append('image', {
        uri:
          Platform.OS === 'android'
            ? photoFile.uri
            : photoFile.uri.replace('file://', ''),
        type: photoFile.type,
        name: photoFile.name,
      });
    }

    try {
      const result = await dispatch(
        EditProfileApi({ formData, token }),
      ).unwrap();
      if (result?.status === true) {   
        showSnack(result?.message);
        fetchInitialData();
        navigation.goBack();
      } else {
        showSnack(result?.message);
        fetchInitialData();
      }
    } catch (error) {
      showSnack('Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <AppHeader
        showThemeToggle={true}
        navigation={navigation}
        showBackButton={true}
        title="Personal Info"
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Image Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder}>
                {profileImage ? (
                  <Image
                    source={{ uri: Img_url + profileImage }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Text style={styles.avatarInitials}>
                    {form.fullname
                      ?.split(' ')
                      .map(n => n[0])
                      .join('')}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.editBadge}
                activeOpacity={0.8}
                onPress={() => setImagePickerVisible(true)} // <--- OPEN MODAL HERE
              >
                <MaterialCommunityIcons name="camera" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <CustomInput
              label="Full Name"
              value={form.fullname}
              onChangeText={text => handleInputChange('fullname', text)}
              leftIcon="account-outline"
            />

            <CustomInput
              label="Email Address"
              value={form.email}
              onChangeText={text => handleInputChange('email', text)}
              leftIcon="email-outline"
              keyboardType="email-address"
            />

            <CustomInput
              label="Phone Number"
              value={form.mobile}
              onChangeText={text => handleInputChange('mobile', text)}
              leftIcon="phone-outline"
              keyboardType="phone-pad"
            />

            <CustomInput
              label="Location"
              value={form.location}
              onChangeText={text => handleInputChange('location', text)}
              leftIcon="map-marker-outline"
            />

            {/* Interest Dropdown */}
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => {
                  setClickedInterest(true);
                  if (interestsList.length === 0) {
                    dispatch(GetInterestApi());
                  } else {
                    setInterestModalVisible(true);
                  }
                }}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={22}
                    color={colors.textSecondary}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={[
                      styles.dropdownText,
                      {
                        color: form.interest.length
                          ? colors.text
                          : colors.textDisabled,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {form.interest.length > 0
                      ? form.interest.join(', ')
                      : 'Select Interests'}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={22}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <CustomInput
              label="Bio"
              value={form.bio}
              onChangeText={text => handleInputChange('bio', text)}
              leftIcon="text-short"
              multiline={true}
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- MODALS --- */}

      {/* 1. Interest Modal */}
      <MultiSelectionModal
        key={interestsList.length}
        visible={isInterestModalVisible}
        title="Choose Interests"
        data={interestsList}
        selectedItems={form.interest}
        onClose={() => setInterestModalVisible(false)}
        onSelect={items => handleInputChange('interest', items)}
      />

      {/* 2. Image Picker Modal (NEW) */}
      <ImagePickerModal
        visible={isImagePickerVisible}
        onClose={() => setImagePickerVisible(false)}
        onCameraPress={openCamera}
        onGalleryPress={openGallery}
      />

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: '' })}
        duration={2000}
        style={{
          backgroundColor: colors.card,
          marginBottom: insets.bottom + 80,
        }}
        theme={{ colors: { inversePrimary: colors.theme } }}
        action={{
          label: 'OK',
          textColor: colors.theme,
          onPress: () => setSnack({ visible: false, message: '' }),
        }}
      >
        <Text style={{ color: colors.text }}>{snack.message}</Text>
      </Snackbar>

      {(GetUserDetailsLoading || EditProfileLoading) && (
        <DashedLoader color={colors.primary} size={100} />
      )}
    </View>
  );
};

const getStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    profileSection: {
      alignItems: 'center',
      marginVertical: 20,
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: 10,
    },
    avatarPlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.theme,
      overflow: 'hidden',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
    },
    avatarInitials: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.textSecondary,
    },
    editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.theme,
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.background,
    },
    formSection: {
      marginTop: 10,
    },
    dropdownContainer: {
      marginBottom: 10,
    },
    dropdownTrigger: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dropdownText: {
      fontSize: 16,
      fontFamily: 'serif',
      flex: 1,
      marginRight: 10,
    },
    saveButton: {
      backgroundColor: colors.theme,
      borderRadius: 12,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 20,
      shadowColor: colors.theme,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    saveButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default PersonalInfoScreen;
