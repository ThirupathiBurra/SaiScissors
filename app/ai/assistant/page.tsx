'use client';
import { useState, useEffect, useRef } from 'react';
import { useFAQAssistant } from '@/hooks/useFAQAssistant';
import { Send, Bot, User, Sparkles } from 'lucide-react';

export default function FAQAssistantPage() {
  const [sessionId, setSessionId] = useState('');
  useEffect(() => { setSessionId(Math.random().toString(36).substring(7)); }, []);

  const { askQuestion, messages, loading } = useFAQAssistant(sessionId);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    askQuestion(input);
    setInput('');
  };

  const handleChip = (chip: string) => {
    askQuestion(chip);
  };

  return (
    /* Use dvh (dynamic viewport height) so the layout is keyboard-aware on mobile */
    <div className="bg-[#0A0A0A] flex flex-col" style={{ minHeight: '100dvh' }}>
      {/* Navbar spacer */}
      <div className="h-[72px] shrink-0" />

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 pb-4 min-h-0">
        {/* Header */}
        <header className="text-center py-6 shrink-0">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-1">
            Concierge Assistant
          </h1>
          <p className="text-[#9CA3AF] text-sm">
            Ask anything about our services, timings, or barbers.
          </p>
        </header>

        {/* Chat container — fills remaining space */}
        <div className="flex-1 glass-card bg-[#111] border border-[rgba(255,255,255,0.05)] rounded-2xl flex flex-col overflow-hidden min-h-0">

          {/* Chat window — scrollable */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 min-h-0">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-[#C9A84C]'
                    : 'bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)]'
                }`}>
                  {msg.sender === 'user'
                    ? <User size={15} className="text-black" />
                    : <Bot size={15} className="text-[#C9A84C]" />}
                </div>
                <div className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                  msg.sender === 'user'
                    ? 'bg-[#222] text-white rounded-tr-none'
                    : 'bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.1)] text-[#D1D5DB] rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  {msg.isAIEnhanced && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-[#C9A84C] opacity-70">
                      <Sparkles size={10} /> AI Enhanced
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.1)] flex items-center justify-center shrink-0 animate-pulse">
                  <Bot size={15} className="text-[#C9A84C]" />
                </div>
                <div className="bg-[rgba(201,168,76,0.05)] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area — always visible at bottom */}
          <div className="shrink-0 p-3 sm:p-4 border-t border-[rgba(255,255,255,0.05)] bg-[#0A0A0A]">
            {/* Suggestion chips */}
            <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
              {['Timings?', 'Haircut price?', 'Do you do facials?', 'WhatsApp number?'].map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleChip(chip)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.1)] text-xs text-[#9CA3AF] hover:text-white hover:border-[#C9A84C] transition-colors shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="w-full bg-[#111] border border-[rgba(255,255,255,0.1)] rounded-full pl-5 pr-12 py-3 text-white text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#C9A84C] text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                aria-label="Send message"
              >
                <Send size={14} className="ml-[-1px]" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
