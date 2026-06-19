'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Edit2, Plus } from 'lucide-react';
import { GALLERY_ITEMS } from '@/lib/constants';

export default function GalleryPage() {
  const [items, setItems] = useState(
    GALLERY_ITEMS.map((item, i) => ({
      id: `img-${i}`,
      ...item,
      active: true,
    }))
  );

  const toggleStatus = (id: string) => {
    setItems(prev => prev.map(img => img.id === id ? { ...img, active: !img.active } : img));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Gallery Management</h1>
          <p className="text-[#9CA3AF] text-sm">Manage the photos displayed in the public website gallery.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:opacity-90 transition-opacity w-fit">
          <Upload size={16} /> Upload Photo
        </button>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Upload Card */}
        <div className="relative aspect-square rounded-2xl border-2 border-dashed border-[rgba(255,255,255,0.1)] flex flex-col items-center justify-center text-[#6B7280] hover:text-[#C9A84C] hover:border-[rgba(201,168,76,0.3)] bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(201,168,76,0.02)] transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.03)] group-hover:bg-[rgba(201,168,76,0.1)] flex items-center justify-center mb-3 transition-colors">
            <Plus size={24} />
          </div>
          <p className="font-semibold text-sm">Add New Photo</p>
          <p className="text-xs opacity-70 mt-1">JPEG, PNG or WebP</p>
        </div>

        {/* Existing Items */}
        {items.map((img) => (
          <div key={img.id} className={`group relative aspect-square rounded-2xl overflow-hidden border transition-all ${img.active ? 'border-[rgba(255,255,255,0.1)]' : 'border-[rgba(255,255,255,0.05)] opacity-60'}`}>
            <Image
              src={img.imageUrl}
              alt={img.caption}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <div className="flex justify-end gap-2">
                <button onClick={() => toggleStatus(img.id)} className="p-2 rounded-lg bg-black/50 text-white hover:bg-[#C9A84C] transition-colors backdrop-blur-sm" title={img.active ? "Hide" : "Show"}>
                  <Edit2 size={14} />
                </button>
                <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-red-500 transition-colors backdrop-blur-sm" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
              <div>
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 ${img.active ? 'bg-emerald-500 text-white' : 'bg-[#333] text-[#9CA3AF]'}`}>
                  {img.active ? 'Visible' : 'Hidden'}
                </span>
                <h3 className="text-white font-heading font-bold text-lg">{img.caption}</h3>
                <p className="text-[#C9A84C] text-sm">{img.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
