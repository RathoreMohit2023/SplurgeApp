import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import LedgerStyle from "../../../styles/MainScreen/tabs/LedgerStyle";
import { Pencil, Trash2, Plus } from "lucide-react-native";

const initialTransactions = [
  { id: "1", description: "Coffee", amount: 250, category: "Food & Dining", date: "2024-01-18" },
  { id: "2", description: "Movie ticket", amount: 400, category: "Entertainment", date: "2024-01-17" },
  { id: "3", description: "Uber ride", amount: 180, category: "Transportation", date: "2024-01-17" },
  { id: "4", description: "Lunch", amount: 350, category: "Food & Dining", date: "2024-01-16" },
];

const LedgerTab = () => {
  const [transactions, setTransactions] = useState(initialTransactions);

  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={LedgerStyle.container}>

      <View style={LedgerStyle.topRow}>
        <Card style={LedgerStyle.cardContainer}>
          <View style={LedgerStyle.cardLeftSection}>
            <Text style={LedgerStyle.cardText}>Total This Week</Text>
            <Text style={LedgerStyle.cardAmt}>₹{total}</Text>
          </View>

          <TouchableOpacity 
          tyle={LedgerStyle.addIconBtn} onPress={() => {}}
          >
            <Plus size={26} color="#7C3BEC"/>
          </TouchableOpacity>
        </Card>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={LedgerStyle.cardContainer2 }>
            <Card.Content>
              <View style={LedgerStyle.section1}>
                <View>
                  <Text style={LedgerStyle.sectionText1}>{item.description}</Text>
                  <Text style={LedgerStyle.sectionText2}>
                    {item.category} • {item.date}
                  </Text>
                </View>

                <View style={LedgerStyle.section2}>
                  <Text style={LedgerStyle.sectionText3}>₹{item.amount}</Text>

                  <View style={LedgerStyle.sectionText4}>
                    <TouchableOpacity>
                      <Pencil size={20} color={"#ffffff"}/>
                    </TouchableOpacity>
                   
                    <TouchableOpacity>
                      <Trash2 size={20} color={"#ff3b30"}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default LedgerTab;
