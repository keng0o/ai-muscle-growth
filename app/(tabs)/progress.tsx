import { Dimensions, Image, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

// ダミーデータ
const mockWeeklyData = [
  { day: "月", completed: true },
  { day: "火", completed: true },
  { day: "水", completed: true },
  { day: "木", completed: false },
  { day: "金", completed: false },
  { day: "土", completed: false },
  { day: "日", completed: false },
];

const mockBodyParts = [
  { name: "胸", progress: 75 },
  { name: "背中", progress: 60 },
  { name: "腕", progress: 85 },
  { name: "肩", progress: 50 },
  { name: "脚", progress: 40 },
];

export default function ProgressScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        進捗状況
      </ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">今週のトレーニング</ThemedText>
        <ThemedView style={styles.weeklyContainer}>
          {mockWeeklyData.map((item, index) => (
            <ThemedView key={index} style={styles.dayContainer}>
              <ThemedView
                style={[
                  styles.dayCircle,
                  { backgroundColor: item.completed ? "#34C759" : "#E5E5EA" },
                ]}
              >
                {item.completed && (
                  <IconSymbol size={14} name="checkmark" color="white" />
                )}
              </ThemedView>
              <ThemedText style={styles.dayText}>{item.day}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
        <ThemedView style={styles.weeklyStatsContainer}>
          <ThemedView style={styles.statItem}>
            <ThemedText type="defaultSemiBold">3/7</ThemedText>
            <ThemedText>トレーニング日</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <ThemedText type="defaultSemiBold">5</ThemedText>
            <ThemedText>トレーニング種目</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <ThemedText type="defaultSemiBold">120</ThemedText>
            <ThemedText>総重量 (kg)</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">筋肉成長シミュレーション</ThemedText>
        <ThemedText style={styles.simulationDate}>2023年5月20日更新</ThemedText>

        <ThemedView style={styles.simulationContainer}>
          <ThemedView style={styles.simulationImageContainer}>
            <ThemedText style={styles.simulationLabel}>現在</ThemedText>
            <Image
              source={require("@/assets/images/partial-react-logo.png")}
              style={styles.simulationImage}
            />
          </ThemedView>
          <IconSymbol size={24} name="arrow.right" color="#007AFF" />
          <ThemedView style={styles.simulationImageContainer}>
            <ThemedText style={styles.simulationLabel}>1ヶ月後</ThemedText>
            <Image
              source={require("@/assets/images/partial-react-logo.png")}
              style={styles.simulationImage}
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">部位別成長度</ThemedText>

        {mockBodyParts.map((part, index) => (
          <ThemedView key={index} style={styles.progressItem}>
            <ThemedView style={styles.progressHeader}>
              <ThemedText>{part.name}</ThemedText>
              <ThemedText>{part.progress}%</ThemedText>
            </ThemedView>
            <ThemedView style={styles.progressBarContainer}>
              <ThemedView
                style={[styles.progressBar, { width: `${part.progress}%` }]}
              />
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">目標達成状況</ThemedText>

        <ThemedView style={styles.goalItem}>
          <ThemedView style={styles.goalHeader}>
            <ThemedText type="defaultSemiBold">ベンチプレス 80kg</ThemedText>
            <ThemedText style={{ color: "#34C759" }}>75%</ThemedText>
          </ThemedView>
          <ThemedView style={styles.progressBarContainer}>
            <ThemedView style={[styles.progressBar, { width: "75%" }]} />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.goalItem}>
          <ThemedView style={styles.goalHeader}>
            <ThemedText type="defaultSemiBold">週3回のトレーニング</ThemedText>
            <ThemedText style={{ color: "#34C759" }}>100%</ThemedText>
          </ThemedView>
          <ThemedView style={styles.progressBarContainer}>
            <ThemedView style={[styles.progressBar, { width: "100%" }]} />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.goalItem}>
          <ThemedView style={styles.goalHeader}>
            <ThemedText type="defaultSemiBold">体重 70kg</ThemedText>
            <ThemedText style={{ color: "#34C759" }}>40%</ThemedText>
          </ThemedView>
          <ThemedView style={styles.progressBarContainer}>
            <ThemedView style={[styles.progressBar, { width: "40%" }]} />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginVertical: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  weeklyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  dayContainer: {
    alignItems: "center",
  },
  dayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  dayText: {
    fontSize: 12,
  },
  weeklyStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statItem: {
    alignItems: "center",
  },
  simulationDate: {
    color: "#8E8E93",
    marginBottom: 16,
  },
  simulationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  simulationImageContainer: {
    alignItems: "center",
  },
  simulationLabel: {
    marginBottom: 8,
  },
  simulationImage: {
    width: width * 0.35,
    height: width * 0.5,
    resizeMode: "contain",
  },
  progressItem: {
    marginVertical: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#E5E5EA",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#34C759",
    borderRadius: 4,
  },
  goalItem: {
    marginVertical: 12,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
});
