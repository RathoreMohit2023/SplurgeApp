import React, { useState, useContext, useMemo } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, Car, Coffee, Film, Utensils } from 'lucide-react-native';

import AddTransactionModal from '../../../Modals/AddTransactionModal';
import getLedgerStyles from '../../../styles/MainScreen/tabs/LedgerStyle';
import { ThemeContext } from '../../../components/ThemeContext';

const initialTransactions = [
  {
    id: '1',
    description: 'Starbucks',
    amount: 250,
    category: 'Food',
    date: 'Today',
    icon: Coffee,
  },
  {
    id: '2',
    description: 'Dune 2 Ticket',
    amount: 400,
    category: 'Entertainment',
    date: 'Yesterday',
    icon: Film,
  },
  {
    id: '3',
    description: 'Uber Ride',
    amount: 180,
    category: 'Transport',
    date: 'Yesterday',
    icon: Car,
  },
  {
    id: '4',
    description: 'Lunch',
    amount: 350,
    category: 'Food',
    date: 'Jan 16',
    icon: Utensils,
  },
  {
    id: '5',
    description: 'Dinner',
    amount: 850,
    category: 'Food',
    date: 'Jan 15',
    icon: Utensils,
  },
  {
    id: '6',
    description: 'Cinema',
    amount: 500,
    category: 'Entertainment',
    date: 'Jan 14',
    icon: Film,
  },
];

const LedgerTab = () => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getLedgerStyles(colors), [colors]);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const total = transactions.reduce(
    (sum, t) => sum + parseInt(t.amount || 0),
    0,
  );

  const handleAddTransaction = newTxn => {
    setTransactions([newTxn, ...transactions]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total Spent (Week)</Text>
          <Text style={styles.summaryValue}>₹{total.toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        renderItem={({ item }) => {
          const IconComponent = item.icon || Utensils;
          return (
            <View style={styles.itemCard}>
              <View style={styles.leftSection}>
                <View style={styles.iconBox}>
                  <IconComponent size={20} color={colors.theme} />
                </View>
                <View style={styles.textInfo}>
                  <Text style={styles.itemTitle}>{item.description}</Text>
                  <Text style={styles.itemSub}>
                    {item.category} • {item.date}
                  </Text>
                </View>
              </View>
              <Text style={styles.amountText}>₹{item.amount}</Text>
            </View>
          );
        }}
      />

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddTransaction}
      />
    </View>
  );
};

export default LedgerTab;
