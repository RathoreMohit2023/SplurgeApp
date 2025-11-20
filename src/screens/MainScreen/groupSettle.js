import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { Card, Text, Button, Avatar, Badge, Dialog, Portal, Paragraph, Snackbar, ProgressBar } from "react-native-paper";
import Clipboard from "@react-native-clipboard/clipboard";
import { Copy, Users, UserPlus, Plus, TrendingUp, TrendingDown, UserPlus2 } from "lucide-react-native";
import groupSettleStyle from "../../styles/MainScreen/groupSettleStyle";

const GroupSettle = ({ navigation }) => {
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [groupFormOpen, setGroupFormOpen] = useState(false);
  const [friendCode, setFriendCode] = useState("");
  const [snack, setSnack] = useState({ visible: false, message: "" });

  const friends = [
    { id: "1", name: "Alex Kumar", points: 850, owes: 0, owed: 250 },
    { id: "2", name: "Priya Sharma", points: 1200, owes: 400, owed: 0 },
    { id: "3", name: "Rahul Verma", points: 650, owes: 0, owed: 150 },
  ];

  const groups = [
    { id: "1", name: "Weekend Trip", members: 4, budget: 10000, spent: 6500 },
    { id: "2", name: "Study Group", members: 5, budget: 3000, spent: 1200 },
  ];

  const paymentLogs = [
    { id: "1", friendId: "2", friendName: "Priya Sharma", amount: 400, description: "Movie tickets", type: "owe" },
    { id: "2", friendId: "1", friendName: "Alex Kumar", amount: 250, description: "Lunch", type: "owed" },
  ];

  const userCode = "SPL-2K4X9";
  const shareableLink = "https://splurge.app/invite/2K4X9";

  const showSnack = (message) => setSnack({ visible: true, message });

  const handleCopyCode = () => {
    Clipboard.setString(userCode);
    showSnack("Code copied to clipboard");
  };

  const handleCopyLink = () => {
    Clipboard.setString(shareableLink);
    showSnack("Link copied to clipboard");
  };

  const handleAddFriend = () => {
    if (!friendCode.trim()) {
      showSnack("Enter a valid friend code");
      return;
    }
    // TODO: call API or add to state
    showSnack(`Friend request sent to ${friendCode}`);
    setFriendCode("");
  };

  const handleViewGroup = (groupId) => {
    // navigate to group detail if you have a screen
    navigation.navigate("groupDetails", { id: groupId })
    showSnack(`Open group ${groupId}`);
  };

  return (
    <>
      <ScrollView style={groupSettleStyle.container} contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={groupSettleStyle.inner}>

          {/* Header */}
          <View style={groupSettleStyle.header}>
            <Text style={groupSettleStyle.title}>Group Settle</Text>
            <Text style={groupSettleStyle.subtitle}>Track and settle shared expenses</Text>
          </View>

          {/* Friend Code Card */}
          <Card style={groupSettleStyle.cardGradient}>
            <Card.Content style={groupSettleStyle.cardContent}>
              <View style={groupSettleStyle.codeRow}>
                <Text style={groupSettleStyle.cardTitle}>Your Friend Code</Text>

                <View style={groupSettleStyle.codeBoxRow}>
                  <Text style={groupSettleStyle.codeBox}>{userCode}</Text>

                  <TouchableOpacity onPress={handleCopyCode} style={groupSettleStyle.iconBtnSmall}>
                    <Copy width={18} height={18} color="#fff" />
                  </TouchableOpacity>
                </View>

                <View style={groupSettleStyle.copyLinkRow}>
                  <Button mode="outlined" onPress={handleCopyLink} compact style={groupSettleStyle.copyLinkBtn}>
                    <Copy width={16} height={16} color="#C68CF5" />
                    <Text style={groupSettleStyle.copyLinkText}>  Copy Link</Text>
                  </Button>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Add Friend */}
          <Card style={groupSettleStyle.card}>
            <Card.Content>
              <View style={groupSettleStyle.addFriendRow}>
                <Text style={groupSettleStyle.cardTitle}>Add Friend</Text>
              </View>

              <View style={groupSettleStyle.addFriendInputRow}>
                <TextInput
                  placeholder="Enter friend code (e.g., SPL-XXXXX)"
                  placeholderTextColor="#999"
                  value={friendCode}
                  onChangeText={setFriendCode}
                  style={groupSettleStyle.input}
                  autoCapitalize="characters"
                />
                {/* <Button mode="contained" onPress={handleAddFriend} style={groupSettleStyle.addFriendBtn}>
                  <UserPlus2 width={16} height={16} color="#fff" />
                </Button> */}
                <TouchableOpacity
                  onPress={handleAddFriend}
                  style={groupSettleStyle.addFriendBtn}
                >
                  <UserPlus2 size={18} color="#fff" />
                </TouchableOpacity>

              </View>
            </Card.Content>
          </Card>

          {/* Friends List */}
          <View style={groupSettleStyle.section}>
            <View style={groupSettleStyle.sectionHeader}>
              <Text style={groupSettleStyle.sectionTitle}>Friends</Text>
              <Button mode="outlined" onPress={() => setPaymentFormOpen(true)} compact style={groupSettleStyle.sectionActionBtn}>
                <Plus width={14} height={14} color="#ffffff" /> <Text style={groupSettleStyle.sectionActionText}> Add Payment</Text>
              </Button>
            </View>

            {friends.map((friend) => (
              <Card key={friend.id} style={groupSettleStyle.cardFriend}>
                <Card.Content style={groupSettleStyle.friendRow}>
                  <View style={groupSettleStyle.friendLeft}>
                    <Avatar.Text size={44} label={friend.name.split(" ").map(n => n[0]).join("")} color="#fff" style={groupSettleStyle.avatar} />
                    <View style={{ marginLeft: 12, flex: 1 }}>
                      <Text style={groupSettleStyle.friendName}>{friend.name}</Text>
                      <Text style={groupSettleStyle.friendPoints}>{friend.points} points</Text>
                    </View>
                  </View>

                  <View style={groupSettleStyle.friendRight}>
                    {friend.owed > 0 ? (
                      <View style={groupSettleStyle.owedRow}>
                        <TrendingUp width={16} height={16} color="#4CAF50" />
                        <Text style={groupSettleStyle.owedText}> ₹{friend.owed}</Text>
                      </View>
                    ) : null}

                    {friend.owes > 0 ? (
                      <View style={groupSettleStyle.owesRow}>
                        <TrendingDown width={16} height={16} color="#FF3B30" />
                        <Text style={groupSettleStyle.owesText}> ₹{friend.owes}</Text>
                      </View>
                    ) : null}

                    {friend.owed === 0 && friend.owes === 0 ? (
                      <Badge style={groupSettleStyle.badge}>Settled</Badge>
                    ) : null}
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>

          {/* Groups */}
          <View style={groupSettleStyle.section}>
            <View style={groupSettleStyle.sectionHeader}>
              <Text style={groupSettleStyle.sectionTitle}>Groups</Text>
              <Button mode="contained" onPress={() => setGroupFormOpen(true)} compact style={groupSettleStyle.sectionActionBtn}>
                <Users width={14} height={14} color="#fff" /> <Text style={groupSettleStyle.sectionActionTextLight}>  Create</Text>
              </Button>
            </View>

            {groups.map((group) => {
              const percentage = Math.min(100, (group.spent / group.budget) * 100);
              return (
                <TouchableOpacity key={group.id} onPress={() => handleViewGroup(group.id)}>
                  <Card style={groupSettleStyle.cardGroup}>
                    <Card.Content>
                      <View style={groupSettleStyle.groupTop}>
                        <View>
                          <Text style={groupSettleStyle.groupName}>{group.name}</Text>
                          <Text style={groupSettleStyle.groupMembers}>{group.members} members</Text>
                        </View>
                        <Users width={20} height={20} color="#999" />
                      </View>

                      <View style={{ marginTop: 10 }}>
                        <View style={groupSettleStyle.budgetRow}>
                          <Text style={groupSettleStyle.mutedText}>Budget</Text>
                          <Text style={groupSettleStyle.monoText}>₹{group.spent.toLocaleString()} / ₹{group.budget.toLocaleString()}</Text>
                        </View>

                        <ProgressBar progress={percentage / 100} color="#7C3BEC" style={groupSettleStyle.progress} />
                        <Text style={groupSettleStyle.smallMuted}>{percentage.toFixed(0)}% of budget used</Text>
                      </View>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Recent Activity */}
          <View style={groupSettleStyle.section}>
            <Text style={groupSettleStyle.sectionTitle}>Recent Activity</Text>
            {paymentLogs.map((log) => (
              <Card key={log.id} style={groupSettleStyle.cardLog}>
                <Card.Content style={groupSettleStyle.logRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={groupSettleStyle.friendName}>{log.friendName}</Text>
                    <Text style={groupSettleStyle.smallMuted}>{log.description}</Text>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <Text style={[groupSettleStyle.monoText, { color: log.type === "owed" ? "#4CAF50" : "#FF3B30" }]}>
                      {log.type === "owed" ? "+" : "-"}₹{log.amount}
                    </Text>
                    <Text style={groupSettleStyle.smallMuted}>{log.type === "owed" ? "owes you" : "you owe"}</Text>
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* PaymentLogForm - simple dialog */}
      <Portal>
        <Dialog visible={paymentFormOpen} onDismiss={() => setPaymentFormOpen(false)}>
          <Dialog.Title>Add Payment</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Payment form placeholder — implement fields here.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setPaymentFormOpen(false)}>Cancel</Button>
            <Button onPress={() => { setPaymentFormOpen(false); showSnack("Payment saved"); }}>Save</Button>
          </Dialog.Actions>
        </Dialog>

        {/* GroupForm - simple dialog */}
        <Dialog visible={groupFormOpen} onDismiss={() => setGroupFormOpen(false)}>
          <Dialog.Title>Create Group</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Group form placeholder — implement fields here.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setGroupFormOpen(false)}>Cancel</Button>
            <Button onPress={() => { setGroupFormOpen(false); showSnack("Group created"); }}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: "" })}
        duration={2000}
        action={{
          label: "OK",
          onPress: () => setSnack({ visible: false, message: "" }),
        }}
      >
        {snack.message}
      </Snackbar>
    </>
  );
};

export default GroupSettle;
