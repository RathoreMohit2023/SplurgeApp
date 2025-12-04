// import React, { useState, useContext, useMemo, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
// import {
//   TrendingDown,
//   Wallet,
//   Coffee,
//   Target,
//   Zap,
//   Navigation,
//   ArrowUpRight, DollarSign,
//   Car, Film, Utensils, ShoppingBag, Home, Lightbulb,
//   Signal, Fuel, Wrench, Stethoscope, School, GraduationCap, Shirt,
//   Plane, Repeat, Shield, Landmark, TrendingUp, ShoppingCart, Scissors,
//   Gift, AlertTriangle, Baby, Dog,
// } from 'lucide-react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useDispatch, useSelector } from 'react-redux';

// import getDashBoardStyles from '../../styles/MainScreen/DashboardStyle';
// import { ThemeContext } from '../../components/ThemeContext';
// import AddWishListModal from '../../Modals/AddWishListModal';
// import AllTransactionsModal from '../../Modals/AllTransactionsModal';
// import { SquarePen } from 'lucide-react-native';
// import  AddGoalModal  from "../../Modals/AddMonthalyGoal";
// import ToastMessage from '../../components/ToastMessage';
// import { GetUserDetailsApi } from '../../Redux/Api/GetUserDetailsApi';
// import { GetCategoriesApi } from '../../Redux/Api/GetCategoriesApi';
// import { GetWishlistApi } from '../../Redux/Api/GetWishlistApi';
// import { AddWishlistApi } from '../../Redux/Api/AddWishlistApi';
// import { GetTransectionApi } from '../../Redux/Api/GetTransectionApi';

// const categoryIcons = {
//   'Food & Groceries': Utensils, 'Dining Out': Coffee, 'Rent / Housing': Home,
//   'Utilities': Lightbulb, 'Internet & Mobile Recharge': Signal, 'Transportation': Car,
//   'Fuel': Fuel, 'Vehicle Maintenance': Wrench, 'Health & Medical': Stethoscope,
//   'Medicine / Pharmacy': Stethoscope, 'Education': School, 'School Fees': GraduationCap,
//   'Shopping': ShoppingBag, 'Clothing': Shirt, 'Entertainment': Film,
//   'Travel & Trips': Plane, 'Subscriptions': Repeat, 'Insurance': Shield,
//   'Loans & EMIs': Landmark, 'Investments & Savings': TrendingUp, 'Household Supplies': ShoppingCart,
//   'Personal Care': Scissors, 'Gifts & Donations': Gift, 'Emergency Expenses': AlertTriangle,
//   'Kids & Childcare': Baby, 'Pets & Pet Care': Dog,
// };

// const DashBoardScreen = ({navigation}) => {
//   const { colors, themeType } = useContext(ThemeContext);
//   const styles = useMemo(() => getDashBoardStyles(colors), [colors]);
//   const insets = useSafeAreaInsets();
//   const dispatch = useDispatch();
//   const [showTransactions, setShowTransactions] = useState(false);
//   const [wishlistModal, setWishlistModal] = useState(false);
//   const [toastVisible, setToastVisible] = useState(false);
//   const [toastMsg, setToastMsg] = useState('');

//   const { LoginData } = useSelector(state => state.Login);
//   const { GetWishlistData } = useSelector(state => state.GetWishlist);
//   const { GetTransactionData } = useSelector(state => state.GetTransaction);

//   const monthlySpending = 32500;
//   const weeklyAverage = 7506;
//   const dailyAverage = 1083;

//   const fetchApi = () => {
//     if (LoginData?.token && LoginData?.user?.id) {
//       dispatch(GetUserDetailsApi(LoginData.token));
//       dispatch(GetCategoriesApi(LoginData.token));
//       dispatch(GetWishlistApi({ token: LoginData.token, id: LoginData.user.id }));
//       dispatch(GetTransectionApi({ token: LoginData.token, id: LoginData.user.id }));
//     }
//   };

//   useEffect(() => {
//     fetchApi();
//   }, [LoginData]);

//   const handleAddItem = async (newItem) => {
//     const token = LoginData?.token;
//     const formData = new FormData();
//     formData.append('user_id', LoginData?.user?.id);
//     formData.append('name', newItem.name);
//     formData.append('price', newItem.price);
//     formData.append('description', newItem.description);

//     try {
//       const result = await dispatch(AddWishlistApi({ formData, token })).unwrap();
//       if (result?.status === true || result?.status === "true") {
//         setToastMsg(result?.message || "Item added successfully!");
//         setWishlistModal(false);
//         fetchApi();
//       } else {
//         setToastMsg(result?.message || "Failed to add item.");
//       }
//     } catch (error) {
//       console.error("API Catch Error:", error);
//       setToastMsg("Something went wrong. Please try again.");
//     } finally {
//       setToastVisible(true);
//     }
//   };
  
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
    
//     let parts = dateString.split(/[-/]/);
//     let transactionDate;
//     if (parts[0].length === 4) { // YYYY-MM-DD
//       transactionDate = new Date(parts[0], parts[1] - 1, parts[2]);
//     } else { // DD-MM-YYYY
//       transactionDate = new Date(parts[2], parts[1] - 1, parts[0]);
//     }
    
//     if (isNaN(transactionDate)) return dateString;

//     if (transactionDate.toDateString() === today.toDateString()) return 'Today';
//     if (transactionDate.toDateString() === yesterday.toDateString()) return 'Yesterday';
//     return transactionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//   };

//   const allTransactions = GetTransactionData?.get_transactions || [];
//   const recentTransactions = allTransactions.slice(0, 4); 
//   const wishlistItems = GetWishlistData?.get_wishlists || [];

//   const [goalModal, setGoalModal] = useState(false);
//   const [editGoalModal, setEditGoalModal] = useState(false);

//   const [goalData, setGoalData] = useState({
//     amount: 0,
//     date: "",
//   });

//   const spent = 0;

//   const percentage = goalData.amount > 0
//     ? (spent / goalData.amount) * 100
//     : 0;

//   const remaining = goalData.amount - spent;

//   return (
//     <ScrollView
//       style={styles.container}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
//     >
//       <StatusBar
//         barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
//         backgroundColor={colors.background}
//       />

//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greetingText}>Good Morning,</Text>
//           <Text style={styles.userName}>Alex Johnson</Text>
//         </View>
//         <View style={{ flexDirection: 'row', gap: 10 }}>
//           <TouchableOpacity style={styles.profileButton}>
//             <View style={styles.profilePlaceholder}>
//               <TouchableOpacity 
//                 onPress={() => navigation.navigate("PersonalInfoScreen")}
//               >
//                 <Text style={styles.profileInitials}>AJ</Text>
//               </TouchableOpacity>
//             </View>
//           </TouchableOpacity>
//           <Text style={styles.greetingText}>Good Morning,</Text>
//           <Text style={styles.userName}>{LoginData?.user?.name || 'User'}</Text>
//         </View>
//         <TouchableOpacity style={styles.profileButton}>
//           <View style={styles.profilePlaceholder}>
//             <Text style={styles.profileInitials}>
//               {LoginData?.user?.name?.charAt(0).toUpperCase() || 'U'}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.heroCard}>
//         <View style={styles.rowBetween}>
//           <View style={styles.heroIconBg}><Wallet size={20} color={colors.theme} /></View>
//         </View>
//         <View style={styles.heroContent}>
//           <Text style={styles.heroLabel}>Total Spent (Nov)</Text>
//           <Text style={styles.heroValue}>₹{monthlySpending.toLocaleString()}</Text>
//         </View>
//         <View style={styles.heroFooter}>
//           <View style={styles.trendBadge}>
//             <TrendingDown size={14} color={colors.success} />
//             <Text style={styles.trendText}> 12% vs last month</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.gridContainer}>
//         <View style={styles.statCard}>
//           <Text style={styles.statLabel}>Weekly Avg</Text>
//           <Text style={styles.statValue}>₹{weeklyAverage.toLocaleString()}</Text>
//           <View style={styles.miniChartLine} />
//         </View>
//         <View style={styles.statCard}>
//           <Text style={styles.statLabel}>Daily Avg</Text>
//           <Text style={styles.statValue}>₹{dailyAverage.toLocaleString()}</Text>
//           <View style={[styles.miniChartLine, { opacity: 0.5 }]} />
//         </View>
//       </View>

//       <View style={styles.sectionContainer}>
//         <View style={styles.rowBetween}>
//           <Text style={styles.sectionTitle}>Main Goal</Text>

//           {/* Add button */}
//           <TouchableOpacity onPress={() => setGoalModal(true)}>
//             <Text style={styles.linkText}>Add</Text>
//           </TouchableOpacity>

