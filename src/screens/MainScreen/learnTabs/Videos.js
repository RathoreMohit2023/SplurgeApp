import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import VideoStyle from "../../../styles/MainScreen/learnTabs/VideosStyle";
import { Play, Clock, CheckCircle2 } from 'lucide-react-native';

const videos = [
  { id: "1", title: "Understanding Budgets for Students", duration: "12:45", watched: true, points: 50 },
  { id: "2", title: "How to Track Your Daily Expenses", duration: "8:30", watched: true, points: 50 },
  { id: "3", title: "Smart Shopping Tips for Teens", duration: "15:20", watched: false, points: 50 },
  { id: "4", title: "Building Your First Emergency Fund", duration: "10:15", watched: false, points: 50 },
];

const Videos = () => {
  return (
    <ScrollView style={VideoStyle.tabArea}>
    {videos.map((v) => (
      <TouchableOpacity key={v.id} style={VideoStyle.videoCard}>
        <View style={VideoStyle.thumbnail}>
          <Play size={32} color="#ffffff" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={VideoStyle.titleText}>{v.title}</Text>
          <View style={VideoStyle.row}>
            <View style={VideoStyle.row}>
              <Clock size={14} color="#aaa" />
              <Text style={VideoStyle.subText}>{v.duration}</Text>
            </View>
            <Text style={VideoStyle.subText}>+{v.points} pts</Text>
          </View>

          {v.watched && (
            <View style={VideoStyle.badge}>
              <CheckCircle2 size={14} color="#fff" />
              <Text style={CheckCircle2.badgeText}>Watched</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    ))}
    </ScrollView>
  )
}

export default Videos;