export type RecommendationType = 'HAIRSTYLE' | 'PRODUCT' | 'GROOMING_TIP';

export interface AIRecommendation {
  id: string;
  type: RecommendationType;
  baseRuleId: string;
  title: string;
  description: string;
  enhancedTips?: string[];
  maintenanceDifficulty?: 'Low' | 'Medium' | 'High';
  isAIEnhanced: boolean;
  metadata?: any;
}

export interface AILog {
  id?: string;
  endpoint: string;
  mode: 'RULE_ONLY' | 'HYBRID' | 'AI_ONLY';
  success: boolean;
  latencyMs: number;
  lastFailureReason?: string;
  sessionId?: string;
  createdAt: string | Date;
}

export interface AICacheEntry {
  id?: string;
  hashKey: string;
  endpoint: string;
  inputHash: string;
  response: any;
  createdAt: string | Date;
  expiresAt: string | Date;
}

export interface AIHealthStatus {
  geminiAvailable: boolean;
  quotaExceeded: boolean;
  fallbackCount: number;
  averageLatency: number;
  requestsToday: number;
  lastFailureReason: string | null;
}
