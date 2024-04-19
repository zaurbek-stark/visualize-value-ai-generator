import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
    });
  }

  const body = await req.text();
  const { prompt } = JSON.parse(body);
  
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response?.data?.[0]?.url;
    console.log('imageUrl:', imageUrl);
    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error(error);
    return new Response(error?.message || error?.toString(), {
      status: 500,
    })
  }
}