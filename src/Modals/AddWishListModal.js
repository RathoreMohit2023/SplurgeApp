import React, { useState, useContext, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { X, RotateCcw } from "lucide-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomInput from "../components/CustomInput";
import getAddWishListModalStyle from "../styles/Modals/AddWishListModalStyle";
import { ThemeContext } from "../components/ThemeContext";

const AddWishListModal = ({ visible, onClose, onSave }) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getAddWishListModalStyle(colors), [colors]);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!itemName.trim()) {
      newErrors.itemName = "Item Name is required.";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required.";
    } else if (isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Please enter a valid positive number for the price.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const newItem = {
        name: itemName,
        price: parseFloat(price),
        description: description,
      };
      onSave(newItem);
      resetFormAndClose();
    }
  };

  const handleReset = () => {
    setItemName("");
    setPrice("");
    setDescription("");
    setErrors({});
  };

  const resetFormAndClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={resetFormAndClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { maxHeight: '80%' }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add to Wishlist</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={handleReset} style={{ marginRight: 15 }}>
                <RotateCcw size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={resetFormAndClose}>
                <X size={22} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={styles.form}>
              <CustomInput
                label="Item Name"
                value={itemName}
                onChangeText={(text) => {
                  setItemName(text);
                  if (errors.itemName) {
                    setErrors(prev => ({ ...prev, itemName: null }));
                  }
                }}
                leftIcon="file-document-outline"
                error={errors.itemName}
              />
              <CustomInput
                label="Price"
                value={price}
                onChangeText={(text) => {
                  setPrice(text);
                  if (errors.price) {
                    setErrors(prev => ({ ...prev, price: null }));
                  }
                }}
                keyboardType="numeric"
                leftIcon="currency-inr"
                error={errors.price}
              />
              <CustomInput
                label="Description"
                value={description}
                onChangeText={(text) => {
                    setDescription(text)
                    if (errors.description) {
                        setErrors(prev => ({ ...prev, description: null }));
                    }
                }}
                leftIcon="text"
                error={errors.description}
              />
            </View>

            <TouchableOpacity style={[styles.saveBtn, { marginTop: 20 }]} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save Item</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddWishListModal;