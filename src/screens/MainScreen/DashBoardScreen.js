import React, { useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  TrendingDown,
  Wallet,
  Coffee,
  ShoppingBag,
  Target,
  ArrowUpRight,
  Plane,
  Zap,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import getDashBoardStyles from '../../styles/MainScreen/DashboardStyle';
import { ThemeContext } from '../../components/ThemeContext';
import AddWishListModal from '../../Modals/AddWishListModal';
import AllTransactionsModal from '../../Modals/AllTransactionsModal';

const DashBoardScreen = () => {
  const { colors, themeType, toggleTheme } = useContext(ThemeContext);
  const [showTransactions, setShowTransactions] = useState(false);
  const [wishlistModal, setWishlistModal] = useState(false);
  const insets = useSafeAreaInsets();
  const DashBoardStyle = useMemo(() => getDashBoardStyles(colors), [colors]);

  const monthlySpending = 32500;
  const weeklyAverage = 7506;
  const dailyAverage = 1083;
  const savingsGoal = 50000;
  const savedAmount = 32500;

  const recentTransactions = [
    {
      id: '1',
      description: 'Starbucks Coffee',
      category: 'Food',
      amount: 250,
      icon: Coffee,
      time: '2h ago',
      type: 'debit',
    },
    {
      id: '2',
      description: 'Nike Store',
      category: 'Shopping',
      amount: 3500,
      icon: ShoppingBag,
      time: '5h ago',
      type: 'debit',
    },
    {
      id: '3',
      description: 'Office Trip',
      category: 'Travel',
      amount: 12000,
      icon: Plane,
      time: '1d ago',
      type: 'debit',
    },
    {
      id: '4',
      description: 'Uber Ride',
      category: 'Transport',
      amount: 450,
      icon: Zap,
      time: '1d ago',
      type: 'debit',
    },
  ];

  const wishlistItems = [
    { id: '1', name: 'Sony WH-1000XM5', price: 25000, saved: 75, icon: Zap },
    { id: '2', name: 'Bali Trip', price: 80000, saved: 30, icon: Plane },
  ];

  const progressWidth = value => `${value}%`;

  return (
    <ScrollView
      style={[DashBoardStyle.container, { paddingBottom: insets.bottom }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <View style={DashBoardStyle.header}>
        <View>
          <Text style={DashBoardStyle.greetingText}>Good Morning,</Text>
          <Text style={DashBoardStyle.userName}>Alex Johnson</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity style={DashBoardStyle.profileButton}>
            <View style={DashBoardStyle.profilePlaceholder}>
              <Text style={DashBoardStyle.profileInitials}>AJ</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={DashBoardStyle.heroCard}>
        <View style={DashBoardStyle.rowBetween}>
          <View style={DashBoardStyle.heroIconBg}>
            <Wallet size={20} color={colors.theme} />
          </View>
          <TouchableOpacity>
            {/* <MoreHorizontal size={20} color={colors.textSecondary} /> */}
          </TouchableOpacity>
        </View>
        <View style={DashBoardStyle.heroContent}>
          <Text style={DashBoardStyle.heroLabel}>Total Spent (Nov)</Text>
          <Text style={DashBoardStyle.heroValue}>
            ₹{monthlySpending.toLocaleString()}
          </Text>
        </View>
        <View style={DashBoardStyle.heroFooter}>
          <View style={DashBoardStyle.trendBadge}>
            <TrendingDown size={14} color={colors.success} />
            <Text style={DashBoardStyle.trendText}> 12% vs last month</Text>
          </View>
        </View>
      </View>

      <View style={DashBoardStyle.gridContainer}>
        <View style={DashBoardStyle.statCard}>
          <Text style={DashBoardStyle.statLabel}>Weekly Avg</Text>
          <Text style={DashBoardStyle.statValue}>
            ₹{weeklyAverage.toLocaleString()}
          </Text>
          <View style={DashBoardStyle.miniChartLine} />
        </View>
        <View style={DashBoardStyle.statCard}>
          <Text style={DashBoardStyle.statLabel}>Daily Avg</Text>
          <Text style={DashBoardStyle.statValue}>
            ₹{dailyAverage.toLocaleString()}
          </Text>
          <View style={[DashBoardStyle.miniChartLine, { opacity: 0.5 }]} />
        </View>
      </View>

      {/* <View style={DashBoardStyle.sectionContainer}>
        <View style={DashBoardStyle.rowBetween}>
          <Text style={DashBoardStyle.sectionTitle}>Main Goal</Text>
          <Text style={DashBoardStyle.linkText}>Edit</Text>
        </View>
        <View style={DashBoardStyle.goalCard}>
          <View style={DashBoardStyle.rowBetween}>
            <View style={DashBoardStyle.row}>
              <View style={DashBoardStyle.goalIconBg}>
                <Target size={20} color="#FFFFFF" />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={DashBoardStyle.cardTitle}>Saving Goals</Text>
                <Text style={DashBoardStyle.textMutedSmall}>
                  Target: ₹{savingsGoal.toLocaleString()}
                </Text>
              </View>
            </View>
            <Text style={DashBoardStyle.percentageText}>
              {Math.round(((savingsGoal - savedAmount) / savingsGoal) * 100)}%
            </Text>
          </View>
          <View style={DashBoardStyle.progressBarContainer}>
            <View
              style={[
                DashBoardStyle.progressBarFill,
                {
                  width: progressWidth(
                    ((savingsGoal - savedAmount) / savingsGoal) * 100,
                  ),
                },
              ]}
            />
          </View>
          <View style={DashBoardStyle.rowBetween}>
            <Text style={DashBoardStyle.textMutedSmall}>
              Spent: ₹{savedAmount.toLocaleString()}
            </Text>
            <Text style={DashBoardStyle.textMutedSmall}>
              Remaining: ₹{(savingsGoal - savedAmount).toLocaleString()}
            </Text>
          </View>
        </View>
      </View> */}

      <View style={DashBoardStyle.sectionContainer}>
        <View style={DashBoardStyle.rowBetween}>
          <Text style={DashBoardStyle.sectionTitle}>Transactions</Text>
          <TouchableOpacity onPress={() => setShowTransactions(true)}>
            <Text style={DashBoardStyle.linkText}>See All</Text>
          </TouchableOpacity>
        </View>
        {recentTransactions.map(item => {
          const IconComponent = item.icon;
          const isCredit = item.type === 'credit';
          return (
            <View key={item.id} style={DashBoardStyle.transactionRow}>
              <View style={DashBoardStyle.row}>
                <View
                  style={[
                    DashBoardStyle.iconCircle,
                    isCredit && DashBoardStyle.iconCircleSuccess,
                  ]}
                >
                  <IconComponent
                    size={20}
                    color={isCredit ? colors.success : colors.text}
                  />
                </View>
                <View style={DashBoardStyle.transactionDetails}>
                  <Text style={DashBoardStyle.transactionTitle}>
                    {item.description}
                  </Text>
                  <Text style={DashBoardStyle.transactionSub}>
                    {item.category} • {item.time}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  DashBoardStyle.transactionAmount,
                  isCredit && DashBoardStyle.textSuccess,
                ]}
              >
                {isCredit ? '+' : '-'}₹{item.amount.toLocaleString()}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={DashBoardStyle.sectionContainer}>
        <Text style={DashBoardStyle.sectionTitle}>Wishlist</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {wishlistItems.map(item => (
            <View key={item.id} style={DashBoardStyle.wishlistCard}>
              <View style={DashBoardStyle.rowBetween}>
                <View style={DashBoardStyle.wishlistIcon}>
                  <item.icon size={16} color={colors.theme} />
                </View>
                <Text style={DashBoardStyle.wishlistPercent}>
                  {item.saved}%
                </Text>
              </View>
              <Text style={DashBoardStyle.wishlistName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={DashBoardStyle.wishlistPrice}>
                ₹{item.price.toLocaleString()}
              </Text>
              <View style={DashBoardStyle.miniProgressBg}>
                <View
                  style={[
                    DashBoardStyle.miniProgressFill,
                    { width: progressWidth(item.saved) },
                  ]}
                />
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={DashBoardStyle.addWishlistCard}
            onPress={() => setWishlistModal(true)}
          >
            <ArrowUpRight size={24} color={colors.textSecondary} />
            <Text style={DashBoardStyle.addWishlistText}>Add New</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <AddWishListModal
        visible={wishlistModal}
        onClose={() => setWishlistModal(false)}
        onSave={data => {
          console.log('Wishlist Saved:', data);
          setWishlistModal(false);
        }}
      />
      <AllTransactionsModal
        visible={showTransactions}
        onClose={() => setShowTransactions(false)}
        data={recentTransactions}
      />

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

export default DashBoardScreen;
