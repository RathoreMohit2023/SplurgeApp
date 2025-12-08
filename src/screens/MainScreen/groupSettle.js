import React, { useState, useContext, useMemo, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import { Text, Avatar, Snackbar, ProgressBar } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Copy,
  Users,
  TrendingUp,
  TrendingDown,
  UserPlus2,
  ArrowUpRight,
  History,
  Bell,
  CheckCircle,
  User,
} from 'lucide-react-native';
import AddPaymentLogModal from '../../Modals/AddPaymentLogModal';
import CreateGroupModal from '../../Modals/CreateGroupModal';
import SettleUpModal from '../../Modals/SettleUpModal';
import getGroupSettleStyle from '../../styles/MainScreen/groupSettleStyle';
import { ThemeContext } from '../../components/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { AddFriendApi } from '../../Redux/Api/AddFriendApi';
import { GetFriendsApi } from '../../Redux/Api/GetFriendsApi';
import { AddGroupApi } from '../../Redux/Api/AddGroupApi';
import { GetGroupsApi } from '../../Redux/Api/GetGroupsAPi';
import { GetGroupMembersApi } from '../../Redux/Api/GetGroupMemberApi';
import { GetGroupExpenseApi } from '../../Redux/Api/GetGroupExpenseApi';
import { AddPaymentLogApi } from '../../Redux/Api/AddPaymentLogApi';
import { GetPaymentLogApi } from '../../Redux/Api/GetPaymentLogApi';

