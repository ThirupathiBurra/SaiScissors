export const aiRepository = {
  async getHairstyleRecommendation(faceShape: string, hairType: string, lifestyle: string, sessionId: string) {
    const res = await fetch('/api/ai/hairstyle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ faceShape, hairType, lifestyle, sessionId })
    });
    if (!res.ok) throw new Error('API request failed');
    return res.json();
  },

  async getProductRecommendation(condition: string, age: string, lifestyle: string, sessionId: string) {
    const res = await fetch('/api/ai/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ condition, age, lifestyle, sessionId })
    });
    if (!res.ok) throw new Error('API request failed');
    return res.json();
  },

  async getFAQAnswer(question: string, sessionId: string) {
    const res = await fetch('/api/ai/faq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, sessionId })
    });
    if (!res.ok) throw new Error('API request failed');
    return res.json();
  },

  async getOwnerInsights(ruleInsights: string[], sessionId: string) {
    const res = await fetch('/api/ai/insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ruleInsights, sessionId })
    });
    if (!res.ok) throw new Error('API request failed');
    return res.json();
  },

  async getReviewSummary(reviews: string[], sessionId: string) {
    const res = await fetch('/api/ai/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviews, sessionId })
    });
    if (!res.ok) throw new Error('API request failed');
    return res.json();
  }
};
