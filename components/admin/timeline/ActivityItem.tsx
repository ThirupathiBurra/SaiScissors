import React from 'react';
import { Clock } from 'lucide-react';

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export function ActivityItem({ title, description, time, icon, active }: ActivityItemProps) {
  return (
    <div className="mb-8 relative last:mb-0">
      {/* Node */}
      <div className={`absolute -left-[21px] top-1 w-[10px] h-[10px] rounded-full border-2 ${active ? 'border-[#C9A84C] bg-[#111]' : 'border-[rgba(255,255,255,0.2)] bg-[#111]'}`}></div>
      
      <div className="flex justify-between items-start mb-1">
        <h4 className={`text-sm font-semibold ${active ? 'text-[#C9A84C]' : 'text-white'}`}>{title}</h4>
        <span className="text-xs flex items-center gap-1 text-[#6B7280]">
          <Clock size={12} />
          {time}
        </span>
      </div>
      <p className="text-xs text-[#9CA3AF] mt-1">{description}</p>
    </div>
  );
}
