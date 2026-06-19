import { ruleEngine } from './ruleEngine';
import { faqAnswers } from './data/faqAnswers';

/**
 * Fallback Engine provides completely offline/rule-based responses
 * if the Gemini API fails, times out, or quota is exhausted.
 */
export const fallbackEngine = {
  handleHairstyleFallback(faceShape: string): any {
    const rules = ruleEngine.getHairstyleRecommendation(faceShape);
    return {
      isAIEnhanced: false,
      baseRecommendations: rules.recommended,
      avoid: rules.avoid,
      reasoning: rules.reasoning,
      celebrityMatch: rules.celebrityExample,
      stylingTips: ["Use a matte pomade for a natural look.", "Visit your barber every 3 weeks to maintain the shape."] // Generic fallback tips
    };
  },

  handleProductFallback(condition: string): any {
    const rules = ruleEngine.getProductRecommendation(condition);
    return {
      isAIEnhanced: false,
      recommendedCategory: rules.category,
      frequency: rules.frequency,
      warning: rules.warning,
      routineTips: ["Always massage scalp gently.", "Apply products to slightly damp hair for best absorption."]
    };
  },

  handleFAQFallback(question: string): string {
    const q = question.toLowerCase();
    for (const faq of faqAnswers) {
      if (faq.keywords.some(kw => q.includes(kw))) {
        return faq.answer;
      }
    }
    return "Thank you for your question! Please call us at the shop for more detailed assistance.";
  }
};
