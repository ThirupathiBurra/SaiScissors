'use client';

import { useState } from 'react';
import { Star, Search, CheckCircle, XCircle, Trash2, Filter, ExternalLink } from 'lucide-react';

const DEMO_REVIEWS = [
  { id: '1', customer: 'Rahul Kumar', service: 'Classic Haircut', barber: 'Ravi', rating: 5, text: 'Best haircut experience in Bhupalpally! The place is clean, AC, and the staff are very professional.', date: '2026-06-18', status: 'APPROVED' },
  { id: '2', customer: 'Suresh Reddy', service: 'Beard Trim', barber: 'Ajay', rating: 5, text: 'The beard trim is absolutely perfect. They take their time and get every detail right.', date: '2026-06-15', status: 'APPROVED' },
  { id: '3', customer: 'Arjun T.', service: 'Fade Cut', barber: 'Ravi', rating: 4, text: 'Great fade, exactly what I asked for. The wait time was a bit long though.', date: '2026-06-12', status: 'PENDING' },
  { id: '4', customer: 'Mahesh Naik', service: 'Hair Spa', barber: 'Mahesh', rating: 5, text: 'The hair spa was incredibly relaxing. Great ambience and very hygienic.', date: '2026-06-10', status: 'APPROVED' },
  { id: '5', customer: 'Vikram Patel', service: 'Facial', barber: 'Ajay', rating: 3, text: 'Good service but AC was not cooling enough near my chair.', date: '2026-06-08', status: 'PENDING' },
  { id: '6', customer: 'Naveen G.', service: 'Haircut + Wash', barber: 'Ravi', rating: 1, text: 'Terrible experience, barber was rude.', date: '2026-06-05', status: 'REJECTED' },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(DEMO_REVIEWS);

  const updateStatus = (id: string, status: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const pendingCount = reviews.filter(r => r.status === 'PENDING').length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
            Customer Reviews
            {pendingCount > 0 && (
              <span className="bg-amber-500/10 text-amber-500 text-xs font-bold px-2 py-1 rounded-lg border border-amber-500/20">
                {pendingCount} Pending
              </span>
            )}
          </h1>
          <p className="text-[#9CA3AF] text-sm">Manage reviews displayed on the public site and respond to customer feedback.</p>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search reviews by name or keyword..."
            className="w-full bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[rgba(201,168,76,0.1)] text-[#C9A84C] border border-[rgba(201,168,76,0.2)] whitespace-nowrap">All Reviews</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[#111] border border-[rgba(255,255,255,0.05)] text-[#9CA3AF] hover:text-white whitespace-nowrap">Pending</button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[#111] border border-[rgba(255,255,255,0.05)] text-[#9CA3AF] hover:text-white whitespace-nowrap">Approved</button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6">
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Left Info */}
              <div className="md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.05)] pb-4 md:pb-0 md:pr-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center text-[#C9A84C] font-bold text-lg">
                    {review.customer[0]}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{review.customer}</h3>
                    <p className="text-[#6B7280] text-xs">{review.date}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[#9CA3AF] text-xs"><span className="text-[#6B7280]">Service:</span> {review.service}</p>
                  <p className="text-[#9CA3AF] text-xs"><span className="text-[#6B7280]">Barber:</span> {review.barber}</p>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-[#333] fill-[#333]'} />
                    ))}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    review.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    review.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                    'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {review.status}
                  </span>
                </div>
                <p className="text-[#E5E7EB] text-sm leading-relaxed mb-4">"{review.text}"</p>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  {review.status !== 'APPROVED' && (
                    <button onClick={() => updateStatus(review.id, 'APPROVED')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                      <CheckCircle size={14} /> Approve
                    </button>
                  )}
                  {review.status !== 'REJECTED' && (
                    <button onClick={() => updateStatus(review.id, 'REJECTED')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                      <XCircle size={14} /> Reject
                    </button>
                  )}
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors ml-auto">
                    Reply
                  </button>
                  <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.05)] text-[#9CA3AF] hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
