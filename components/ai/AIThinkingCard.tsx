import { Sparkles } from 'lucide-react';

export function AIThinkingCard({ message = "AI is analyzing your profile..." }: { message?: string }) {
  return (
    <div className="glass-card bg-[#111] border border-[rgba(201,168,76,0.2)] rounded-2xl p-6 relative overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.1)] to-transparent animate-shimmer" />
      
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center animate-pulse">
          <Sparkles className="text-[#C9A84C]" size={24} />
        </div>
        <div>
          <h3 className="text-white font-medium mb-1">{message}</h3>
          <p className="text-[#9CA3AF] text-sm">Applying expert styling rules...</p>
        </div>
      </div>
    </div>
  );
}
