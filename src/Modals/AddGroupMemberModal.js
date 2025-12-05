import React, { useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { X, UserPlus, ChevronDown, User } from "lucide-react-native";

import SelectionModal from '../components/SelectionModal';
import getAddGroupMemberModalStyle from "../styles/Modals/AddGroupMemberModalStyle"; // Import Style Function
import { ThemeContext } from "../components/ThemeContext"; // Import Context

const AddGroupMemberModal = ({ 
  visible, 
  onClose, 
  onSubmit, 
  friends = [] 
}) => {
  const { colors } = useContext(ThemeContext);

  const styles = useMemo(() => getAddGroupMemberModalStyle(colors), [colors]);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectionVisible, setSelectionVisible] = useState(false);
  const [error, setError] = useState("");
  
  const handleAdd = () => {
    if (!selectedFriend) {
      setError("Please select a friend to add.");
      return;
    }
    onSubmit(selectedFriend);
    resetForm();
  };

  const resetForm = () => {
    setSelectedFriend(null);
    setError("");
    onClose();
  };

  const handleSelectName = (name) => {
    const friendObj = friends.find((f) => f.fullname === name);
    if (friendObj) {
      setSelectedFriend(friendObj);
      setError("");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={resetForm}
      statusBarTranslucent={true}
    >
      <View
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Add Member</Text>
              <Text style={styles.subtitle}>Select a friend to join the group</Text>
            </View>
            <TouchableOpacity onPress={resetForm} style={styles.closeBtn}>
              <X size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Select Friend</Text>
            
            <TouchableOpacity
              style={[
                styles.selector, 
                error ? styles.selectorError : null
              ]}
              onPress={() => setSelectionVisible(true)}
              activeOpacity={0.7}
            >
              <View style={styles.selectorLeft}>
                <View style={styles.iconBadge}>
                  <User size={20} color={colors.theme} />
                </View>
                <Text 
                  style={[
                    styles.selectorText, 
                    !selectedFriend && styles.placeholderText
                  ]}
                >
                  {selectedFriend ? selectedFriend.fullname : "Search friends..."}
                </Text>
              </View>
              <ChevronDown size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.cancelBtn} 
              onPress={resetForm}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.addBtn} 
              onPress={handleAdd}
              activeOpacity={0.8}
            >
              <UserPlus size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.addBtnText}>Add Member</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <SelectionModal
        visible={selectionVisible}
        onClose={() => setSelectionVisible(false)}
        title="Select Friend"
        placeholder="Search by name..."
        data={friends?.map(f => f.fullname)}
        onSelect={handleSelectName}
        selectedItem={selectedFriend?.fullname}
      />
    </Modal>
  );
};

export default AddGroupMemberModal;