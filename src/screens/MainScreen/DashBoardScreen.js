import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  TrendingUp,
  Wallet,
  Coffee,
  ShoppingBag,
  Target,
} from "lucide-react-native";

import DashBoardStyle from "../../styles/MainScreen/DashboardStyle";

const DashBoardScreen = () => {
  const monthlySpending = 12450;
  const weeklyAverage = 2875;
  const dailyAverage = 415;
  const savingsGoal = 5000;
  const savedAmount = 3200;

  const recentTransactions = [
    { id: "1", description: "Coffee Shop", amount: 250, icon: Coffee, time: "2h ago" },
    { id: "2", description: "New Sneakers", amount: 3500, icon: ShoppingBag, time: "5h ago" },
    { id: "3", description: "Lunch with friends", amount: 850, icon: Coffee, time: "1d ago" },
  ];

  const wishlistItems = [
    { id: "1", name: "Concert Ticket", price: 2500, saved: 64 },
    { id: "2", name: "New Headphones", price: 4500, saved: 71 },
    { id: "3", name: "Weekend Trip", price: 8000, saved: 40 },
  ];

  const progressWidth = (value) => `${value}%`;

  return (
    <ScrollView style={DashBoardStyle.container} showsVerticalScrollIndicator={false}>
      {/* HEADING */}
      <View style={DashBoardStyle.header}>
        <Text style={DashBoardStyle.title}>Dashboard</Text>
        <Text style={DashBoardStyle.subtitle}>Track your spending journey</Text>
      </View>

      {/* MONTH CARD */}
      <View style={DashBoardStyle.cardHighlight}>
        <Text style={DashBoardStyle.cardLabel}>This Month</Text>

        <Text style={DashBoardStyle.mainValue}>₹{monthlySpending.toLocaleString()}</Text>

        <View style={DashBoardStyle.row}>
          <TrendingUp size={18} color="lightgreen" />
          <Text style={DashBoardStyle.trendText}>12% less than last month</Text>
        </View>
      </View>

      {/* WEEK & DAILY CARDS */}
      <View style={DashBoardStyle.rowBetween}>
        <View style={DashBoardStyle.cardSmall}>
          <Text style={DashBoardStyle.smallLabel}>Weekly Avg</Text>
          <Text style={DashBoardStyle.smallValue}>₹{weeklyAverage.toLocaleString()}</Text>
        </View>

        <View style={DashBoardStyle.cardSmall}>
          <Text style={DashBoardStyle.smallLabel}>Daily Avg</Text>
          <Text style={DashBoardStyle.smallValue}>₹{dailyAverage.toLocaleString()}</Text>
        </View>
      </View>

      {/* SAVINGS GOAL */}
      <View style={DashBoardStyle.card}>
        <View style={DashBoardStyle.rowBetween}>
          <Text style={DashBoardStyle.cardTitle}>Savings Goal</Text>
          <Target size={22} color="#7C3BEC" />
        </View>

        <View style={DashBoardStyle.rowBetween}>
          <Text style={DashBoardStyle.textMuted}>Progress</Text>
          <Text style={DashBoardStyle.amountMono}>
            ₹{savedAmount.toLocaleString()} / ₹{savingsGoal.toLocaleString()}
          </Text>
        </View>

        {/* PROGRESS BAR */}
        <View style={DashBoardStyle.progressBG}>
          <View style={[DashBoardStyle.progressFill, { width: progressWidth((savedAmount / savingsGoal) * 100) }]} />
        </View>

        <Text style={DashBoardStyle.textMutedSmall}>
          ₹{(savingsGoal - savedAmount).toLocaleString()} more to reach your goal
        </Text>
      </View>

      {/* RECENT TRANSACTIONS */}
      <View style={DashBoardStyle.section}>
        <View style={DashBoardStyle.rowBetween}>
          <Text style={DashBoardStyle.sectionTitle}>Recent Transactions</Text>
          <Text style={DashBoardStyle.viewAll}>View All</Text>
        </View>

        {recentTransactions.map((item) => {
          const Icon = item.icon;
          return (
            <View key={item.id} style={DashBoardStyle.transactionCard}>
              <View style={DashBoardStyle.row}>
                <View style={DashBoardStyle.iconCircle}>
                  <Icon size={20} color="#7C3BEC" />
                </View>

                <View style={DashBoardStyle.flex1}>
                  <Text style={DashBoardStyle.transactionText}>{item.description}</Text>
                  <Text style={DashBoardStyle.textMutedSmall}>{item.time}</Text>
                </View>

                <Text style={DashBoardStyle.amountMono}>
                  ₹{item.amount.toLocaleString()}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* WISHLIST */}
      <View style={DashBoardStyle.section}>
        <Text style={DashBoardStyle.sectionTitle}>Wishlist Progress</Text>

        {wishlistItems.map((item) => (
          <View key={item.id} style={DashBoardStyle.card}>
            <View style={DashBoardStyle.rowBetween}>
              <Text style={DashBoardStyle.cardTitle}>{item.name}</Text>
              <Text style={DashBoardStyle.amountMono}>₹{item.price.toLocaleString()}</Text>
            </View>

            <View style={DashBoardStyle.progressBG}>
              <View style={[DashBoardStyle.progressFill, { width: progressWidth(item.saved) }]} />
            </View>

            <Text style={DashBoardStyle.textMutedSmall}>{item.saved}% saved</Text>
          </View>
        ))}
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
};

export default DashBoardScreen;