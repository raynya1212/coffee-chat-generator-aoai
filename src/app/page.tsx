'use client';

import { useState } from 'react';
import { ChevronDown, Send } from 'lucide-react';
import styles from './page.module.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const TOPICS = [
  "最近のニュース",
  "IT ニュース",
  "映画 /ドラマ / アニメ",
  "グルメ",
  "お出かけ",
  "最近ハマっていること",
  "リフレッシュ方法",
  "もしも話"
];

const FALLBACK_TOPICS = [
  "もし1億円あったら何に使う？",
  "今までで一番高かった買い物は？",
  "子供の頃の夢は何だった？",
  "今一番行きたい国はどこ？",
  "初任給で買ったものは？",
  "人生で一番の失敗談は？",
  "タイムマシンがあったら過去と未来どっちに行く？",
  "最近感動して泣いたことは？",
  "魔法が一つだけ使えるなら何がいい？",
  "無人島に3つ持っていくなら何？",
  "最近買ってよかったものは？",
  "学生時代の部活は何だった？",
  "今まで経験したアルバイトで一番きつかったのは？",
  "お気に入りの映画・本は？",
  "好きな季節とその理由は？",
  "今日の朝ごはん何食べた？",
  "自分を動物に例えると何？",
  "おすすめのストレス解消法は？",
  "最近見た夢で印象的だったものは？",
  "生まれ変わるなら男と女どっち？",
  "好きな言葉・座右の銘は？",
  "これだけは無理！という苦手なものは？",
  "カラオケの十八番は？",
  "幽霊やUFOは信じる？",
  "もし宝くじで10億円当たったら仕事はどうする？",
  "好きなYouTuberやインフルエンサーはいる？",
  "子どもの頃、親に怒られた一番の理由は？",
  "人生で一番のモテ期はいつだった？",
  "今までで一番美味しかった食べ物は？",
  "過去の自分にアドバイスできるならなんて言う？"
];

export default function Home() {
  const [topic, setTopic] = useState<string>("最近あった面白かったことは？");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');

  const generateTopic = async (type: 'random' | 'category' | 'custom', value?: string) => {
    setIsLoading(true);
    setTopic("...");

    try {
      const res = await fetch('/api/generate-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value })
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setTopic(data.topic);
    } catch (error) {
      console.error("Fallaback error handling:", error);
      const randomFallback = FALLBACK_TOPICS[Math.floor(Math.random() * FALLBACK_TOPICS.length)];
      setTopic(`【AI混雑中のためピンチヒッター】\n${randomFallback}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Coffee chat time</h1>

      <div className={styles.hero}>
        <div className={`${styles.speechBubble} ${styles.speechBubbleInner}`}>
          {isLoading ? (
            <span className={styles.loadingText}>考え中...</span>
          ) : (
            topic
          )}
        </div>

        <div className={styles.catContainer}>
          <div className={styles.azureGlow}>
            <DotLottieReact
              src="https://lottie.host/5be8dfec-3c1e-4c1f-8d31-e744fa4039e1/5u3jkcx1Qs.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className={styles.poweredBy}>
            <span className={styles.azureLogo}>⚡</span> Powered by Azure OpenAI
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.button}
          onClick={() => generateTopic('random')}
          disabled={isLoading}
        >
          Give me a random topic!
        </button>

        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            onChange={(e) => {
              if (e.target.value) {
                generateTopic('category', e.target.value);
                e.target.value = ""; // reset after selection
              }
            }}
            disabled={isLoading}
            defaultValue=""
          >
            <option value="" disabled>トピックからえらぶ</option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ChevronDown className={styles.selectIcon} size={24} />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.input}
            placeholder="気になる話題を入力..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && customInput.trim()) {
                generateTopic('custom', customInput.trim());
              }
            }}
            disabled={isLoading}
          />
          <button
            className={styles.submitBtn}
            onClick={() => {
              if (customInput.trim()) {
                generateTopic('custom', customInput.trim());
              }
            }}
            disabled={isLoading || !customInput.trim()}
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
