'use client';

import { useState } from 'react';
import { UserCircle, Star, Scissors, Calendar, Edit2, Save, X } from 'lucide-react';

export default function BarberProfilePage() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Ravi Kumar',
    phone: '+91 98765 43210',
    specialization: 'Classic Cuts, Fades & Beard Art',
    experience: '6 years',
    bio: 'Passionate about precision cuts and clean beard styles. Specializes in fade techniques and modern haircuts. Known for friendly customer service and attention to detail.',
    rating: 4.8,
    totalCuts: 1240,
    thisMonth: 82,
    status: 'Available',
  });

  const skills = ['Classic Haircut', 'Fade Cut', 'Beard Styling', 'Hair Spa', 'Skin Fade', 'Design Cuts'];
  const recentReviews = [
    { customer: 'Rahul K.', rating: 5, text: 'Best fade in the city. Ravi understood exactly what I wanted.', date: 'Jun 18, 2026' },
    { customer: 'Suresh M.', rating: 5, text: 'Always consistent! My go-to barber for the last 2 years.', date: 'Jun 15, 2026' },
    { customer: 'Arjun T.', rating: 4, text: 'Great beard trim and clean finish. Highly recommended.', date: 'Jun 12, 2026' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">My Profile</h1>
          <p className="text-[#9CA3AF] text-sm">Manage your professional information and specialties.</p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all w-fit ${
            editing
              ? 'bg-[rgba(255,255,255,0.05)] text-[#9CA3AF] hover:text-white border border-[rgba(255,255,255,0.1)]'
              : 'text-black bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:opacity-90'
          }`}
        >
          {editing ? <><X size={14} /> Cancel</> : <><Edit2 size={14} /> Edit Profile</>}
        </button>
      </header>

      {/* Profile Card */}
      <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C9A84C]/20 to-[#C9A84C]/5 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
            <span className="text-[#C9A84C] text-3xl font-heading font-bold">R</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {editing ? (
              <input
                className="text-2xl font-heading font-bold bg-transparent border-b border-[#C9A84C] text-white focus:outline-none w-full mb-2"
                value={profile.name}
                onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
              />
            ) : (
              <h2 className="text-2xl font-heading font-bold text-white mb-1">{profile.name}</h2>
            )}
            <p className="text-[#C9A84C] text-sm font-medium mb-1">{profile.specialization}</p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1 text-[#9CA3AF] text-sm">
                <Scissors size={13} /> {profile.experience} experience
              </span>
              <span className="flex items-center gap-1 text-amber-400 text-sm">
                <Star size={13} fill="currentColor" /> {profile.rating} rating
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                profile.status === 'Available'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {profile.status}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 shrink-0">
            <div className="text-center">
              <p className="text-2xl font-heading font-bold text-white">{profile.totalCuts}</p>
              <p className="text-[#6B7280] text-xs">Total Cuts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-heading font-bold text-[#C9A84C]">{profile.thisMonth}</p>
              <p className="text-[#6B7280] text-xs">This Month</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)]">
          <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider block mb-2">Bio</label>
          {editing ? (
            <textarea
              className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
            />
          ) : (
            <p className="text-[#9CA3AF] text-sm leading-relaxed">{profile.bio}</p>
          )}
        </div>

        {/* Skills */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider block mb-3">Specialties</label>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="px-3 py-1.5 rounded-full bg-[rgba(201,168,76,0.08)] text-[#C9A84C] border border-[rgba(201,168,76,0.2)] text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {editing && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:opacity-90 transition-opacity"
            >
              <Save size={14} /> Save Profile
            </button>
          </div>
        )}
      </div>

      {/* Recent Reviews */}
      <div className="glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl p-6">
        <h3 className="font-heading text-lg font-bold text-white mb-5">Recent Customer Reviews</h3>
        <div className="space-y-4">
          {recentReviews.map((review, i) => (
            <div key={i} className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center text-[#C9A84C] text-xs font-bold">
                    {review.customer[0]}
                  </div>
                  <p className="text-white text-sm font-medium">{review.customer}</p>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={12} className={j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-[#333] fill-[#333]'} />
                  ))}
                  <span className="text-[#6B7280] text-xs ml-2">{review.date}</span>
                </div>
              </div>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
