import { faceShapeRules } from './data/faceShapes';
import { hairProductRules } from './data/hairProducts';
import { groomingTipsRules } from './data/groomingTips';

/**
 * Hardcoded deterministic business logic
 * Evaluates immediately. Used as base logic before Gemini enhancement.
 */
export const ruleEngine = {
  getHairstyleRecommendation(faceShape: string): any {
    const key = faceShape.toUpperCase() as keyof typeof faceShapeRules;
    return faceShapeRules[key] || faceShapeRules['OVAL']; // Fallback to OVAL
  },

  getProductRecommendation(condition: string): any {
    const key = condition.toUpperCase() as keyof typeof hairProductRules;
    return hairProductRules[key] || hairProductRules['NORMAL'];
  },

  getGroomingRoutine(): any {
    return groomingTipsRules;
  }
};
