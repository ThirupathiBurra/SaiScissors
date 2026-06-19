import React from 'react';

interface TimelineGroupProps {
  dateLabel: string;
  children: React.ReactNode;
}

export function TimelineGroup({ dateLabel, children }: TimelineGroupProps) {
  return (
    <div className="mb-10 last:mb-0">
      <div className="inline-block px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] text-xs font-semibold text-[#9CA3AF] mb-6 relative -left-4">
        {dateLabel}
      </div>
      {children}
    </div>
  );
}
