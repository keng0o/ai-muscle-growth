# マッスルグロー - 筋トレ記録＆成長シミュレーションアプリ

筋トレの習慣化をサポートし、トレーニングの成果を可視化するモバイルアプリケーションです。日々の筋トレを記録し、その結果に応じて未来の肉体イメージをAIで生成することで、モチベーションの維持・向上を図ります。

## 機能

- **筋トレ記録機能**
  - 種目、回数、セット数、重量などの詳細入力
  - トレーニング時間や感想のメモ機能
  - 簡単入力モードと詳細入力モードの切り替え

- **筋肉成長シミュレーション**
  - 日々の記録に基づき、筋肉の成長をシミュレート
  - 部位ごとの成長度合いを可視化

- **未来の肉体イメージ生成**
  - 一週間に一度、トレーニング内容に基づく未来の肉体画像を生成
  - ユーザーの現在の体型と比較表示

- **進捗管理**
  - 過去のトレーニング履歴の閲覧
  - 体重や筋肉量の変化をグラフで表示

- **目標設定**
  - 筋トレの具体的な目標を設定（例：ベンチプレス100kg達成）
  - 目標達成度のトラッキング

- **リマインダー機能**
  - トレーニング時間のリマインダー通知
  - モチベーションアップのためのメッセージ配信

## 技術スタック

- **フロントエンド**
  - React Native / Expo
  - TypeScript

- **バックエンド**
  - Firebase (Firestore, Authentication)

- **AI画像生成**
  - Google Gemini API

## セットアップ

1. リポジトリをクローン

```bash
git clone https://github.com/yourusername/muscle-growth-app.git
cd muscle-growth-app
```

2. 依存パッケージのインストール

```bash
npm install
```

3. `.env` ファイルを作成し、必要な環境変数を設定

```
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
GEMINI_API_KEY=your_gemini_api_key
```

4. アプリを起動

```bash
npm start
```

## 開発ガイドライン

- コンポーネントは `components` ディレクトリに配置
- 画面は `app` ディレクトリに配置
- Firestoreとの連携コードは `lib/firebase` ディレクトリに配置
- 共有型定義は `types` ディレクトリに配置

## コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## ライセンス

MIT License
