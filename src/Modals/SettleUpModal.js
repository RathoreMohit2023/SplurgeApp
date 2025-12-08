import React, { useState, useContext, useEffect, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import { X, CheckCircle2, ArrowRight } from "lucide-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomInput from "../components/CustomInput";
import getSettleUpModalStyle from "../styles/Modals/SettleUpModalStyle";
import { ThemeContext } from "../components/ThemeContext";

const SettleUpModal = ({ visible, onClose, onSave, friend }) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getSettleUpModalStyle(colors), [colors]);

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (visible && friend) {
      const debtAmount = friend.owes > 0 ? friend.owes : friend.owed;
      setAmount(debtAmount.toString());
      setNote("Settling up");
    }
  }, [visible, friend]);

  const handleSave = () => {
    if (!amount) return;

    onSave({
      friendId: friend.id,
      amount: parseFloat(amount),
      note,
      date: new Date().toISOString(),
    });
    
    setAmount("");
    setNote("");
    onClose();
  };

  if (!friend) return null;

  const paymentDirection = friend.owed > 0 ? "paying" : "receiving";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>

{/* Header */}
<View style={styles.modalHeader}>
  <Text style={styles.modalTitle}>Settle Up</Text>
  <TouchableOpacity onPress={onClose}>
    <X size={22} color={colors.text} />
  </TouchableOpacity>
</View>

{/* Scrollable Content */}
<KeyboardAwareScrollView
  enableOnAndroid={true}
  extraScrollHeight={20}
  keyboardShouldPersistTaps="handled"
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.scrollContent}
  style={{ flexGrow: 0 }}
>
  <View style={styles.contextHeader}>
    <View style={styles.contextRow}>
      <Text style={styles.contextText}>
        {paymentDirection === "paying" ? "You" : friend.fullname}
      </Text>
      <ArrowRight size={16} color={colors.textSecondary} style={styles.arrowIcon} />
      <Text style={styles.contextText}>
        {paymentDirection === "paying" ? friend.fullname : "You"}
      </Text>
    </View>
    <Text style={styles.contextSubText}>
      {paymentDirection === "paying"
        ? `You are paying ${friend.fullname}`
        : `${friend.fullname} is paying you`}
    </Text>
  </View>

  <View style={styles.form}>
    <CustomInput
      label="Amount"
      value={amount}
      onChangeText={setAmount}
      keyboardType="numeric"
      leftIcon="currency-inr"
    />

    <CustomInput
      label="Note (Optional)"
      value={note}
      onChangeText={setNote}
      leftIcon="text"
    />
  </View>
</KeyboardAwareScrollView>

{/* FIXED BUTTON — Always inside modal */}
<TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
  <CheckCircle2 size={20} color="#FFF" style={styles.checkIcon} />
  <Text style={styles.saveBtnText}>Record Payment</Text>
</TouchableOpacity>

</View>

      </View>
    </Modal>
  );
};

export default SettleUpModal;