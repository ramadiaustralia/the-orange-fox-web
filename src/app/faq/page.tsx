'use client';
import { useState } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function FaqPage() {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const categories = [
    {
      titleKey: 'faq_cat_general' as const,
      faqs: [
        { q: 'faq_general_1_q' as const, a: 'faq_general_1_a' as const },
        { q: 'faq_general_2_q' as const, a: 'faq_general_2_a' as const },
        { q: 'faq_general_3_q' as const, a: 'faq_general_3_a' as const },
        { q: 'faq_general_4_q' as const, a: 'faq_general_4_a' as const },
      ]
    },
    {
      titleKey: 'faq_cat_services' as const,
      faqs: [
        { q: 'faq_services_1_q' as const, a: 'faq_services_1_a' as const },
        { q: 'faq_services_2_q' as const, a: 'faq_services_2_a' as const },
        { q: 'faq_services_3_q' as const, a: 'faq_services_3_a' as const },
        { q: 'faq_services_4_q' as const, a: 'faq_services_4_a' as const },
        { q: 'faq_services_5_q' as const, a: 'faq_services_5_a' as const },
      ]
    },
    {
      titleKey: 'faq_cat_process' as const,
      faqs: [
        { q: 'faq_process_1_q' as const, a: 'faq_process_1_a' as const },
        { q: 'faq_process_2_q' as const, a: 'faq_process_2_a' as const },
        { q: 'faq_process_3_q' as const, a: 'faq_process_3_a' as const },
        { q: 'faq_process_4_q' as const, a: 'faq_process_4_a' as const },
      ]
    },
    {
      titleKey: 'faq_cat_pricing' as const,
      faqs: [
        { q: 'faq_pricing_1_q' as const, a: 'faq_pricing_1_a' as const },
        { q: 'faq_pricing_2_q' as const, a: 'faq_pricing_2_a' as const },
        { q: 'faq_pricing_3_q' as const, a: 'faq_pricing_3_a' as const },
        { q: 'faq_pricing_4_q' as const, a: 'faq_pricing_4_a' as const },
      ]
    },
    {
      titleKey: 'faq_cat_support' as const,
      faqs: [
        { q: 'faq_support_1_q' as const, a: 'faq_support_1_a' as const },
        { q: 'faq_support_2_q' as const, a: 'faq_support_2_a' as const },
        { q: 'faq_support_3_q' as const, a: 'faq_support_3_a' as const },
      ]
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.12) 0%,transparent 70%)', animation: 'orbFloat 40s ease-in-out infinite' }} />
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.3) 0%,transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite reverse' }} />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.4) 0%,transparent 70%)', animation: 'orbFloat 32s ease-in-out infinite' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 3.5s ease-in-out infinite' }} />
              <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>{t('faq_label')}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <h1 className="text-white text-[clamp(2rem,5vw,3rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('faq_title')}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>
            <p className="text-white/40 text-[0.9rem] max-w-md mx-auto leading-relaxed">{t('faq_desc')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          {categories.map((cat, ci) => (
            <div key={ci} className={ci > 0 ? 'mt-14' : ''}>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-orange rounded-full" />
                  <h2 className="text-[1.1rem] font-bold text-text-primary uppercase tracking-[1.5px]" style={{ fontFamily: 'var(--font-heading)' }}>{t(cat.titleKey)}</h2>
                </div>
              </ScrollReveal>
              <div className="space-y-3">
                {cat.faqs.map((faq, fi) => {
                  const key = faq.q;
                  const isOpen = openItems.has(key);
                  return (
                    <ScrollReveal key={fi} delay={fi * 0.1}>
                      <div className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'border-orange/30 shadow-[0_4px_20px_rgba(212,105,42,0.08)] bg-orange/[0.02]' : 'border-border-light bg-light-bg hover:border-orange/20'}`}>
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-center justify-between p-5 text-left bg-transparent border-none cursor-pointer"
                        >
                          <span className="font-semibold text-text-primary text-[0.9rem] pr-4" style={{ fontFamily: 'var(--font-heading)' }}>{t(faq.q)}</span>
                          <svg
                            className={`w-5 h-5 text-orange shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                          </svg>
                        </button>
                        <div
                          className="overflow-hidden transition-all duration-300"
                          style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0 }}
                        >
                          <p className="px-5 pb-5 text-text-secondary text-[0.85rem] leading-relaxed">{t(faq.a)}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still have questions? CTA */}
      <section className="bg-light-bg py-20 px-6 text-center border-t border-border-light">
        <ScrollReveal>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('faq_cta_title')}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="text-text-secondary text-[0.9rem] max-w-lg mx-auto mb-8 leading-relaxed">{t('faq_cta_desc')}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.6}>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-orange text-white rounded-lg font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)]" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('faq_cta_btn')} →
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
