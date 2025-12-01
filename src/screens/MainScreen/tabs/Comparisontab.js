import React, { useContext, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sparkles } from 'lucide-react-native';

import { ThemeContext } from '../../../components/ThemeContext';
import getComparisonStyles from '../../../styles/MainScreen/tabs/ComparisonStyle';

const comparisons = [
  {
    id: '1',
    spent: 1200,
    item: 'Travis Scott Ticket',
    price: 1500,
    emoji: '🎫',
  },
  { id: '2', spent: 800, item: '3 Movie Tickets', price: 900, emoji: '🎬' },
  { id: '3', spent: 1500, item: 'Gym Membership', price: 1800, emoji: '💪' },
  { id: '4', spent: 4000, item: 'Flight to Goa', price: 3500, emoji: '✈️' },
];

const ComparisonTab = () => {
  const { colors } = useContext(ThemeContext);

  const styles = useMemo(() => getComparisonStyles(colors), [colors]);

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <Sparkles size={20} color="#FFD700" />
          <Text style={styles.heroTitle}>AI Insight</Text>
        </View>
        <Text style={styles.heroText}>
          You spent <Text style={styles.heroHighlight}>₹1,200</Text> on snacks
          this week. That’s almost enough for a{' '}
          <Text style={styles.heroHighlight}>Concert Ticket!</Text>
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Opportunity Cost</Text>

      <FlatList
        data={comparisons}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        renderItem={({ item }) => {
          const isAffordable = item.spent >= item.price;
          return (
            <View style={styles.itemCard}>
              <View style={styles.emojiBox}>
                <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
              </View>

              <View style={styles.centerInfo}>
                <Text style={styles.itemName}>{item.item}</Text>
                <Text style={styles.itemPrice}>
                  Price: ₹{item.price.toLocaleString()}
                </Text>
              </View>

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: isAffordable
                      ? 'rgba(0, 230, 118, 0.1)'
                      : 'rgba(255, 183, 77, 0.1)',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      color: isAffordable ? colors.success : colors.warning,
                    },
                  ]}
                >
                  {isAffordable ? 'Affordable' : 'Close'}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ComparisonTab;
