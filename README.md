# Coffee Chat Generator ☕✨

オンラインの雑談会（Weekly Coffee Chat）を盛り上げるためのトピックジェネレーターWebアプリケーションです。
Next.js と Google Gemini API を使用して、楽しくて少し考えを共有したくなるような雑談トピックを生成します。

## 機能 🚀

- **Surprise Me!**: まったくランダムで意外性のある面白いトピックをAIが自動生成します。
- **カテゴリから選ぶ**: 「最近のニュース」「ITニュース」「グルメ」「もしも話」など、あらかじめ用意されたテーマから選んでAIにトピックを生成させることができます。
- **自由入力**: 気になる話題を自由に入力して、それに関連した深掘りできるトピックテーマを生成します。
- **フォールバック機能**: AI APIの制限時などエラーが発生した場合でも、あらかじめ用意された30個の「鉄板雑談テーマ」の中からランダムで出力し、画面が止まるの（気まずい沈黙）を防ぎます。

## 利用技術 🛠️

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (Vanilla CSS)
- **AI**: Google Generative AI (`@google/genai` sdk) using Gemini 2.5 Flash
- **Fonts**: `@next/font/google` (Capriola, Yomogi)
- **Animations**: `@lottiefiles/dotlottie-react`

## ローカルでの動かし方 💻

### 前提条件
- Node.js がインストールされていること
- Google Gemini API キーを準備していること

### 1. リポジトリのクローン
```bash
git clone https://github.com/raynya1212/coffee-chat-generator.git
cd coffee-chat-generator
```

### 2. 依存パッケージのインストール
```bash
npm install
```

### 3. 環境変数の設定
プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、Gemini APIキーおよびBasic認証の設定を行います。
```env
# Google Gemini API Key
GEMINI_API_KEY=your_api_key_here

# Basic Authentication Credentials
BASIC_AUTH_USER=your_preferred_username
BASIC_AUTH_PASSWORD=your_preferred_password
```

### 4. 開発サーバーの起動
```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスして動かしてください。

## Vercel等へのデプロイ
Vercelに連携してデプロイできます。  
デプロイの設定（Environment Variables）にて、以下の変数を必ず追加してください。これを設定しないとBasic認証を通過できません。
- `GEMINI_API_KEY`
- `BASIC_AUTH_USER`
- `BASIC_AUTH_PASSWORD`

また、本プロジェクトは Next.js `layout.tsx` のメタデータにて `noindex` 設定を含んでいるため、デプロイしたURLが検索エンジンにインデックスされることはありません。安心してご利用ください！
