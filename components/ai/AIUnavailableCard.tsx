import { AlertCircle } from 'lucide-react';

export function AIUnavailableCard({ title, message }: { title: string, message: string }) {
  return (
    <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 flex items-start gap-4">
      <div className="p-2 bg-amber-500/10 rounded-lg">
        <AlertCircle className="text-amber-400" size={24} />
      </div>
      <div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-[#9CA3AF] text-sm">{message}</p>
        <p className="text-xs text-[#6B7280] mt-3">Our standard rules have been applied instead.</p>
      </div>
    </div>
  );
}
