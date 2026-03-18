import { NextRequest, NextResponse } from 'next/server';
import { AzureOpenAI } from 'openai';

export async function POST(req: NextRequest) {
    try {
        const client = new AzureOpenAI({
            endpoint: process.env.AZURE_OPENAI_ENDPOINT!,
            apiKey: process.env.AZURE_OPENAI_API_KEY!,
            apiVersion: '2024-12-01-preview',
        });

        const { type, value } = await req.json();

        let prompt = `あなたはオンライン雑談会（Coffee Chat）を盛り上げるファシリテーターです。

## 場の設定
- 週1回、30分程度のカジュアルな会
- IT企業の同僚同士（エンジニアやサポート）
- 正解・不正解のないオープンな場
- コーヒー片手にリラックスして話す雰囲気

## トピックの条件
- 誰でも何かしら話せる（専門知識不要）
- 思わず「あー、わかる！」「え、そうなの？」と反応したくなる
- ポジティブで、聞いた瞬間に少しワクワクする
- 具体的で、すぐに自分の経験やエピソードが思い浮かぶ
- 「〜〜は？」「〜〜って何？」などの問いかけ形式

## 禁止事項
- 政治・宗教・センシティブな話題は避ける
- 抽象的すぎるテーマ（例:「幸せとは？」）は避ける
- 前置きや挨拶は不要。トピックのテキストのみを返す

トピックを1つだけ生成してください。`;

        if (type === 'random') {
            prompt += `\n\n## リクエスト\n意外性があって「おっ」と思わせるようなトピックをお願いします。ありきたりな質問（好きな食べ物は？等）ではなく、ユニークな切り口で。`;
        } else if (type === 'category') {
            prompt += `\n\n## リクエスト\n「${value}」というテーマで、IT業界の人が盛り上がれるトピックをお願いします。テーマに関連しつつも、少しひねりのある切り口で。`;
        } else if (type === 'custom') {
            prompt += `\n\n## リクエスト\n「${value}」というキーワードから連想される、会話が広がりそうなトピックをお願いします。キーワードをそのまま使うのではなく、そこから一歩発展させた問いかけにしてください。`;
        } else {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        const response = await client.chat.completions.create({
            model: 'gpt-4o-mini',
            max_tokens: 1000,
            temperature: 0.8,
            messages: [
                { role: 'user', content: prompt }
            ],
        });

        const generatedTopic = response.choices[0]?.message?.content?.trim() || "トピックを生成できませんでした。";

        return NextResponse.json({ topic: generatedTopic });
    } catch (error) {
        console.error('Error generating topic:', error);
        return NextResponse.json({ error: 'Failed to generate topic' }, { status: 500 });
    }
}
