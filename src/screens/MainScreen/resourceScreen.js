import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ProgressBar } from "react-native-paper";
import resourceStyle from "../../styles/MainScreen/resourceStyle";
import VideoScreen from "../../screens/MainScreen/learnTabs/Videos";
import FounderScreen from "../../screens/MainScreen/learnTabs/founders";
import ArticleScreen from "../../screens/MainScreen/learnTabs/Arricles";

import {
  Trophy,
} from "lucide-react-native";

const Tab = createMaterialTopTabNavigator();

const topFriends = [
  { id: "1", name: "Priya S.", points: 1850, rank: 1 },
  { id: "2", name: "Alex K.", points: 1420, rank: 2 },
  { id: "3", name: "You", points: 1200, rank: 3, isUser: true },
];

const userPoints = 1200;
const nextMilestone = 1500;
const progressValue = userPoints / nextMilestone;

const LeaderboardCard = () => {
  return (
    <View style={resourceStyle.card}>
      {/* Header */}
      <View style={resourceStyle.cardHeader}>
        <Text style={resourceStyle.cardTitle}>Leaderboard</Text>
        <Trophy size={22} color="#7C3BEC" />
      </View>

      {/* Top friends */}
      {topFriends.map((f) => (
        <View
          key={f.id}
          style={[
            resourceStyle.friendRow,
            f.isUser && resourceStyle.friendRowHighlight,
          ]}
        >
          {/* Rank Circle */}
          <View
            style={[
              resourceStyle.rankCircle,
              f.rank === 1
                ? { backgroundColor: "rgba(255,215,0,0.2)" }
                : f.rank === 2
                ? { backgroundColor: "rgba(192,192,192,0.2)" }
                : { backgroundColor: "rgba(255,140,0,0.2)" },
            ]}
          >
            <Text style={resourceStyle.rankText}>{f.rank}</Text>
          </View>

          {/* Avatar */}
          <View style={resourceStyle.avatar}>
            <Text style={resourceStyle.avatarText}>
              {f.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Text>
          </View>

          {/* Name + Points */}
          <View style={{ flex: 1 }}>
            <Text style={resourceStyle.friendName}>{f.name}</Text>
            <Text style={resourceStyle.friendPoints}>{f.points} points</Text>
          </View>

          {/* Trophy for #1 */}
          {f.rank === 1 && <Trophy size={20} color="#FFD700" />}
        </View>
      ))}

      {/* Progress section */}
      <View style={resourceStyle.progressSection}>
        <View style={resourceStyle.progressTextRow}>
          <Text style={resourceStyle.progressLabel}>Your Progress</Text>
          <Text style={resourceStyle.progressValue}>
            {userPoints} / {nextMilestone} pts
          </Text>
        </View>

        <ProgressBar progress={progressValue} color="#7C3BEC" style={{ height: 7, borderRadius: 6 }} />

        <Text style={resourceStyle.progressFooter}>
          {nextMilestone - userPoints} points to next milestone
        </Text>
      </View>
    </View>
  );
};


const ResourceScreen = () => {
  return (
    <View style={resourceStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={resourceStyle.heading}>Resources</Text>
        <Text style={resourceStyle.subHeading}>Learn and Earn Points</Text>

        <LeaderboardCard />

        {/* Top Tabs */}
        <View style={{ height: 600 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: "#7C3BEC",
              tabBarInactiveTintColor: "#999",
              tabBarStyle: { backgroundColor: "#25202C", borderRadius:10, padding: 5, marginLeft: 15, marginRight: 15  },
              tabBarIndicatorStyle: { backgroundColor: "#0D0D0D", padding: 20, margin: 5 }
            }}
          >
            <Tab.Screen name="Videos" component={VideoScreen} />
            <Tab.Screen name="Founder's" component={FounderScreen} />
            <Tab.Screen name="Articles" component={ArticleScreen} />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResourceScreen;