//         </View>

//         <View style={styles.goalCard}>
    
//         {/* Pencil edit - TOP RIGHT */}
//         <TouchableOpacity
//           style={styles.editIcon}
//           onPress={() => setEditGoalModal(true)}
//         >
//           <SquarePen size={16} color="#555" />
//         </TouchableOpacity>


//         <View style={styles.rowBetween}>
//           <View style={styles.row}>
//             <View style={styles.goalIconBg}>
//               <Target size={20} color="#FFFFFF" />
//             </View>

//             <View style={{ marginLeft: 12 }}>
//               <Text style={styles.cardTitle}>Saving Goals</Text>
//                 {/* <Text style={DashBoardStyle.textMutedSmall}>
//                 Target: ₹{savingsGoal.toLocaleString()}
//               </Text> */}
//               <Text style={styles.textMutedSmall}>
//                 Target: ₹{goalData.amount}
//               </Text>
//             </View>
//           </View>

//           {/* <Text style={DashBoardStyle.percentageText}>
//           {Math.round(((savingsGoal - savedAmount) / savingsGoal) * 100)}%
//           </Text> */}
//           <Text style={styles.percentageText}>
//             {percentage.toFixed(0)}%
//           </Text>
//         </View>

//         {/* <View style={DashBoardStyle.progressBarContainer}>
//         <View
//           style={[
//             DashBoardStyle.progressBarFill,
//             {
//               width: progressWidth(
//                 ((savingsGoal - savedAmount) / savingsGoal) * 100,
//               ),
//             },
//           ]}
//         />
//         </View> */}

//         <View style={styles.progressBarBackground}>
//           <View
//             style={[
//               styles.progressBarFill,
//               { width: `${percentage}%` },
//             ]}
//           />
//         </View>

//         <View style={styles.rowBetween}>
//           {/* <Text style={DashBoardStyle.textMutedSmall}>
//           Spent: ₹{savedAmount.toLocaleString()}
//           </Text> */}

//           <Text style={styles.textMutedSmall}>
//             Spent: ₹{spent}
//           </Text>

//           {/* <Text style={DashBoardStyle.textMutedSmall}>
//           Remaining: ₹{(savingsGoal - savedAmount).toLocaleString()}
//           </Text> */}
//           <Text style={styles.textMutedSmall}>
//             Remaining: ₹{remaining}
//           </Text>
//         </View>
//       </View>
//     </View>


//     <View style={styles.sectionContainer}>
//       <View style={styles.rowBetween}>
//         <Text style={styles.sectionTitle}>Transactions</Text>
//         <View style={styles.sectionContainer}>
//           <View style={styles.rowBetween}>
//             <Text style={styles.sectionTitle}>Recent Transactions</Text>
//             <TouchableOpacity onPress={() => setShowTransactions(true)}>
//               <Text style={styles.linkText}>See All</Text>
//             </TouchableOpacity>
//           </View>
//           {recentTransactions.length > 0 ? (
//             recentTransactions.map(item => {
//               const IconComponent = categoryIcons[item.category] || DollarSign;
//               return (
//                 <View key={item.id} style={styles.transactionRow}>
//                   <View style={styles.row}>
//                     <View style={styles.iconCircle}>
//                       <IconComponent size={20} color={colors.darkTheme} />
//                     </View>
//                     <View style={styles.transactionDetails}>
//                       <Text style={styles.transactionTitle}>{item.description}</Text>
//                       <Text style={styles.transactionSub}>{item.category} • {formatDate(item.date)}</Text>
//                     </View>
//                   </View>
//                   <Text style={styles.transactionAmount}>
//                     -₹{Number(item.amount).toLocaleString()}
//                   </Text>
//                 </View>
//               );
//             })
//           ) : (
//           <Text style={styles.emptyText}>No recent transactions found.</Text>
//           )}
//         </View>

//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Wishlist</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
//             {wishlistItems.map(item => (
//               <View key={item.id} style={styles.wishlistCard}>
//                 <View style={styles.rowBetween}>
//                   <View style={styles.wishlistIcon}><Target size={16} color={colors.theme} /></View>
//                 </View>
//                 <Text style={styles.wishlistName} numberOfLines={1}>{item.name}</Text>
//                 <Text style={styles.wishlistPrice}>₹{parseFloat(item.price).toLocaleString()}</Text>
//               </View>
//             ))}
//             <TouchableOpacity style={styles.addWishlistCard} onPress={() => setWishlistModal(true)}>
//               <ArrowUpRight size={24} color={colors.textSecondary} />
//               <Text style={styles.addWishlistText}>Add New</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>

