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


  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.1) 0%,transparent 70%)', animation: 'orbFloat 40s ease-in-out infinite' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 3.5s ease-in-out infinite' }} />
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
            <ScrollReveal key={i} delay={i * 0.2}>
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

      {/* CTA */}
      <section className="bg-light-bg py-20 px-6 text-center">
        <ScrollReveal>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('portfolio_cta')}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="text-text-secondary text-[0.9rem] max-w-lg mx-auto mb-8 leading-relaxed">{t('portfolio_cta_desc')}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.6}>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-orange text-white rounded-lg font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)]" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('portfolio_cta_btn')} →
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
