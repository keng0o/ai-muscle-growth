import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini APIキー（環境変数から取得するのが推奨）
// 実際のプロジェクトでは環境設定ファイルやサーバーサイドで管理することをお勧めします
const API_KEY = "YOUR_GEMINI_API_KEY";

// モデル名
const MODEL_NAME = "gemini-pro-vision";

// Gemini APIクライアントの初期化
const genAI = new GoogleGenerativeAI(API_KEY);

interface BodyAttributes {
  height: number; // cm
  weight: number; // kg
  bodyFatPercentage?: number; // %
  gender: "male" | "female" | "other";
  age: number;
}

interface MuscleGrowthData {
  chest: number; // 0-100
  back: number; // 0-100
  shoulders: number; // 0-100
  arms: number; // 0-100
  legs: number; // 0-100
  core: number; // 0-100
}

/**
 * 筋肉成長シミュレーション画像を生成する
 */
export async function generateMuscleGrowthImage(
  bodyAttributes: BodyAttributes,
  muscleGrowthData: MuscleGrowthData,
  baselineImageUrl?: string
): Promise<string> {
  try {
    // モデルを取得
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // プロンプトを構築
    const prompt = buildPrompt(
      bodyAttributes,
      muscleGrowthData,
      baselineImageUrl
    );

    // 画像生成リクエスト
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 返されたテキストから画像URLを抽出（APIの仕様に依存）
    // 実際のAPIレスポンス形式に合わせて調整が必要
    const imageUrl = extractImageUrl(text);

    return imageUrl;
  } catch (error) {
    console.error("Error generating muscle growth image:", error);
    throw error;
  }
}

/**
 * 画像生成用のプロンプトを構築
 */
function buildPrompt(
  body: BodyAttributes,
  muscleGrowth: MuscleGrowthData,
  baselineImageUrl?: string
): string {
  // 基本情報
  let prompt = `Generate a realistic 3D rendered image of a ${
    body.gender === "male" ? "male" : "female"
  }
  fitness model with the following attributes:
  - Height: ${body.height}cm
  - Weight: ${body.weight}kg
  - Age: ${body.age} years old
  `;

  if (body.bodyFatPercentage) {
    prompt += `- Body fat percentage: ${body.bodyFatPercentage}%\n`;
  }

  // 筋肉の発達度合い
  prompt += "\nMuscle development levels:\n";

  if (muscleGrowth.chest > 0) {
    prompt += `- Chest muscles: ${describeMuscleDevelopment(
      muscleGrowth.chest
    )}\n`;
  }
  if (muscleGrowth.back > 0) {
    prompt += `- Back muscles: ${describeMuscleDevelopment(
      muscleGrowth.back
    )}\n`;
  }
  if (muscleGrowth.shoulders > 0) {
    prompt += `- Shoulder muscles: ${describeMuscleDevelopment(
      muscleGrowth.shoulders
    )}\n`;
  }
  if (muscleGrowth.arms > 0) {
    prompt += `- Arm muscles: ${describeMuscleDevelopment(
      muscleGrowth.arms
    )}\n`;
  }
  if (muscleGrowth.legs > 0) {
    prompt += `- Leg muscles: ${describeMuscleDevelopment(
      muscleGrowth.legs
    )}\n`;
  }
  if (muscleGrowth.core > 0) {
    prompt += `- Core muscles: ${describeMuscleDevelopment(
      muscleGrowth.core
    )}\n`;
  }

  // 画像スタイル指定
  prompt += "\nImage specifications:";
  prompt += "\n- Ultra-realistic 3D render";
  prompt += "\n- Neutral standing pose, showing full body";
  prompt += "\n- Soft studio lighting";
  prompt += "\n- Clean background";
  prompt +=
    "\n- Athletic wear: fitted shorts and tank top showing muscle definition";

  // ベースライン画像がある場合
  if (baselineImageUrl) {
    prompt += `\n\nUse this baseline image as reference for facial features and overall body structure: ${baselineImageUrl}`;
  }

  return prompt;
}

/**
 * 筋肉の発達度合いを言語で表現
 */
function describeMuscleDevelopment(level: number): string {
  if (level < 20) {
    return "minimal development, just starting to tone";
  } else if (level < 40) {
    return "noticeable tone, beginning development";
  } else if (level < 60) {
    return "moderate development, clear muscle definition";
  } else if (level < 80) {
    return "significant development, well-defined muscles";
  } else {
    return "exceptional development, highly defined and prominent muscles";
  }
}

/**
 * レスポンスから画像URLを抽出（実際のAPIレスポンス形式に依存）
 */
function extractImageUrl(response: string): string {
  // 実際のAPIレスポンス形式に合わせて実装
  // 例としてのダミー実装
  return "https://example.com/generated-muscle-image.jpg";
}
