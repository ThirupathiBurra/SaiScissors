import { GoogleGenAI } from '@google/genai';

// Initialize Gemini Client server-side
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Server-side wrapper for Gemini API
 */
export const askGemini = async (systemInstruction: string, prompt: string): Promise<string> => {
  if (!ai) {
    throw new Error('GEMINI_API_KEY is missing from environment variables.');
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    if (!response.text) {
      throw new Error('Empty response from Gemini');
    }

    return response.text;
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    // Determine if quota exhausted
    if (error?.status === 429 || error?.message?.includes('quota')) {
      throw new Error('QUOTA_EXHAUSTED');
    }
    throw error;
  }
};
