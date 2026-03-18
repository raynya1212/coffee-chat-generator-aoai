import { NextRequest, NextResponse } from 'next/server';
import { AzureOpenAI } from 'openai';

// Initialize the Azure OpenAI client
const client = new AzureOpenAI({
    endpoint: process.env.AZURE_OPENAI_ENDPOINT!,
    apiKey: process.env.AZURE_OPENAI_API_KEY!,
    apiVersion: '2024-12-01-preview',
});

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

        const response = await client.chat.completions.create({
            model: 'gpt-4.1-mini',
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
