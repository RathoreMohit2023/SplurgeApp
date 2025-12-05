import React, { useState, useContext, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import {
  TrendingDown, Wallet, Coffee, Target, DollarSign, Car, Film, Utensils, ShoppingBag,
  Home, Lightbulb, Signal, Fuel, Wrench, Stethoscope, School, GraduationCap, Shirt,
  Plane, Repeat, Shield, Landmark, TrendingUp, ShoppingCart, Scissors, Gift,
  AlertTriangle, Baby, Dog, ArrowUpRight,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import getDashBoardStyles from '../../styles/MainScreen/DashboardStyle';
import { ThemeContext } from '../../components/ThemeContext';
import AddWishListModal from '../../Modals/AddWishListModal';
import AllTransactionsModal from '../../Modals/AllTransactionsModal';
import AddGoalModal from '../../Modals/AddMonthalyGoal';
import ToastMessage from '../../components/ToastMessage';
import { GetUserDetailsApi } from '../../Redux/Api/GetUserDetailsApi';
import { GetCategoriesApi } from '../../Redux/Api/GetCategoriesApi';
import { GetWishlistApi } from '../../Redux/Api/GetWishlistApi';
import { AddWishlistApi } from '../../Redux/Api/AddWishlistApi';
import { GetTransectionApi } from '../../Redux/Api/GetTransectionApi';
import { GetMonthlyBudgetApi } from '../../Redux/Api/GetMonthlyBudgetApi';
import { AddMonthlyBudgetApi } from '../../Redux/Api/AddMonthlyBudgetApi';
import { EditMonthlyBudgetApi } from '../../Redux/Api/EditMonthlyBudgetApi';
import { GetFriendsApi } from '../../Redux/Api/GetFriendsApi';
import { GetvideoApi } from '../../Redux/Api/GetVideoApi';
import { GetFounderApi } from '../../Redux/Api/GetFounderApi';
import { GetArticleApi } from '../../Redux/Api/GetArticleApi';
import { GetGroupsApi } from '../../Redux/Api/GetGroupsAPi';

const categoryIcons = {
  'Food & Groceries': Utensils, 'Dining Out': Coffee, 'Rent / Housing': Home,
  'Utilities': Lightbulb, 'Internet & Mobile Recharge': Signal, 'Transportation': Car,
  'Fuel': Fuel, 'Vehicle Maintenance': Wrench, 'Health & Medical': Stethoscope,
  'Medicine / Pharmacy': Stethoscope, 'Education': School, 'School Fees': GraduationCap,
  'Shopping': ShoppingBag, 'Clothing': Shirt, 'Entertainment': Film,
  'Travel & Trips': Plane, 'Subscriptions': Repeat, 'Insurance': Shield,
  'Loans & EMIs': Landmark, 'Investments & Savings': TrendingUp, 'Household Supplies': ShoppingCart,
  'Personal Care': Scissors, 'Gifts & Donations': Gift, 'Emergency Expenses': AlertTriangle,
  'Kids & Childcare': Baby, 'Pets & Pet Care': Dog,
};

const DashBoardScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getDashBoardStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const [showTransactions, setShowTransactions] = useState(false);
  const [wishlistModal, setWishlistModal] = useState(false);
  const [goalModalVisible, setGoalModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const { LoginData } = useSelector(state => state.Login);
  const { GetWishlistData } = useSelector(state => state.GetWishlist);
  const { GetTransactionData } = useSelector(state => state.GetTransaction);
  const { GetMonthlyBudgetData } = useSelector(state => state.GetMonthlyBudget);

  const fetchApi = () => {
    if (LoginData?.token && LoginData?.user?.id) {
      const token = LoginData.token;
      const userId = LoginData.user.id;
      dispatch(GetUserDetailsApi(token));
      dispatch(GetCategoriesApi(token));
      dispatch(GetWishlistApi({ token, id: userId }));
      dispatch(GetTransectionApi({ token, id: userId }));
      dispatch(GetMonthlyBudgetApi({ token, id: userId }));
      dispatch(GetFriendsApi({ token, id: userId }));
      dispatch(GetGroupsApi({ token, id: userId }));
      dispatch(GetvideoApi(token));
      dispatch(GetFounderApi(token));
    }
  };

  useEffect(() => {
    fetchApi();
  }, [LoginData]);
  
  const allTransactions = GetTransactionData?.get_transactions || [];

  // --- DYNAMIC CALCULATIONS ---
  const dynamicStats = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const daysInMonthSoFar = now.getDate();
    const currentMonthName = now.toLocaleString('default', { month: 'short' });

    const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthYear = prevMonthDate.getFullYear();
    const prevMonth = prevMonthDate.getMonth();

    const currentMonthTxns = allTransactions.filter(t => {
      const txnDate = new Date(t.date);
      return txnDate.getFullYear() === currentYear && txnDate.getMonth() === currentMonth;
    });
    const prevMonthTxns = allTransactions.filter(t => {
      const txnDate = new Date(t.date);
      return txnDate.getFullYear() === prevMonthYear && txnDate.getMonth() === prevMonth;
    });

    const totalSpentThisMonth = currentMonthTxns.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    const totalSpentLastMonth = prevMonthTxns.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
    
    const dailyAverage = daysInMonthSoFar > 0 ? totalSpentThisMonth / daysInMonthSoFar : 0;
    const weeklyAverage = dailyAverage * 7;

    let percentageChange = 0;
    if (totalSpentLastMonth > 0) {
      percentageChange = ((totalSpentThisMonth - totalSpentLastMonth) / totalSpentLastMonth) * 100;
    } else if (totalSpentThisMonth > 0) {
      percentageChange = 100;
    }

    return {
      totalSpentThisMonth,
      dailyAverage,
      weeklyAverage,
      percentageChange,
      currentMonthName,
      currentMonthTxns, // Return current month transactions to be used later
    };
  }, [allTransactions]);

  // --- GOAL LOGIC ---
  const isDateInCurrentMonth = (dateString) => {
    if (!dateString) return false;
    const goalDate = new Date(dateString);
    const now = new Date();
    return goalDate.getFullYear() === now.getFullYear() && goalDate.getMonth() === now.getMonth();
  };
  
  const goalDataFromApi = GetMonthlyBudgetData?.data;
  const isGoalForCurrentMonth = isDateInCurrentMonth(goalDataFromApi?.created_at);
  const goalData = isGoalForCurrentMonth ? goalDataFromApi : null;
  const hasGoal = !!goalData;
  const goalAmount = parseFloat(goalData?.amount || 0);
  const percentage = goalAmount > 0 ? (dynamicStats.totalSpentThisMonth / goalAmount) * 100 : 0;
  const remaining = goalAmount - dynamicStats.totalSpentThisMonth;

  // --- CORRECTED: Recent transactions now uses the filtered list ---
  const recentTransactions = dynamicStats.currentMonthTxns.slice(0, 4);

  const handleAddItem = async (newItem) => {
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('user_id', LoginData?.user?.id);
    formData.append('name', newItem.name);
    formData.append('price', newItem.price);
    formData.append('description', newItem.description);
    try {
      const result = await dispatch(AddWishlistApi({ formData, token })).unwrap();
      if (result?.status) {
        setToastMsg(result.message || "Item added successfully!");
        setWishlistModal(false);
        fetchApi();
      } else {
        setToastMsg(result.message || "Failed to add item.");
      }
    } catch (error) {
      setToastMsg("Something went wrong. Please try again.");
    } finally {
      setToastVisible(true);
    }
  };
  
  const handleSaveGoal = async (data) => {
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('user_id', LoginData?.user?.id);
    formData.append('amount', data.amount);
    try {
      const result = await dispatch(AddMonthlyBudgetApi({ formData, token })).unwrap();
      if (result?.status) {
        setToastMsg(result.message || 'Goal set successfully!');
        setGoalModalVisible(false);
        fetchApi();
      } else {
        setToastMsg(result.message || 'Failed to set goal.');
      }
    } catch (error) {
      setToastMsg('An error occurred while saving the goal.');
    } finally {
      setToastVisible(true);
    }
  };

  const handleEditGoal = async (data) => {
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('amount', data.amount);
    try {
      const result = await dispatch(EditMonthlyBudgetApi({ formData, token, id: data?.id })).unwrap();
      if (result?.status) {
        setToastMsg(result.message || 'Goal updated successfully!');
        setGoalModalVisible(false);
        fetchApi();
      } else {
        setToastMsg(result.message || 'Failed to update goal.');
      }
    } catch (error) {
      setToastMsg('An error occurred while updating the goal.');
    } finally {
      setToastVisible(true);
    }
  };

  const openGoalModal = (edit = false) => {
    setIsEditMode(edit);
    setGoalModalVisible(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    let parts = dateString.split(/[-/]/);
    let transactionDate;
    if (parts[0].length === 4) transactionDate = new Date(parts[0], parts[1] - 1, parts[2]);
    else transactionDate = new Date(parts[2], parts[1] - 1, parts[0]);
    if (isNaN(transactionDate)) return dateString;
    if (transactionDate.toDateString() === today.toDateString()) return 'Today';
    if (transactionDate.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return transactionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const wishlistItems = GetWishlistData?.get_wishlists || [];
  
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
    >
      <StatusBar barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Good Morning,</Text>
          <Text style={styles.userName}>{LoginData?.user?.fullname || "User"}</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("PersonalInfoScreen")}>
          <View style={styles.profilePlaceholder}><Text style={styles.profileInitials}>{LoginData?.user?.fullname?.charAt(0)?.toUpperCase() || "U"}</Text></View>
        </TouchableOpacity>
      </View> 

      <View style={styles.heroCard}>
        <View style={styles.rowBetween}><View style={styles.heroIconBg}><Wallet size={20} color={colors.theme} /></View></View>
        <View style={styles.heroContent}>
          <Text style={styles.heroLabel}>Total Spent ({dynamicStats.currentMonthName})</Text>
          <Text style={styles.heroValue}>₹{dynamicStats.totalSpentThisMonth?.toLocaleString()}</Text>
        </View>
        <View style={styles.heroFooter}>
          <View style={styles.trendBadge}>
            {dynamicStats.percentageChange >= 0 ? 
              <TrendingUp size={14} color={colors.error} /> : 
              <TrendingDown size={14} color={colors.success} />
            }
            <Text style={[styles.trendText, {color: dynamicStats.percentageChange >= 0 ? colors.error : colors.success}]}>
              {` ${Math.abs(dynamicStats.percentageChange).toFixed(0)}% vs last month`}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Weekly Avg</Text>
          <Text style={styles.statValue}>₹{dynamicStats.weeklyAverage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
          <View style={styles.miniChartLine} />
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Daily Avg</Text>
          <Text style={styles.statValue}>₹{dynamicStats.dailyAverage.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
          <View style={[styles.miniChartLine, { opacity: 0.5 }]} />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Main Goal</Text>
          <TouchableOpacity style={styles.linkButton} onPress={() => openGoalModal(hasGoal)}>
            <Text style={styles.linkText}>{hasGoal ? "Edit Goal" : "Add Goal"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.goalCard}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <View style={styles.goalIconBg}><Target size={20} color="#FFF" /></View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.cardTitle}>Monthly Budget</Text>
                <Text style={styles.textMutedSmall}>Target: ₹{goalAmount > 0 ? goalAmount.toLocaleString() : 'Not Set'}</Text>
              </View>
            </View>
            <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>
          </View>
          <View style={styles.progressBarBackground}><View style={[styles.progressBarFill, { width: `${Math.min(percentage, 100)}%` }]} /></View>
          <View style={styles.rowBetween}>
            <Text style={styles.textMutedSmall}>Spent: ₹{dynamicStats.totalSpentThisMonth.toLocaleString()}</Text>
            <Text style={styles.textMutedSmall}>Remaining: ₹{Math.max(0, remaining).toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => setShowTransactions(true)}><Text style={styles.linkText}>See All</Text></TouchableOpacity>
        </View>
        {recentTransactions.length > 0 ? (
          recentTransactions.map(item => {
            const IconComponent = categoryIcons[item.category] || DollarSign;
            return (
              <View key={item.id} style={styles.transactionRow}>
                <View style={styles.row}>
                  <View style={styles.iconCircle}><IconComponent size={20} color={colors.theme} /></View>
                  <View style={styles.transactionDetails}><Text style={styles.transactionTitle}>{item.description}</Text><Text style={styles.transactionSub}>{item.category} • {formatDate(item.date)}</Text></View>
                </View>
                <Text style={styles.transactionAmount}>-₹{Number(item.amount).toLocaleString()}</Text>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions for this month yet.</Text>
          </View>
        )}
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Wishlist</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
          {wishlistItems.map(item => (
            <View key={item.id} style={styles.wishlistCard}>
              <View style={styles.rowBetween}><View style={styles.wishlistIcon}><Target size={16} color={colors.theme} /><Text style={styles.wishlistPrice}>₹{parseFloat(item.price).toLocaleString()}</Text></View></View>
              <Text style={styles.wishlistName} numberOfLines={1}>{item.name}</Text><Text style={styles.wishlistName} numberOfLines={1}>{item.description}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.addWishlistCard} onPress={() => setWishlistModal(true)}><ArrowUpRight size={24} color={colors.theme} /><Text style={styles.addWishlistText}>Add New</Text></TouchableOpacity>
        </ScrollView>
      </View>

      <AddWishListModal visible={wishlistModal} onClose={() => setWishlistModal(false)} onSave={handleAddItem} />
      <AllTransactionsModal visible={showTransactions} onClose={() => setShowTransactions(false)} data={recentTransactions} />
      
      <AddGoalModal
        visible={goalModalVisible}
        onClose={() => setGoalModalVisible(false)}
        onSave={isEditMode ? handleEditGoal : handleSaveGoal}
        initialValues={isEditMode ? goalData : null}
      />

      <ToastMessage visible={toastVisible} message={toastMsg} onHide={() => setToastVisible(false)} />
      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default DashBoardScreen;