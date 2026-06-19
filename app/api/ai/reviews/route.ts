import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/ai/rateLimiter';
import { aiCacheRepository, generateCacheHash } from '@/repositories/aiCacheRepository';
import { aiLogRepository } from '@/repositories/aiLogRepository';
import { askGemini } from '@/lib/ai/gemini';
import { AI_FEATURES } from '@/constants/aiFeatures';

export async function POST(request: Request) {
  const startTime = Date.now();
  
  if (!AI_FEATURES.REVIEW_SUMMARIES) {
    return NextResponse.json({ error: 'Feature disabled' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { reviews, sessionId = 'admin_session' } = body;

    if (!checkRateLimit(sessionId)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 1. Keyword Engine (Rule based)
    const allText = reviews.join(' ').toLowerCase();
    const positiveWords = ['good', 'great', 'awesome', 'excellent', 'best', 'loved', 'nice', 'clean', 'professional'].filter(w => allText.includes(w));
    const negativeWords = ['bad', 'worst', 'late', 'dirty', 'rude', 'expensive', 'terrible', 'waiting'].filter(w => allText.includes(w));
    
    const baseAnalysis = {
      positiveKeywords: positiveWords,
      negativeKeywords: negativeWords,
      totalAnalyzed: reviews.length
    };

    const hash = generateCacheHash('reviews', { reviews });
    const cachedResponse = await aiCacheRepository.getCachedResponse('reviews', hash);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse);
    }

    try {
      const prompt = `Here are some recent reviews:
      ${JSON.stringify(reviews)}
      
      Generate a 2-sentence human-readable summary, overall sentiment (Positive, Neutral, Negative), and 1 improvement suggestion.
      Return ONLY a JSON object: {"summary": "text", "sentiment": "Positive|Neutral|Negative", "suggestion": "text"}`;

      const geminiResponseText = await askGemini("You are a customer experience analyst.", prompt);
      const cleanJson = geminiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const geminiData = JSON.parse(cleanJson);

      const finalResponse = {
        isAIEnhanced: true,
        keywordAnalysis: baseAnalysis,
        summary: geminiData.summary,
        sentiment: geminiData.sentiment,
        suggestion: geminiData.suggestion
      };

      await aiCacheRepository.setCachedResponse('reviews', hash, finalResponse);
      await aiLogRepository.logAIRequest({ endpoint: 'reviews', mode: 'HYBRID', success: true, latencyMs: Date.now() - startTime, sessionId, createdAt: new Date().toISOString() });

      return NextResponse.json(finalResponse);

    } catch (aiError: any) {
      console.warn('Gemini Reviews failed, falling back:', aiError);
      await aiLogRepository.logAIRequest({ endpoint: 'reviews', mode: 'RULE_ONLY', success: false, lastFailureReason: aiError.message, latencyMs: Date.now() - startTime, sessionId, createdAt: new Date().toISOString() });
      return NextResponse.json({ isAIEnhanced: false, keywordAnalysis: baseAnalysis, summary: "AI summary unavailable.", sentiment: "Unknown", suggestion: null });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
