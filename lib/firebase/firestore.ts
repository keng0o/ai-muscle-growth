import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";

import {
  BodyMeasurement,
  Exercise,
  Goal,
  MuscleGrowthSimulation,
  UserProfile,
  WorkoutSession,
} from "@/types";
import { firebaseConfig } from "./config";

// Firebase初期化
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Firestoreを取得
const db = getFirestore();
const auth = getAuth();

// コレクション名
const COLLECTIONS = {
  USERS: "users",
  EXERCISES: "exercises",
  WORKOUT_SESSIONS: "workoutSessions",
  GOALS: "goals",
  MUSCLE_SIMULATIONS: "muscleSimulations",
  BODY_MEASUREMENTS: "bodyMeasurements",
};

// Firestoreのタイムスタンプに変換
const toFirestoreTimestamp = (date: Date) => Timestamp.fromDate(date);

// FirestoreのタイムスタンプからJSのDateに変換
const fromFirestoreTimestamp = (timestamp: Timestamp) => timestamp.toDate();

// ドキュメントデータの変換ヘルパー
const convertTimestamps = (data: DocumentData, dateFields: string[]) => {
  const result = { ...data };

  dateFields.forEach((field) => {
    if (result[field] && result[field] instanceof Timestamp) {
      result[field] = fromFirestoreTimestamp(result[field]);
    }
  });

  return result;
};

// ユーザープロフィールの操作
export const userProfileService = {
  // ユーザープロフィールを取得
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, COLLECTIONS.USERS, userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          id: docSnap.id,
          createdAt: fromFirestoreTimestamp(data.createdAt),
          updatedAt: fromFirestoreTimestamp(data.updatedAt),
        } as UserProfile;
      }

      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw error;
    }
  },

  // ユーザープロフィールを作成または更新
  async saveUserProfile(profile: UserProfile): Promise<void> {
    try {
      const { id, ...profileData } = profile;
      const docRef = doc(db, COLLECTIONS.USERS, id);

      await setDoc(
        docRef,
        {
          ...profileData,
          createdAt: toFirestoreTimestamp(profile.createdAt),
          updatedAt: toFirestoreTimestamp(new Date()),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw error;
    }
  },
};

// トレーニングセッションの操作
export const workoutSessionService = {
  // トレーニングセッションを保存
  async saveWorkoutSession(session: WorkoutSession): Promise<void> {
    try {
      const { id, ...sessionData } = session;
      const docRef = doc(db, COLLECTIONS.WORKOUT_SESSIONS, id);

      await setDoc(docRef, {
        ...sessionData,
        date: toFirestoreTimestamp(session.date),
      });
    } catch (error) {
      console.error("Error saving workout session:", error);
      throw error;
    }
  },

  // ユーザーのトレーニングセッションを取得
  async getUserWorkoutSessions(userId: string): Promise<WorkoutSession[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.WORKOUT_SESSIONS),
        where("userId", "==", userId),
        orderBy("date", "desc")
      );

      const querySnapshot = await getDocs(q);
      const sessions: WorkoutSession[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        sessions.push({
          ...data,
          id: doc.id,
          date: fromFirestoreTimestamp(data.date),
        } as WorkoutSession);
      });

      return sessions;
    } catch (error) {
      console.error("Error getting user workout sessions:", error);
      throw error;
    }
  },

  // 日付範囲でトレーニングセッションを取得
  async getWorkoutSessionsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<WorkoutSession[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.WORKOUT_SESSIONS),
        where("userId", "==", userId),
        where("date", ">=", toFirestoreTimestamp(startDate)),
        where("date", "<=", toFirestoreTimestamp(endDate)),
        orderBy("date", "desc")
      );

      const querySnapshot = await getDocs(q);
      const sessions: WorkoutSession[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        sessions.push({
          ...data,
          id: doc.id,
          date: fromFirestoreTimestamp(data.date),
        } as WorkoutSession);
      });

      return sessions;
    } catch (error) {
      console.error("Error getting workout sessions by date range:", error);
      throw error;
    }
  },
};

