import React, { useState, useContext, useMemo, use, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import {
  Text,
  Avatar,
  Snackbar,
  ProgressBar,
  Divider,
} from 'react-native-paper';
import {
  ArrowLeft,
  Plus,
  UserPlus,
  Trash2,
  Receipt,
  TrendingUp,
  MoreHorizontal,
} from 'lucide-react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddGroupMemberModal from '../../Modals/AddGroupMemberModal';
import AddGroupExpenseModal from '../../Modals/AddGroupExpenseModal';
import getGroupDetailsStyle from '../../styles/MainScreen/groupDetailsStyle';
import { ThemeContext } from '../../components/ThemeContext';
import { useSelector } from 'react-redux';

const MY_FRIENDS = [
  { id: '1', name: 'Alice Johnson', role: 'Designer' },
  { id: '2', name: 'Bob Smith', role: 'Developer' },
  { id: '3', name: 'Charlie Rose', role: 'Manager' },
  { id: '4', name: 'David Goggins', role: 'Motivator' },
];

const MEMBERS = [
  { id: '1', name: 'You' },
  { id: '2', name: 'Alex Kumar' },
  { id: '3', name: 'Priya Sharma' },
];

const GroupDetails = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const { GetFriendsData } = useSelector(state => state.GetFriends || {});


  const styles = useMemo(() => getGroupDetailsStyle(colors), [colors]);

  const route = useRoute();
  const insets = useSafeAreaInsets();
  const groupId = route?.params?.id ?? '1';

  const [expenseFormOpen, setExpenseFormOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [snack, setSnack] = useState({ visible: false, message: '' });
  const [modalVisible, setModalVisible] = useState(false);

  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    if (GetFriendsData?.friends) {
      setFriendList(GetFriendsData?.friends);
    }
  }, [GetFriendsData]);

  const handleAddMember = selectedFriend => {
    if (groupMembers.find(m => m.id === selectedFriend.id)) {
      alert(`${selectedFriend.name} is already in the group!`);
      return;
    }
    setGroupMembers([...groupMembers, selectedFriend]);
    setModalVisible(false);
  };

  const group = {
    id: groupId,
    name: 'Weekend Trip',
    budget: 10000,
    spent: 6500,
    description: 'Goa trip with the squad 🌴',
  };

  const members = [
    { id: 'user', name: 'You', role: 'Admin' },
    { id: '1', name: 'Alex Kumar', role: 'Member' },
    { id: '2', name: 'Priya Sharma', role: 'Member' },
    { id: '3', name: 'Rahul Verma', role: 'Member' },
  ];

  const expenses = [
    {
      id: '1',
      description: 'Hotel Booking',
      amount: 4000,
      paidBy: 'user',
      paidByName: 'You',
      splitAmong: ['user', '1', '2'],
      date: 'Today',
    },
    {
      id: '2',
      description: 'Dinner & Drinks',
      amount: 1500,
      paidBy: '1',
      paidByName: 'Alex',
      splitAmong: ['user', '1', '2'],
      date: 'Yesterday',
    },
    {
      id: '3',
      description: 'Cab Fare',
      amount: 1000,
      paidBy: '2',
      paidByName: 'Priya',
      splitAmong: ['user', '1', '2'],
      date: 'Jan 16',
    },
  ];

  const percentage = Math.min(100, (group.spent / group.budget) * 100);
  const remaining = group.budget - group.spent;

  const showSnack = message => setSnack({ visible: true, message });

  const handleBack = () => {
    if (navigation?.canGoBack()) navigation.goBack();
    else navigation.navigate('settle');
  };

  const handleRemoveMember = memberId => {
    showSnack(`Member removed`);
  };

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setExpenseFormOpen(true);
  };

  const handleEditExpense = expense => {
    setSelectedExpense(expense);
    setExpenseFormOpen(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Custom Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {group.name}
        </Text>
        {/* <TouchableOpacity style={styles.iconButton}>
          <MoreHorizontal size={24} color={colors.text} />
        </TouchableOpacity> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        style={styles.scrollContainer}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroLabel}>Remaining Budget</Text>
              <Text style={styles.heroValue}>
                ₹{remaining.toLocaleString()}
              </Text>
            </View>
            <View style={styles.circularIcon}>
              <TrendingUp size={24} color={colors.text} />
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>
                Spent: ₹{group.spent.toLocaleString()}
              </Text>
              <Text style={styles.progressText}>{percentage.toFixed(0)}%</Text>
            </View>
            <ProgressBar
              progress={percentage / 100}
              color={colors.text}
              style={styles.progressBar}
            />
            <Text style={styles.totalBudgetLabel}>
              Total Budget: ₹{group.budget.toLocaleString()}
            </Text>
          </View>
        </View>

        {group.description && (
          <Text style={styles.description}>{group.description}</Text>
        )}

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Members</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.smallBtn}
            >
              <UserPlus size={16} color={colors.theme} />
              <Text style={styles.smallBtnText}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            {members.map((member, index) => (
              <View key={member.id}>
                <View style={styles.memberRow}>
                  <View style={styles.row}>
                    <Avatar.Text
                      size={40}
                      label={member.name.substring(0, 2).toUpperCase()}
                      style={styles.avatar}
                      labelStyle={styles.avatarLabel}
                    />
                    <View style={{ marginLeft: 12 }}>
                      <Text style={styles.memberName}>
                        {member.name}
                        {member.id === 'user' && (
                          <Text style={{ color: colors.textSecondary }}>
                            {' '}
                            (You)
                          </Text>
                        )}
                      </Text>
                      {member.role === 'Admin' && (
                        <View style={styles.adminBadge}>
                          <Text style={styles.adminText}>Admin</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  {member.role !== 'Admin' && (
                    <TouchableOpacity
                      onPress={() => handleRemoveMember(member.id)}
                    >
                      <Trash2 size={18} color={colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
                {index < members.length - 1 && (
                  <Divider style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <TouchableOpacity
              onPress={handleAddExpense}
              style={styles.addButton}
            >
              <Plus size={20} color={colors.text} />
              <Text style={styles.addButtonText}>Add Group Expense</Text>
            </TouchableOpacity>
          </View>

          {expenses.map(expense => (
            <TouchableOpacity
              key={expense.id}
              onPress={() => handleEditExpense(expense)}
              activeOpacity={0.7}
            >
              <View style={styles.expenseCard}>
                <View style={styles.row}>
                  <View style={styles.expenseIconBox}>
                    <Receipt size={20} color={colors.theme} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.expenseTitle}>
                      {expense.description}
                    </Text>
                    <Text style={styles.expenseSub}>
                      Paid by{' '}
                      <Text style={{ color: colors.text }}>
                        {expense.paidByName}
                      </Text>{' '}
                      • {expense.date}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.expenseAmount}>
                      ₹{expense.amount.toLocaleString()}
                    </Text>
                    <Text style={styles.splitText}>
                      for {expense.splitAmong.length}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <AddGroupMemberModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddMember}
        friends={friendList}
      />

      <AddGroupExpenseModal
        visible={expenseFormOpen}
        onClose={() => setExpenseFormOpen(false)}
        onSubmit={handleAddExpense}
        groupMembers={MEMBERS}
        currentUser={MEMBERS[0]}
      />

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: '' })}
        duration={2000}
        style={{
          backgroundColor: colors.card,
          marginBottom: insets.bottom + 20,
        }}
        theme={{ colors: { inversePrimary: colors.theme } }}
        action={{
          label: 'OK',
          textColor: colors.theme,
          onPress: () => setSnack({ visible: false, message: '' }),
        }}
      >
        <Text style={{ color: colors.text }}>{snack.message}</Text>
      </Snackbar>
    </View>
  );
};

export default GroupDetails;
