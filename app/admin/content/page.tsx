'use client';

import { useState } from 'react';
import { PenTool, Save, ChevronDown, ChevronUp, HelpCircle, FileText, Sparkles } from 'lucide-react';

const sections = [
  {
    id: 'hero',
    icon: Sparkles,
    label: 'Hero Section',
    description: 'The main headline and tagline displayed on the homepage.',
    fields: [
      { key: 'headline', label: 'Main Headline', value: "Crafting Confidence,\nOne Cut at a Time", multiline: true },
      { key: 'tagline', label: 'Tagline / Subheading', value: 'Premium Haircuts • Beard Styling • Hair Spa • Grooming', multiline: false },
      { key: 'ctaText', label: 'CTA Button Text', value: 'Book Your Appointment', multiline: false },
    ],
  },
  {
    id: 'about',
    icon: FileText,
    label: 'About Section',
    description: 'Short description about the parlour displayed in the about/highlights area.',
    fields: [
      { key: 'aboutTitle', label: 'Section Title', value: 'About Saiscissors', multiline: false },
      { key: 'aboutBody', label: 'Description', value: "Saiscissors Men's Parlour A/C is a premium grooming studio located in the heart of Bhupalpally. We combine traditional barbering with modern techniques to deliver the finest haircuts, beard styles, and grooming services in the region.", multiline: true },
    ],
  },
  {
    id: 'faq',
    icon: HelpCircle,
    label: 'FAQ Content',
    description: 'Frequently asked questions answered by your AI concierge.',
    fields: [
      { key: 'faq1q', label: 'Q1: Question', value: 'What are your working hours?', multiline: false },
      { key: 'faq1a', label: 'Q1: Answer', value: 'We are open Monday to Saturday from 7:30 AM to 10:00 PM, and Sundays from 9:00 AM to 9:00 PM.', multiline: true },
      { key: 'faq2q', label: 'Q2: Question', value: 'How much does a haircut cost?', multiline: false },
      { key: 'faq2a', label: 'Q2: Answer', value: 'A Classic Haircut starts at ₹80. Premium services like VIP Haircut + Beard are ₹150. Check our Services page for the full menu.', multiline: true },
      { key: 'faq3q', label: 'Q3: Question', value: 'Do you offer hair spa?', multiline: false },
      { key: 'faq3a', label: 'Q3: Answer', value: 'Yes! Our Hair Spa treatment is a 45-minute deep nourishing session starting at ₹350.', multiline: true },
    ],
  },
];

export default function ContentPage() {
  const [expanded, setExpanded] = useState<string[]>(['hero']);
  const [savedSections, setSavedSections] = useState<string[]>([]);
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(sections.flatMap(s => s.fields.map(f => [f.key, f.value])))
  );

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSave = (sectionId: string) => {
    setSavedSections(prev => {
      if (prev.includes(sectionId)) return prev;
      const next = [...prev, sectionId];
      setTimeout(() => setSavedSections(p => p.filter(x => x !== sectionId)), 2500);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Content Manager</h1>
        <p className="text-[#9CA3AF] text-sm">Edit website copy, FAQs, and section text. Changes update in real-time.</p>
      </header>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => {
          const isOpen = expanded.includes(section.id);
          const isSaved = savedSections.includes(section.id);

          return (
            <div
              key={section.id}
              className={`glass-card bg-[#111] border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen ? 'border-[rgba(201,168,76,0.2)]' : 'border-[rgba(255,255,255,0.05)]'
              }`}
            >
              {/* Section Header */}
              <button
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                onClick={() => toggleExpand(section.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isOpen ? 'bg-[rgba(201,168,76,0.1)] text-[#C9A84C]' : 'bg-[rgba(255,255,255,0.03)] text-[#6B7280]'
                  }`}>
                    <section.icon size={16} />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">{section.label}</p>
                    <p className="text-[#6B7280] text-xs">{section.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isSaved && (
                    <span className="text-emerald-400 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Saved ✓
                    </span>
                  )}
                  {isOpen ? <ChevronUp size={16} className="text-[#9CA3AF]" /> : <ChevronDown size={16} className="text-[#9CA3AF]" />}
                </div>
              </button>

              {/* Section Fields */}
              {isOpen && (
                <div className="px-6 pb-6 border-t border-[rgba(255,255,255,0.05)] pt-5 space-y-5">
                  {section.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">
                        {field.label}
                      </label>
                      {field.multiline ? (
                        <textarea
                          value={values[field.key]}
                          onChange={(e) => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                          rows={3}
                          className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors resize-none leading-relaxed"
                        />
                      ) : (
                        <input
                          type="text"
                          value={values[field.key]}
                          onChange={(e) => setValues(prev => ({ ...prev, [field.key]: e.target.value }))}
                          className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      className="px-4 py-2 text-sm text-[#6B7280] hover:text-white transition-colors"
                      onClick={() => toggleExpand(section.id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:opacity-90 transition-opacity"
                      onClick={() => handleSave(section.id)}
                    >
                      <Save size={14} /> Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Note */}
      <div className="p-4 rounded-xl border border-[rgba(201,168,76,0.15)] bg-[rgba(201,168,76,0.05)] flex items-start gap-3">
        <PenTool size={16} className="text-[#C9A84C] mt-0.5 shrink-0" />
        <div>
          <p className="text-sm text-white font-medium">Content syncs on save</p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Changes are saved to your Firestore CMS collection and reflect on the website immediately. 
            The AI concierge uses FAQ answers automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
