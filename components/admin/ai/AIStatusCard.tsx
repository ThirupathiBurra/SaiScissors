'use client';
import { Activity, ServerCrash, Cpu, Zap, CheckCircle2 } from 'lucide-react';
import { AIHealthStatus } from '@/types/ai';

export function AIStatusCard({ status }: { status: AIHealthStatus }) {
  const isHealthy = status.geminiAvailable && !status.quotaExceeded;
  
  return (
    <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
          <Cpu className="text-[#C9A84C]" size={20} />
          AI System Health
        </h3>
        {isHealthy ? (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <CheckCircle2 size={14} /> ONLINE
          </span>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
            <ServerCrash size={14} /> FALLBACK MODE
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
          <p className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
            <Activity size={12} /> Requests Today
          </p>
          <p className="text-2xl font-bold text-white">{status.requestsToday}</p>
        </div>
        
        <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
          <p className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
            <Zap size={12} /> Avg Latency
          </p>
          <p className="text-2xl font-bold text-white">{status.averageLatency}ms</p>
        </div>

        <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
          <p className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-1">Fallback Events</p>
          <p className={`text-2xl font-bold ${status.fallbackCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {status.fallbackCount}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
          <p className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-1">Quota Status</p>
          <p className={`text-sm font-bold mt-2 ${status.quotaExceeded ? 'text-red-400' : 'text-emerald-400'}`}>
            {status.quotaExceeded ? 'EXHAUSTED' : 'HEALTHY'}
          </p>
        </div>
      </div>

      {!isHealthy && status.lastFailureReason && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-xs text-red-400"><span className="font-bold">Last Error:</span> {status.lastFailureReason}</p>
        </div>
      )}
    </div>
  );
}
