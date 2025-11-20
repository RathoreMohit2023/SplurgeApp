import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  Card,
  Text,
  Button,
  Avatar,
  Badge,
  Dialog,
  Portal,
  Paragraph,
  Snackbar,
  ProgressBar,
  IconButton,
} from "react-native-paper";
import { ArrowLeft, Plus, UserPlus, Edit2, Trash2, Users } from "lucide-react-native";
import { useRoute } from "@react-navigation/native";
import groupDetailsStyle from "../../styles/MainScreen/groupDetailsStyle";
import AppHeader from "../../components/Header";
import Maintabs from "../../navigation/tabNavigator";

const GroupDetails = ({ navigation }) => {
  const route = useRoute();
  const groupId = route?.params?.id ?? "1";

  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [expenseFormOpen, setExpenseFormOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [snack, setSnack] = useState({ visible: false, message: "" });

  // Mocked data (replace with API / redux)
  const group = {
    id: groupId,
    name: "Weekend Trip",
    budget: 10000,
    spent: 6500,
    description: "Trip to Goa with friends",
  };

  const allFriends = [
    { id: "1", name: "Alex Kumar" },
    { id: "2", name: "Priya Sharma" },
    { id: "3", name: "Rahul Verma" },
    { id: "4", name: "Sneha Patel" },
  ];

  const members = [
    { id: "user", name: "You", role: "Admin" },
    { id: "1", name: "Alex Kumar", role: "Member" },
    { id: "2", name: "Priya Sharma", role: "Member" },
  ];

  const expenses = [
    {
      id: "1",
      description: "Hotel Booking",
      amount: 4000,
      paidBy: "user",
      paidByName: "You",
      splitAmong: ["user", "1", "2"],
      date: "2024-01-18",
    },
    {
      id: "2",
      description: "Transportation",
      amount: 1500,
      paidBy: "1",
      paidByName: "Alex Kumar",
      splitAmong: ["user", "1", "2"],
      date: "2024-01-17",
    },
    {
      id: "3",
      description: "Food & Drinks",
      amount: 1000,
      paidBy: "2",
      paidByName: "Priya Sharma",
      splitAmong: ["user", "1", "2"],
      date: "2024-01-16",
    },
  ];

  const percentage = Math.min(100, (group.spent / group.budget) * 100);

  const showSnack = (message) => setSnack({ visible: true, message });

  const handleBack = () => {
    if (navigation?.canGoBack()) navigation.goBack();
    else navigation.navigate("settle");
  };

  const handleAddMember = (friendId) => {
    // implement add logic
    showSnack(`Member ${friendId} added (placeholder)`);
    setAddMemberOpen(false);
  };

  const handleRemoveMember = (memberId) => {
    // implement remove logic
    showSnack(`Member ${memberId} removed (placeholder)`);
  };

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setExpenseFormOpen(true);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setExpenseFormOpen(true);
  };

  return (
    <>
      <AppHeader />
      <ScrollView style={groupDetailsStyle.container} contentContainerStyle={{ paddingBottom: 60 }}>

        <View style={groupDetailsStyle.inner}>
          {/* Header */}
          <View style={groupDetailsStyle.headerRow}>
            <TouchableOpacity onPress={handleBack} style={groupDetailsStyle.backBtn}>
              <ArrowLeft width={20} height={20} color="#fff" />
            </TouchableOpacity>

            <View style={groupDetailsStyle.titleWrap}>
              <Text style={groupDetailsStyle.title}>{group.name}</Text>
              {group.description ? <Text style={groupDetailsStyle.subtitle}>{group.description}</Text> : null}
            </View>
          </View>

          {/* Budget Card */}
          <Card style={groupDetailsStyle.card}>
            <Card.Content>
              <View style={groupDetailsStyle.budgetRow}>
                <Text style={groupDetailsStyle.budgetLabel}>Spent</Text>
                <Text style={groupDetailsStyle.budgetValue}>
                  ₹{group.spent.toLocaleString()} / ₹{group.budget.toLocaleString()}
                </Text>
              </View>

              <ProgressBar progress={percentage / 100} color={"#7C3BEC"} style={groupDetailsStyle.progress} />

              <View style={groupDetailsStyle.budgetMeta}>
                <Text style={groupDetailsStyle.smallMuted}>{percentage.toFixed(0)}% used</Text>
                <Text style={groupDetailsStyle.smallMuted}>₹{(group.budget - group.spent).toLocaleString()} remaining</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Members */}
          <View style={groupDetailsStyle.section}>
            <View style={groupDetailsStyle.sectionHeader}>
              <View style={groupDetailsStyle.sectionTitleWrap}>
                <Users width={18} height={18} color="#fff" />
                <Text style={groupDetailsStyle.sectionTitle}> Members ({members.length})</Text>
              </View>

              <Button
                mode="contained"
                compact
                onPress={() => setAddMemberOpen(true)}
                contentStyle={{ flexDirection: "row", alignItems: "center" }}
                style={groupDetailsStyle.actionBtn}
                icon={() => <UserPlus width={16} height={16} color="#fff" />}
              >
                Add
              </Button>
            </View>

            <View style={groupDetailsStyle.list}>
              {members.map((member) => (
                <Card key={member.id} style={groupDetailsStyle.memberCard}>
                  <Card.Content style={groupDetailsStyle.memberRow}>
                    <View style={groupDetailsStyle.memberLeft}>
                      <Avatar.Text
                        size={44}
                        label={member.name.split(" ").map((n) => n[0]).join("")}
                        style={groupDetailsStyle.avatar}
                      />
                      <View style={{ marginLeft: 12 }}>
                        <Text style={groupDetailsStyle.memberName}>{member.name}</Text>
                        <Text style={groupDetailsStyle.memberRole}>{member.role}</Text>
                      </View>
                    </View>

                    <View style={groupDetailsStyle.memberRight}>
                      {member.id !== "user" && (
                        <IconButton
                          icon={() => <Trash2 width={16} height={16} color="#FF3B30" />}
                          size={20}
                          onPress={() => handleRemoveMember(member.id)}
                        />
                      )}
                      {member.role === "Admin" && <Badge style={groupDetailsStyle.badge}>Admin</Badge>}
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </View>
          </View>

          {/* Expenses */}
          <View style={groupDetailsStyle.section}>
            <View style={groupDetailsStyle.sectionHeader}>
              <Text style={groupDetailsStyle.sectionTitle}>Expenses ({expenses.length})</Text>

              <Button
                mode="contained"
                compact
                onPress={handleAddExpense}
                contentStyle={{ flexDirection: "row", alignItems: "center" }}
                style={groupDetailsStyle.actionBtn}
                icon={() => <Plus width={14} height={14} color="#fff" />}
              >
                Add
              </Button>
            </View>

            <View style={groupDetailsStyle.list}>
              {expenses.map((expense) => {
                const splitAmount = expense.amount / expense.splitAmong.length;
                return (
                  <Card key={expense.id} style={groupDetailsStyle.expenseCard}>
                    <Card.Content>
                      <View style={groupDetailsStyle.expenseRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={groupDetailsStyle.expenseTitle}>{expense.description}</Text>
                          <Text style={groupDetailsStyle.expenseMeta}>
                            Paid by {expense.paidByName} • {expense.date}
                          </Text>
                        </View>

                        <View style={groupDetailsStyle.expenseRight}>
                          <Text style={groupDetailsStyle.expenseAmount}>₹{expense.amount.toLocaleString()}</Text>
                          <Text style={groupDetailsStyle.expenseSplit}>₹{splitAmount.toFixed(0)}/person</Text>

                          <View style={groupDetailsStyle.expenseActions}>
                            <IconButton
                              icon={() => <Edit2 width={16} height={16} color="#fff" />}
                              size={20}
                              onPress={() => handleEditExpense(expense)}
                            />
                          </View>
                        </View>
                      </View>

                      <View style={groupDetailsStyle.splitInfo}>
                        <Text style={groupDetailsStyle.smallMuted}>Split among {expense.splitAmong.length} members</Text>
                      </View>
                    </Card.Content>
                  </Card>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <Maintabs /> */}

      {/* Add Member Dialog (placeholder) */}
      <Portal>
        <Dialog visible={addMemberOpen} onDismiss={() => setAddMemberOpen(false)}>
          <Dialog.Title>Add Member</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Select a friend to add (placeholder).</Paragraph>
            {/* You can add a FlatList of allFriends and selection UI here */}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAddMemberOpen(false)}>Cancel</Button>
            <Button
              onPress={() => {
                handleAddMember(allFriends[0].id);
              }}
            >
              Add
            </Button>
          </Dialog.Actions>
        </Dialog>

        {/* Add / Edit Expense Dialog (placeholder) */}
        <Dialog visible={expenseFormOpen} onDismiss={() => setExpenseFormOpen(false)}>
          <Dialog.Title>{selectedExpense ? "Edit Expense" : "Add Expense"}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Expense form placeholder — implement fields here.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setExpenseFormOpen(false)}>Cancel</Button>
            <Button
              onPress={() => {
                setExpenseFormOpen(false);
                showSnack("Expense saved (placeholder)");
              }}
            >
              Save
            </Button>
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

export default GroupDetails;
