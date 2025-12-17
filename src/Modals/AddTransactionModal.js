import React, { useState, useContext, useMemo } from "react";
import { View, TouchableOpacity, Modal, Text, KeyboardAvoidingView } from "react-native";
import {
  X,
  ShoppingBag,
  ChevronDown,
  Calendar as CalendarIcon,
  Utensils,
  RotateCcw,
} from "lucide-react-native";
import { Calendar } from "react-native-calendars";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";

import CustomInput from "../components/CustomInput";
import SelectionModal from "../components/SelectionModal";
import getAddTransactionModalStyle from "../styles/Modals/AddTransactionModalStyle";
import { ThemeContext } from "../components/ThemeContext";

const AddTransactionModal = ({ visible, onClose, onSave }) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getAddTransactionModalStyle(colors), [colors]);
  const { GetCategoriesData } = useSelector((state) => state.GetCategories);

  const categoryList = useMemo(() => {
    if (GetCategoriesData?.data && Array.isArray(GetCategoriesData.data)) {
      return GetCategoriesData.data.map((item) => item.category_name);
    }
    return [];
  }, [GetCategoriesData]);

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!desc.trim()) {
      newErrors.desc = "Description is required.";
    }
    if (!amount.trim()) {
      newErrors.amount = "Amount is required.";
    } else if (isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid positive number.";
    }
    if (!category) {
      newErrors.category = "Please select a category.";
    }
    if (!date) {
      newErrors.date = "Please select a date.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const newTxn = {
        id: Date.now().toString(),
        description: desc,
        amount: parseFloat(amount),
        category: category,
        date: date,
        icon: Utensils,
      };
      onSave(newTxn);
      resetFormAndClose();
    }
  };

  const handleReset = () => {
    setDesc("");
    setAmount("");
    setCategory("");
    setDate("");
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
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { maxHeight: '85%' }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>New Transaction</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={handleReset} style={{ marginRight: 15 }}>
                <RotateCcw size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={resetFormAndClose}>
                <X size={22} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

        <KeyboardAvoidingView
               behavior={Platform.OS === "ios" ? "padding" : "padding"}
             >
            <View style={styles.form}>
            <TouchableOpacity
                onPress={() => setCategoryModalVisible(true)}
                style={styles.selectorBtn}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <ShoppingBag size={20} color={colors.theme} style={{ marginRight: 10 }} />
                  <Text style={[styles.selectorText, !category && { color: colors.textDisabled }]}>
                    {category || "Select Category"}
                  </Text>
                </View>
                <ChevronDown size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

              <TouchableOpacity
                onPress={() => setCalendarModalVisible(true)}
                style={styles.selectorBtn}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CalendarIcon size={20} color={colors.theme} style={{ marginRight: 10 }} />
                  <Text style={[styles.selectorText, !date && { color: colors.textDisabled }]}>
                    {date || "Select Date"}
                  </Text>
                </View>
                <ChevronDown size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}

              <CustomInput
                label="Description"
                value={desc}
                onChangeText={(text) => {
                  setDesc(text);
                  if (errors.desc) setErrors((p) => ({ ...p, desc: null }));
                }}
                leftIcon="file-document-outline"
                error={errors.desc}
              />

              <CustomInput
                label="Amount"
                value={amount}
                onChangeText={(text) => {
                  setAmount(text);
                  if (errors.amount) setErrors((p) => ({ ...p, amount: null }));
                }}
                keyboardType="numeric"
                leftIcon="currency-inr"
                error={errors.amount}
              />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save Transaction</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>

      <SelectionModal
        visible={categoryModalVisible}
        onClose={() => setCategoryModalVisible(false)}
        onSelect={(item) => {
          setCategory(item);
          if (errors.category) setErrors((p) => ({ ...p, category: null }));
        }}
        data={categoryList}
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
                if (errors.date) setErrors((p) => ({ ...p, date: null }));
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
                textDisabledColor: colors.textDisabled,
                dotColor: colors.theme,
                selectedDotColor: '#ffffff',
                arrowColor: colors.theme,
                monthTextColor: colors.text,
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