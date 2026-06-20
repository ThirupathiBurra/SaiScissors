'use client';

import { useState } from 'react';
import { useBookings } from '@/hooks/useBookings';
import { BOOKING_STATUS } from '@/constants/bookingStatus';
import { Check, X, CalendarCheck, Search, Filter, List, Calendar as CalendarIcon } from 'lucide-react';
import { EmptyState } from '@/components/admin/EmptyState';

export default function BookingsPage() {
  const { bookings, loading, updateStatus } = useBookings();
  const [view, setView] = useState<'LIST' | 'CALENDAR'>('LIST');

  if (loading) return <div className="text-[#C9A84C] animate-pulse">Loading bookings...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Manage Bookings</h1>
          <p className="text-[#9CA3AF] text-sm">Review, confirm, or cancel customer appointments in real-time.</p>
        </div>
        
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={16} />
            <input 
              type="text" 
              placeholder="Search customers or phone..."
              className="w-full bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
            />
          </div>
          
          {/* Filter */}
          <button className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#111] border border-[rgba(255,255,255,0.1)] px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors">
            <Filter size={16} /> Filters
          </button>

          {/* View Toggle */}
          <div className="flex items-center p-1 bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-lg">
            <button 
              onClick={() => setView('LIST')}
              className={`p-1.5 rounded flex items-center justify-center transition-colors ${view === 'LIST' ? 'bg-[rgba(201,168,76,0.1)] text-[#C9A84C]' : 'text-[#6B7280] hover:text-white'}`}
              title="List View"
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setView('CALENDAR')}
              className={`p-1.5 rounded flex items-center justify-center transition-colors ${view === 'CALENDAR' ? 'bg-[rgba(201,168,76,0.1)] text-[#C9A84C]' : 'text-[#6B7280] hover:text-white'}`}
              title="Calendar View"
            >
              <CalendarIcon size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] overflow-hidden">
        {bookings.length === 0 ? (
          <div className="p-8">
            <EmptyState 
              icon={CalendarCheck} 
              title="No bookings found" 
              subtitle="There are no bookings matching your current filters. Try clearing the search or adjusting the filters."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] whitespace-nowrap">
              <thead>
                <tr className="border-b border-[#222] bg-[#161616] text-[#9CA3AF] text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-medium">Customer</th>
                  <th className="py-4 px-6 font-medium">Service & Stylist</th>
                  <th className="py-4 px-6 font-medium">Date & Time</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-[#222] last:border-0 hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-white">{b.customerName}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">{b.customerPhone}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-[#C9A84C] font-medium">{b.serviceName}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">by {b.barberName}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-white">
                        {b.bookingDate instanceof Date ? b.bookingDate.toDateString() : new Date(b.bookingDate).toDateString()}
                      </p>
                      <p className="text-xs text-[#6B7280] mt-0.5">{b.timeSlot}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex ${
                        b.status === BOOKING_STATUS.PENDING ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        b.status === BOOKING_STATUS.CONFIRMED ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        b.status === BOOKING_STATUS.COMPLETED ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        {b.status === BOOKING_STATUS.PENDING && (
                          <>
                            <button
                              onClick={() => updateStatus(b.id!, BOOKING_STATUS.CONFIRMED)}
                              className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors tooltip-trigger"
                              title="Approve"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => updateStatus(b.id!, BOOKING_STATUS.CANCELLED)}
                              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors tooltip-trigger"
                              title="Reject"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        {b.status === BOOKING_STATUS.CONFIRMED && (
                          <button
                            onClick={() => updateStatus(b.id!, BOOKING_STATUS.COMPLETED)}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                          >
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Calendar View Placeholder */}
      {view === 'CALENDAR' && bookings.length > 0 && (
        <div className="mt-8 glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] p-12 text-center rounded-2xl">
          <CalendarIcon className="mx-auto text-[#C9A84C] mb-4 opacity-50" size={48} />
          <h3 className="text-xl font-heading font-bold text-white mb-2">Calendar View</h3>
          <p className="text-[#9CA3AF]">The full calendar integration will be loaded here.</p>
        </div>
      )}
    </div>
  );
}
