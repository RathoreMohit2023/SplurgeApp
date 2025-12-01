import React, { useState, useContext, useMemo } from 'react';
import { View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Pencil,
  Trash2,
  Gift,
  ShoppingBag,
  Gamepad2,
} from 'lucide-react-native';

import AddWishListModal from '../../../Modals/AddWishListModal';
import EditWishListModal from '../../../Modals/EditWishListModal';
import { ThemeContext } from '../../../components/ThemeContext';
import getWishlistStyles from '../../../styles/MainScreen/tabs/WishlistStyle';

const initialWishlist = [
  {
    id: '1',
    name: 'Concert Ticket',
    price: 2500,
    description: 'Travis Scott',
    icon: Gift,
  },
  {
    id: '2',
    name: 'Headphones',
    price: 4500,
    description: 'Sony WH-1000XM5',
    icon: ShoppingBag,
  },
  {
    id: '3',
    name: 'PS5 Console',
    price: 35000,
    description: 'Gaming bundle',
    icon: Gamepad2,
  },
  {
    id: '4',
    name: 'New Sneakers',
    price: 8000,
    description: 'Jordan 1 Low',
    icon: ShoppingBag,
  },
];

const WishlistTab = () => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getWishlistStyles(colors), [colors]);

  const [wishlist, setWishlist] = useState(initialWishlist);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const insets = useSafeAreaInsets();

  const handleAddItem = newItem => {
    setWishlist([newItem, ...wishlist]);
    setAddModalVisible(false);
  };

  const handleEditItem = updatedItem => {
    setWishlist(currentList =>
      currentList.map(item =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );
    setEditModalVisible(false);
    setItemToEdit(null);
  };

  const openEditModal = item => {
    setItemToEdit(item);
    setEditModalVisible(true);
  };

  const confirmDeleteItem = (itemId, itemName) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${itemName}" from your wishlist?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteItem(itemId),
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  const handleDeleteItem = itemId => {
    setWishlist(currentList => currentList.filter(item => item.id !== itemId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Your Goals</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setAddModalVisible(true)}
        >
          <Text style={styles.addBtnText}>+ Add New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        renderItem={({ item }) => {
          const Icon = item.icon || Gift;
          return (
            <View style={styles.card}>
              <View style={styles.iconContainer}>
                <Icon size={24} color={colors.text} />
              </View>

              <View style={styles.contentContainer}>
                <View style={styles.rowBetween}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>
                    ₹{item.price.toLocaleString()}
                  </Text>
                </View>
                <Text style={styles.desc}>{item.description}</Text>

                <View style={styles.divider} />

                <View style={styles.footer}>
                  <Text style={styles.status}>Target</Text>
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => openEditModal(item)}
                    >
                      <Pencil size={18} color={colors.blue} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconBtn}
                      onPress={() => confirmDeleteItem(item.id, item.name)}
                    >
                      <Trash2 size={18} color={colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />

      <AddWishListModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSave={handleAddItem}
      />

      <EditWishListModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleEditItem}
        itemToEdit={itemToEdit}
      />
    </View>
  );
};

export default WishlistTab;
