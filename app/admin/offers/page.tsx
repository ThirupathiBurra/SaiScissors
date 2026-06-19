'use client';

import { useState } from 'react';
import { Tag, Plus, Edit, Trash2, ToggleLeft, ToggleRight, Calendar, Percent } from 'lucide-react';

const DEMO_OFFERS = [
  {
    id: '1',
    title: 'Weekend Special',
    description: 'Get 20% off on any haircut + beard combo every Saturday and Sunday.',
    discount: 20,
    discountType: 'PERCENTAGE',
    validFrom: '2026-06-01',
    validTo: '2026-08-31',
    applicableTo: 'Haircut + Beard Combo',
    active: true,
    usageCount: 47,
  },
  {
    id: '2',
    title: 'Student Discount',
    description: 'Students get ₹30 off on Classic Haircut. Valid ID required at the time of visit.',
    discount: 30,
    discountType: 'FLAT',
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    applicableTo: 'Classic Haircut',
    active: true,
    usageCount: 89,
  },
  {
    id: '3',
    title: 'Festival Combo',
    description: 'Premium haircut + beard styling + facial for ₹499. Limited time festival offer.',
    discount: 499,
    discountType: 'FIXED_PRICE',
    validFrom: '2026-06-15',
    validTo: '2026-07-15',
    applicableTo: 'Haircut + Beard + Facial',
    active: true,
    usageCount: 23,
  },
  {
    id: '4',
    title: 'Hair Spa Package',
    description: 'Book 3 Hair Spa sessions and get the 4th one absolutely free.',
    discount: 100,
    discountType: 'PERCENTAGE',
    validFrom: '2026-05-01',
    validTo: '2026-07-31',
    applicableTo: 'Hair Spa',
    active: false,
    usageCount: 15,
  },
];

function DiscountBadge({ offer }: { offer: typeof DEMO_OFFERS[0] }) {
  if (offer.discountType === 'PERCENTAGE') return (
    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-bold border border-[#C9A84C]/20">
      <Percent size={10} /> {offer.discount}% OFF
    </span>
  );
  if (offer.discountType === 'FLAT') return (
    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
      ₹{offer.discount} OFF
    </span>
  );
  return (
    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
      ₹{offer.discount} FIXED
    </span>
  );
}

export default function OffersPage() {
  const [offers, setOffers] = useState(DEMO_OFFERS);

  const toggleOffer = (id: string) => {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, active: !o.active } : o));
  };

  const activeCount = offers.filter(o => o.active).length;
  const totalUsage = offers.reduce((sum, o) => sum + o.usageCount, 0);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Offers & Promotions</h1>
          <p className="text-[#9CA3AF] text-sm">Create and manage discounts, seasonal offers, and loyalty deals.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:opacity-90 transition-opacity w-fit">
          <Plus size={16} /> New Offer
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Offers', value: offers.length, color: 'text-white' },
          { label: 'Active Offers', value: activeCount, color: 'text-emerald-400' },
          { label: 'Total Redemptions', value: totalUsage, color: 'text-[#C9A84C]' },
          { label: 'Inactive', value: offers.length - activeCount, color: 'text-[#9CA3AF]' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-4 bg-[#111] border border-[rgba(255,255,255,0.05)]">
            <p className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-2">{s.label}</p>
            <p className={`text-2xl font-bold font-heading ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map(offer => (
          <div
            key={offer.id}
            className={`glass-card p-6 bg-[#111] border transition-all duration-300 rounded-2xl ${
              offer.active
                ? 'border-[rgba(201,168,76,0.2)] hover:border-[rgba(201,168,76,0.4)]'
                : 'border-[rgba(255,255,255,0.05)] opacity-60'
            }`}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] flex items-center justify-center text-[#C9A84C]">
                  <Tag size={18} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">{offer.title}</h3>
                  <p className="text-[#6B7280] text-xs">{offer.applicableTo}</p>
                </div>
              </div>
              <button
                onClick={() => toggleOffer(offer.id)}
                className="text-[#9CA3AF] hover:text-[#C9A84C] transition-colors shrink-0"
                title={offer.active ? 'Deactivate' : 'Activate'}
              >
                {offer.active ? <ToggleRight size={28} className="text-[#C9A84C]" /> : <ToggleLeft size={28} />}
              </button>
            </div>

            {/* Description */}
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{offer.description}</p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <DiscountBadge offer={offer} />
              <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                offer.active
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-[rgba(255,255,255,0.05)] text-[#6B7280] border-[rgba(255,255,255,0.1)]'
              }`}>
                {offer.active ? 'Active' : 'Inactive'}
              </span>
              <span className="text-[#6B7280] text-xs flex items-center gap-1">
                <Calendar size={11} /> {offer.validFrom} → {offer.validTo}
              </span>
            </div>

            {/* Usage + Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[rgba(255,255,255,0.05)]">
              <p className="text-[#6B7280] text-xs">{offer.usageCount} redemptions</p>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                  <Edit size={12} /> Edit
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
