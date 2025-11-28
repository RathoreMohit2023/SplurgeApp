import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { 
  X, 
  User, 
  Calendar as CalendarIcon, 
  ChevronDown, 
  Check, 
} from "lucide-react-native";

import CustomInput from "../components/CustomInput"; 
import SelectionModal from "../components/SelectionModal"; 
import getAddGroupExpenseModalStyle from "../styles/Modals/AddGroupExpenseModalStyle"; // Style Function
import { ThemeContext } from "../components/ThemeContext"; // Context Import
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddGroupExpenseModal = ({
  visible,
  onClose,
  onSubmit,
  groupMembers = [], 
  currentUser = { id: '1', name: 'You' } 
}) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getAddGroupExpenseModalStyle(colors), [colors]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(currentUser.name);
  const [splitAmong, setSplitAmong] = useState([]); 
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showPayerModal, setShowPayerModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (visible && groupMembers.length > 0) {
      setSplitAmong(groupMembers.map((m) => m.id));
    }
  }, [visible, groupMembers]);

  const validate = () => {
    let tempErrors = {};
    if (!description) tempErrors.description = "What is this for?";
    if (!amount) tempErrors.amount = "How much was it?";
    if (!paidBy) tempErrors.paidBy = "Required";
    if (splitAmong.length === 0) tempErrors.split = "Select at least one person";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSubmit({ description, amount: parseFloat(amount), paidBy, splitAmong, date });
    resetForm();
  };

  const resetForm = () => {
    setDescription("");
    setAmount("");
    setPaidBy(currentUser.name);
    setDate(new Date().toISOString().split('T')[0]);
    setErrors({});
    onClose();
  };

  const toggleSplit = (id) => {
    if (splitAmong.includes(id)) {
      setSplitAmong(splitAmong.filter((item) => item !== id));
    } else {
      setSplitAmong([...splitAmong, id]);
    }
  };

  const handlePayerSelect = (name) => {
    setPaidBy(name);
    setErrors((prev) => ({ ...prev, paidBy: null }));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={resetForm}
      statusBarTranslucent={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
            enableOnAndroid={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.overlay}
          >
          <View style={styles.modalContainer}>
            
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Add Group Expense</Text>
                <Text style={styles.subtitle}>Track shared costs</Text>
              </View>
              <TouchableOpacity onPress={resetForm} style={styles.closeBtn}>
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              
              <View style={styles.inputWrapper}>
                <CustomInput
                  label="Description"
                  placeholder="e.g. Dinner at Mario's"
                  value={description}
                  onChangeText={(text) => {
                    setDescription(text);
                    if(errors.description) setErrors({...errors, description: null});
                  }}
                  leftIcon="text"
                  error={errors.description}
                />
              </View>

              <View style={styles.inputWrapper}>
                <CustomInput
                  label="Total Amount"
                  placeholder="0.00"
                  value={amount}
                  onChangeText={(text) => {
                    setAmount(text);
                    if(errors.amount) setErrors({...errors, amount: null});
                  }}
                  keyboardType="numeric"
                  leftIcon="currency-inr"
                  error={errors.amount}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Paid By</Text>
                <TouchableOpacity 
                  style={[styles.selectorCard, errors.paidBy && styles.errorBorder]}
                  onPress={() => setShowPayerModal(true)}
                  activeOpacity={0.7}
                >
                  <View style={styles.selectorLeft}>
                    <View style={styles.iconBadge}>
                       <User size={20} color={colors.theme} /> 
                    </View>
                    <View>
                      <Text style={styles.selectorLabel}>Payer</Text>
                      <Text style={styles.selectorValue}>{paidBy}</Text>
                    </View>
                  </View>
                  <ChevronDown size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Split Among</Text>
                <View style={styles.splitContainer}>
                  {groupMembers.map((member) => {
                    const isSelected = splitAmong.includes(member.id);
                    return (
                      <TouchableOpacity
                        key={member.id}
                        style={[styles.splitItem, isSelected && styles.splitItemSelected]}
                        onPress={() => toggleSplit(member.id)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.splitItemLeft}>
                            <View style={[styles.avatarPlaceholder, isSelected && styles.avatarSelected]}>
                                <Text style={[
                                    styles.avatarText, 
                                    isSelected && styles.avatarTextSelected
                                ]}>
                                    {member.name.charAt(0)}
                                </Text>
                            </View>
                            <Text style={[styles.splitName, isSelected && styles.splitNameSelected]}>
                                {member.id === currentUser.id ? "You" : member.name}
                            </Text>
                        </View>
                        {isSelected && <Check size={16} color={colors.theme} />}
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {errors.split && <Text style={styles.errorText}>{errors.split}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity 
                  style={styles.selectorCard}
                  onPress={() => setShowCalendar(true)}
                  activeOpacity={0.7}
                >
                  <View style={styles.selectorLeft}>
                    <View style={styles.iconBadge}>
                       <CalendarIcon size={20} color={colors.theme} /> 
                    </View>
                    <View>
                      <Text style={styles.selectorLabel}>Transaction Date</Text>
                      <Text style={styles.selectorValue}>{date}</Text>
                    </View>
                  </View>
                  <ChevronDown size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
                <Text style={styles.submitBtnText}>Add Expense</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>

      <SelectionModal
        visible={showPayerModal}
        onClose={() => setShowPayerModal(false)}
        onSelect={handlePayerSelect}
        data={groupMembers.map((m) => m.name)}
        title="Who paid?"
        selectedItem={paidBy}
      />

      <Modal
        transparent={true}
        visible={showCalendar}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.calendarOverlay}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => {
                setDate(day.dateString);
                setShowCalendar(false);
              }}
              markedDates={{
                [date]: { selected: true, selectedColor: colors.theme },
              }}
              theme={{
                backgroundColor: colors.surface,
                calendarBackground: colors.surface,
                dayTextColor: colors.text,
                monthTextColor: colors.text,
                arrowColor: colors.theme,
                todayTextColor: colors.theme,
                textDisabledColor: colors.textDisabled || colors.border,
                selectedDayBackgroundColor: colors.theme,
                selectedDayTextColor: "#ffffff",
              }}
            />
            <TouchableOpacity
              style={styles.closeCalendarBtn}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeCalendarText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </Modal>
  );
};

export default AddGroupExpenseModal;