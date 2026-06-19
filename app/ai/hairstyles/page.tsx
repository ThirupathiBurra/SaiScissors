'use client';
import { useState, useEffect } from 'react';
import { useHairAdvisor } from '@/hooks/useHairAdvisor';
import { AIThinkingCard } from '@/components/ai/AIThinkingCard';
import { RecommendationSkeleton } from '@/components/ai/RecommendationSkeleton';
import { AIUnavailableCard } from '@/components/ai/AIUnavailableCard';
import { Sparkles, Scissors, Check, ChevronRight } from 'lucide-react';

export default function HairstyleAdvisorPage() {
  const [sessionId, setSessionId] = useState('');
  useEffect(() => { setSessionId(Math.random().toString(36).substring(7)); }, []);
  
  const { analyze, result, loading, error } = useHairAdvisor(sessionId);
  const [faceShape, setFaceShape] = useState('');
  const [hairType, setHairType] = useState('');
  const [lifestyle, setLifestyle] = useState('Professional');

  const handleAnalyze = () => {
    analyze(faceShape, hairType, lifestyle);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(201,168,76,0.1)] text-[#C9A84C] text-sm font-medium mb-4">
            <Sparkles size={16} /> AI Hairstyle Advisor
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Find Your Perfect Cut</h1>
          <p className="text-[#9CA3AF]">Let our hybrid AI engine recommend styles tailored to your unique features.</p>
        </header>

        {!result && !loading && (
          <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] p-8 rounded-2xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">What is your face shape?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['ROUND', 'OVAL', 'SQUARE', 'HEART'].map(shape => (
                    <button 
                      key={shape}
                      onClick={() => setFaceShape(shape)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${faceShape === shape ? 'bg-[rgba(201,168,76,0.1)] border-[#C9A84C] text-[#C9A84C]' : 'bg-[#111] border-[rgba(255,255,255,0.1)] text-white hover:border-[rgba(255,255,255,0.3)]'}`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">What is your hair type?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['STRAIGHT', 'WAVY', 'CURLY', 'COILY'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setHairType(type)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${hairType === type ? 'bg-[rgba(201,168,76,0.1)] border-[#C9A84C] text-[#C9A84C]' : 'bg-[#111] border-[rgba(255,255,255,0.1)] text-white hover:border-[rgba(255,255,255,0.3)]'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                disabled={!faceShape || !hairType}
                onClick={handleAnalyze}
                className="w-full btn-primary py-4 rounded-xl flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Analyze My Profile <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="space-y-6">
            <AIThinkingCard message="Analyzing facial geometry and hair texture..." />
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
                <Scissors size={120} />
              </div>
              
              <h2 className="text-2xl font-heading font-bold text-[#C9A84C] mb-6">Your Recommended Styles</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {result.baseRecommendations.map((rec: string) => (
                  <div key={rec} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-3 text-center text-white font-medium text-sm">
                    {rec}
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-2">Why this works:</h3>
                  <p className="text-[#9CA3AF] leading-relaxed">{result.reasoning}</p>
                </div>
                
                {result.celebrityMatch && (
                  <div>
                    <h3 className="text-white font-medium mb-2">Celebrity Match:</h3>
                    <p className="text-[#9CA3AF]">{result.celebrityMatch}</p>
                  </div>
                )}

                {result.stylingTips && (
                  <div className="pt-6 border-t border-[rgba(255,255,255,0.05)]">
                    <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                      <Sparkles size={16} className="text-[#C9A84C]" /> 
                      Pro Styling Tips
                    </h3>
                    <ul className="space-y-3">
                      {result.stylingTips.map((tip: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-[#9CA3AF]">
                          <Check size={16} className="text-[#C9A84C] mt-1 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button onClick={() => window.location.href = '/booking'} className="w-full btn-primary py-4 rounded-xl mt-8">
                Book This Style Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
