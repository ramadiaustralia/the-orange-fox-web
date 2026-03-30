'use client';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { IconSearch, IconPalette, IconGear, IconLink, IconStar, IconRocket } from '@/components/Icons';
import { useLanguage } from '@/lib/LanguageContext';

const processIconMap: Record<string, React.ComponentType<{className?: string}>> = {
  search: IconSearch, palette: IconPalette, gear: IconGear,
  link: IconLink, star: IconStar, rocket: IconRocket,
};

export default function ProcessPage() {
  const { t } = useLanguage();

  const phases = [
    { num: '01', titleKey: 'phase1_title' as const, descKey: 'phase1_desc' as const, icon: 'search', features: ['Business Analysis', 'Requirement Gathering', 'Market Research', 'Technical Planning'] },
    { num: '02', titleKey: 'phase2_title' as const, descKey: 'phase2_desc' as const, icon: 'palette', features: ['Wireframing', 'UI/UX Design', 'Prototyping', 'Design System'] },
    { num: '03', titleKey: 'phase3_title' as const, descKey: 'phase3_desc' as const, icon: 'gear', features: ['Frontend Development', 'Backend APIs', 'Database Design', 'CMS Integration'] },
    { num: '04', titleKey: 'phase4_title' as const, descKey: 'phase4_desc' as const, icon: 'link', features: ['API Integration', 'Payment Setup', 'Cross-browser Testing', 'Performance Testing'] },
    { num: '05', titleKey: 'phase5_title' as const, descKey: 'phase5_desc' as const, icon: 'star', features: ['Client Review', 'Feedback Integration', 'Fine-tuning', 'Quality Assurance'] },
    { num: '06', titleKey: 'phase6_title' as const, descKey: 'phase6_desc' as const, icon: 'rocket', features: ['Deployment', 'DNS Configuration', 'Monitoring Setup', 'Post-launch Support'] },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.1) 0%,transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>{t('process_label')}</span>
          </div>
          <h1 className="text-white text-[clamp(2rem,5vw,3rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('process_title')}</h1>
          <p className="text-white/40 text-[0.9rem] max-w-md mx-auto leading-relaxed">{t('process_desc')}</p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-light-bg">
        <div className="max-w-[800px] mx-auto relative pl-8">
          {/* Timeline Line */}
          <div className="absolute left-[4px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          {phases.map((phase, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="relative mb-6">
                {/* Dot */}
                <div className="absolute -left-8 top-7 w-2.5 h-2.5 rounded-full bg-orange border-2 border-light-bg -translate-x-px" />

                {/* Card */}
                <div className="bg-white border border-border-light rounded-2xl p-6 md:p-7 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(212,105,42,0.08)]">
                  <div className="flex items-start justify-between mb-3 gap-4 flex-wrap">
                    <div>
                      <span className="text-[0.6rem] uppercase tracking-[1.5px] text-orange font-semibold block mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Phase {phase.num}</span>
                      <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {(() => { const IC = processIconMap[phase.icon]; return IC ? <IC className="w-5 h-5 text-orange" /> : null; })()} {t(phase.titleKey)}
                      </h3>
                    </div>
                  </div>
                  <p className="text-[0.82rem] text-text-secondary leading-relaxed mb-4">{t(phase.descKey)}</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {phase.features.map((f, j) => (
                      <li key={j} className="text-[0.78rem] text-text-secondary pl-4 relative leading-relaxed before:content-['◆'] before:absolute before:left-0 before:text-orange before:text-[0.45rem] before:top-1">{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 text-center">
        <ScrollReveal>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('portfolio_cta')}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <p className="text-text-secondary text-[0.9rem] max-w-lg mx-auto mb-8">{t('portfolio_cta_desc')}</p>
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
