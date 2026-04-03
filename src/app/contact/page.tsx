'use client';
import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', package: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPackage: ${formData.package || 'Not specified'}\n\n${formData.message}`);
    window.location.href = `mailto:theorgfox@outlook.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.1) 0%,transparent 70%)', animation: 'orbFloat 40s ease-in-out infinite' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6 backdrop-blur-sm" style={{ animation: 'heroFadeIn 1.8s ease-out' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 3.5s ease-in-out infinite' }} />
            <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_label')}</span>
          </div>
          <h1 className="text-white text-[clamp(2rem,5vw,3rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)', animation: 'heroSlideUp 1.4s ease-out 0.4s both' }}>{t('contact_title')}</h1>
          <p className="text-white/40 text-[0.9rem] max-w-md mx-auto leading-relaxed" style={{ animation: 'heroSlideUp 1.4s ease-out 0.8s both' }}>{t('contact_desc')}</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-[2px] text-text-muted font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_name')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-off-white text-text-primary text-sm outline-none transition-all duration-300 focus:border-orange focus:shadow-[0_0_0_3px_rgba(212,105,42,0.1)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
                <div>
                  <label className="block text-[0.7rem] uppercase tracking-[2px] text-text-muted font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_email')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-off-white text-text-primary text-sm outline-none transition-all duration-300 focus:border-orange focus:shadow-[0_0_0_3px_rgba(212,105,42,0.1)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[0.7rem] uppercase tracking-[2px] text-text-muted font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_subject')}</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-off-white text-text-primary text-sm outline-none transition-all duration-300 focus:border-orange focus:shadow-[0_0_0_3px_rgba(212,105,42,0.1)]"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
              <div>
                <label className="block text-[0.7rem] uppercase tracking-[2px] text-text-muted font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_package')}</label>
                <select
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-off-white text-text-primary text-sm outline-none transition-all duration-300 focus:border-orange focus:shadow-[0_0_0_3px_rgba(212,105,42,0.1)] appearance-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <option value="">{t('contact_package_placeholder')}</option>
                  <option value="Premium Web Package">Premium Web Package — $1,250</option>
                  <option value="Exclusive Web Package">Exclusive Web Package — $2,000</option>
                  <option value="Premium App Package">Premium App Package — $1,750</option>
                  <option value="Exclusive App Package">Exclusive App Package — $3,000</option>
                  <option value="Ultimate Complete Package">Ultimate Complete Package — $4,000</option>
                </select>
              </div>
              <div>
                <label className="block text-[0.7rem] uppercase tracking-[2px] text-text-muted font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_message')}</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-off-white text-text-primary text-sm outline-none transition-all duration-300 focus:border-orange focus:shadow-[0_0_0_3px_rgba(212,105,42,0.1)] resize-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange text-white rounded-xl font-semibold text-sm tracking-wider uppercase border-none cursor-pointer transition-all duration-300 hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {submitted ? '✓ Sent!' : t('contact_send')} →
              </button>
            </form>
          </ScrollReveal>

          {/* Contact Info — Inline Row */}
          <ScrollReveal delay={0.35}>
            <div className="mt-10 pt-8 border-t border-border-light">
              <p className="text-[0.7rem] uppercase tracking-[2px] text-text-muted font-semibold mb-4 text-center" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_or_reach')}</p>
              <div className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap">
                {/* Email */}
                <a href="mailto:theorgfox@outlook.com" className="inline-flex items-center gap-2.5 text-sm text-text-primary no-underline hover:text-orange transition-colors group">
                  <span className="w-9 h-9 rounded-lg bg-orange/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-orange/20">
                    <svg className='w-4.5 h-4.5 text-orange' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.25L2.25 6.75'/></svg>
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)' }}>theorgfox@outlook.com</span>
                </a>

                {/* Divider */}
                <span className="hidden sm:block w-px h-6 bg-border" />

                {/* Instagram */}
                <a href="https://instagram.com/theorgfox" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sm text-text-primary no-underline hover:text-orange transition-colors group">
                  <span className="w-9 h-9 rounded-lg bg-orange/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-orange/20">
                    <svg className='w-5 h-5 text-orange' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'/></svg>
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)' }}>@theorgfox</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 px-6 bg-off-white">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-text-primary mb-10" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_next')}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { num: '1', text: t('contact_step1') },
              { num: '2', text: t('contact_step2') },
              { num: '3', text: t('contact_step3') },
            ].map((step) => (
              <ScrollReveal key={step.num} delay={Number(step.num) * 0.25}>
                <div className="flex flex-col items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-orange/10 text-orange text-sm font-bold flex items-center justify-center" style={{ fontFamily: 'var(--font-heading)' }}>{step.num}</span>
                  <p className="text-sm text-text-muted leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
