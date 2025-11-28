import React, { useContext, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlayCircle, Clock, CheckCircle2 } from 'lucide-react-native';

// Imports
import getFoundersStyle from "../../../styles/MainScreen/learnTabs/founderStyle"; // Import Style Function
import { ThemeContext } from "../../../components/ThemeContext"; // Import Context

const founderSeries = [
  { id: "1", title: "Why We Built Splurge", duration: "18:30", watched: true },
  { id: "2", title: "The Psychology of Student Spending", duration: "22:15", watched: false },
  { id: "3", title: "Financial Freedom in Your 20s", duration: "25:45", watched: false },
  { id: "4", title: "Interview with FinTech CEO", duration: "45:00", watched: false },
];

const Founders = () => {
  const insets = useSafeAreaInsets();
  
  // 1. Context
  const { colors } = useContext(ThemeContext);
  
  // 2. Memoize Styles
  const styles = useMemo(() => getFoundersStyle(colors), [colors]);

  return (
    <View style={styles.tabContainer}>
      <FlatList
        data={founderSeries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemCard} activeOpacity={0.7}>
            {/* Large Thumbnail for Founders */}
            <View style={styles.largeThumbnail}>
              {/* Changed to Theme color to contrast against tinted background */}
              <PlayCircle size={32} color={colors.theme} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>

              <View style={styles.row}>
                <View style={styles.metaRow}>
                  <Clock size={12} color={colors.textSecondary} />
                  <Text style={styles.subText}>{item.duration}</Text>
                </View>

                {/* {item.watched && (
                    <View style={styles.badge}>
                    <CheckCircle2 size={14} color={colors.success} />
                    <Text style={styles.badgeText}>Watched</Text>
                    </View>
                )} */}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Founders;