import React from 'react';

interface TimelineCardProps {
  children: React.ReactNode;
  title: string;
}

export function TimelineCard({ children, title }: TimelineCardProps) {
  return (
    <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6">
      <h3 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
        <div className="w-2 h-6 bg-[#C9A84C] rounded-full"></div>
        {title}
      </h3>
      <div className="relative pl-4 border-l border-[rgba(255,255,255,0.1)] ml-2">
        {children}
      </div>
    </div>
  );
}