const GroupSettle = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getGroupSettleStyle(colors), [colors]);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { LoginData } = useSelector(state => state.Login);
  const { GetFriendsData } = useSelector(state => state.GetFriends || {});
  const { GetGroupsData } = useSelector(state => state.GetGroups || {});
  const { GetGroupExpenseData } = useSelector(
    state => state.GetGroupExpense || {},
  );
  const { GetGroupMembersData } = useSelector(
    state => state.GetGroupMembers || {},
  );

  const { GetPaymentLogData } = useSelector(state => state.GetPaymentLog || {});
  const { DeleteGroupExpenseLoading } = useSelector(
    state => state.DeleteGroupExpense || {},
  )

  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [groupFormOpen, setGroupFormOpen] = useState(false);
  const [settleModalOpen, setSettleModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendCode, setFriendCode] = useState('');
  const [snack, setSnack] = useState({ visible: false, message: '' });

  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);

  const [groupMemberCounts, setGroupMemberCounts] = useState({});
  const [myGroupIds, setMyGroupIds] = useState([]);
  const [groupExpenses, setGroupExpenses] = useState([]);

  const userCode = LoginData?.user?.code;
  const userId = LoginData?.user?.id;
  const shareableLink = 'https://splurge.app/invite/2K4X9';

  const showSnack = message => setSnack({ visible: true, message });

  const fetchInitialData = () => {
    if (LoginData?.token && LoginData?.user?.id) {
      dispatch(
        GetFriendsApi({ token: LoginData.token, id: LoginData.user.id }),
      );
      dispatch(GetGroupsApi(LoginData.token));
      dispatch(GetGroupMembersApi(LoginData.token));
      dispatch(GetPaymentLogApi(LoginData.token));
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  // --- Friend List Calculation Logic (Kept as requested) ---
  useEffect(() => {
    const rawFriends = GetFriendsData?.friends || [];
    const logs = GetPaymentLogData?.payment_logs || [];

    if (rawFriends.length > 0) {
      const balanceMap = {};

      logs.forEach(log => {
        // Filter: Ensure we only calculate based on logs belonging to this user
        if (String(log.user_id) === String(userId)) {
          const amount = parseFloat(log.amount) || 0;
          const friendId = log.friend_id;

          if (!balanceMap[friendId]) balanceMap[friendId] = 0;

          if (log.type === "They owe") {
            balanceMap[friendId] += amount;
          } else if (log.type === "I owe") {
            balanceMap[friendId] -= amount;
          }
        }
      });

      const calculatedFriends = rawFriends.map(friend => {
        const netBalance = balanceMap[friend.id] || 0;
        return {
          ...friend,
          owes: netBalance > 0 ? netBalance : 0,
          owed: netBalance < 0 ? Math.abs(netBalance) : 0,
        };
      });

      setFriends(calculatedFriends);
    }
  }, [GetFriendsData, GetPaymentLogData, userId]);


  // --- Recent Activity Logic (Dynamic) ---
  const recentActivityLogs = useMemo(() => {
    if (!GetPaymentLogData?.payment_logs || !userId) return [];

    // 1. Filter logs where user_id matches logged-in user
    const userLogs = GetPaymentLogData.payment_logs.filter(
      log => String(log.user_id) === String(userId)
    );

    // 2. Map data for UI
    const mappedLogs = userLogs.map(log => {
      // Find friend name from existing friends list
      const friend = friends.find(f => String(f.id) === String(log.friend_id));
      const friendName = friend ? friend.fullname : 'Unknown User';
      
      // Determine direction: "They owe" = Incoming (Green), "I owe" = Outgoing (Red)
      const isIncoming = log.type === "They owe"; 

      return {
        id: log.id,
        friendName: friendName,
        amount: parseFloat(log.amount).toFixed(2),
        description: log.description,
        date: log.date,
        isIncoming: isIncoming,
      };
    });

    // 3. Sort by Date (Newest first)
    return mappedLogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  }, [GetPaymentLogData, userId, friends]);


  useEffect(() => {
    if (GetGroupsData?.group_list) {
      setGroups(GetGroupsData.group_list);
    }
  }, [GetGroupsData]);

  useEffect(() => {
    if (GetGroupMembersData?.members) {
      const membersList = GetGroupMembersData.members;

      const newCounts = {};
      const foundMyGroupIds = [];

      membersList.forEach(member => {
        const gId = member.group_id;

        if (newCounts[gId]) {
          newCounts[gId] += 1;
        } else {
          newCounts[gId] = 1;
        }

        if (String(member.user_id) === String(userId)) {
          if (!foundMyGroupIds.includes(gId)) {
            foundMyGroupIds.push(gId);
          }
        }
      });

      setGroupMemberCounts(newCounts);
      setMyGroupIds(foundMyGroupIds);
    }
  }, [GetGroupMembersData, userId]);

  useEffect(() => {
    if (groups.length > 0 && LoginData?.token) {
      const fetchExpenses = async () => {
        const expensePromises = groups.map(g =>
          dispatch(
            GetGroupExpenseApi({ token: LoginData.token, id: g.id }),
          ).unwrap(),
        );

        try {
          const expenseResults = await Promise.all(expensePromises);
          let allExpenses = [];
          expenseResults.forEach(result => {
            if (result?.group && Array.isArray(result.group)) {
              allExpenses = [...allExpenses, ...result.group];
            }
          });
          setGroupExpenses(allExpenses);
        } catch (error) {
          console.log('Expense fetch error', error);
        }
      };
      fetchExpenses();
    }
  }, [groups, LoginData?.token, dispatch, DeleteGroupExpenseLoading]);

  useEffect(() => {
    if (GetGroupExpenseData?.group) {
      setGroupExpenses(prev => [...prev, ...GetGroupExpenseData.group]);
    }
  }, [GetGroupExpenseData]);

  const groupSpentMap = useMemo(() => {
    const map = {};
    if (groupExpenses && groupExpenses.length > 0) {
      const uniqueExpenses = [
        ...new Map(groupExpenses.map(item => [item['id'], item])).values(),
      ];

      uniqueExpenses.forEach(expense => {
        const gId = expense.group_id;
        const amount = parseFloat(expense.amount) || 0;

        if (map[gId]) {
          map[gId] += amount;
        } else {
          map[gId] = amount;
        }
      });
    }
    return map;
  }, [groupExpenses]);

  const handleCopyCode = () => {
    Clipboard.setString(userCode);
    showSnack('Your Splurge ID copied!');
  };

  const handleCopyLink = () => {
    Clipboard.setString(shareableLink);
    showSnack('Invite link copied!');
  };

  const handleAddFriend = async () => {
    if (!friendCode.trim()) {
      showSnack('Please enter a valid friend code');
      return;
    }
    if (friendCode.trim() === userCode) {
      showSnack('You cannot add yourself as a friend');
      return;
    }
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('user_id', LoginData?.user?.id);
    formData.append('friend_code', friendCode);
    try {
      const result = await dispatch(AddFriendApi({ formData, token })).unwrap();
      if (result?.status === true || result?.status === 'true') {
        showSnack(result?.message);
        setFriendCode('');
        dispatch(
          GetFriendsApi({ token: LoginData.token, id: LoginData.user.id }),
        );
      } else {
        showSnack(result?.message);
      }
    } catch (error) {
      showSnack('Something went wrong. Please try again.');
    }
  };

  const handleAddPaymentLog = async data => {
    if (!LoginData?.user?.id) {
      showSnack('User information missing. Please login again.');
      return;
    }
    try {
      const dateObj = new Date(data.date);
      const formattedDate = dateObj.toISOString().split('T')[0];
      let apiType = '';
      if (data.type.value === 'i_owe_them') {
        apiType = 'I owe';
      } else {
        apiType = 'They owe';
      }

      const formData = new FormData();
      formData.append('user_id', LoginData.user.id);
      formData.append('friend_id', data.friend.value);
      formData.append('type', apiType);
      formData.append('amount', data.amount);
      formData.append('date', formattedDate);
      formData.append('description', data.description);

      const result = await dispatch(
        AddPaymentLogApi({ formData, token: LoginData.token }),
      ).unwrap();

      if (result.status === true) {
        showSnack('Payment log added successfully!');
        setPaymentFormOpen(false);
        fetchInitialData();
      } else {
        showSnack(result.message || 'Failed to add log');
      }
    } catch (error) {
      console.error('Error creating payment log:', error);
      showSnack('Something went wrong');
    }
  };

  const handleViewGroup = group => {
    navigation.navigate('groupDetails', { group: group });
  };

  const handleCreateGroup = async data => {
    if (!data?.groupName || !data?.budget) {
      showSnack('Please provide group name and budget');
      return;
    }
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('user_id', LoginData?.user?.id);
    formData.append('group_name', data.groupName);
    formData.append('group_budget', data.budget);
    formData.append('description', data.description || '');
    try {
      const result = await dispatch(AddGroupApi({ formData, token })).unwrap();
      if (result?.status === true || result?.status === 'true') {
        showSnack(result?.message);
        fetchInitialData();
        setGroupFormOpen(false);
      } else {
        showSnack(result?.message);
      }
    } catch (error) {
      showSnack('Something went wrong. Please try again.');
    }
  };

  const handleRemind = friend => {
    showSnack(`Reminder sent to ${friend.fullname}`);
  };

  const handleOpenSettle = friend => {
    setSelectedFriend(friend);
    setSettleModalOpen(true);
  };

  const handleSettleUpSave = data => {
    showSnack('Settlement recorded successfully!');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 90,
          paddingTop: 20,
        }}
      >
        <View style={styles.inner}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Group Settle</Text>
              <Text style={styles.subtitle}>Split bills, not friendships.</Text>
            </View>
            <TouchableOpacity style={styles.headerIconBtn}>
              <History size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroTopRow}>
              <Text style={styles.heroLabel}>Your Splurge ID</Text>
              <TouchableOpacity
                onPress={handleCopyLink}
                style={styles.shareBadge}
              >
                <Text style={styles.shareText}>Share Link</Text>
                <ArrowUpRight size={14} color={colors.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{userCode}</Text>
              <TouchableOpacity onPress={handleCopyCode} style={styles.copyBtn}>
                <Copy size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputCard}>
            <View style={styles.inputRow}>
              <View style={styles.inputIcon}>
                <UserPlus2 size={22} color={colors.theme} />
              </View>
              <TextInput
                placeholder="Enter friend code (e.g., SPL-12345)"
                placeholderTextColor={colors.textDisabled}
                value={friendCode}
                onChangeText={setFriendCode}
                style={styles.textInput}
                autoCapitalize="characters"
              />
              <TouchableOpacity onPress={handleAddFriend} style={styles.addBtn}>
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Friends</Text>
              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() => setPaymentFormOpen(true)}
              >
                <Text style={styles.linkText}>+ Add Payment Log</Text>
              </TouchableOpacity>
            </View>
            {friends?.length === 0 && (
              <View style={styles.groupCard}>
                <Text style={styles.progressLabel}>No friends found.</Text>
              </View>
            )}
            {friends?.map(friend => (
              <View
                key={friend.id}
                style={[styles.friendCard, { paddingBottom: 12 }]}
              >
                <View style={styles.row}>
                  <Avatar.Text
                    size={48}
                    label={(friend.fullname || 'NA')
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                    style={styles.avatar}
                    labelStyle={styles.avatarLabel}
                  />
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{friend.fullname}</Text>
                    {friend.owed === 0 && friend.owes === 0 ? (
                      <Text style={styles.settledText}>No Log Found</Text>
                    ) : (
                      <View style={styles.statusRow}>
                        {friend.owes > 0 && (
                          <Text
                            style={[
                              styles.statusText,
                              { color: colors.success },
                            ]}
                          >
                            Owes you ₹{friend.owes}
                          </Text>
                        )}
                        {friend.owed > 0 && (
                          <Text
                            style={[styles.statusText, { color: colors.error }]}
                          >
                            You owe ₹{friend.owed}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                  <View style={styles.actionIcon}>
                    {friend.owes > 0 ? (
                      <TrendingUp size={20} color={colors.success} />
                    ) : friend.owed > 0 ? (
                      <TrendingDown size={20} color={colors.error} />
                    ) : (
                      <User size={20} color={colors.theme} />
                    )}
                  </View>
                </View>
                {(friend.owes > 0 || friend.owed > 0) && (
                  <View style={styles.friendCardActions}>
                    {friend.owes > 0 && (
                      <TouchableOpacity
                        onPress={() => handleRemind(friend)}
                        style={styles.remindButton}
                      >
                        <Bell
                          size={16}
                          color={colors.theme}
                          style={{ marginRight: 6 }}
                        />
                        <Text style={styles.remindButtonText}>Remind</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      onPress={() => handleOpenSettle(friend)}
                      style={styles.settleButton}
                    >
                      <CheckCircle
                        size={16}
                        color={colors.text}
                        style={{ marginRight: 6 }}
                      />
                      <Text style={styles.settleButtonText}>Settle Up</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Groups</Text>
              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() => setGroupFormOpen(true)}
              >
                <Text style={styles.linkText}>Create New</Text>
              </TouchableOpacity>
            </View>
            {groups?.length === 0 && (
              <View style={styles.groupCard}>
                <Text style={styles.progressLabel}>No groups found.</Text>
              </View>
            )}
            {groups?.map(group => {
              const isAdmin = String(group.group_admin) === String(userId);
              const isMember = myGroupIds.includes(group.id);

              if (!isAdmin && !isMember) {
                return null;
              }

              const budget = parseFloat(group.group_budget) || 0;
              const totalSpent = groupSpentMap[group.id] || 0;
              const percentage =
                budget > 0 ? Math.min(100, (totalSpent / budget) * 100) : 0;
              const remaining = budget - totalSpent;
              const isOverBudget = remaining < 0;

              let progressColor = colors.success;
              if (percentage > 50) progressColor = colors.warning;
              if (percentage > 85) progressColor = colors.error;

              return (
                <TouchableOpacity
                  key={group.id}
                  activeOpacity={0.7}
                  onPress={() => handleViewGroup(group)}
                >
                  <View style={styles.groupCard}>
                    <View style={styles.rowBetween}>
                      <View style={styles.row}>
                        <View
                          style={[
                            styles.groupIconBg,
                            { backgroundColor: colors.tintedThemeColor },
                          ]}
                        >
                          <Users size={18} color={colors.theme} />
                        </View>
                        <View>
                          <Text style={styles.groupName}>
                            {group.group_name}
                          </Text>
                          <Text style={styles.groupMembers}>
                            {groupMemberCounts[group.id] || 0} members
                          </Text>
                        </View>
                      </View>

                      <View style={{ alignItems: 'flex-end' }}>
                        <Text
                          style={[
                            styles.amountText,
                            {
                              color: isOverBudget ? colors.error : colors.text,
                            },
                          ]}
                        >
                          ₹{Math.abs(remaining).toLocaleString()}
                        </Text>
                        <Text
                          style={{ fontSize: 10, color: colors.textSecondary }}
                        >
                          {isOverBudget ? 'Over Budget' : 'Remaining'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.progressContainer}>
                      <View style={styles.rowBetween}>
                        <Text
                          style={[
                            styles.progressLabel,
                            { color: colors.textSecondary },
                          ]}
                        >
                          Spent: ₹{totalSpent.toLocaleString()}
                        </Text>
                        <Text
                          style={[
                            styles.progressLabel,
                            { fontWeight: '700', color: progressColor },
                          ]}
                        >
                          {percentage.toFixed(0)}%
                        </Text>
                      </View>
                      <ProgressBar
                        progress={percentage / 100}
                        color={progressColor}
                        style={[
                          styles.progressBar,
                          {
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: colors.border,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {recentActivityLogs.length === 0 ? (
                <View style={styles.groupCard}>
                  <Text style={styles.progressLabel}>No recent activity found.</Text>
                </View>
            ) : (
                recentActivityLogs.map(log => (
                  <View key={log.id} style={styles.logCard}>
                    <View style={styles.row}>
                      <View
                        style={[
                          styles.logIcon,
                          {
                            backgroundColor:
                              log.isIncoming
                                ? 'rgba(0, 230, 118, 0.1)' // Green bg
                                : 'rgba(207, 102, 121, 0.1)', // Red bg
                          },
                        ]}
                      >
                        {log.isIncoming ? (
                          <TrendingUp size={16} color={colors.success} />
                        ) : (
                          <TrendingDown size={16} color={colors.error} />
                        )}
                      </View>
                      <View>
                        <Text style={styles.logTitle}>
                          {log.isIncoming
                            ? `${log.friendName} owes you`
                            : `You owe ${log.friendName}`}
                        </Text>
                        <Text style={styles.logDesc}>{log.description}</Text>
                        <Text style={{fontSize: 10, color: colors.textSecondary}}>{log.date}</Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.logAmount,
                        {
                          color:
                            log.isIncoming ? colors.success : colors.error,
                        },
                      ]}
                    >
                      {log.isIncoming ? '+' : '-'}₹{log.amount}
                    </Text>
                  </View>
                ))
            )}
          </View>
        </View>
      </ScrollView>

      <AddPaymentLogModal
        visible={paymentFormOpen}
        onClose={() => setPaymentFormOpen(false)}
        friends={friends}
        onSave={data => {
          handleAddPaymentLog(data);
        }}
      />
      <CreateGroupModal
        visible={groupFormOpen}
        onClose={() => setGroupFormOpen(false)}
        onSubmit={handleCreateGroup}
      />
      <SettleUpModal
        visible={settleModalOpen}
        onClose={() => setSettleModalOpen(false)}
        friend={selectedFriend}
        onSave={handleSettleUpSave}
      />
      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: '' })}
        duration={2000}
        style={{
          backgroundColor: colors.card,
          marginBottom: insets.bottom + 80,
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

export default GroupSettle;