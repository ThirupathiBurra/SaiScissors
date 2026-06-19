'use client';

import { useState } from 'react';
import { LayoutTemplate, Plus, Edit, Trash2, Eye, EyeOff, MoveUp, MoveDown, ExternalLink } from 'lucide-react';

const DEMO_BANNERS = [
  {
    id: '1',
    title: 'Grand Opening Special — 30% OFF',
    subtitle: 'Valid this week only. Book now and get a premium grooming experience.',
    ctaLabel: 'Book Now',
    ctaLink: '/booking',
    bgColor: 'from-[#C9A84C]/20 to-[#C9A84C]/5',
    borderColor: 'border-[#C9A84C]/30',
    active: true,
    order: 1,
    type: 'PROMOTIONAL',
  },
  {
    id: '2',
    title: '🎉 Festival Combo — ₹499 Only',
    subtitle: 'Haircut + Beard + Facial — limited period offer for the festive season.',
    ctaLabel: 'Grab Offer',
    ctaLink: '/booking',
    bgColor: 'from-emerald-500/10 to-emerald-500/5',
    borderColor: 'border-emerald-500/20',
    active: true,
    order: 2,
    type: 'PROMOTIONAL',
  },
  {
    id: '3',
    title: '⚠️ Closed on Sundays After 9 PM',
    subtitle: 'Please book your Sunday slots before 8:30 PM to avoid disappointment.',
    ctaLabel: 'View Hours',
    ctaLink: '#contact',
    bgColor: 'from-amber-500/10 to-amber-500/5',
    borderColor: 'border-amber-500/20',
    active: false,
    order: 3,
    type: 'INFO',
  },
];

const TYPE_LABELS: Record<string, string> = {
  PROMOTIONAL: 'Promotional',
  INFO: 'Informational',
  ALERT: 'Alert',
};

export default function BannersPage() {
  const [banners, setBanners] = useState(DEMO_BANNERS);

  const toggle = (id: string) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const moveUp = (id: string) => {
    setBanners(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if (idx === 0) return prev;
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveDown = (id: string) => {
    setBanners(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if (idx === prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const activeBanners = banners.filter(b => b.active);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Banners & Announcements</h1>
          <p className="text-[#9CA3AF] text-sm">Manage promotional banners and info notices displayed on your website.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:opacity-90 transition-opacity w-fit">
          <Plus size={16} /> New Banner
        </button>
      </header>

      {/* Live Preview Label */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-medium">{activeBanners.length} Banner{activeBanners.length !== 1 ? 's' : ''} Live</span>
        </div>
        <p className="text-[#6B7280] text-xs">Drag to reorder. Changes take effect on next page refresh.</p>
      </div>

      {/* Banner Cards */}
      <div className="space-y-4">
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`glass-card bg-[#111] border rounded-2xl overflow-hidden transition-all duration-300 ${
              banner.active ? banner.borderColor : 'border-[rgba(255,255,255,0.05)] opacity-60'
            }`}
          >
            {/* Preview Strip */}
            <div className={`bg-gradient-to-r ${banner.bgColor} px-6 py-4 border-b ${banner.active ? banner.borderColor : 'border-[rgba(255,255,255,0.05)]'}`}>
              <p className="text-white font-heading font-bold">{banner.title}</p>
              <p className="text-[#9CA3AF] text-sm mt-1">{banner.subtitle}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-[#C9A84C] font-medium">{banner.ctaLabel} →</span>
                <span className="text-xs text-[#6B7280]">{banner.ctaLink}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="px-6 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  banner.active
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-[rgba(255,255,255,0.05)] text-[#6B7280] border border-[rgba(255,255,255,0.1)]'
                }`}>
                  {banner.active ? 'Live' : 'Hidden'}
                </span>
                <span className="text-[#6B7280] text-xs">{TYPE_LABELS[banner.type]}</span>
                <span className="text-[#6B7280] text-xs">Position #{idx + 1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => moveUp(banner.id)} className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors" title="Move Up">
                  <MoveUp size={14} />
                </button>
                <button onClick={() => moveDown(banner.id)} className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors" title="Move Down">
                  <MoveDown size={14} />
                </button>
                <button onClick={() => toggle(banner.id)} className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#C9A84C] hover:bg-[rgba(201,168,76,0.05)] transition-colors" title={banner.active ? 'Hide' : 'Show'}>
                  {banner.active ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors" title="Edit">
                  <Edit size={14} />
                </button>
                <button className="p-1.5 rounded-lg text-[#6B7280] hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
                <a href={banner.ctaLink} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-[#6B7280] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors" title="Preview">
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Add Slot */}
      <button className="w-full py-6 border-2 border-dashed border-[rgba(255,255,255,0.08)] rounded-2xl flex flex-col items-center gap-2 text-[#6B7280] hover:border-[rgba(201,168,76,0.3)] hover:text-[#C9A84C] transition-all group">
        <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.03)] group-hover:bg-[rgba(201,168,76,0.05)] flex items-center justify-center transition-colors">
          <Plus size={20} />
        </div>
        <p className="text-sm font-medium">Add new banner</p>
      </button>
    </div>
  );
}
