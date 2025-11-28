import React, { useState, useContext, useEffect, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { X } from "lucide-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomInput from "../components/CustomInput";
import getWishListModalStyle from "../styles/Modals/AddWishListModalStyle";
import { ThemeContext } from "../components/ThemeContext";

const EditWishListModal = ({ visible, onClose, onSave, itemToEdit }) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getWishListModalStyle(colors), [colors]);

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (visible && itemToEdit) {
      setItemName(itemToEdit.name);
      setPrice(itemToEdit.price.toString());
      setDescription(itemToEdit.description);
    } else if (!visible) {
      setItemName("");
      setPrice("");
      setDescription("");
    }
  }, [visible, itemToEdit]);

  const handleSave = () => {
    if (!itemName || !price || !itemToEdit) return;

    const updatedItem = {
      ...itemToEdit,
      name: itemName,
      price: parseInt(price),
      description: description || "",
    };

    onSave(updatedItem);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { maxHeight: '80%' }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Wishlist Item</Text>
            <TouchableOpacity onPress={onClose}>
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
                onChangeText={text => setPrice(text.replace(/[^0-9]/g, ''))}
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
              <Text style={styles.saveBtnText}>Update Item</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default EditWishListModal;