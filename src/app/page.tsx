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
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-20 md:py-24 text-center overflow-hidden">
        {/* === Decorative Background Elements === */}
        {/* Main animated orb */}
        <div className="absolute w-[500px] h-[500px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.12) 0%,transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite' }} />
        {/* Secondary orb top-left */}
        <div className="absolute w-[300px] h-[300px] rounded-full -top-20 -left-20 pointer-events-none opacity-40" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.08) 0%,transparent 70%)', animation: 'orbFloat 18s ease-in-out infinite reverse' }} />
        {/* Tertiary orb bottom-right */}
        <div className="absolute w-[250px] h-[250px] rounded-full -bottom-16 -right-16 pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.1) 0%,transparent 70%)', animation: 'orbFloat 22s ease-in-out infinite' }} />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full bg-orange/30 pointer-events-none" style={{
            top: `${15 + i * 14}%`, left: `${10 + i * 15}%`,
            animation: `twinkle ${2 + i * 0.7}s ease-in-out infinite ${i * 0.5}s, heroParticleFloat ${8 + i * 3}s ease-in-out infinite ${i * 1.2}s`
          }} />
        ))}
        
        {/* Diagonal accent lines */}
        <div className="absolute top-0 right-[15%] w-px h-32 pointer-events-none opacity-10" style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,105,42,0.5), transparent)', animation: 'heroLineSlide 6s ease-in-out infinite' }} />
        <div className="absolute bottom-0 left-[20%] w-px h-24 pointer-events-none opacity-10" style={{ background: 'linear-gradient(to top, transparent, rgba(212,105,42,0.4), transparent)', animation: 'heroLineSlide 8s ease-in-out infinite 2s' }} />
        
        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 pointer-events-none opacity-10 border-l border-t border-orange/30" style={{ animation: 'heroCornerPulse 4s ease-in-out infinite' }} />
        <div className="absolute bottom-8 right-8 w-16 h-16 pointer-events-none opacity-10 border-r border-b border-orange/30" style={{ animation: 'heroCornerPulse 4s ease-in-out infinite 2s' }} />
        
        {/* Horizontal glow line */}
        <div className="absolute top-1/2 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(212,105,42,0.06) 30%, rgba(212,105,42,0.1) 50%, rgba(212,105,42,0.06) 70%, transparent 100%)' }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6 backdrop-blur-sm" style={{ animation: 'heroFadeIn 1s ease-out' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('hero_badge')}
            </span>
          </div>

          {/* Logo - slightly smaller */}
          <Image
            src="/images/logo-fox.png"
            alt="The Orange Fox"
            width={392}
            height={392}
            className="mx-auto mb-3 w-full max-w-[220px] md:max-w-[260px] h-auto"
            style={{ animation: 'heroFloat 4s ease-in-out infinite' }}
            priority
          />

          {/* Animated divider */}
          <div className="relative w-20 h-px mx-auto my-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange to-transparent" style={{ animation: 'heroDividerGlow 3s ease-in-out infinite' }} />
          </div>

          {/* Title with stagger animation */}
          <h1 className="text-white text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold leading-tight mb-3" style={{ fontFamily: 'var(--font-heading)', animation: 'heroSlideUp 0.8s ease-out 0.2s both' }}>
            {t('hero_title')}
          </h1>
          <p className="text-white/40 text-[0.85rem] max-w-md mx-auto mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-body)', animation: 'heroSlideUp 0.8s ease-out 0.4s both' }}>
            {t('hero_desc')}
          </p>

          {/* CTAs with animation */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animation: 'heroSlideUp 0.8s ease-out 0.6s both' }}>
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-3 bg-orange text-white rounded-lg font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(212,105,42,0.4)] overflow-hidden"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">{t('hero_cta')} →</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white/70 rounded-lg font-medium text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:border-orange/50 hover:text-orange backdrop-blur-sm"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('nav_services')}
            </Link>
          </div>

          {/* Scroll Indicator with enhanced animation */}
          <div className="mt-10 flex flex-col items-center gap-2 text-white/20" style={{ animation: 'heroSlideUp 0.8s ease-out 0.8s both' }}>
            <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent" style={{ animation: 'heroScrollBounce 2s ease-in-out infinite' }} />
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
                href="/process"
                className="inline-flex items-center gap-2 text-orange font-semibold text-sm tracking-wider uppercase no-underline hover:gap-3 transition-all"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t('nav_how_we_work')} →
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
