import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Card, Text} from "react-native-paper";
import WishlistStyle from "../../../styles/MainScreen/tabs/WishlistStyle";
import { Pencil, Trash2, Plus } from "lucide-react-native";

const initialWishlist = [
  { id: "1", name: "Concert Ticket", price: 2500, description: "Travis Scott concert" },
  { id: "2", name: "Sony Headphones", price: 4500, description: "WH-1000XM5" },
  { id: "3", name: "PS5 Console", price: 35000, description: "Gaming bundle" },
];

const WishlistTab = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  return (
    <View style={WishlistStyle.Container}>
      <View style={WishlistStyle.topRow}>
        <Card style={WishlistStyle.CardContainer}>
          <View style={WishlistStyle.cardLeftSection}>
            <Text style={WishlistStyle.cardText}>Your Wishlist</Text>
          </View>

          <TouchableOpacity 
          tyle={WishlistStyle.addIconBtn} onPress={() => {}}
          >
            <Plus size={26} color="#7C3BEC"/>
          </TouchableOpacity>
        </Card>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={WishlistStyle.cardConatiner}>
            <Card.Content>
              <View style={WishlistStyle.Section1}>
                <View style={WishlistStyle.Section2}>
                  <Text style={WishlistStyle.SectionText1}>{item.name}</Text>
                  <Text style={WishlistStyle.SectionText2}>{item.description}</Text>
                  <Text style={WishlistStyle.SectionText3}>
                    ₹{item.price.toLocaleString()}
                  </Text>
                </View>

                <View style={WishlistStyle.section3}>
                    <TouchableOpacity>
                      <Pencil size={20} color={"#ffffff"}/>
                    </TouchableOpacity>
                   
                    <TouchableOpacity>
                      <Trash2 size={20} color={"#ff3b30"}/>
                    </TouchableOpacity>
                  </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default WishlistTab;
