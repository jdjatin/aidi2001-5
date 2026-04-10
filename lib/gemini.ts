import { getGeminiApiKey } from '@/lib/env';

declare global {
  var geminiGlobal: unknown;
}

export async function getGeminiClient() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    return null;
  }

  const { GoogleGenAI } = await import('@google/genai');

  if (!global.geminiGlobal) {
    global.geminiGlobal = new GoogleGenAI({ apiKey });
  }

  return global.geminiGlobal as InstanceType<typeof GoogleGenAI>;
}
