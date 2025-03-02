import { Link } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">今日のトレーニング</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.card}>
          <ThemedView style={styles.cardHeader}>
            <IconSymbol size={24} name="calendar" color="#007AFF" />
            <ThemedText type="subtitle">今週の進捗</ThemedText>
          </ThemedView>
          <ThemedView style={styles.progressBar}>
            <ThemedView style={[styles.progressFill, { width: "60%" }]} />
          </ThemedView>
          <ThemedText>今週のトレーニング: 3/5日完了</ThemedText>
          <Link href="/(tabs)/progress" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>詳細を見る</ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.card}>
          <ThemedView style={styles.cardHeader}>
            <IconSymbol size={24} name="dumbbell.fill" color="#FF9500" />
            <ThemedText type="subtitle">おすすめのトレーニング</ThemedText>
          </ThemedView>
          <ThemedText>今日は上半身トレーニングの日です。</ThemedText>
          <ThemedText>・ベンチプレス: 4セット x 10回</ThemedText>
          <ThemedText>・ダンベルショルダープレス: 3セット x 12回</ThemedText>
          <ThemedText>・ラットプルダウン: 3セット x 12回</ThemedText>
          <Link href="/(tabs)/workout" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>
                トレーニングを開始
              </ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.cardContainer}>
        <ThemedView style={styles.card}>
          <ThemedView style={styles.cardHeader}>
            <IconSymbol size={24} name="person.fill" color="#5AC8FA" />
            <ThemedText type="subtitle">筋肉成長シミュレーション</ThemedText>
          </ThemedView>
          <ThemedText>次の筋肉成長予測は3日後に更新されます。</ThemedText>
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.simulationImage}
          />
          <Link href="/(tabs)/progress" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>詳細を見る</ThemedText>
            </TouchableOpacity>
          </Link>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E5E5EA",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#34C759",
    borderRadius: 4,
  },
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  simulationImage: {
    height: 150,
    width: "100%",
    resizeMode: "contain",
  },
});
