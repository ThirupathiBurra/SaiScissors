'use client';

import { useBarbers } from '@/hooks/useBarbers';
import { Users, Star } from 'lucide-react';
import { EmptyState } from '@/components/admin/EmptyState';

export default function BarbersPage() {
  const { barbers, loading } = useBarbers();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Staff & Barbers</h1>
          <p className="text-[#9CA3AF] text-sm">Manage barbers, their specialties, and status.</p>
        </div>
        <button className="btn-gold px-4 py-2 rounded-lg text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] w-fit">
          + Add Barber
        </button>
      </header>

      {loading ? (
        <div className="text-[#C9A84C] animate-pulse">Loading barbers...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {barbers.length === 0 ? (
            <div className="col-span-full">
              <EmptyState 
                icon={Users} 
                title="No staff found" 
                subtitle="Your barbers list is empty. Add staff members to start accepting bookings."
                actionLabel="Add Barber"
              />
            </div>
          ) : (
            barbers.map((barber) => (
              <div key={barber.id} className="glass-card p-6 border border-[rgba(255,255,255,0.05)] bg-[#111] hover:border-[rgba(201,168,76,0.3)] transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-[rgba(201,168,76,0.1)] text-[#C9A84C] flex items-center justify-center font-bold text-2xl border border-[rgba(201,168,76,0.2)]">
                    {barber.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                      {barber.name}
                      {barber.rating && (
                        <span className="flex items-center text-amber-400 text-xs font-medium bg-amber-400/10 px-1.5 py-0.5 rounded">
                          <Star size={10} className="mr-0.5 fill-amber-400" /> {barber.rating}
                        </span>
                      )}
                    </h3>
                    <p className="text-[#C9A84C] text-xs uppercase tracking-wider font-semibold">{barber.status}</p>
                  </div>
                </div>
                
                {barber.expertise && barber.expertise.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[#6B7280] text-xs mb-2">Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {barber.expertise.map((spec, i) => (
                        <span key={i} className="px-2 py-1 bg-[rgba(255,255,255,0.05)] text-[#9CA3AF] rounded text-[10px] uppercase font-semibold tracking-wider">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <button className="flex-1 py-2 text-xs font-semibold rounded-lg bg-[rgba(201,168,76,0.1)] text-[#C9A84C] hover:bg-[rgba(201,168,76,0.2)] transition-colors">
                    Edit Profile
                  </button>
                  <button className="flex-1 py-2 text-xs font-semibold rounded-lg bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                    View Schedule
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
