'use client'; 
import { IconGlobe, IconBolt, IconLock, IconTrending, IconBook, IconShield } from '@/components/Icons';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  const services = [
    { icon: 'globe', titleKey: 'svc_web_title' as const, descKey: 'svc_web_desc' as const },
    { icon: 'bolt', titleKey: 'svc_admin_title' as const, descKey: 'svc_admin_desc' as const },
    { icon: 'lock', titleKey: 'svc_domain_title' as const, descKey: 'svc_domain_desc' as const },
    { icon: 'trending', titleKey: 'svc_seo_title' as const, descKey: 'svc_seo_desc' as const },
    { icon: 'book', titleKey: 'svc_training_title' as const, descKey: 'svc_training_desc' as const },
    { icon: 'shield', titleKey: 'svc_support_title' as const, descKey: 'svc_support_desc' as const },
  ];

const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  globe: IconGlobe, bolt: IconBolt, lock: IconLock,
  trending: IconTrending, book: IconBook, shield: IconShield,
};

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-32 md:py-40 text-center overflow-hidden">
        {/* Animated Orb */}
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.15) 0%,transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite' }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('hero_badge')}
            </span>
          </div>

          {/* Logo */}
          <Image
            src="/images/logo-fox.png"
            alt="The Orange Fox"
            width={392}
            height={392}
            className="mx-auto mb-4 w-full max-w-[300px] h-auto"
            style={{ animation: 'heroFloat 4s ease-in-out infinite' }}
            priority
          />

          {/* Divider */}
          <div className="w-12 h-px mx-auto my-6 bg-gradient-to-r from-transparent via-orange to-transparent" />

          {/* Title & Description */}
          <h1 className="text-white text-[clamp(2rem,5vw,3.2rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('hero_title')}
          </h1>
          <p className="text-white/40 text-[0.9rem] max-w-md mx-auto mb-10 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            {t('hero_desc')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-orange text-white rounded-lg font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('hero_cta')} →
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white/70 rounded-lg font-medium text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:border-orange/50 hover:text-orange"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('nav_services')}
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 text-white/20">
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
            <span className="text-[0.6rem] uppercase tracking-[3px]" style={{ fontFamily: 'var(--font-heading)' }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-[1.5px] bg-orange" />
              <span className="text-[0.65rem] uppercase tracking-[3px] text-orange font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('services_label')}
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <h2 className="text-[clamp(1.8rem,4vw,2.4rem)] font-bold text-text-primary mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('services_title')}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.24}>
            <p className="text-[0.9rem] text-text-secondary max-w-xl leading-relaxed mb-12" style={{ fontFamily: 'var(--font-body)' }}>
              {t('services_desc')}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div className="bg-white border border-border-light rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-orange/30">
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center text-xl mb-4">
                    {(() => { const IC = iconMap[svc.icon]; return IC ? <IC className="w-5 h-5 text-orange" /> : null; })()}
                  </div>
                  <h4 className="text-base font-semibold text-text-primary mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {t(svc.titleKey)}
                  </h4>
                  <p className="text-[0.82rem] text-text-secondary leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                    {t(svc.descKey)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.36}>
            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-orange font-semibold text-sm tracking-wider uppercase no-underline hover:gap-3 transition-all"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t('nav_services')} →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-dark via-dark-soft to-charcoal py-24 px-6 text-center">
        <ScrollReveal>
          <h2 className="text-white text-[clamp(1.8rem,4vw,2.4rem)] font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('portfolio_cta')}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <p className="text-white/40 text-[0.9rem] max-w-lg mx-auto mb-8 leading-relaxed">
            {t('portfolio_cta_desc')}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.24}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-orange text-white rounded-lg font-bold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(212,105,42,0.4)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t('portfolio_cta_btn')} →
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}
