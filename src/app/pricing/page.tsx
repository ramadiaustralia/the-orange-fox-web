'use client';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function PricingPage() {
  const { t } = useLanguage();

  const packages = [
    {
      category: 'pricing_category_web' as const,
      nameKey: 'pkg_premium_web' as const,
      descKey: 'pkg_premium_web_desc' as const,
      price: '$2,500',
      featureKeys: [
        'pkg_premium_web_f1' as const, 'pkg_premium_web_f2' as const, 'pkg_premium_web_f3' as const,
        'pkg_premium_web_f4' as const, 'pkg_premium_web_f5' as const, 'pkg_premium_web_f6' as const,
        'pkg_premium_web_f7' as const,
      ],
      highlight: false,
    },
    {
      category: 'pricing_category_web' as const,
      nameKey: 'pkg_exclusive_web' as const,
      descKey: 'pkg_exclusive_web_desc' as const,
      price: '$4,800',
      featureKeys: [
        'pkg_exclusive_web_f1' as const, 'pkg_exclusive_web_f2' as const, 'pkg_exclusive_web_f3' as const,
        'pkg_exclusive_web_f4' as const, 'pkg_exclusive_web_f5' as const, 'pkg_exclusive_web_f6' as const,
        'pkg_exclusive_web_f7' as const,
      ],
      highlight: false,
    },
    {
      category: 'pricing_category_app' as const,
      nameKey: 'pkg_premium_app' as const,
      descKey: 'pkg_premium_app_desc' as const,
      price: '$3,500',
      featureKeys: [
        'pkg_premium_app_f1' as const, 'pkg_premium_app_f2' as const, 'pkg_premium_app_f3' as const,
        'pkg_premium_app_f4' as const, 'pkg_premium_app_f5' as const, 'pkg_premium_app_f6' as const,
        'pkg_premium_app_f7' as const,
      ],
      highlight: false,
    },
    {
      category: 'pricing_category_app' as const,
      nameKey: 'pkg_exclusive_app' as const,
      descKey: 'pkg_exclusive_app_desc' as const,
      price: '$6,800',
      featureKeys: [
        'pkg_exclusive_app_f1' as const, 'pkg_exclusive_app_f2' as const, 'pkg_exclusive_app_f3' as const,
        'pkg_exclusive_app_f4' as const, 'pkg_exclusive_app_f5' as const, 'pkg_exclusive_app_f6' as const,
        'pkg_exclusive_app_f7' as const,
      ],
      highlight: false,
    },
    {
      category: 'pricing_category_complete' as const,
      nameKey: 'pkg_ultimate' as const,
      descKey: 'pkg_ultimate_desc' as const,
      price: '$8,800',
      featureKeys: [
        'pkg_ultimate_f1' as const, 'pkg_ultimate_f2' as const, 'pkg_ultimate_f3' as const,
        'pkg_ultimate_f4' as const, 'pkg_ultimate_f5' as const, 'pkg_ultimate_f6' as const,
        'pkg_ultimate_f7' as const,
      ],
      highlight: true,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.12) 0%,transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite' }} />
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.3) 0%,transparent 70%)', animation: 'orbFloat 15s ease-in-out infinite reverse' }} />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.4) 0%,transparent 70%)', animation: 'orbFloat 20s ease-in-out infinite' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
              <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>{t('pricing_label')}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-white text-[clamp(2rem,5vw,3rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('pricing_title')}</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-white/40 text-[0.9rem] max-w-md mx-auto leading-relaxed">{t('pricing_desc')}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Phase 0 Banner */}
      <section className="bg-gradient-to-r from-orange/10 via-orange/5 to-orange/10 border-y border-orange/20 py-6 px-6">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-full bg-orange/20 flex items-center justify-center shrink-0">
            <span className="text-orange text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>0</span>
          </div>
          <div>
            <h3 className="text-text-primary font-semibold text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{t('pricing_phase0_title')}</h3>
            <p className="text-text-secondary text-[0.8rem] leading-relaxed">{t('pricing_phase0_desc')}</p>
          </div>
        </div>
      </section>

      {/* Web Packages */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-[0.7rem] uppercase tracking-[2px] font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('pricing_category_web')}</span>
              <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold text-text-primary" style={{ fontFamily: 'var(--font-heading)' }}>{t('pricing_web_heading')}</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.slice(0, 2).map((pkg, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="relative bg-white border border-border-light rounded-2xl p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(212,105,42,0.1)] hover:border-orange/30 h-full flex flex-col">
                  <span className="text-[0.65rem] uppercase tracking-[2px] text-orange/60 font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{t(pkg.category)}</span>
                  <h3 className="text-xl font-bold text-text-primary mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t(pkg.nameKey)}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-orange" style={{ fontFamily: 'var(--font-heading)' }}>{pkg.price}</span>
                    <span className="text-text-secondary text-sm">USD</span>
                  </div>
                  <p className="text-text-secondary text-[0.85rem] leading-relaxed mb-6">{t(pkg.descKey)}</p>
                  <div className="h-px bg-border-light mb-6" />
                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.featureKeys.map((fKey, j) => (
                      <li key={j} className="text-[0.82rem] text-text-secondary flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        {t(fKey)}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dark text-white rounded-xl font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t('pricing_cta')} →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* App Packages */}
      <section className="py-20 px-6 bg-light-bg">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange/10 text-orange text-[0.7rem] uppercase tracking-[2px] font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('pricing_category_app')}</span>
              <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold text-text-primary" style={{ fontFamily: 'var(--font-heading)' }}>{t('pricing_app_heading')}</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.slice(2, 4).map((pkg, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="relative bg-white border border-border-light rounded-2xl p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(212,105,42,0.1)] hover:border-orange/30 h-full flex flex-col">
                  <span className="text-[0.65rem] uppercase tracking-[2px] text-orange/60 font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{t(pkg.category)}</span>
                  <h3 className="text-xl font-bold text-text-primary mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t(pkg.nameKey)}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-orange" style={{ fontFamily: 'var(--font-heading)' }}>{pkg.price}</span>
                    <span className="text-text-secondary text-sm">USD</span>
                  </div>
                  <p className="text-text-secondary text-[0.85rem] leading-relaxed mb-6">{t(pkg.descKey)}</p>
                  <div className="h-px bg-border-light mb-6" />
                  <ul className="space-y-3 mb-8 flex-grow">
                    {pkg.featureKeys.map((fKey, j) => (
                      <li key={j} className="text-[0.82rem] text-text-secondary flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        {t(fKey)}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-dark text-white rounded-xl font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t('pricing_cta')} →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ultimate Package - Hero style */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal py-20 px-6 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.15) 0%,transparent 70%)' }} />
        <div className="max-w-[600px] mx-auto relative z-10">
          <ScrollReveal>
            <div className="relative bg-white/5 backdrop-blur-sm border border-orange/30 rounded-3xl p-10 text-center shadow-[0_0_60px_rgba(212,105,42,0.1)]">
              <span className="inline-block px-4 py-1.5 bg-orange text-white text-[0.6rem] uppercase tracking-[2px] font-bold rounded-full mb-6">{t('pricing_best_value')}</span>
              <span className="block text-[0.65rem] uppercase tracking-[2px] text-orange/60 font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t(packages[4].category)}</span>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t(packages[4].nameKey)}</h3>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span className="text-4xl font-bold text-orange" style={{ fontFamily: 'var(--font-heading)' }}>{packages[4].price}</span>
                <span className="text-white/30 text-sm">USD</span>
              </div>
              <p className="text-white/50 text-[0.85rem] leading-relaxed mb-8 max-w-md mx-auto">{t(packages[4].descKey)}</p>
              <div className="h-px bg-white/10 mb-8" />
              <ul className="space-y-3 mb-8 text-left max-w-sm mx-auto">
                {packages[4].featureKeys.map((fKey, j) => (
                  <li key={j} className="text-[0.82rem] text-white/60 flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {t(fKey)}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange text-white rounded-xl font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(212,105,42,0.4)]" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('pricing_cta')} →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-light-bg py-20 px-6 text-center border-t border-border-light">
        <ScrollReveal>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('portfolio_cta')}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <p className="text-text-secondary text-[0.9rem] max-w-lg mx-auto mb-8 leading-relaxed">{t('portfolio_cta_desc')}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-orange text-white rounded-lg font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)]" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('portfolio_cta_btn')} →
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
