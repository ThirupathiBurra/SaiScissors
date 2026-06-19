import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/ai/rateLimiter';
import { aiCacheRepository, generateCacheHash } from '@/repositories/aiCacheRepository';
import { aiLogRepository } from '@/repositories/aiLogRepository';
import { ruleEngine } from '@/lib/ai/ruleEngine';
import { fallbackEngine } from '@/lib/ai/fallbackEngine';
import { askGemini } from '@/lib/ai/gemini';
import { AI_FEATURES } from '@/constants/aiFeatures';

export async function POST(request: Request) {
  const startTime = Date.now();
  
  if (!AI_FEATURES.PRODUCT_ADVISOR) {
    return NextResponse.json({ error: 'Feature disabled' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { condition, age, lifestyle, sessionId = 'anonymous' } = body;

    if (!checkRateLimit(sessionId)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const baseRules = ruleEngine.getProductRecommendation(condition);

    const hash = generateCacheHash('products', { condition, age, lifestyle });
    const cachedResponse = await aiCacheRepository.getCachedResponse('products', hash);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse);
    }

    try {
      const prompt = `A ${age} year old with a ${lifestyle} lifestyle has a ${condition} hair condition.
      We are recommending: ${baseRules.category}. Base frequency: ${baseRules.frequency}. Base warning: ${baseRules.warning}.
      
      Generate 2 customized routine tips and 1 specific warning.
      Return ONLY a JSON object: {"routineTips": ["tip1", "tip2"], "customWarning": "warning text"}`;

      const geminiResponseText = await askGemini(
        "You are an expert grooming AI. Respond ONLY with valid JSON.",
        prompt
      );
      
      const cleanJson = geminiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const geminiData = JSON.parse(cleanJson);

      const finalResponse = {
        isAIEnhanced: true,
        recommendedCategory: baseRules.category,
        frequency: baseRules.frequency,
        warning: geminiData.customWarning || baseRules.warning,
        routineTips: geminiData.routineTips
      };

      await aiCacheRepository.setCachedResponse('products', hash, finalResponse);
      await aiLogRepository.logAIRequest({ endpoint: 'products', mode: 'HYBRID', success: true, latencyMs: Date.now() - startTime, sessionId, createdAt: new Date().toISOString() });

      return NextResponse.json(finalResponse);

    } catch (aiError: any) {
      console.warn('Gemini failed, falling back to rule engine:', aiError);
      const fallbackResponse = fallbackEngine.handleProductFallback(condition);
      await aiLogRepository.logAIRequest({ endpoint: 'products', mode: 'RULE_ONLY', success: false, lastFailureReason: aiError.message, latencyMs: Date.now() - startTime, sessionId, createdAt: new Date().toISOString() });
      return NextResponse.json(fallbackResponse);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
