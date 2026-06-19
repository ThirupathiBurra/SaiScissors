import { LucideIcon } from 'lucide-react';

export function EmptyState({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  onAction
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 rounded-2xl bg-[rgba(201,168,76,0.1)] text-[#C9A84C] flex items-center justify-center mb-6">
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-heading font-bold text-white mb-2">{title}</h3>
      <p className="text-[#9CA3AF] text-sm max-w-sm mb-6 leading-relaxed">
        {subtitle}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 rounded-lg text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:opacity-90 transition-opacity"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
