import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weeklyReportEnabled, setWeeklyReportEnabled] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        プロフィール
      </ThemedText>

      <ThemedView style={styles.profileSection}>
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.profileImage}
        />
        <ThemedView style={styles.profileInfo}>
          <ThemedText type="title">山田太郎</ThemedText>
          <ThemedText style={styles.profileSubtitle}>
            運動レベル: 中級者
          </ThemedText>
          <TouchableOpacity style={styles.editButton}>
            <ThemedText style={styles.editButtonText}>編集</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">身体情報</ThemedText>

        <ThemedView style={styles.infoRow}>
          <ThemedText>年齢</ThemedText>
          <ThemedText>30歳</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText>身長</ThemedText>
          <ThemedText>175cm</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText>体重</ThemedText>
          <ThemedText>68kg</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoRow}>
          <ThemedText>体脂肪率</ThemedText>
          <ThemedText>15%</ThemedText>
        </ThemedView>

        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>更新</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">目標設定</ThemedText>

        <ThemedView style={styles.goalsList}>
          <ThemedView style={styles.goalItem}>
            <ThemedView style={styles.goalHeader}>
              <ThemedText>ベンチプレス 80kg</ThemedText>
              <TouchableOpacity>
                <IconSymbol
                  size={20}
                  name="xmark.circle.fill"
                  color="#FF3B30"
                />
              </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.progressBarContainer}>
              <ThemedView style={[styles.progressBar, { width: "75%" }]} />
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.goalItem}>
            <ThemedView style={styles.goalHeader}>
              <ThemedText>週3回のトレーニング</ThemedText>
              <TouchableOpacity>
                <IconSymbol
                  size={20}
                  name="xmark.circle.fill"
                  color="#FF3B30"
                />
              </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.progressBarContainer}>
              <ThemedView style={[styles.progressBar, { width: "100%" }]} />
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText}>新しい目標を追加</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">設定</ThemedText>

        <ThemedView style={styles.settingRow}>
          <ThemedText>リマインダー通知</ThemedText>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#767577", true: "#34C759" }}
          />
        </ThemedView>

        <ThemedView style={styles.settingRow}>
          <ThemedText>週間レポート</ThemedText>
          <Switch
            value={weeklyReportEnabled}
            onValueChange={setWeeklyReportEnabled}
            trackColor={{ false: "#767577", true: "#34C759" }}
          />
        </ThemedView>

        <TouchableOpacity style={styles.settingRow}>
          <ThemedText>プライバシーポリシー</ThemedText>
          <IconSymbol size={20} name="chevron.right" color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <ThemedText>利用規約</ThemedText>
          <IconSymbol size={20} name="chevron.right" color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <ThemedText style={styles.logoutButtonText}>ログアウト</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
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
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileSubtitle: {
    color: "#8E8E93",
    marginVertical: 4,
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#C7C7CC",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  goalsList: {
    marginVertical: 8,
  },
  goalItem: {
    marginVertical: 8,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#C7C7CC",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
