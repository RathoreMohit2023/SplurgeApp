import React, { useContext } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity } from 'react-native';
import {
  X,
  Car,
  Coffee,
  Film,
  Utensils,
  ShoppingBag,
  Home,
  Lightbulb,
  Signal,
  Fuel,
  Wrench,
  Stethoscope,
  School,
  GraduationCap,
  Shirt,
  Plane,
  Repeat,
  Shield,
  Landmark,
  TrendingUp,
  ShoppingCart,
  Scissors,
  Gift,
  AlertTriangle,
  Baby,
  Dog,
  DollarSign,
} from 'lucide-react-native';

import { ThemeContext } from '../components/ThemeContext';

// API se aane wali sabhi categories ke liye ek comprehensive icon map
const categoryIcons = {
  'Food & Groceries': Utensils,
  'Dining Out': Coffee,
  'Rent / Housing': Home,
  Utilities: Lightbulb,
  'Internet & Mobile Recharge': Signal,
  Transportation: Car,
  Fuel: Fuel,
  'Vehicle Maintenance': Wrench,
  'Health & Medical': Stethoscope,
  'Medicine / Pharmacy': Stethoscope,
  Education: School,
  'School Fees': GraduationCap,
  Shopping: ShoppingBag,
  Clothing: Shirt,
  Entertainment: Film,
  'Travel & Trips': Plane,
  Subscriptions: Repeat,
  Insurance: Shield,
  'Loans & EMIs': Landmark,
  'Investments & Savings': TrendingUp,
  'Household Supplies': ShoppingCart,
  'Personal Care': Scissors,
  'Gifts & Donations': Gift,
  'Emergency Expenses': AlertTriangle,
  'Kids & Childcare': Baby,
  'Pets & Pet Care': Dog,
};

// Date ko format karne ke liye helper function
const formatDate = dateString => {
  if (!dateString) return '';
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let parts = dateString.split(/[-/]/);
  let transactionDate;
  if (parts[0].length === 4) {
    // YYYY-MM-DD format
    transactionDate = new Date(parts[0], parts[1] - 1, parts[2]);
  } else {
    // DD-MM-YYYY format
    transactionDate = new Date(parts[2], parts[1] - 1, parts[0]);
  }

  if (isNaN(transactionDate)) return dateString;

  if (transactionDate.toDateString() === today.toDateString()) return 'Today';
  if (transactionDate.toDateString() === yesterday.toDateString())
    return 'Yesterday';
  return transactionDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const AllTransactionsModal = ({ visible, onClose, data = [] }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor: colors.card,
            padding: 20,
            maxHeight: '75%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'serif',
                fontWeight: '700',
                color: colors.text,
              }}
            >
              All Transactions
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.separator,
                  marginVertical: 8,
                }}
              />
            )}
            renderItem={({ item }) => {
              const IconComponent = categoryIcons[item.category] || DollarSign;
              // Assuming all transactions are debits as type is not provided
              const isCredit = false;

              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: colors.tintedThemeColor,
                        borderRadius: 40,
                      }}
                    >
                      <IconComponent size={18} color={colors.text} />
                    </View>
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'serif',
                          fontWeight: '600',
                          color: colors.text,
                        }}
                        numberOfLines={1}
                      >
                        {item.description}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontFamily: 'serif',
                          color: colors.textSecondary,
                        }}
                      >
                        {item.category} • {formatDate(item.date)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: isCredit ? colors.success : colors.text,
                      marginLeft: 10,
                      fontFamily: 'serif',
                    }}
                  >
                    {isCredit ? '+' : '-'}₹
                    {Number(item.amount).toLocaleString()}
                  </Text>
                </View>
              );
            }}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                <Text style={{ color: colors.textSecondary }}>
                  No transactions found.
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default AllTransactionsModal;
