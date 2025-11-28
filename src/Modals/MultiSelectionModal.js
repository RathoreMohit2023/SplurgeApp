import React, { useContext } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../components/ThemeContext";

const MultiSelectionModal = ({
  visible,
  title,
  data = [],
  selectedItems = [],
  onClose,
  onSelect,
}) => {
  const { colors } = useContext(ThemeContext);

  const toggleSelect = (item) => {
    if (selectedItems.includes(item)) {
      onSelect(selectedItems.filter((i) => i !== item));
    } else {
      onSelect([...selectedItems, item]);
    }
  };

  return (
    <Modal visible={visible}
    statusBarTranslucent={true}
    animationType="fade" transparent>
  <View
    style={{
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",   
      alignItems: "center",        
      paddingHorizontal: 20,
    }}
  >
    <View
      style={{
        backgroundColor: colors.card,
        padding: 20,
        width: "90%",              
        borderRadius: 20,      
        maxHeight: "70%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "700", color: colors.text }}
        >
          {title}
        </Text>

        <TouchableOpacity onPress={onClose}>
          <Icon name="close" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedItems.includes(item);

          return (
            <TouchableOpacity
              style={{
                paddingVertical: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => toggleSelect(item)}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.text,
                }}
              >
                {item}
              </Text>

              {isSelected ? (
                <Icon name="checkbox-marked" size={24} color={colors.theme} />
              ) : (
                <Icon
                  name="checkbox-blank-outline"
                  size={24}
                  color={colors.textSecondary}
                />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  </View>
</Modal>

  );
};

export default MultiSelectionModal;
