import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/ai/rateLimiter';
import { aiCacheRepository, generateCacheHash } from '@/repositories/aiCacheRepository';
import { aiLogRepository } from '@/repositories/aiLogRepository';
import { askGemini } from '@/lib/ai/gemini';
import { AI_FEATURES } from '@/constants/aiFeatures';

export async function POST(request: Request) {
  const startTime = Date.now();
  
  if (!AI_FEATURES.OWNER_INSIGHTS) {
    return NextResponse.json({ error: 'Feature disabled' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { ruleInsights, sessionId = 'admin_session' } = body;

    if (!checkRateLimit(sessionId)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const hash = generateCacheHash('insights', { ruleInsights });
    const cachedResponse = await aiCacheRepository.getCachedResponse('insights', hash);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse);
    }

    try {
      const prompt = `Here are the rule-engine insights for the barbershop:
      ${JSON.stringify(ruleInsights)}
      
      Generate 3 business suggestions to increase revenue or efficiency based on these insights.
      Return ONLY a JSON object: {"suggestions": ["suggestion1", "suggestion2", "suggestion3"]}`;

      const geminiResponseText = await askGemini("You are an expert business consultant.", prompt);
      const cleanJson = geminiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const geminiData = JSON.parse(cleanJson);

      const finalResponse = {
        isAIEnhanced: true,
        baseInsights: ruleInsights,
        businessSuggestions: geminiData.suggestions
      };

      await aiCacheRepository.setCachedResponse('insights', hash, finalResponse);
      await aiLogRepository.logAIRequest({ endpoint: 'insights', mode: 'HYBRID', success: true, latencyMs: Date.now() - startTime, sessionId, createdAt: new Date().toISOString() });

      return NextResponse.json(finalResponse);

    } catch (aiError: any) {
      console.warn('Gemini Insights failed, falling back:', aiError);
      await aiLogRepository.logAIRequest({ endpoint: 'insights', mode: 'RULE_ONLY', success: false, lastFailureReason: aiError.message, latencyMs: Date.now() - startTime, sessionId, createdAt: new Date().toISOString() });
      return NextResponse.json({ isAIEnhanced: false, baseInsights: ruleInsights, businessSuggestions: [] });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
