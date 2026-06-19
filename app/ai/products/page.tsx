'use client';
import { useState, useEffect } from 'react';
import { useProductAdvisor } from '@/hooks/useProductAdvisor';
import { AIThinkingCard } from '@/components/ai/AIThinkingCard';
import { RecommendationSkeleton } from '@/components/ai/RecommendationSkeleton';
import { AIUnavailableCard } from '@/components/ai/AIUnavailableCard';
import { Sparkles, Droplets, Check, ChevronRight, AlertTriangle } from 'lucide-react';

export default function ProductAdvisorPage() {
  const [sessionId, setSessionId] = useState('');
  useEffect(() => { setSessionId(Math.random().toString(36).substring(7)); }, []);
  
  const { analyze, result, loading, error } = useProductAdvisor(sessionId);
  const [condition, setCondition] = useState('');
  const [age, setAge] = useState('20s');
  const [lifestyle, setLifestyle] = useState('Active');

  const handleAnalyze = () => {
    analyze(condition, age, lifestyle);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(201,168,76,0.1)] text-[#C9A84C] text-sm font-medium mb-4">
            <Sparkles size={16} /> AI Product Advisor
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Custom Haircare Routine</h1>
          <p className="text-[#9CA3AF]">Discover the exact products and routines needed for your hair goals.</p>
        </header>

        {!result && !loading && (
          <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] p-8 rounded-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Primary Hair Concern</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['DRY', 'OILY', 'HAIR_FALL', 'CURLY', 'NORMAL'].map(cond => (
                    <button 
                      key={cond}
                      onClick={() => setCondition(cond)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${condition === cond ? 'bg-[rgba(201,168,76,0.1)] border-[#C9A84C] text-[#C9A84C]' : 'bg-[#111] border-[rgba(255,255,255,0.1)] text-white hover:border-[rgba(255,255,255,0.3)]'}`}
                    >
                      {cond.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">Age Group</label>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {['Teens', '20s', '30s', '40s', '50+'].map(a => (
                    <button 
                      key={a}
                      onClick={() => setAge(a)}
                      className={`px-6 py-2 rounded-full border text-sm transition-colors whitespace-nowrap ${age === a ? 'bg-[rgba(201,168,76,0.1)] border-[#C9A84C] text-[#C9A84C]' : 'bg-[#111] border-[rgba(255,255,255,0.1)] text-[#9CA3AF]'}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                disabled={!condition}
                onClick={handleAnalyze}
                className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 mt-8 disabled:opacity-50"
              >
                Build My Routine <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="space-y-6">
            <AIThinkingCard message="Analyzing optimal ingredient combinations..." />
            <RecommendationSkeleton />
          </div>
        )}

        {error && (
          <AIUnavailableCard 
            title="System Timeout" 
            message="We couldn't connect to the AI engine. Please try again." 
          />
        )}

        {result && !loading && (
          <div className="space-y-6">
            {!result.isAIEnhanced && (
              <AIUnavailableCard 
                title="AI Enhancement Unavailable" 
                message="Showing standard expert recommendations based on our built-in rule engine." 
              />
            )}
            
            <div className="glass-card bg-[#111] border border-[rgba(201,168,76,0.2)] p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Droplets size={120} />
              </div>
              
              <h2 className="text-2xl font-heading font-bold text-[#C9A84C] mb-2">Recommended Products</h2>
              <p className="text-xl text-white font-medium mb-6">{result.recommendedCategory}</p>
              
              <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-4 mb-6">
                <p className="text-[#9CA3AF] text-sm uppercase tracking-wide mb-1">Recommended Frequency</p>
                <p className="text-white font-medium">{result.frequency}</p>
              </div>

              <div className="space-y-6">
                {result.routineTips && (
                  <div>
                    <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                      <Sparkles size={16} className="text-[#C9A84C]" /> 
                      Custom Routine
                    </h3>
                    <ul className="space-y-3">
                      {result.routineTips.map((tip: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-[#9CA3AF]">
                          <Check size={16} className="text-[#C9A84C] mt-1 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.warning && (
                  <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
                    <AlertTriangle className="text-amber-400 shrink-0" size={20} />
                    <p className="text-sm text-amber-100/80">{result.warning}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
