import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import founderStyle from "../../../styles/MainScreen/learnTabs/founderStyle";
import { Play, Clock, CheckCircle2 } from 'lucide-react-native';

const founderSeries = [
  { id: "1", title: "Why We Built Splurge", duration: "18:30", watched: true, points: 100 },
  { id: "2", title: "The Psychology of Student Spending", duration: "22:15", watched: false, points: 100 },
  { id: "3", title: "Financial Freedom in Your 20s", duration: "25:45", watched: false, points: 100 },
];

const founders = () => {
  return (
    <ScrollView style={founderStyle.tabArea}>
    {founderSeries.map((v) => (
      <TouchableOpacity key={v.id} style={founderStyle.videoCard}>
        <View style={founderStyle.founderThumb}>
          <Play size={32} color="#ffffff" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={founderStyle.titleText}>{v.title}</Text>

          <View style={founderStyle.row}>
            <View style={founderStyle.row}>
              <Clock size={14} color="#aaa" />
              <Text style={founderStyle.subText}>{v.duration}</Text>
            </View>
            <Text style={founderStyle.subText}>+{v.points} pts</Text>
          </View>

          {v.watched && (
            <View style={founderStyle.badge}>
              <CheckCircle2 size={14} color="#fff" />
              <Text style={founderStyle.badgeText}>Watched</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
  )
}

export default founders