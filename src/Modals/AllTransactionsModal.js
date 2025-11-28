import React, { useContext } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ThemeContext } from '../components/ThemeContext';
import { X } from 'lucide-react-native';

const AllTransactionsModal = ({ visible, onClose, data = [] }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
        }}
      >
        {/* Bottom Sheet */}
        <View
          style={{
            backgroundColor: colors.card,
            padding: 20,
            maxHeight: "75%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 1,
            borderColor: colors.border,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: colors.text,
              }}
            >
              All Transactions
            </Text>

            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* List */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.separator,
                  marginVertical: 8,
                }}
              />
            )}
            renderItem={({ item }) => {
              const IconComponent = item.icon;
              const isCredit = item.type === "credit";

              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        padding: 10,
                        backgroundColor: colors.tintedThemeColor,
                        borderRadius: 40,
                      }}
                    >
                      <IconComponent
                        size={18}
                        color={isCredit ? colors.success : colors.text}
                      />
                    </View>

                    <View style={{ marginLeft: 12 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: colors.text,
                        }}
                      >
                        {item.description}
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          color: colors.textSecondary,
                        }}
                      >
                        {item.category} • {item.time}
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: isCredit ? colors.success : colors.text,
                    }}
                  >
                    {isCredit ? "+" : "-"}₹{item.amount.toLocaleString()}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AllTransactionsModal;
