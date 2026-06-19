import { useState } from 'react';
import { aiRepository } from '../repositories/aiRepository';

export function useProductAdvisor(sessionId: string) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (condition: string, age: string, lifestyle: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await aiRepository.getProductRecommendation(condition, age, lifestyle, sessionId);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to get recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return { analyze, result, loading, error };
}
