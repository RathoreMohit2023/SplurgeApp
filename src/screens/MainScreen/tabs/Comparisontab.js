import React from "react";
import { View, FlatList } from "react-native";
import { Card, Text, Badge } from "react-native-paper";
import ComparisonStyle from "../../../styles/MainScreen/tabs/ComparisonStyle";

const comparisons = [
  { id: "1", spent: 1200, item: "Travis Scott Concert Ticket", price: 1500, emoji: "🎫" },
  { id: "2", spent: 800, item: "3 Movie Tickets", price: 900, emoji: "🎬" },
  { id: "3", spent: 1500, item: "Gym Membership (3 months)", price: 1800, emoji: "💪" },
];

const ComparisonTab = () => {
  return (
    <View style={ComparisonStyle.container}>
      <Card style={ComparisonStyle.cardContainer}>
        <Text style={ComparisonStyle.cardText}>AI Insights</Text>
        <Text style={ComparisonStyle.cardText2}>
          You spent ₹1200 this week on small purchases.
        </Text>
        <Text style={ComparisonStyle.cardText3}>
          That’s enough to buy a Travis Scott concert ticket!
        </Text>
      </Card>

      <FlatList
        data={comparisons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={ComparisonStyle.cardContainer2}>
            <Card.Content>
              <View style={ComparisonStyle.textSection}>
                <Text style={ComparisonStyle.textemoji}>{item.emoji}</Text>

                <View style={ComparisonStyle.textSection1}>
                  <Text style={ComparisonStyle.text1}>{item.item}</Text>
                  <Text style={ComparisonStyle.text2}>
                    Price: ₹{item.price.toLocaleString()}
                  </Text>
                </View>

                <Badge>
                  {item.spent >= item.price ? "Affordable" : "Almost there"}
                </Badge>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default ComparisonTab;
