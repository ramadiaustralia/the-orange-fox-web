'use client';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { IconGlobe, IconBolt, IconLock, IconTrending, IconBook, IconShield } from '@/components/Icons';
import { useLanguage } from '@/lib/LanguageContext';

const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  globe: IconGlobe, bolt: IconBolt, lock: IconLock,
  trending: IconTrending, book: IconBook, shield: IconShield,
};

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    { num: '00', icon: 'globe', titleKey: 'svc_web_title' as const, descKey: 'svc_web_desc' as const, features: ['Next.js & React', 'Tailwind CSS & Supabase', '100% From Scratch', 'Responsive & Fast'] },
    { num: '01', icon: 'bolt', titleKey: 'svc_admin_title' as const, descKey: 'svc_admin_desc' as const, features: ['Custom-Built Dashboard', 'Content Management', 'Intuitive UI/UX', 'No Technical Skills Needed'] },
    { num: '02', icon: 'lock', titleKey: 'svc_domain_title' as const, descKey: 'svc_domain_desc' as const, features: ['Domain Registration', 'SSL Certificate', 'Vercel Cloud Hosting', 'CDN Configuration'] },
    { num: '03', icon: 'trending', titleKey: 'svc_seo_title' as const, descKey: 'svc_seo_desc' as const, features: ['On-page SEO', 'Google Analytics', 'Traffic Dashboard', 'Engagement Metrics'] },
    { num: '04', icon: 'book', titleKey: 'svc_training_title' as const, descKey: 'svc_training_desc' as const, features: ['Live Training', 'User Documentation', 'Workflow Guide', 'Q&A Support'] },
    { num: '05', icon: 'shield', titleKey: 'svc_support_title' as const, descKey: 'svc_support_desc' as const, features: ['Security Patches', 'Bug Fixes', 'Feature Additions', 'Redesign Services'] },
  ];

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
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.1) 0%,transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>{t('services_label')}</span>
          </div>
          <h1 className="text-white text-[clamp(2rem,5vw,3rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('services_title')}</h1>
          <p className="text-white/40 text-[0.9rem] max-w-md mx-auto leading-relaxed">{t('services_desc')}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 bg-white border-t-4 border-transparent" style={{ borderImage: 'linear-gradient(90deg,transparent,#d4692a,transparent) 1' }}>
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="bg-white border border-border-light rounded-2xl p-7 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(212,105,42,0.08)] hover:border-orange/30 h-full">
                <span className="text-orange/30 text-2xl font-bold mb-3 block" style={{ fontFamily: 'var(--font-heading)' }}>{svc.num}</span>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-lg">{(() => { const IC = iconMap[svc.icon]; return IC ? <IC className="w-6 h-6 text-orange" /> : null; })()}</div>
                  <h3 className="text-lg font-semibold text-text-primary" style={{ fontFamily: 'var(--font-heading)' }}>{t(svc.titleKey)}</h3>
                </div>
                <p className="text-[0.82rem] text-text-secondary leading-relaxed mb-4">{t(svc.descKey)}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {svc.features.map((f, j) => (
                    <li key={j} className="text-[0.78rem] text-text-secondary pl-4 relative leading-relaxed before:content-['◆'] before:absolute before:left-0 before:text-orange before:text-[0.45rem] before:top-1">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="bg-gradient-to-br from-dark via-dark-soft to-charcoal py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>{t('pricing_label')}</span>
              </div>
              <h2 className="text-white text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('pricing_title')}</h2>
              <p className="text-white/40 text-[0.9rem] max-w-xl mx-auto leading-relaxed">{t('pricing_desc')}</p>
            </div>
          </ScrollReveal>

          {/* Row 1: Premium Web + Exclusive Web */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {packages.slice(0, 2).map((pkg, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7 flex flex-col h-full transition-all duration-300 hover:border-orange/30 hover:-translate-y-1">
                  <span className="text-[0.65rem] uppercase tracking-[2px] text-orange/60 font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t(pkg.category)}</span>
                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{t(pkg.nameKey)}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-bold text-orange" style={{ fontFamily: 'var(--font-heading)' }}>{pkg.price}</span>
                    <span className="text-white/30 text-xs">USD</span>
                  </div>
                  <p className="text-white/50 text-[0.8rem] leading-relaxed mb-5">{t(pkg.descKey)}</p>
                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {pkg.featureKeys.map((fKey, j) => (
                      <li key={j} className="text-[0.78rem] text-white/60 flex items-start gap-2">
                        <svg className="w-4 h-4 text-orange shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        {t(fKey)}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)] border border-white/10 hover:border-orange" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t('pricing_cta')} →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 2: Premium App + Exclusive App */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {packages.slice(2, 4).map((pkg, i) => (
              <ScrollReveal key={i} delay={(i + 2) * 0.1}>
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7 flex flex-col h-full transition-all duration-300 hover:border-orange/30 hover:-translate-y-1">
                  <span className="text-[0.65rem] uppercase tracking-[2px] text-orange/60 font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t(pkg.category)}</span>
                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{t(pkg.nameKey)}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-2xl font-bold text-orange" style={{ fontFamily: 'var(--font-heading)' }}>{pkg.price}</span>
                    <span className="text-white/30 text-xs">USD</span>
                  </div>
                  <p className="text-white/50 text-[0.8rem] leading-relaxed mb-5">{t(pkg.descKey)}</p>
                  <ul className="space-y-2.5 mb-6 flex-grow">
                    {pkg.featureKeys.map((fKey, j) => (
                      <li key={j} className="text-[0.78rem] text-white/60 flex items-start gap-2">
                        <svg className="w-4 h-4 text-orange shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        {t(fKey)}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)] border border-white/10 hover:border-orange" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t('pricing_cta')} →
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Row 3: Ultimate Complete Package (highlighted) */}
          <div className="max-w-lg mx-auto">
            <ScrollReveal delay={0.4}>
              <div className="relative bg-white/5 backdrop-blur border border-orange/40 rounded-2xl p-7 flex flex-col h-full transition-all duration-300 hover:border-orange/60 hover:-translate-y-1 shadow-[0_0_40px_rgba(212,105,42,0.08)]">
                <span className="absolute -top-3 right-4 px-3 py-1 bg-orange text-white text-[0.6rem] uppercase tracking-[2px] font-bold rounded-full">{t('pricing_best_value')}</span>
                <span className="text-[0.65rem] uppercase tracking-[2px] text-orange/60 font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t(packages[4].category)}</span>
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{t(packages[4].nameKey)}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-orange" style={{ fontFamily: 'var(--font-heading)' }}>{packages[4].price}</span>
                  <span className="text-white/30 text-xs">USD</span>
                </div>
                <p className="text-white/50 text-[0.8rem] leading-relaxed mb-5">{t(packages[4].descKey)}</p>
                <ul className="space-y-2.5 mb-6 flex-grow">
                  {packages[4].featureKeys.map((fKey, j) => (
                    <li key={j} className="text-[0.78rem] text-white/60 flex items-start gap-2">
                      <svg className="w-4 h-4 text-orange shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      {t(fKey)}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange text-white rounded-xl font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {t('pricing_cta')} →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-light-bg py-20 px-6 text-center">
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
