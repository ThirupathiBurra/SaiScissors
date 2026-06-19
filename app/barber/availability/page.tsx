import { Clock, CheckCircle, XCircle, Coffee } from 'lucide-react';

export default function BarberAvailability() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">My Availability</h1>
        <p className="text-[#9CA3AF] text-sm">Set your current status so the admin can route walk-ins efficiently.</p>
      </header>

      {/* Current Status Toggle */}
      <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 md:p-8">
        <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-6">Current Status</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-[#C9A84C] bg-[rgba(201,168,76,0.1)] text-[#C9A84C] transition-all">
            <CheckCircle size={24} />
            <span className="font-semibold text-sm">Available</span>
          </button>
          
          <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.02)] transition-all">
            <Clock size={24} className="text-orange-400" />
            <span className="font-semibold text-sm">Busy</span>
          </button>

          <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.02)] transition-all">
            <Coffee size={24} className="text-blue-400" />
            <span className="font-semibold text-sm">Lunch Break</span>
          </button>

          <button className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.02)] transition-all">
            <XCircle size={24} className="text-red-400" />
            <span className="font-semibold text-sm">Off Duty</span>
          </button>
        </div>
      </div>

      {/* Default Schedule */}
      <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 md:p-8">
        <h3 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-6">Default Schedule</h3>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.05)]">
            <div>
              <p className="text-white font-medium">Working Hours</p>
              <p className="text-[#6B7280] text-sm">Your standard daily shift</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="time" defaultValue="10:00" className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded px-3 py-1.5 text-sm text-white" />
              <span className="text-[#6B7280]">to</span>
              <input type="time" defaultValue="20:00" className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded px-3 py-1.5 text-sm text-white" />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.05)]">
            <div>
              <p className="text-white font-medium">Weekly Off</p>
              <p className="text-[#6B7280] text-sm">Your designated rest day</p>
            </div>
            <select className="bg-[#111] border border-[rgba(255,255,255,0.1)] rounded px-3 py-1.5 text-sm text-white md:w-48">
              <option>Monday</option>
              <option selected>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
            </select>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button className="btn-gold px-6 py-2 rounded-lg text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E]">
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
