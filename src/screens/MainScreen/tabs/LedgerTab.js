import React, { useState, useContext, useMemo, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Plus, Car, Coffee, Film, Utensils, ShoppingBag, Home, Lightbulb,
  Signal, Fuel, Wrench, Stethoscope, School, GraduationCap, Shirt,
  Plane, Repeat, Shield, Landmark, TrendingUp, ShoppingCart, Scissors,
  Gift, AlertTriangle, Baby, Dog, DollarSign,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';

import AddTransactionModal from '../../../Modals/AddTransactionModal';
import getLedgerStyles from '../../../styles/MainScreen/tabs/LedgerStyle';
import { ThemeContext } from '../../../components/ThemeContext';
import { AddTransactionApi } from '../../../Redux/Api/AddTransactionApi';
import ToastMessage from '../../../components/ToastMessage';
import DashedLoader from '../../../components/DashedLoader';
import { GetTransectionApi } from '../../../Redux/Api/GetTransectionApi';

const categoryIcons = {
  'Food & Groceries': Utensils,
  'Dining Out': Coffee,
  'Rent / Housing': Home,
  'Utilities': Lightbulb,
  'Internet & Mobile Recharge': Signal,
  'Transportation': Car,
  'Fuel': Fuel,
  'Vehicle Maintenance': Wrench,
  'Health & Medical': Stethoscope,
  'Medicine / Pharmacy': Stethoscope,
  'Education': School,
  'School Fees': GraduationCap,
  'Shopping': ShoppingBag,
  'Clothing': Shirt,
  'Entertainment': Film,
  'Travel & Trips': Plane,
  'Subscriptions': Repeat,
  'Insurance': Shield,
  'Loans & EMIs': Landmark,
  'Investments & Savings': TrendingUp,
  'Household Supplies': ShoppingCart,
  'Personal Care': Scissors,
  'Gifts & Donations': Gift,
  'Emergency Expenses': AlertTriangle,
  'Kids & Childcare': Baby,
  'Pets & Pet Care': Dog,
};

const LedgerTab = () => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getLedgerStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { LoginData } = useSelector(state => state.Login);
  const { GetTransactionData, GetTransactionLoading } = useSelector(state => state.GetTransaction);
  const { AddTransactionLoading } = useSelector(state => state.AddTransaction);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const fetchTransactions = () => {
    if (LoginData?.token && LoginData?.user?.id) {
      dispatch(GetTransectionApi({ token: LoginData.token, id: LoginData.user.id }));
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [LoginData]);

  const transactions = GetTransactionData?.get_transactions || [];

  const total = transactions.reduce(
    (sum, t) => sum + parseFloat(t.amount || 0),
    0,
  );

  const handleAddTransaction = async (newTxn) => {
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('user_id', LoginData?.user?.id);
    formData.append('category', newTxn.category);
    formData.append('amount', newTxn.amount);
    formData.append('description', newTxn.description);
    formData.append('date', newTxn.date);

    try {
      const result = await dispatch(AddTransactionApi({ formData, token })).unwrap();
      if (result?.status === true || result?.status === 'true') {
        setToastMsg(result?.message || 'Transaction added successfully!');
        setModalVisible(false);
        fetchTransactions();
      } else {
        setToastMsg(result?.message || 'Failed to add transaction.');
      }
    } catch (error) {
      console.error('API Catch Error:', error);
      setToastMsg('Something went wrong. Please try again.');
    } finally {
      setToastVisible(true);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let parts = dateString.split(/[-/]/);
    let transactionDate;
    if (parts[0].length === 4) {
      transactionDate = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      transactionDate = new Date(parts[2], parts[1] - 1, parts[0]);
    }
    
    if (isNaN(transactionDate)) return dateString;

    if (transactionDate.toDateString() === today.toDateString()) return 'Today';
    if (transactionDate.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return transactionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const isLoading = GetTransactionLoading || AddTransactionLoading;

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total Spent</Text>
          <Text style={styles.summaryValue}>₹{total.toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        renderItem={({ item }) => {
          // Yahan dynamically category ke basis par icon chuna jaata hai
          const IconComponent = categoryIcons[item.category] || DollarSign;
          return (
            <View style={styles.itemCard}>
              <View style={styles.leftSection}>
                <View style={styles.iconBox}>
                  <IconComponent size={20} color={colors.theme} />
                </View>
                <View style={styles.textInfo}>
                  <Text style={styles.itemTitle}>{item.description}</Text>
                  <Text style={styles.itemSub}>
                    {item.category} • {formatDate(item.date)}
                  </Text>
                </View>
              </View>
              <Text style={styles.amountText}>
                ₹{Number(item.amount).toLocaleString()}
              </Text>
            </View>
          );
        }}
        ListEmptyComponent={!isLoading && (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No transactions yet.</Text>
                <Text style={styles.emptySubText}>Tap the '+' button to add your first one.</Text>
            </View>
        )}
      />

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddTransaction}
      />
      {isLoading && <DashedLoader />}

      <ToastMessage
        visible={toastVisible}
        message={toastMsg}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};

export default LedgerTab;