// エクササイズの操作
export const exerciseService = {
  // エクササイズを取得
  async getAllExercises(): Promise<Exercise[]> {
    try {
      const q = query(collection(db, COLLECTIONS.EXERCISES));
      const querySnapshot = await getDocs(q);
      const exercises: Exercise[] = [];

      querySnapshot.forEach((doc) => {
        exercises.push({
          ...doc.data(),
          id: doc.id,
        } as Exercise);
      });

      return exercises;
    } catch (error) {
      console.error("Error getting exercises:", error);
      throw error;
    }
  },

  // 筋肉グループでエクササイズをフィルタリング
  async getExercisesByMuscleGroup(muscleGroup: string): Promise<Exercise[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.EXERCISES),
        where("muscleGroup", "==", muscleGroup)
      );

      const querySnapshot = await getDocs(q);
      const exercises: Exercise[] = [];

      querySnapshot.forEach((doc) => {
        exercises.push({
          ...doc.data(),
          id: doc.id,
        } as Exercise);
      });

      return exercises;
    } catch (error) {
      console.error("Error getting exercises by muscle group:", error);
      throw error;
    }
  },
};

// 目標の操作
export const goalService = {
  // 目標を保存
  async saveGoal(goal: Goal): Promise<void> {
    try {
      const { id, ...goalData } = goal;
      const docRef = doc(db, COLLECTIONS.GOALS, id);

      await setDoc(docRef, {
        ...goalData,
        createdAt: toFirestoreTimestamp(goal.createdAt),
        updatedAt: toFirestoreTimestamp(new Date()),
        targetDate: goal.targetDate
          ? toFirestoreTimestamp(goal.targetDate)
          : null,
      });
    } catch (error) {
      console.error("Error saving goal:", error);
      throw error;
    }
  },

  // ユーザーの目標を取得
  async getUserGoals(userId: string): Promise<Goal[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.GOALS),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const goals: Goal[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        goals.push({
          ...data,
          id: doc.id,
          createdAt: fromFirestoreTimestamp(data.createdAt),
          updatedAt: fromFirestoreTimestamp(data.updatedAt),
          targetDate: data.targetDate
            ? fromFirestoreTimestamp(data.targetDate)
            : undefined,
        } as Goal);
      });

      return goals;
    } catch (error) {
      console.error("Error getting user goals:", error);
      throw error;
    }
  },

  // 目標を削除
  async deleteGoal(goalId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTIONS.GOALS, goalId));
    } catch (error) {
      console.error("Error deleting goal:", error);
      throw error;
    }
  },
};

// 筋肉成長シミュレーションの操作
export const muscleSimulationService = {
  // シミュレーション結果を保存
  async saveMuscleSimulation(
    simulation: MuscleGrowthSimulation
  ): Promise<void> {
    try {
      const { id, ...simulationData } = simulation;
      const docRef = doc(db, COLLECTIONS.MUSCLE_SIMULATIONS, id);

      await setDoc(docRef, {
        ...simulationData,
        date: toFirestoreTimestamp(simulation.date),
      });
    } catch (error) {
      console.error("Error saving muscle simulation:", error);
      throw error;
    }
  },

  // 最新のシミュレーション結果を取得
  async getLatestMuscleSimulation(
    userId: string
  ): Promise<MuscleGrowthSimulation | null> {
    try {
      const q = query(
        collection(db, COLLECTIONS.MUSCLE_SIMULATIONS),
        where("userId", "==", userId),
        orderBy("date", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();

        return {
          ...data,
          id: doc.id,
          date: fromFirestoreTimestamp(data.date),
        } as MuscleGrowthSimulation;
      }

      return null;
    } catch (error) {
      console.error("Error getting latest muscle simulation:", error);
      throw error;
    }
  },
};

// 体の計測記録の操作
export const bodyMeasurementService = {
  // 計測記録を保存
  async saveBodyMeasurement(measurement: BodyMeasurement): Promise<void> {
    try {
      const { id, ...measurementData } = measurement;
      const docRef = doc(db, COLLECTIONS.BODY_MEASUREMENTS, id);

      await setDoc(docRef, {
        ...measurementData,
        date: toFirestoreTimestamp(measurement.date),
      });
    } catch (error) {
      console.error("Error saving body measurement:", error);
      throw error;
    }
  },

  // ユーザーの計測記録履歴を取得
  async getUserBodyMeasurements(userId: string): Promise<BodyMeasurement[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.BODY_MEASUREMENTS),
        where("userId", "==", userId),
        orderBy("date", "desc")
      );

      const querySnapshot = await getDocs(q);
      const measurements: BodyMeasurement[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        measurements.push({
          ...data,
          id: doc.id,
          date: fromFirestoreTimestamp(data.date),
        } as BodyMeasurement);
      });

      return measurements;
    } catch (error) {
      console.error("Error getting user body measurements:", error);
      throw error;
    }
  },
};
