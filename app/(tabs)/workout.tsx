import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

const workoutCategories = [
  {
    id: "chest",
    title: "胸",
    icon: "figure.arms.open",
    exercises: [
      { id: "bench", name: "ベンチプレス", sets: 4, reps: 10, rest: 90 },
      {
        id: "incline",
        name: "インクラインベンチ",
        sets: 3,
        reps: 12,
        rest: 90,
      },
      { id: "fly", name: "ダンベルフライ", sets: 3, reps: 15, rest: 60 },
    ],
  },
  {
    id: "back",
    title: "背中",
    icon: "figure.walk",
    exercises: [
      { id: "deadlift", name: "デッドリフト", sets: 4, reps: 8, rest: 120 },
      { id: "row", name: "バーベルロウ", sets: 3, reps: 12, rest: 90 },
      { id: "pulldown", name: "ラットプルダウン", sets: 3, reps: 15, rest: 60 },
    ],
  },
  {
    id: "legs",
    title: "脚",
    icon: "figure.walk.motion",
    exercises: [
      { id: "squat", name: "スクワット", sets: 4, reps: 10, rest: 120 },
      { id: "lunge", name: "ランジ", sets: 3, reps: 12, rest: 90 },
      {
        id: "extension",
        name: "レッグエクステンション",
        sets: 3,
        reps: 15,
        rest: 60,
      },
    ],
  },
  {
    id: "shoulders",
    title: "肩",
    icon: "figure.arms.open",
    exercises: [
      { id: "press", name: "ショルダープレス", sets: 4, reps: 10, rest: 90 },
      { id: "lateral", name: "サイドレイズ", sets: 3, reps: 15, rest: 60 },
      { id: "front", name: "フロントレイズ", sets: 3, reps: 15, rest: 60 },
    ],
  },
  {
    id: "arms",
    title: "腕",
    icon: "figure.arms.open",
    exercises: [
      { id: "curl", name: "バーベルカール", sets: 3, reps: 12, rest: 60 },
      {
        id: "tricep",
        name: "トライセップスプレスダウン",
        sets: 3,
        reps: 12,
        rest: 60,
      },
      { id: "hammer", name: "ハンマーカール", sets: 3, reps: 15, rest: 60 },
    ],
  },
];

export default function WorkoutScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        トレーニング
      </ThemedText>

      {!selectedCategory ? (
        <ScrollView style={styles.categoriesContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            部位を選択
          </ThemedText>

          {workoutCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => setSelectedCategory(category.id)}
            >
              <ThemedView style={styles.categoryHeader}>
                <IconSymbol size={28} name="figure.arms.open" color="#007AFF" />
                <ThemedText type="subtitle">{category.title}</ThemedText>
              </ThemedView>
              <ThemedText>{category.exercises.length}種目</ThemedText>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.addButton}>
            <IconSymbol size={24} name="plus.circle.fill" color="white" />
            <ThemedText style={styles.addButtonText}>
              新しいトレーニングを追加
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <ScrollView style={styles.exercisesContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedCategory(null)}
          >
            <IconSymbol size={20} name="chevron.left" color="#007AFF" />
            <ThemedText style={{ color: "#007AFF" }}>戻る</ThemedText>
          </TouchableOpacity>

          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {workoutCategories.find((c) => c.id === selectedCategory)?.title}
            のトレーニング
          </ThemedText>

          {workoutCategories
            .find((c) => c.id === selectedCategory)
            ?.exercises.map((exercise) => (
              <ThemedView key={exercise.id} style={styles.exerciseCard}>
                <ThemedText type="defaultSemiBold">{exercise.name}</ThemedText>
                <ThemedView style={styles.exerciseDetails}>
                  <ThemedText>
                    {exercise.sets}セット × {exercise.reps}回
                  </ThemedText>
                  <ThemedText>休憩: {exercise.rest}秒</ThemedText>
                </ThemedView>
                <TouchableOpacity style={styles.startButton}>
                  <ThemedText style={styles.startButtonText}>開始</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            ))}
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginVertical: 20,
  },
  categoriesContainer: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  categoryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    gap: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  exercisesContainer: {
    flex: 1,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 16,
  },
  exerciseCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  exerciseDetails: {
    marginVertical: 8,
  },
  startButton: {
    backgroundColor: "#34C759",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
