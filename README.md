# Coffee Chat Generator (Azure OpenAI版) ☕✨

オンラインの雑談会（Weekly Coffee Chat）を盛り上げるためのトピックジェネレーターWebアプリケーションです。
Next.js と Azure OpenAI (GPT-4.1 mini) を使用して、楽しくて少し考えを共有したくなるような雑談トピックを生成します。

> 💡 Gemini API版は [coffee-chat-generator](https://github.com/raynya1212/coffee-chat-generator) を参照してください。

## 機能 🚀

- **Surprise Me!**: まったくランダムで意外性のある面白いトピックをAIが自動生成します。
- **カテゴリから選ぶ**: 「最近のニュース」「ITニュース」「グルメ」「もしも話」など、あらかじめ用意されたテーマから選んでAIにトピックを生成させることができます。
- **自由入力**: 気になる話題を自由に入力して、それに関連した深掘りできるトピックテーマを生成します。
- **フォールバック機能**: AI APIの制限時などエラーが発生した場合でも、あらかじめ用意された30個の「鉄板雑談テーマ」の中からランダムで出力し、画面が止まるの（気まずい沈黙）を防ぎます。
- **Azure OpenAI ブランディング**: アニメーションにAzureブルーのグロー効果と「⚡ Powered by Azure OpenAI」バッジを表示します。

## AIプロンプトの工夫 🧠

トピック生成のプロンプトには以下の工夫を施しています：
- **場の設定を明確化**: 参加者の職種（エンジニアやサポート）やカジュアルな雰囲気を伝達
- **品質条件の具体化**: 「思わず『あー、わかる！』と反応したくなる」「具体的でエピソードが思い浮かぶ」など
- **禁止事項の定義**: 政治・宗教やセンシティブな話題、抽象的すぎるテーマを回避
- **リクエスト別の指示**: ランダム時は「ユニークな切り口」、カテゴリ時は「ひねりのある切り口」、自由入力時は「一歩発展させた問いかけ」を指示

## 利用技術 🛠️

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (Vanilla CSS)
- **AI**: Azure OpenAI (`openai` sdk) using GPT-4o mini
- **Fonts**: `@next/font/google` (Capriola, Yomogi)
- **Animations**: `@lottiefiles/dotlottie-react` + coffee-themed glow effects

## ローカルでの動かし方 💻

### 前提条件
- Node.js がインストールされていること
- Azure OpenAI のエンドポイントとAPIキーを準備していること

### 1. リポジトリのクローン
```bash
git clone https://github.com/raynya1212/coffee-chat-generator-aoai.git
cd coffee-chat-generator-aoai
```

### 2. 依存パッケージのインストール
```bash
npm install
```

### 3. 環境変数の設定
プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、Azure OpenAI およびBasic認証の設定を行います。
```env
# Azure OpenAI
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_api_key_here

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
- `AZURE_OPENAI_ENDPOINT`
- `AZURE_OPENAI_API_KEY`
- `BASIC_AUTH_USER`
- `BASIC_AUTH_PASSWORD`

また、本プロジェクトは Next.js `layout.tsx` のメタデータにて `noindex` 設定を含んでいるため、デプロイしたURLが検索エンジンにインデックスされることはありません。安心してご利用ください！
