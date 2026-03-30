'use client';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { IconTarget, IconLightning, IconHandshake, IconDiamond } from '@/components/Icons';
import { useLanguage } from '@/lib/LanguageContext';

const techStack = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Supabase', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Vercel', category: 'Deployment' },
  { name: 'Figma', category: 'Design' },
  { name: 'Git', category: 'DevOps' },
];

const valueIconMap: Record<string, React.ComponentType<{className?: string}>> = {
  target: IconTarget, lightning: IconLightning, handshake: IconHandshake, diamond: IconDiamond,
};

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: 'diamond', titleKey: 'value_quality' as const, descKey: 'value_quality_desc' as const },
    { icon: 'target', titleKey: 'value_transparency' as const, descKey: 'value_transparency_desc' as const },
    { icon: 'handshake', titleKey: 'value_partnership' as const, descKey: 'value_partnership_desc' as const },
    { icon: 'lightning', titleKey: 'value_innovation' as const, descKey: 'value_innovation_desc' as const },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.1) 0%,transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Image src="/images/logo-fox.png" alt="The Orange Fox" width={120} height={120} className="mx-auto mb-6 w-24 h-auto" style={{ animation: 'heroFloat 4s ease-in-out infinite' }} />
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>{t('about_label')}</span>
          </div>
          <h1 className="text-white text-[clamp(2rem,5vw,3rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('about_title')}</h1>
          <p className="text-white/40 text-[0.9rem] max-w-md mx-auto leading-relaxed">{t('about_desc')}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-[1.5px] bg-orange" />
              <span className="text-[0.65rem] uppercase tracking-[3px] text-orange font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('about_mission')}</span>
              <div className="w-6 h-[1.5px] bg-orange" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <p className="text-xl md:text-2xl text-text-primary leading-relaxed font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
              &ldquo;{t('about_mission_desc')}&rdquo;
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-off-white">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1.5px] bg-orange" />
              <span className="text-[0.65rem] uppercase tracking-[3px] text-orange font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('about_values')}</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="bg-white border border-border-light rounded-2xl p-7 text-center transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(212,105,42,0.08)] h-full">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-xl mx-auto mb-4">{(() => { const IC = valueIconMap[v.icon]; return IC ? <IC className="w-5 h-5 text-orange" /> : null; })()}</div>
                  <h4 className="text-base font-semibold text-text-primary mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t(v.titleKey)}</h4>
                  <p className="text-[0.78rem] text-text-secondary leading-relaxed">{t(v.descKey)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-[1.5px] bg-orange" />
              <span className="text-[0.65rem] uppercase tracking-[3px] text-orange font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{t('about_tech')}</span>
            </div>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="px-5 py-3 rounded-xl border border-border-light bg-off-white transition-all duration-300 hover:border-orange/30 hover:shadow-sm">
                  <span className="text-sm font-semibold text-text-primary block" style={{ fontFamily: 'var(--font-heading)' }}>{tech.name}</span>
                  <span className="text-[0.65rem] text-text-muted uppercase tracking-wider">{tech.category}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-dark via-dark-soft to-charcoal py-24 px-6 text-center">
        <ScrollReveal>
          <h2 className="text-white text-[clamp(1.6rem,3vw,2.2rem)] font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('portfolio_cta')}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <p className="text-white/40 text-[0.9rem] max-w-lg mx-auto mb-8">{t('portfolio_cta_desc')}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-orange text-white rounded-lg font-bold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(212,105,42,0.4)]" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('portfolio_cta_btn')} →
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
