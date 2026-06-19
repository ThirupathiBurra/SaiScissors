import { Scissors, CalendarDays, CheckCircle, Star } from 'lucide-react';

export default function BarberDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome back, Ravi</h1>
        <p className="text-[#9CA3AF] text-sm">Here is your schedule for today.</p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today's Appointments", value: '6', icon: CalendarDays },
          { label: 'Completed Services', value: '2', icon: CheckCircle },
          { label: 'Upcoming Customers', value: '4', icon: Scissors },
          { label: 'Average Rating', value: '4.8', icon: Star },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 border border-[rgba(255,255,255,0.05)] bg-[#111]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#9CA3AF] text-sm font-medium">{stat.label}</p>
              <stat.icon size={18} className="text-[#C9A84C]" />
            </div>
            <p className="text-3xl font-heading font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2 glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 h-fit">
          <h3 className="font-heading text-xl font-bold text-white mb-6">Today's Schedule</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.05)]">
              <div>
                <p className="text-[#C9A84C] font-semibold text-sm mb-1">10:00 AM</p>
                <p className="text-white font-medium">Rahul K. • Classic Haircut</p>
                <p className="text-[#6B7280] text-xs mt-1">VIP Customer</p>
              </div>
              <button className="btn-gold px-4 py-2 rounded-lg text-black font-semibold text-xs bg-gradient-to-r from-[#C9A84C] to-[#E2C97E]">
                Mark Complete
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <div>
                <p className="text-[#9CA3AF] font-semibold text-sm mb-1">11:30 AM</p>
                <p className="text-white font-medium">Suresh M. • Beard Trim</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <div>
                <p className="text-[#9CA3AF] font-semibold text-sm mb-1">1:00 PM</p>
                <p className="text-white font-medium">Arjun T. • Fade Cut + Wash</p>
                <p className="text-[#6B7280] text-xs mt-1">New Customer</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] opacity-50">
              <div>
                <p className="text-[#9CA3AF] font-semibold text-sm mb-1 line-through">08:30 AM</p>
                <p className="text-white font-medium">Vikram P. • Hair Spa</p>
                <p className="text-emerald-400 text-xs mt-1">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 h-fit">
          <h3 className="font-heading text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="relative border-l border-[rgba(255,255,255,0.1)] ml-3 space-y-6">
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#C9A84C] border-2 border-[#111]"></span>
              <p className="text-white text-sm font-medium">New Review Received</p>
              <p className="text-[#9CA3AF] text-xs mt-1">"Best fade in the city. Ravi understood exactly..."</p>
              <p className="text-[#6B7280] text-xs mt-2">1 hour ago</p>
            </div>
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[rgba(255,255,255,0.2)] border-2 border-[#111]"></span>
              <p className="text-white text-sm font-medium">Service Completed</p>
              <p className="text-[#9CA3AF] text-xs mt-1">Vikram P. (Hair Spa)</p>
              <p className="text-[#6B7280] text-xs mt-2">2 hours ago</p>
            </div>
            <div className="relative pl-6">
              <span className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[rgba(255,255,255,0.2)] border-2 border-[#111]"></span>
              <p className="text-white text-sm font-medium">Schedule Updated</p>
              <p className="text-[#9CA3AF] text-xs mt-1">Marked lunch break 2:00 PM - 3:00 PM</p>
              <p className="text-[#6B7280] text-xs mt-2">Yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
