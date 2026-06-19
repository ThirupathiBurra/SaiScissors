'use client';

import { useServices } from '@/hooks/useServices';
import { Scissors } from 'lucide-react';
import { EmptyState } from '@/components/admin/EmptyState';

export default function ServicesPage() {
  const { services, loading } = useServices();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Services Menu</h1>
          <p className="text-[#9CA3AF] text-sm">Manage shop services, pricing, and durations.</p>
        </div>
        <button className="btn-gold px-4 py-2 rounded-lg text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E]">
          + Add Service
        </button>
      </header>

      {loading ? (
        <div className="text-[#C9A84C] animate-pulse">Loading services...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.length === 0 ? (
            <div className="col-span-full">
              <EmptyState 
                icon={Scissors} 
                title="No services found" 
                subtitle="Your services menu is empty. Add haircuts, beard styling, and spa treatments to get started."
                actionLabel="Add Service"
              />
            </div>
          ) : (
            services.map((service) => (
              <div key={service.id} className="glass-card p-6 border border-[rgba(255,255,255,0.05)] bg-[#111]">
                <h3 className="font-heading text-xl font-bold text-white mb-1">{service.name}</h3>
                <p className="text-[#C9A84C] font-semibold text-sm mb-4">₹{service.price} • {service.durationMinutes} mins</p>
                <p className="text-[#9CA3AF] text-sm line-clamp-2 mb-6">{service.description}</p>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 text-xs font-medium rounded-lg bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors">Edit</button>
                  <button className="flex-1 py-2 text-xs font-medium rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
