import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
// It automatically picks up GEMINI_API_KEY from environment variables
const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
    try {
        const { type, value } = await req.json();

        let prompt = `あなたはオンライン雑談会（週1回、30分、IT会社、ジャッジしないオープンスペース）を盛り上げるアシスタントです。
参加者がリラックスして、コーヒーを片手に話せるような、楽しくて少し考えを共有したくなる「雑談のトピック」を一つだけ提供してください。
回答はトピックのテキストのみ（〜〜は？などの問いかけ形式）で返し、挨拶などは不要です。`;

        if (type === 'random') {
            prompt += `\nまったくのランダムで、意外性のある面白いトピックを考えてください。`;
        } else if (type === 'category') {
            prompt += `\n特に「${value}」というテーマに関連した、IT業界の人でも答えやすいトピックを考えてください。`;
        } else if (type === 'custom') {
            prompt += `\n参加者から「${value}」というキーワードが入力されました。このキーワードから連想される、誰もが参加しやすいポジティブなトピックを考えてください。`;
        } else {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.8,
            }
        });

        const generatedTopic = response.text?.trim() || "トピックを生成できませんでした。";

        return NextResponse.json({ topic: generatedTopic });
    } catch (error) {
        console.error('Error generating topic:', error);
        return NextResponse.json({ error: 'Failed to generate topic' }, { status: 500 });
    }
}
