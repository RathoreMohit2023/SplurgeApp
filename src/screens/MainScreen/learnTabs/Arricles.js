import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import ArticleStyle from "../../../styles/MainScreen/learnTabs/ArticleStyles";
import {
  FileText,
  CheckCircle2
} from "lucide-react-native";


const articles = [
  { id: "1", title: "The Complete Guide to Financial Literacy", readTime: "15 min", completed: true, points: 75 },
  { id: "2", title: "Understanding Credit Cards and Debt", readTime: "10 min", completed: false, points: 75 },
  { id: "3", title: "Investment Basics for Beginners", readTime: "20 min", completed: false, points: 75 },
  { id: "4", title: "How to Negotiate Your First Salary", readTime: "12 min", completed: false, points: 75 },
];

const Arricles = () => {
  return (
    <ScrollView style={ArticleStyle.tabArea}>
    {articles.map((a) => (
      <TouchableOpacity key={a.id} style={ArticleStyle.articleCard}>
        <View style={ArticleStyle.articleIcon}>
          <FileText size={26} color="#7C3BEC" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={ArticleStyle.titleText}>{a.title}</Text>

          <View style={ArticleStyle.row}>
            <Text style={ArticleStyle.subText}>{a.readTime}</Text>
            <Text style={ArticleStyle.subText}>+{a.points} pts</Text>
          </View>

          {a.completed && (
            <View style={ArticleStyle.badge}>
              <CheckCircle2 size={14} color="#fff" />
              <Text style={ArticleStyle.badgeText}>Completed</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    ))}
  </ScrollView>
  )
}

export default Arricles