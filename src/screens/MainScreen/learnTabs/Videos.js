import React, { useContext, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Play, Clock, CheckCircle2 } from 'lucide-react-native';

// Imports
import getVideoTabStyles from "../../../styles/MainScreen/learnTabs/VideosStyle"; // Path adjust karein
import { ThemeContext } from "../../../components/ThemeContext"; // Path adjust karein

const videos = [
  { id: "1", title: "Understanding Budgets for Students", duration: "12:45", watched: true },
  { id: "2", title: "How to Track Your Daily Expenses", duration: "8:30", watched: true },
  { id: "3", title: "Smart Shopping Tips for Teens", duration: "15:20", watched: false },
  { id: "4", title: "Building Your First Emergency Fund", duration: "10:15", watched: false },
  { id: "5", title: "Investing 101: Stocks & Bonds", duration: "20:00", watched: false },
];

const Videos = () => {
  const insets = useSafeAreaInsets();
  
  // 1. Context se Colors lein
  const { colors } = useContext(ThemeContext);
  
  // 2. Styles Memoize karein
  const resourceStyle = useMemo(() => getVideoTabStyles(colors), [colors]);

  return (
    <View style={resourceStyle.tabContainer}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[resourceStyle.listContent, { paddingBottom: insets.bottom + 80 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={resourceStyle.itemCard} activeOpacity={0.7}>
            <View style={resourceStyle.thumbnailBox}>
              {/* Dynamic Icon Color */}
              <Play size={24} color={colors.theme} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={resourceStyle.titleText} numberOfLines={2}>{item.title}</Text>
              
              <View style={resourceStyle.row}>
                <View style={resourceStyle.metaRow}>
                  <Clock size={12} color={colors.textSecondary} />
                  <Text style={resourceStyle.subText}>{item.duration}</Text>
                </View>
                
                {/* {item.watched && (
                    <View style={resourceStyle.badge}>
                    <CheckCircle2 size={14} color={colors.success} />
                    <Text style={resourceStyle.badgeText}>Watched</Text>
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

export default Videos;