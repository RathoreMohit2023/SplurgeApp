import React, { useContext, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FileText, CheckCircle2, Clock } from "lucide-react-native";

// Imports
import getArticlesStyle from "../../../styles/MainScreen/learnTabs/ArticleStyles"; // Import Style Function
import { ThemeContext } from "../../../components/ThemeContext"; // Import Context

const articles = [
  { id: "1", title: "The Complete Guide to Financial Literacy", readTime: "15 min", completed: true },
  { id: "2", title: "Understanding Credit Cards and Debt", readTime: "10 min", completed: false },
  { id: "3", title: "Investment Basics for Beginners", readTime: "20 min", completed: false },
  { id: "4", title: "How to Negotiate Your First Salary", readTime: "12 min", completed: false },
  { id: "5", title: "Needs vs Wants: Budgeting 101", readTime: "5 min", completed: false },
];

const Arricles = () => {
  const insets = useSafeAreaInsets();
  
  // 1. Context
  const { colors } = useContext(ThemeContext);
  
  // 2. Memoize Styles
  const styles = useMemo(() => getArticlesStyle(colors), [colors]);

  return (
    <View style={styles.tabContainer}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemCard} activeOpacity={0.7}>
            <View style={styles.thumbnailBox}>
              <FileText size={24} color={colors.theme} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.titleText} numberOfLines={2}>{item.title}</Text>

              <View style={styles.row}>
                <View style={styles.metaRow}>
                    <Clock size={12} color={colors.textSecondary} />
                    <Text style={styles.subText}>{item.readTime}</Text>
                </View>
                
                {/* {item.completed && (
                    <View style={styles.badge}>
                    <CheckCircle2 size={14} color={colors.success} />
                    <Text style={styles.badgeText}>Read</Text>
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

export default Arricles;