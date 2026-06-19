export function RecommendationSkeleton() {
  return (
    <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 animate-pulse space-y-6">
      <div className="h-6 bg-[#222] rounded w-1/3"></div>
      
      <div className="space-y-3">
        <div className="h-4 bg-[#222] rounded w-full"></div>
        <div className="h-4 bg-[#222] rounded w-5/6"></div>
      </div>
      
      <div className="flex gap-2">
        <div className="h-8 w-20 bg-[rgba(201,168,76,0.1)] rounded-full"></div>
        <div className="h-8 w-24 bg-[rgba(201,168,76,0.1)] rounded-full"></div>
      </div>
    </div>
  );
}
