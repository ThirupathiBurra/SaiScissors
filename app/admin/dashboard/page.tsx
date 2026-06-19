'use client';

import { useDashboard } from '@/hooks/useDashboard';
import { Users, CalendarDays, CheckCircle, Clock, Bell, Activity } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import { TimelineCard } from '@/components/admin/timeline/TimelineCard';
import { ActivityItem } from '@/components/admin/timeline/ActivityItem';

export default function DashboardPage() {
  const { stats, recentBookings, loading } = useDashboard();

  if (loading) {
    return <div className="text-[#C9A84C] animate-pulse">Loading dashboard...</div>;
  }

  const statCards = [
    { label: "Today's Bookings", value: stats.todaysBookings, icon: CalendarDays, color: "text-[#C9A84C]" },
    { label: "Pending Requests", value: stats.pendingRequests, icon: Clock, color: "text-amber-400" },
    { label: "Confirmed Appointments", value: stats.confirmedAppointments, icon: CheckCircle, color: "text-emerald-400" },
    { label: "Total Customers", value: stats.totalCustomers, icon: Users, color: "text-blue-400" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-[#9CA3AF] text-sm">Welcome back. Here is what's happening at Saiscissors today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="glass-card p-4 md:p-6 border border-[rgba(255,255,255,0.05)] bg-[#111]">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-[#9CA3AF] text-xs uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Bookings */}
        <div className="lg:col-span-2 glass-card p-6 bg-[#111] border border-[rgba(255,255,255,0.05)] h-fit">
        <h2 className="text-xl font-heading font-semibold text-white mb-6">Recent Bookings</h2>
        {recentBookings.length === 0 ? (
          <p className="text-[#6B7280] text-sm">No recent bookings found.</p>
        ) : (
          <div className="overflow-x-auto -mx-1">
          <div style={{ minWidth: '520px' }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#222] text-[#9CA3AF] text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-medium">Customer</th>
                  <th className="pb-3 px-4 font-medium">Service</th>
                  <th className="pb-3 px-4 font-medium">Date & Time</th>
                  <th className="pb-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-[#222] last:border-0 hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-white">{b.customerName}</p>
                      <p className="text-xs text-[#6B7280]">{b.customerPhone}</p>
                    </td>
                    <td className="py-4 px-4 text-[#C9A84C]">{b.serviceName}</td>
                    <td className="py-4 px-4">
                      <p className="text-white">
                        {b.bookingDate instanceof Date ? b.bookingDate.toDateString() : new Date(b.bookingDate).toDateString()}
                      </p>
                      <p className="text-xs text-[#6B7280]">{b.timeSlot}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        b.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        b.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        b.status === 'COMPLETED' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        )}
        </div>

        {/* Right Column: Communication Center / Activity Timeline */}
        <div className="space-y-6">
          <div className="glass-card p-6 border border-[rgba(255,255,255,0.05)] bg-[#111]">
            <h3 className="font-heading text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bell size={18} className="text-[#C9A84C]" />
                Recent Notifications
              </span>
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">4 New</span>
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.05)]">
                <p className="text-white text-sm font-medium">New Booking Request</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Rahul K. requested a VIP Haircut at 10:00 AM.</p>
              </div>
              <div className="p-3 rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                <p className="text-white text-sm font-medium">Waitlist Match</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Suresh M. is waiting for a 2:00 PM slot.</p>
              </div>
              <div className="p-3 rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                <p className="text-white text-sm font-medium">New 5-Star Review</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Arjun left a review for barber Ravi.</p>
              </div>
              <div className="p-3 rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                <p className="text-white text-sm font-medium">Inventory Alert</p>
                <p className="text-xs text-[#9CA3AF] mt-1">Premium Hair Gel is running low.</p>
              </div>
            </div>
            <button className="w-full mt-4 text-xs font-semibold text-[#C9A84C] hover:text-white transition-colors text-center">
              View All Notifications →
            </button>
          </div>

          <div className="glass-card p-6 border border-[rgba(255,255,255,0.05)] bg-[#111]">
            <h3 className="font-heading text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity size={18} className="text-[#C9A84C]" />
              Top Services Today
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Classic Haircut', count: 12, percent: 80 },
                { name: 'Beard Styling', count: 8, percent: 60 },
                { name: 'Fade Cut', count: 6, percent: 45 },
              ].map((svc, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white font-medium">{svc.name}</span>
                    <span className="text-[#C9A84C]">{svc.count}</span>
                  </div>
                  <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-1.5">
                    <div className="bg-[#C9A84C] h-1.5 rounded-full" style={{ width: `${svc.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <TimelineCard title="Activity Log">
            <ActivityItem title="Booking Confirmed" description="Admin approved Rahul K.'s booking." time="10 mins ago" active />
            <ActivityItem title="New Service Added" description="Admin added 'Bridal Grooming'." time="1 hour ago" />
            <ActivityItem title="Gallery Updated" description="Admin uploaded 3 new photos." time="2 hours ago" />
            <ActivityItem title="Staff Update" description="Barber Mahesh status changed to BUSY." time="3 hours ago" />
            <ActivityItem title="Daily Note Added" description="Power outage resolved. Back online." time="4 hours ago" />
          </TimelineCard>
        </div>
      </div>
    </div>
  );
}
