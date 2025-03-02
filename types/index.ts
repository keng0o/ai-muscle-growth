// ユーザープロフィール
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  height: number; // cm
  weight: number; // kg
  bodyFatPercentage?: number; // %
  fitnessLevel: "beginner" | "intermediate" | "advanced";
  createdAt: Date;
  updatedAt: Date;
}

// トレーニング
export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  defaultSets: number;
  defaultReps: number;
  defaultRestTime: number; // seconds
}

// 筋肉グループ
export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "arms"
  | "legs"
  | "core"
  | "fullBody";

// トレーニングセッション
export interface WorkoutSession {
  id: string;
  userId: string;
  date: Date;
  duration: number; // minutes
  exercises: WorkoutExercise[];
  notes?: string;
  rating?: number; // 1-5
}

// セッション内のエクササイズ
export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
}

// セット
export interface WorkoutSet {
  reps: number;
  weight?: number; // kg
  duration?: number; // seconds (for plank, etc.)
  restTime?: number; // seconds
  completed: boolean;
}

// 目標
export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  targetDate?: Date;
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  completed: boolean;
  category: "strength" | "endurance" | "weight" | "habit" | "other";
  createdAt: Date;
  updatedAt: Date;
}

// 筋肉成長シミュレーション
export interface MuscleGrowthSimulation {
  id: string;
  userId: string;
  date: Date;
  muscleGroups: {
    [key in MuscleGroup]?: number; // 0-100 成長度
  };
  imageUrl?: string; // 生成された画像のURL
  previousImageUrl?: string; // 前回の画像URL（比較用）
}

// 体の計測記録
export interface BodyMeasurement {
  id: string;
  userId: string;
  date: Date;
  weight?: number; // kg
  bodyFatPercentage?: number; // %
  measurements?: {
    chest?: number; // cm
    waist?: number; // cm
    hips?: number; // cm
    biceps?: number; // cm
    thighs?: number; // cm
    calves?: number; // cm
  };
}
