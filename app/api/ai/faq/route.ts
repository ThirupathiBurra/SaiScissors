import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/ai/rateLimiter';
import { aiCacheRepository, generateCacheHash } from '@/repositories/aiCacheRepository';
import { aiLogRepository } from '@/repositories/aiLogRepository';
import { fallbackEngine } from '@/lib/ai/fallbackEngine';
import { askGemini } from '@/lib/ai/gemini';
import { AI_FEATURES } from '@/constants/aiFeatures';

export async function POST(request: Request) {
  const startTime = Date.now();
  
  if (!AI_FEATURES.FAQ_ASSISTANT) {
    return NextResponse.json({ error: 'Feature disabled' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { question, sessionId = 'anonymous' } = body;

    if (!checkRateLimit(sessionId)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const fallbackAnswer = fallbackEngine.handleFAQFallback(question);

    const hash = generateCacheHash('faq', { question });
    const cachedResponse = await aiCacheRepository.getCachedResponse('faq', hash);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse);
    }

    try {
      const prompt = `The user asked: "${question}".
      Our rule-engine answer is: "${fallbackAnswer}".
      
      Rephrase this answer to sound incredibly polite, luxurious, and welcoming. Keep it concise.
      Return ONLY a JSON object: {"answer": "rephrased text"}`;

      const geminiResponseText = await askGemini("You are a high-end salon concierge AI.", prompt);
      const cleanJson = geminiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const geminiData = JSON.parse(cleanJson);

      const finalResponse = {
        isAIEnhanced: true,
        answer: geminiData.answer
      };

      await aiCacheRepository.setCachedResponse('faq', hash, finalResponse);
      await aiLogRepository.logAIRequest({ endpoint: 'faq', mode: 'HYBRID', success: true, latencyMs: Date.now() - startTime, sessionId, createdAt: new Date().toISOString() });

      return NextResponse.json(finalResponse);

    } catch (aiError: any) {
      console.warn('Gemini FAQ failed, falling back:', aiError);
      await aiLogRepository.logAIRequest({ endpoint: 'faq', mode: 'RULE_ONLY', success: false, lastFailureReason: aiError.message, latencyMs: Date.now() - startTime, sessionId, createdAt: new Date().toISOString() });
      return NextResponse.json({ isAIEnhanced: false, answer: fallbackAnswer });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
