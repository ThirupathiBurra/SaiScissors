import { Search, Filter, MoreVertical, Calendar as CalendarIcon } from 'lucide-react';

export default function BarberAppointments() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">My Appointments</h1>
          <p className="text-[#9CA3AF] text-sm">Manage your scheduled customers and walk-ins.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or phone..."
              className="w-full md:w-64 bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#C9A84C]"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#111] border border-[rgba(255,255,255,0.1)] px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>
      </header>

      <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                <th className="p-4 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Time</th>
                <th className="p-4 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Service</th>
                <th className="p-4 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
              <tr className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <td className="p-4">
                  <p className="text-white font-medium">10:00 AM</p>
                  <p className="text-xs text-[#6B7280]">Today</p>
                </td>
                <td className="p-4">
                  <p className="text-white font-medium flex items-center gap-2">
                    Rahul K.
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#C9A84C]/20 text-[#C9A84C]">VIP</span>
                  </p>
                  <p className="text-xs text-[#6B7280]">+91 98765 43210</p>
                </td>
                <td className="p-4">
                  <p className="text-white text-sm">Classic Haircut</p>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Confirmed
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-xs font-medium text-[#C9A84C] hover:text-white transition-colors">
                    Mark Complete
                  </button>
                </td>
              </tr>
              {/* Add more static rows for the UI prototype */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
