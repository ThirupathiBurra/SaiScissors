'use client';
import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

export function NaturalLanguageSearch() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Rule mapping first:
    const q = query.toLowerCase();
    if (q.includes('pending') || q.includes('unconfirmed')) {
      alert('Routing to: Bookings (Filter: Pending)');
    } else if (q.includes('vip')) {
      alert('Routing to: Customers (Tag: VIP)');
    } else {
      // Fallback to Gemini if rules don't match
      alert('Gemini routing for complex query: ' + query);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Sparkles className="text-[#C9A84C]" size={18} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask the system... (e.g. 'Show me pending bookings for tomorrow')"
        className="w-full bg-[#111] border border-[rgba(201,168,76,0.3)] rounded-full pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all placeholder:text-[#6B7280]"
      />
      <button 
        type="submit"
        className="absolute inset-y-1 right-1 px-4 bg-[rgba(201,168,76,0.1)] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black rounded-full text-sm font-semibold transition-colors"
      >
        Search
      </button>
    </form>
  );
}
