import React, { useState, useContext, useMemo, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
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

const GroupSettle = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getGroupSettleStyle(colors), [colors]);
  const insets = useSafeAreaInsets();

  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [groupFormOpen, setGroupFormOpen] = useState(false);
  const [settleModalOpen, setSettleModalOpen] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(null);

  const [friendCode, setFriendCode] = useState('');
  const [snack, setSnack] = useState({ visible: false, message: '' });
  const { LoginData } = useSelector(state => state.Login);
  const { GetFriendsData } = useSelector(state => state.GetFriends || {});
  const { GetGroupsData } = useSelector(state => state.GetGroups || {});
  const [group, setGroup] = useState([]);
  
  const dispatch = useDispatch();


  const [friends, setFriends] = useState([]);


  const paymentLogs = [
    {
      id: '1',
      friendId: '2',
      friendName: 'Priya Sharma',
      amount: 400,
      description: 'Movie tickets',
      type: 'owe',
    },
    {
      id: '2',
      friendId: '1',
      friendName: 'Alex Kumar',
      amount: 250,
      description: 'Lunch',
      type: 'owed',
    },
  ];
  const userCode = LoginData?.user?.code;
  const shareableLink = 'https://splurge.app/invite/2K4X9';

  const showSnack = message => setSnack({ visible: true, message });
  const fetchFriends = () => {
    if (LoginData?.token && LoginData?.user?.id) {
      dispatch(GetFriendsApi({ token: LoginData.token, id: LoginData.user.id }));
      dispatch(GetGroupsApi({ token: LoginData.token, id: LoginData.user.id }));

    }
  }

  useEffect(() => {
   fetchFriends();
  }, []);

  useEffect(() => {
    if (GetFriendsData?.friends) {
      setFriends(GetFriendsData.friends);
    }
  }, [GetFriendsData]);

  useEffect(() => {
    if (GetGroupsData?.group_list) {
      setGroup(GetGroupsData.group_list);
    }
  }, [GetGroupsData]);

  const handleCopyCode = () => {
    Clipboard.setString(userCode);
    showSnack('Code copied!');
  };

  const handleCopyLink = () => {
    Clipboard.setString(shareableLink);
    showSnack('Link copied!');
  };

  const handleAddFriend = async() => {
    if (!friendCode.trim()) {
      showSnack('Enter a valid friend code');
      return;
    }
    if (friendCode === userCode) {
      showSnack('You cannot add yourself as a friend');
      return;
    }
    const token = LoginData?.token;
    const formData = new FormData();
    formData.append('user_id', LoginData?.user?.id);
    formData.append('friend_code', friendCode);
    try {
          const result = await dispatch(AddFriendApi({ formData, token })).unwrap();
          if (result?.status === true || result?.status === "true") {
            showSnack(result?.message);
            setFriendCode('');
            fetchFriends();
          } else {
            showSnack(result?.message);
            fetchFriends();
          }
        } catch (error) {
          showSnack("Something went wrong. Please try again.");
        } finally {
          // setToastVisible(true);
        }
  };

  const handleViewGroup = groupId => {
    try {
      navigation.navigate('groupDetails', { id: groupId });
    } catch (e) {
      console.log('Navigation error: ', e);
      showSnack(`Open group ${groupId}`);
    }
  };
  const handleCreateGroup = async (data) => {
    if (!data?.groupName || !data?.budget) {
      showSnack("Please fill all required fields");
      return;
    }
  
    const token = LoginData?.token;
  
    const formData = new FormData();
    formData.append("user_id", LoginData?.user?.id);
    formData.append("group_name", data.groupName);
    formData.append("group_budget", data.budget);
    formData.append("description", data.description || "");
  
    try {
      const result = await dispatch(AddGroupApi({ formData, token })).unwrap();
  
      if (result?.status === true || result?.status === "true") {
        showSnack(result?.message);
        fetchFriends();
      } else {
        showSnack(result?.message);
        fetchFriends();
      }
  
    } catch (error) {
      showSnack("Something went wrong. Please try again.");
    } finally {
      // setGroupFormOpen(false);
    }
  };
  

  const handleRemind = friend => {
    showSnack(`Reminder sent to ${friend.name} for ₹${friend.owes}`);
  };

  const handleOpenSettle = friend => {
    setSelectedFriend(friend);
    setSettleModalOpen(true);
  };

  const handleSettleUpSave = data => {
    const updatedFriends = friends.map(f => {
      if (f.id === data.friendId) {
        return { ...f, owes: 0, owed: 0 };
      }
      return f;
    });
    setFriends(updatedFriends);

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
                placeholder="Enter friend code (e.g., SPL-X9)"
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
                <Text style={styles.linkText}>+ Add Log</Text>
              </TouchableOpacity>
            </View>

            {friends?.map(friend => (
              <View
                key={friend.id}
                style={[styles.friendCard, { paddingBottom: 12 }]}
              >
                <View style={styles.row}>
                  <Avatar.Text
                    size={48}
                    label={friend?.fullname
                      ?.split(' ')
                      .map(n => n[0])
                      .join('')}
                    style={styles.avatar}
                    labelStyle={styles.avatarLabel}
                  />
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{friend.fullname}</Text>
                    {friend.owed === 0 && friend.owes === 0 ? (
                      <Text style={styles.settledText}>All settled up</Text>
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
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                      borderTopWidth: 1,
                      borderTopColor: colors.border,
                      paddingTop: 10,
                      justifyContent: 'flex-end',
                    }}
                  >
                    {friend.owes > 0 && (
                      <TouchableOpacity
                        onPress={() => handleRemind(friend)}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: 15,
                          paddingVertical: 5,
                        }}
                      >
                        <Bell
                          size={16}
                          color={colors.theme}
                          style={{ marginRight: 6 }}
                        />
                        <Text
                          style={{
                            color: colors.theme,
                            fontSize: 13,
                            fontWeight: '600',
                          }}
                        >
                          Remind
                        </Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      onPress={() => handleOpenSettle(friend)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: colors.background,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: colors.theme,
                      }}
                    >
                      <CheckCircle
                        size={16}
                        color={colors.text}
                        style={{ marginRight: 6 }}
                      />
                      <Text
                        style={{
                          color: colors.text,
                          fontSize: 13,
                          fontWeight: 'bold',
                        }}
                      >
                        Settle Up
                      </Text>
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

            {group?.map(group => {
              const percentage = Math.min(
                100,
                (group?.spent / group?.group_budget) * 100,
              );
              return (
                <TouchableOpacity
                  key={group.id}
                  activeOpacity={0.7}
                  onPress={() => handleViewGroup(group.id)}
                >
                  <View style={styles.groupCard}>
                    <View style={styles.rowBetween}>
                      <View style={styles.row}>
                        <View style={styles.groupIconBg}>
                          <Users size={18} color={colors.theme} />
                        </View>
                        <View>
                          <Text style={styles.groupName}>{group?.group_name}</Text>
                          <Text style={styles.groupMembers}>
                            {group?.members} members
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.amountText}>
                        ₹{group?.spent?.toLocaleString()}
                      </Text>
                    </View>

                    <View style={styles.progressContainer}>
                      <View style={styles.rowBetween}>
                        <Text style={styles.progressLabel}>Budget Used</Text>
                        <Text style={styles.progressLabel}>
                          {percentage?.toFixed(0)}%
                        </Text>
                      </View>
                      <ProgressBar
                        progress={percentage / 100}
                        color={colors.theme}
                        style={styles.progressBar}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {paymentLogs.map(log => (
              <View key={log.id} style={styles.logCard}>
                <View style={styles.row}>
                  <View
                    style={[
                      styles.logIcon,
                      {
                        backgroundColor:
                          log.type === 'owed'
                            ? 'rgba(0, 230, 118, 0.1)'
                            : 'rgba(207, 102, 121, 0.1)',
                      },
                    ]}
                  >
                    {log.type === 'owed' ? (
                      <TrendingUp size={16} color={colors.success} />
                    ) : (
                      <TrendingDown size={16} color={colors.error} />
                    )}
                  </View>
                  <View>
                    <Text style={styles.logTitle}>
                      {log.type === 'owed'
                        ? `${log.friendName} owes you`
                        : `You owe ${log.friendName}`}
                    </Text>
                    <Text style={styles.logDesc}>{log.description}</Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.logAmount,
                    {
                      color:
                        log.type === 'owed' ? colors.success : colors.error,
                    },
                  ]}
                >
                  {log.type === 'owed' ? '+' : '-'}₹{log.amount}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <AddPaymentLogModal
        visible={paymentFormOpen}
        onClose={() => setPaymentFormOpen(false)}
        friends={friends}
        onSave={data => {
          console.log('Payment Log Saved:', data);
          setPaymentFormOpen(false);
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
