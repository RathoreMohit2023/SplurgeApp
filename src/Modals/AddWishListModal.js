import React, { useState, useContext, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { X } from "lucide-react-native";
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

  const handleSave = () => {
    if (!itemName || !price) return;

    const newItem = {
      id: Date.now().toString(),
      name: itemName,
      price: parseInt(price),
      description: description || "",
    };

    onSave(newItem);
    resetForm();
  };

  const resetForm = () => {
    setItemName("");
    setPrice("");
    setDescription("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={resetForm}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { maxHeight: '80%' }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add to Wishlist</Text>
            <TouchableOpacity onPress={resetForm}>
              <X size={22} color={colors.text} />
            </TouchableOpacity>
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
                onChangeText={setItemName}
                leftIcon="file-document-outline"
              />
              <CustomInput
                label="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                leftIcon="currency-inr"
              />
              <CustomInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                leftIcon="text"
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