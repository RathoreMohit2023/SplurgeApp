import React, { useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppHeader from '../../components/Header';
import getPersonalInfoStyle from "../../styles/MainScreen/PersonalInfoStyle";
import { ThemeContext } from "../../components/ThemeContext";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const PersonalInfoScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getPersonalInfoStyle(colors), [colors]);
  const [profileImage, setProfileImage] = useState(null);

  const insets = useSafeAreaInsets();

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.8,
    };
  
    launchCamera(options, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) return;
  
      const uri = response.assets[0].uri;
      setProfileImage(uri);
    });
  };
  
  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) return;
      if (response.errorMessage) return;
  
      const uri = response.assets[0].uri;
      setProfileImage(uri);
    });
  };

  const openImagePickerOptions = () => {
    Alert.alert(
      "Select Option",
      "Choose a method to upload your profile photo",
      [
        {
          text: "Open Camera",
          onPress: openCamera
        },
        {
          text: "Open Gallery",
          onPress: openGallery
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };  
  
  const [form, setForm] = useState({
    name: "Arjun Patel",
    email: "arjun.patel@gmail.com",
    phone: "+91 98765 43210",
    location: 'San Francisco, CA',
    bio: 'Digital nomad & tech enthusiast.',
  });

  const [interests, setInterests] = useState(['Finance', 'Technology', 'Travel']);
  const [currentInterest, setCurrentInterest] = useState('');

  const handleAddInterest = () => {
    if (currentInterest.trim().length > 0) {
      setInterests([...interests, currentInterest.trim()]);
      setCurrentInterest('');
    }
  };

  const handleRemoveInterest = (indexToRemove) => {
    setInterests(interests.filter((_, index) => index !== indexToRemove));
  };

  const renderInput = (label, valueKey, icon, placeholder, multiline = false) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, multiline && styles.multilineContainer]}>
        <MaterialCommunityIcons 
          name={icon} 
          size={20} 
          color={colors.textSecondary} 
          style={styles.inputIcon} 
        />
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={form[valueKey]}
          placeholder={placeholder}
          placeholderTextColor={colors.textDisabled}
          onChangeText={(text) => setForm({ ...form, [valueKey]: text })}
          multiline={multiline}
        />
        <MaterialCommunityIcons 
          name="pencil-outline" 
          size={16} 
          color={colors.border} 
        />
      </View>
    </View>
  );

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

              {/* <View style={styles.avatarPlaceholder}>
                 <Text style={styles.avatarInitials}>AJ</Text>
              </View> */}

              <View style={styles.avatarPlaceholder}>
                {profileImage ? (
                  <Image 
                    source={{ uri: profileImage }} 
                    style={styles.avatarImage} 
                  />
                  ) : (
                  <Text style={styles.avatarInitials}>AJ</Text>
                )}
              </View>

              <TouchableOpacity 
                style={styles.editBadge} 
                activeOpacity={0.8}
                onPress={openImagePickerOptions}  
              >
                <MaterialCommunityIcons name="camera" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>{form.name}</Text>
            <Text style={styles.profileEmail}>{form.email}</Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {renderInput('Full Name', 'name', 'account-outline', 'Enter your name')}
            {renderInput('Email Address', 'email', 'email-outline', 'Enter email')}
            {renderInput('Phone Number', 'phone', 'phone-outline', 'Enter phone number')}
            {renderInput('Location', 'location', 'map-marker-outline', 'Enter city')}

            {/* --- Interests Field Start --- */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Interests</Text>
              
              {/* Input Area */}
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons 
                  name="star-outline" 
                  size={20} 
                  color={colors.textSecondary} 
                  style={styles.inputIcon} 
                />
                <TextInput
                  style={styles.input}
                  value={currentInterest}
                  placeholder="Add an interest (e.g. Hiking)"
                  placeholderTextColor={colors.textDisabled}
                  onChangeText={setCurrentInterest}
                  onSubmitEditing={handleAddInterest} // Add on Enter
                />
                <TouchableOpacity onPress={handleAddInterest}>
                  <MaterialCommunityIcons 
                    name="plus-circle" 
                    size={24} 
                    color={colors.theme} 
                  />
                </TouchableOpacity>
              </View>

              {/* Chips Display Area */}
              <View style={styles.chipsContainer}>
                {interests.map((interest, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{interest}</Text>
                    <TouchableOpacity onPress={() => handleRemoveInterest(index)}>
                      <MaterialCommunityIcons 
                        name="close-circle" 
                        size={16} 
                        color={colors.textSecondary} 
                        style={{ marginLeft: 6 }}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            {/* --- Interests Field End --- */}

            {renderInput('Bio', 'bio', 'text-short', 'Tell us about yourself', true)}
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PersonalInfoScreen;