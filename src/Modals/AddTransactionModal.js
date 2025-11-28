import React, { useState, useContext, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
} from "react-native";
import {
  X,
  ShoppingBag,
  ChevronDown,
  Calendar as CalendarIcon,
  Utensils,
} from "lucide-react-native";
import { Calendar } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import CustomInput from "../components/CustomInput";
import SelectionModal from "../components/SelectionModal";
import getAddTransactionModalStyle from "../styles/Modals/AddTransactionModalStyle";
import { ThemeContext } from "../components/ThemeContext";

const CATEGORIES = ["Food", "Entertainment", "Transport", "Shopping", "Utilities", "Other"];

const AddTransactionModal = ({ visible, onClose, onSave }) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getAddTransactionModalStyle(colors), [colors]);

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

  const handleSave = () => {
    if (!desc || !amount) return;

    const newTxn = {
      id: Date.now().toString(),
      description: desc,
      amount: parseInt(amount),
      category: category || "General",
      date: date || "Today",
      icon: Utensils,
    };

    onSave(newTxn);
    resetForm();
  };

  const resetForm = () => {
    setDesc("");
    setAmount("");
    setCategory("");
    setDate("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={resetForm}
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { maxHeight: '80%' }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Transaction</Text>
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
                label="Description"
                value={desc}
                onChangeText={setDesc}
                leftIcon="file-document-outline"
              />

              <CustomInput
                label="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                leftIcon="currency-inr"
              />

              <TouchableOpacity
                onPress={() => setCategoryModalVisible(true)}
                style={styles.selectorBtn}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ShoppingBag
                    size={20}
                    color={colors.theme}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={[
                      styles.selectorText,
                      !category && { color: colors.textDisabled || colors.textSecondary },
                    ]}
                  >
                    {category || "Select Category"}
                  </Text>
                </View>
                <ChevronDown size={20} color={colors.textSecondary} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setCalendarModalVisible(true)}
                style={styles.selectorBtn}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CalendarIcon
                    size={20}
                    color={colors.theme}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={[
                      styles.selectorText,
                      !date && { color: colors.textDisabled || colors.textSecondary },
                    ]}
                  >
                    {date || "Select Date"}
                  </Text>
                </View>
                <ChevronDown size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.saveBtn, { marginTop: 20 }]} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save Transaction</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </View>

      <SelectionModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        onSelect={(item) => setCategory(item)}
        data={CATEGORIES}
        title="Select Category"
        selectedItem={category}
      />

      <Modal
        transparent={true}
        visible={calendarModalVisible}
        animationType="fade"
        onRequestClose={() => setCalendarModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => {
                setDate(day.dateString);
                setCalendarModalVisible(false);
              }}
              theme={{
                backgroundColor: colors.surface,
                calendarBackground: colors.surface,
                textSectionTitleColor: colors.textSecondary,
                selectedDayBackgroundColor: colors.theme,
                selectedDayTextColor: '#ffffff',
                todayTextColor: colors.theme,
                dayTextColor: colors.text,
                textDisabledColor: colors.textDisabled || '#d9e1e8',
                dotColor: colors.theme,
                selectedDotColor: '#ffffff',
                arrowColor: colors.theme,
                disabledArrowColor: '#d9e1e8',
                monthTextColor: colors.text,
                indicatorColor: colors.theme,
              }}
            />
            <TouchableOpacity
              onPress={() => setCalendarModalVisible(false)}
              style={{ padding: 15, alignItems: "center" }}
            >
              <Text style={{ color: colors.textSecondary }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default AddTransactionModal;