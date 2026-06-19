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
  
  if (!AI_FEATURES.HAIRSTYLE_ADVISOR) {
    return NextResponse.json({ error: 'Feature disabled' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { faceShape, hairType, lifestyle, sessionId = 'anonymous' } = body;

    // 1. Rate Limiting
    if (!checkRateLimit(sessionId)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 2. Rule Engine (Base Logic)
    const baseRules = ruleEngine.getHairstyleRecommendation(faceShape);

    // 3. Cache Check
    const hash = generateCacheHash('hairstyle', { faceShape, hairType, lifestyle });
    const cachedResponse = await aiCacheRepository.getCachedResponse('hairstyle', hash);
    
    if (cachedResponse) {
      return NextResponse.json(cachedResponse);
    }

    // 4. Gemini Enhancement
    try {
      const prompt = `A user with a ${faceShape} face shape, ${hairType} hair, and a ${lifestyle} lifestyle wants a haircut.
      Base rules recommend: ${baseRules.recommended.join(', ')}.
      They should avoid: ${baseRules.avoid.join(', ')}.
      Reasoning: ${baseRules.reasoning}.
      
      Generate exactly 3 short styling tips for this specific combination, and estimate the daily maintenance difficulty (Low, Medium, or High).
      Return ONLY a JSON object: {"stylingTips": ["tip1", "tip2", "tip3"], "maintenanceDifficulty": "Low|Medium|High"}`;

      const geminiResponseText = await askGemini(
        "You are an expert barber AI. Respond ONLY with valid JSON.",
        prompt
      );
      
      // Remove any markdown block formatting like ```json ... ```
      const cleanJson = geminiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const geminiData = JSON.parse(cleanJson);

      const finalResponse = {
        isAIEnhanced: true,
        baseRecommendations: baseRules.recommended,
        avoid: baseRules.avoid,
        reasoning: baseRules.reasoning,
        celebrityMatch: baseRules.celebrityExample,
        stylingTips: geminiData.stylingTips,
        maintenanceDifficulty: geminiData.maintenanceDifficulty
      };

      // 5. Save to Cache & Log
      await aiCacheRepository.setCachedResponse('hairstyle', hash, finalResponse);
      await aiLogRepository.logAIRequest({
        endpoint: 'hairstyle',
        mode: 'HYBRID',
        success: true,
        latencyMs: Date.now() - startTime,
        sessionId,
        createdAt: new Date().toISOString()
      });

      return NextResponse.json(finalResponse);

    } catch (aiError: any) {
      console.warn('Gemini failed, falling back to rule engine:', aiError);
      
      // Fallback Engine
      const fallbackResponse = fallbackEngine.handleHairstyleFallback(faceShape);
      
      await aiLogRepository.logAIRequest({
        endpoint: 'hairstyle',
        mode: 'RULE_ONLY',
        success: false,
        lastFailureReason: aiError.message,
        latencyMs: Date.now() - startTime,
        sessionId,
        createdAt: new Date().toISOString()
      });

      return NextResponse.json(fallbackResponse);
    }

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