//         <AddWishListModal
//           visible={wishlistModal}
//           onClose={() => setWishlistModal(false)}
//           onSave={handleAddItem}
//         />
//         <AllTransactionsModal
//           visible={showTransactions}
//           onClose={() => setShowTransactions(false)}
//           data={allTransactions}
//         />
//         <AddGoalModal
//           visible={goalModal}
//           onClose={() => setGoalModal(false)}
//           onSave={(data) => {
//           console.log("Goal Saved:", data);
//           setGoalData(data);  // update actual target
//           }}
//         />

//         <AddGoalModal
//           visible={editGoalModal}
//           onClose={() => setEditGoalModal(false)}
//           initialValues={goalData}     // <-- pre-filled values
//           onSave={(data) => {
//           console.log("Goal Updated:", data);
//           setGoalData(data);
//           }}
//         />
//         <View style={{ height: 100 }} />
//         <ToastMessage
//           visible={toastVisible}
//           message={toastMsg}
//           onHide={() => setToastVisible(false)}
//         />
//        <View style={{ height: 100 }} />
//     </ScrollView>
//   );
// };

// export default DashBoardScreen;

import React, { useState, useContext, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import {
  TrendingDown, Wallet, Coffee, Target, DollarSign, Car, Film, Utensils, ShoppingBag,
  Home, Lightbulb, Signal, Fuel, Wrench, Stethoscope, School, GraduationCap, Shirt,
  Plane, Repeat, Shield, Landmark, TrendingUp, ShoppingCart, Scissors, Gift,
  AlertTriangle, Baby, Dog, ArrowUpRight, SquarePen
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
  const [goalModal, setGoalModal] = useState(false);
  const [editGoalModal, setEditGoalModal] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const { LoginData } = useSelector(state => state.Login);
  const { GetWishlistData } = useSelector(state => state.GetWishlist);
  const { GetTransactionData } = useSelector(state => state.GetTransaction);

  const monthlySpending = 32500;
  const weeklyAverage = 7506;
  const dailyAverage = 1083;

  const fetchApi = () => {
    if (LoginData?.token && LoginData?.user?.id) {
      dispatch(GetUserDetailsApi(LoginData.token));
      dispatch(GetCategoriesApi(LoginData.token));
      dispatch(GetWishlistApi({ token: LoginData.token, id: LoginData.user.id }));
      dispatch(GetTransectionApi({ token: LoginData.token, id: LoginData.user.id }));
    }
  };

  useEffect(() => {
    fetchApi();
  }, [LoginData]);

  const handleAddItem = async (newItem) => {
    const token = LoginData?.token;
    const formData = new FormData();

    formData.append('user_id', LoginData?.user?.id);
    formData.append('name', newItem.name);
    formData.append('price', newItem.price);
    formData.append('description', newItem.description);

    try {
      const result = await dispatch(AddWishlistApi({ formData, token })).unwrap();
      if (result?.status === true || result?.status === "true") {
        setToastMsg(result?.message || "Item added successfully!");
        setWishlistModal(false);
        fetchApi();
      } else {
        setToastMsg(result?.message || "Failed to add item.");
      }
    } catch (error) {
      setToastMsg("Something went wrong. Please try again.");
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

  const allTransactions = GetTransactionData?.get_transactions || [];
  const recentTransactions = allTransactions.slice(0, 4);
  const wishlistItems = GetWishlistData?.get_wishlists || [];

  const [goalData, setGoalData] = useState({
    amount: 0,
    date: ""
  });

  const spent = 0;
  const percentage = goalData.amount > 0 ? (spent / goalData.amount) * 100 : 0;
  const remaining = goalData.amount - spent;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
    >
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Good Morning,</Text>
          <Text style={styles.userName}>{LoginData?.user?.name || "User"}</Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("PersonalInfoScreen")}
        >
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profileInitials}>
              {LoginData?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* HERO CARD */}
      <View style={styles.heroCard}>
        <View style={styles.rowBetween}>
          <View style={styles.heroIconBg}>
            <Wallet size={20} color={colors.theme} />
          </View>
        </View>

        <View style={styles.heroContent}>
          <Text style={styles.heroLabel}>Total Spent (Nov)</Text>
          <Text style={styles.heroValue}>₹{monthlySpending.toLocaleString()}</Text>
        </View>

        <View style={styles.heroFooter}>
          <View style={styles.trendBadge}>
            <TrendingDown size={14} color={colors.success} />
            <Text style={styles.trendText}> 12% vs last month</Text>
          </View>
        </View>
      </View>

      {/* WEEKLY & DAILY STATS */}
      <View style={styles.gridContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Weekly Avg</Text>
          <Text style={styles.statValue}>₹{weeklyAverage.toLocaleString()}</Text>
          <View style={styles.miniChartLine} />
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Daily Avg</Text>
          <Text style={styles.statValue}>₹{dailyAverage.toLocaleString()}</Text>
          <View style={[styles.miniChartLine, { opacity: 0.5 }]} />
        </View>
      </View>

      {/* MAIN GOAL */}
      <View style={styles.sectionContainer}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Main Goal</Text>
          <TouchableOpacity onPress={() => setGoalModal(true)}>
            <Text style={styles.linkText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.goalCard}>
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => setEditGoalModal(true)}
          >
            <SquarePen size={16} color="#555" />
          </TouchableOpacity>

          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <View style={styles.goalIconBg}>
                <Target size={20} color="#FFF" />
              </View>

              <View style={{ marginLeft: 12 }}>
                <Text style={styles.cardTitle}>Saving Goals</Text>
                <Text style={styles.textMutedSmall}>
                  Target: ₹{goalData.amount}
                </Text>
              </View>
            </View>

            <Text style={styles.percentageText}>
              {percentage.toFixed(0)}%
            </Text>
          </View>

          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${percentage}%` }]}
            />
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.textMutedSmall}>Spent: ₹{spent}</Text>
            <Text style={styles.textMutedSmall}>Remaining: ₹{remaining}</Text>
          </View>
        </View>
      </View>

      {/* RECENT TRANSACTIONS */}
      <View style={styles.sectionContainer}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          <TouchableOpacity onPress={() => setShowTransactions(true)}>
            <Text style={styles.linkText}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.length > 0 ? (
          recentTransactions.map(item => {
            const IconComponent = categoryIcons[item.category] || DollarSign;

            return (
              <View key={item.id} style={styles.transactionRow}>
                <View style={styles.row}>
                  <View style={styles.iconCircle}>
                    <IconComponent size={20} color={colors.darkTheme} />
                  </View>

                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>{item.description}</Text>
                    <Text style={styles.transactionSub}>
                      {item.category} • {formatDate(item.date)}
                    </Text>
                  </View>
                </View>

                <Text style={styles.transactionAmount}>
                  -₹{Number(item.amount).toLocaleString()}
                </Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyText}>No recent transactions found.</Text>
        )}
      </View>

      {/* WISHLIST */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Wishlist</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {wishlistItems.map(item => (
            <View key={item.id} style={styles.wishlistCard}>
              <View style={styles.rowBetween}>
                <View style={styles.wishlistIcon}>
                  <Target size={16} color={colors.theme} />
                </View>
              </View>

              <Text style={styles.wishlistName} numberOfLines={1}>
                {item.name}
              </Text>

              <Text style={styles.wishlistPrice}>
                ₹{parseFloat(item.price).toLocaleString()}
              </Text>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addWishlistCard}
            onPress={() => setWishlistModal(true)}
          >
            <ArrowUpRight size={24} color={colors.textSecondary} />
            <Text style={styles.addWishlistText}>Add New</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* MODALS */}
      <AddWishListModal
        visible={wishlistModal}
        onClose={() => setWishlistModal(false)}
        onSave={handleAddItem}
      />

      <AllTransactionsModal
        visible={showTransactions}
        onClose={() => setShowTransactions(false)}
        data={allTransactions}
      />

      <AddGoalModal
        visible={goalModal}
        onClose={() => setGoalModal(false)}
        onSave={(data) => setGoalData(data)}
      />

      <AddGoalModal
        visible={editGoalModal}
        initialValues={goalData}
        onClose={() => setEditGoalModal(false)}
        onSave={(data) => setGoalData(data)}
      />

      <ToastMessage
        visible={toastVisible}
        message={toastMsg}
        onHide={() => setToastVisible(false)}
      />

      <View style={{ height: 50 }} />
    </ScrollView>
  );
};

export default DashBoardScreen;
