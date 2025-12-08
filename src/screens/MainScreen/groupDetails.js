import React, { useState, useContext, useMemo, useEffect } from 'react';
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
} from 'lucide-react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddGroupMemberModal from '../../Modals/AddGroupMemberModal';
import AddGroupExpenseModal from '../../Modals/AddGroupExpenseModal';
import getGroupDetailsStyle from '../../styles/MainScreen/groupDetailsStyle';
import { ThemeContext } from '../../components/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { GetGroupMembersApi } from '../../Redux/Api/GetGroupMemberApi';
import { AddGroupMemberApi } from '../../Redux/Api/AddGroupMemberApi';
import DashedLoader from '../../components/DashedLoader';
import { AddGroupExpenseApi } from '../../Redux/Api/AddGroupExpenseApi';
import { GetGroupExpenseApi } from '../../Redux/Api/GetGroupExpenseApi';
import { DeleteGroupMemberApi } from '../../Redux/Api/DeleteGroupMembersApi';
import CustomAlert from '../../components/CustomAlert';

const GroupDetails = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const { GetFriendsData } = useSelector(state => state.GetFriends || {});
  const { GetGroupMembersData, GetGroupMembersLoading } = useSelector(
    state => state.GetGroupMembers || {},
  );
  const { LoginData } = useSelector(state => state.Login || {});
  const { GetGroupExpenseData, GetGroupExpenseLoading } = useSelector(
    state => state.GetGroupExpense || {},
  );
  const { AddGroupExpenseLoading } = useSelector(
    state => state.AddGroupExpense || {},
  );
  const styles = useMemo(() => getGroupDetailsStyle(colors), [colors]);
  const dispatch = useDispatch();
  const loading = GetGroupExpenseLoading || AddGroupExpenseLoading || GetGroupMembersLoading;
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const group = route?.params?.group;

  const [expenseFormOpen, setExpenseFormOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [snack, setSnack] = useState({ visible: false, message: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupExpenses, setGroupExpenses] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [deleteMember, setDeleteMember] = useState(null);
  

  const fetchGroupData = () => {
    if (LoginData?.token && group?.id) {
      dispatch(GetGroupMembersApi(LoginData.token));
      dispatch(GetGroupExpenseApi({ token: LoginData.token, id: group.id }));
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [group]);

  useEffect(() => {
    if (GetGroupMembersData?.members && group?.id) {
      const filteredMembers = GetGroupMembersData.members.filter(
        member => String(member.group_id) === String(group.id),
      );
      setGroupMembers(filteredMembers);
    }
  }, [GetGroupMembersData, group]);

  useEffect(() => {
    if (GetGroupExpenseData?.group) {
      setGroupExpenses(GetGroupExpenseData.group);
    }
  }, [GetGroupExpenseData]);

  useEffect(() => {
    if (GetFriendsData?.friends) {
      setFriendList(GetFriendsData.friends);
    }
  }, [GetFriendsData]);

  const handleAddMember = async selectedFriends => {
    const token = LoginData?.token;
    
    if (!token || !group?.id) {
      showSnack('Authentication or group information is missing.');
      return;
    }

    const finalMembersPayload = selectedFriends.map(friend => ({
      user_id: friend.id,
      role: 'member',
    }));

    const apiPayload = { group_id: group.id, members: finalMembersPayload };

    try {
      const result = await dispatch(
        AddGroupMemberApi({ payload: apiPayload, token }),
      ).unwrap();
      if (result?.status === true || result?.status === 'true') {
        showSnack(result?.message || 'Members added successfully!');
        fetchGroupData();
        setModalVisible(false);
      } else {
        showSnack(result?.message || 'Failed to add members.');
      }
    } catch (error) {
      showSnack(error?.message || 'Something went wrong.');
    }
  };

  const handleViewExpense = expense => {
    navigation.navigate('GroupExpense', {
      expense: expense, 
      members: groupMembers,
    });
  };

  const handleSaveExpense = async expenseData => {
    const token = LoginData?.token;
    if (!token || !group?.id) {
      showSnack('Authentication or group data is missing.');
      return;
    }
    const payer = groupMembers.find(
      m => m.user?.fullname === expenseData.paidBy,
    );
    if (!payer) {
      showSnack('Could not identify who paid. Please select again.');
      return;
    }
    const apiPayload = {
      description: expenseData.description,
      amount: expenseData.amount,
      paid_by_user_id: payer.user_id,
      split_among_user_id: expenseData.splitAmong,
      date: expenseData.date,
    };
    try {
      const result = await dispatch(
        AddGroupExpenseApi({ payload: apiPayload, token, groupId: group.id }),
      ).unwrap();
      if (result?.status === true || result?.status === 'true') {
        showSnack(result?.message || 'Expense added successfully!');
        setExpenseFormOpen(false);
        fetchGroupData();
      } else {
        showSnack(result?.message || 'Failed to add expense.');
      }
    } catch (error) {
      showSnack(error?.message || 'Something went wrong while adding expense.');
    }
  };

  const availableFriendsToAdd = useMemo(() => {
    const memberUserIds = new Set(groupMembers.map(member => member.user_id));
    return friendList.filter(friend => !memberUserIds.has(friend.id));
  }, [friendList, groupMembers]);

  const totalSpent = useMemo(
    () =>
      groupExpenses.reduce(
        (sum, expense) => sum + parseFloat(expense.amount),
        0,
      ),
    [groupExpenses],
  );

  const budget = parseFloat(group?.group_budget) || 0;
  const percentage =
    budget > 0 ? Math.min(100, (totalSpent / budget) * 100) : 0;
  const remaining = budget - totalSpent;

  const showSnack = message => setSnack({ visible: true, message });
  const handleBack = () =>
    navigation.canGoBack()
      ? navigation.goBack()
      : navigation.navigate('settle');
  
  const openAddExpenseModal = () => {
    setSelectedExpense(null);
    setExpenseFormOpen(true);
  };
  
  const handleDeleteMember = async (member) => {
    setDeleteMember(member);
    setAlertVisible(true);
  }

  const finalDeleteMember = async () => {
    const token = LoginData?.token;
    const apiPayload = {
      user_id: deleteMember.user_id,
      group_id: deleteMember.group_id,
    };
    try {
      const result = await dispatch(
        DeleteGroupMemberApi({ payload: apiPayload, token }),
      ).unwrap();
      if (result?.status === true || result?.status === 'true') {
        showSnack(result?.message);
        setAlertVisible(false);
        fetchGroupData();
      } else {
        showSnack(result?.message || 'Failed to remove member.');
      }
    } catch (error) {
      showSnack(error?.message || 'Something went wrong while removing member.');
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {group?.group_name || 'Group Details'}
        </Text>
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
                ₹{remaining?.toLocaleString()}
              </Text>
            </View>
            <View style={styles.circularIcon}>
              <TrendingUp size={24} color={colors.text} />
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>
                Spent: ₹{totalSpent?.toLocaleString()}
              </Text>
              <Text style={styles.progressText}>{percentage?.toFixed(0)}%</Text>
            </View>
            <ProgressBar
              progress={percentage / 100}
              color={colors.theme}
              style={styles.progressBar}
            />
            <Text style={styles.totalBudgetLabel}>
              Total Budget: ₹{budget?.toLocaleString()}
            </Text>
          </View>
        </View>
        {group?.description && (
          <Text style={styles.description}>{group.description}</Text>
        )}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Members ({groupMembers.length})
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.smallBtn}
            >
              <UserPlus size={16} color={colors.theme} />
              <Text style={styles.smallBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            {GetGroupMembersLoading ? (
              <DashedLoader />
            ) : groupMembers.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No members have been added yet.
                </Text>
              </View>
            ) : (
              groupMembers.map((member, index) => (
                <View key={member.id}>
                  <View style={styles.memberRow}>
                    <View style={styles.row}>
                      <Avatar.Text
                        size={40}
                        label={(member.user?.fullname || 'NA')
                          .substring(0, 2)
                          .toUpperCase()}
                        style={styles.avatar}
                        labelStyle={styles.avatarLabel}
                      />
                      <View style={{ marginLeft: 12 }}>
                        <Text style={styles.memberName}>
                          {member.user?.fullname || 'Unknown Member'}
                          {member.user_id === LoginData?.user?.id && (
                            <Text style={{ color: colors.textSecondary }}>
                              {' '}
                              (You)
                            </Text>
                          )}
                        </Text>
                        <View style={styles.adminBadge}>
                          <Text style={styles.adminText}>
                            {member?.role?.charAt(0).toUpperCase() +
                              member?.role?.slice(1)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {member.role !== 'admin' && (
                      <TouchableOpacity
                        onPress={() => handleDeleteMember(member)}
                      >
                        <Trash2 size={18} color={colors.error} />
                      </TouchableOpacity>
                    )}
                  </View>
                  {index < groupMembers.length - 1 && (
                    <Divider style={styles.divider} />
                  )}
                </View>
              ))
            )}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <TouchableOpacity
              onPress={openAddExpenseModal}
              style={styles.addButton}
            >
              <Plus size={20} color={colors.text} />
              <Text style={styles.addButtonText}>Add Group Expense</Text>
            </TouchableOpacity>
          </View>
          {groupExpenses.length === 0 ? (
            <View style={styles.listContainer}>
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No expenses recorded yet.</Text>
              </View>
            </View>
          ) : (
            groupExpenses.map(expense => {
              const payer = groupMembers.find(
                m => m.user_id === expense.paid_by_user_id,
              );
              const paidByName =
                payer?.user_id === LoginData?.user?.id
                  ? 'You'
                  : payer?.user?.fullname || 'Unknown';
              return (
                <TouchableOpacity
                  key={expense.id}
                  onPress={() => handleViewExpense(expense)}
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
                            {paidByName}
                          </Text>{' '}
                          • {expense.date}
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.expenseAmount}>
                          ₹{parseFloat(expense.amount).toLocaleString()}
                        </Text>
                        <Text style={styles.splitText}>
                          for {expense.splitexpense.length}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        title="Delete Member"
        message="Are you sure you want to delete this Member?"
        showCancel={true}
        cancelText="Cancel"
        confirmText="Delete"
        onCancel={() => setAlertVisible(false)}
        onConfirm={finalDeleteMember}
      />

      <AddGroupMemberModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddMember}
        friends={availableFriendsToAdd}
      />
      <AddGroupExpenseModal
        visible={expenseFormOpen}
        onClose={() => setExpenseFormOpen(false)}
        onSubmit={handleSaveExpense}
        groupMembers={groupMembers}
        currentUser={groupMembers?.find(m => m.user_id === LoginData?.user?.id)}
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
      {loading && <DashedLoader color={colors.primary} size={100} />}
    </View>
  );
};

export default GroupDetails;