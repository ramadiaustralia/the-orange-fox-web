'use client';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

const projects = [
  {
    title: 'Mahkota Taiwan',
    category: 'Web Development',
    desc: 'Premium web presence for a leading Taiwanese business. Full website with custom CMS, payment integration, and multi-language support.',
    tech: ['Next.js', 'Supabase', 'Vercel', 'Tailwind CSS'],
    color: 'from-orange/20 to-orange-dark/20',
    url: 'https://mahkotataiwanwebproject.vercel.app',
  },
  {
    title: 'The Orange Fox Portal',
    category: 'Payment Portal',
    desc: 'Secure payment gateway with milestone-based tracking, real-time progress monitoring, and beautiful UI.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    color: 'from-orange/15 to-charcoal/20',
    url: 'https://the-orange-fox-portal.vercel.app',
  },
  {
    title: 'E-Commerce Dashboard',
    category: 'Admin Dashboard',
    desc: 'Comprehensive admin panel with real-time analytics, inventory management, and order processing.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    color: 'from-green-500/15 to-emerald-600/15',
    url: '#',
  },
];

export default function PortfolioPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.1) 0%,transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>{t('portfolio_label')}</span>
          </div>
          <h1 className="text-white text-[clamp(2rem,5vw,3rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('portfolio_title')}</h1>
          <p className="text-white/40 text-[0.9rem] max-w-md mx-auto leading-relaxed">{t('portfolio_desc')}</p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto space-y-8">
          {projects.map((project, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="bg-white border border-border-light rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(212,105,42,0.08)] hover:border-orange/30">
                {/* Project Image Placeholder */}
                <div className={`h-48 md:h-56 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                  <span className="text-4xl font-bold text-orange/40" style={{ fontFamily: 'var(--font-heading)' }}>{project.title}</span>
                </div>
                {/* Project Info */}
                <div className="p-7">
                  <span className="text-[0.6rem] uppercase tracking-[2px] text-orange font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>{project.category}</span>
                  <h3 className="text-xl font-semibold text-text-primary mt-1 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{project.title}</h3>
                  <p className="text-[0.85rem] text-text-secondary leading-relaxed mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((tech, j) => (
                      <span key={j} className="px-3 py-1 rounded-full bg-light-bg text-[0.7rem] text-text-secondary font-medium" style={{ fontFamily: 'var(--font-heading)' }}>{tech}</span>
                    ))}
                  </div>
                  {project.url !== '#' && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-orange font-semibold text-sm no-underline hover:gap-3 transition-all" style={{ fontFamily: 'var(--font-heading)' }}>
                      {t('portfolio_view')} →
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-dark via-dark-soft to-charcoal py-24 px-6 text-center">
        <ScrollReveal>
          <h2 className="text-white text-[clamp(1.6rem,3vw,2.2rem)] font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('portfolio_cta')}</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.12}>
          <p className="text-white/40 text-[0.9rem] max-w-lg mx-auto mb-8 leading-relaxed">{t('portfolio_cta_desc')}</p>
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
