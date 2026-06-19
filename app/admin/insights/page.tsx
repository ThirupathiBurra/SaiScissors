'use client';
import { useState, useEffect } from 'react';
import { aiRepository } from '@/repositories/aiRepository';
import { AIStatusCard } from '@/components/admin/ai/AIStatusCard';
import { AIThinkingCard } from '@/components/ai/AIThinkingCard';
import { TrendingUp, Users, DollarSign, Lightbulb } from 'lucide-react';

export default function AdminInsightsPage() {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<any>(null);

  // Mock rule-based insights generated from local analytics
  const mockRuleInsights = {
    peakHours: "4:00 PM - 7:00 PM",
    mostPopularService: "VIP Haircut & Beard",
    customerRetention: "68%",
    idleDays: ["Tuesday", "Wednesday"]
  };

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const data = await aiRepository.getOwnerInsights([JSON.stringify(mockRuleInsights)], 'admin_insights');
        setInsights(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  const healthStatus = {
    geminiAvailable: true,
    quotaExceeded: false,
    fallbackCount: 0,
    averageLatency: 450,
    requestsToday: 12,
    lastFailureReason: null
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">AI Business Insights</h1>
        <p className="text-[#9CA3AF] text-sm">Actionable recommendations generated from your shop's data.</p>
      </header>

      <AIStatusCard status={healthStatus} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] p-6 rounded-2xl">
            <h3 className="text-lg font-heading font-bold text-white mb-4">Raw Analytics (Rule Engine)</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[rgba(201,168,76,0.1)] text-[#C9A84C]"><TrendingUp size={16} /></div>
                <div>
                  <p className="text-xs text-[#9CA3AF]">Peak Hours</p>
                  <p className="text-sm text-white font-medium">{mockRuleInsights.peakHours}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[rgba(201,168,76,0.1)] text-[#C9A84C]"><Users size={16} /></div>
                <div>
                  <p className="text-xs text-[#9CA3AF]">Customer Retention</p>
                  <p className="text-sm text-white font-medium">{mockRuleInsights.customerRetention}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[rgba(201,168,76,0.1)] text-[#C9A84C]"><DollarSign size={16} /></div>
                <div>
                  <p className="text-xs text-[#9CA3AF]">Most Popular</p>
                  <p className="text-sm text-white font-medium">{mockRuleInsights.mostPopularService}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <AIThinkingCard message="Gemini is analyzing your business metrics..." />
          ) : insights ? (
            <div className="glass-card bg-[#111] border border-[rgba(201,168,76,0.3)] p-8 rounded-2xl">
              <h2 className="text-2xl font-heading font-bold text-[#C9A84C] mb-6 flex items-center gap-2">
                <Lightbulb size={24} /> Growth Recommendations
              </h2>
              
              <div className="space-y-6">
                {insights.businessSuggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center shrink-0 text-[#C9A84C] font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-4 rounded-xl">
                      <p className="text-[#D1D5DB] leading-relaxed">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>

              {!insights.isAIEnhanced && (
                <p className="text-xs text-amber-400 mt-6">* Note: Gemini was unavailable. Showing generic rule-based suggestions.</p>
              )}
            </div>
          ) : (
            <div className="text-center p-12 text-[#6B7280]">Failed to load insights.</div>
          )}
        </div>
      </div>
    </div>
  );
}
