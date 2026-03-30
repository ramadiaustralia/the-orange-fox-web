'use client';
import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Supabase backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.1) 0%,transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_label')}</span>
          </div>
          <h1 className="text-white text-[clamp(2rem,5vw,3rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_title')}</h1>
          <p className="text-white/40 text-[0.9rem] max-w-md mx-auto leading-relaxed">{t('contact_desc')}</p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
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
                  <label className="block text-[0.7rem] uppercase tracking-[2px] text-text-muted font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_message')}</label>
                  <textarea
                    required
                    rows={6}
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
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="bg-off-white border border-border-light rounded-2xl p-7 space-y-6">
                <h3 className="text-lg font-semibold text-text-primary" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_info')}</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-lg shrink-0"><svg className='w-5 h-5 text-orange' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.25L2.25 6.75'/></svg></div>
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-[2px] text-text-muted font-semibold block mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Email</span>
                      <a href="mailto:theorangefoxx@outlook.com" className="text-sm text-text-primary no-underline hover:text-orange transition-colors">theorangefoxx@outlook.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-lg shrink-0"><svg className='w-5 h-5 text-orange' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM2.25 12c0 5.385 4.365 9.75 9.75 9.75 1.98 0 3.82-.59 5.36-1.6L21.75 21l-.85-4.39A9.7 9.7 0 0022 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12z'/></svg></div>
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-[2px] text-text-muted font-semibold block mb-1" style={{ fontFamily: 'var(--font-heading)' }}>WhatsApp</span>
                      <span className="text-sm text-text-primary">Available on request</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-lg shrink-0"><svg className='w-5 h-5 text-orange' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.47.353-2.856.978-4.082'/></svg></div>
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-[2px] text-text-muted font-semibold block mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Social</span>
                      <span className="text-sm text-text-primary">@theorangefox</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-lg shrink-0"><svg className='w-5 h-5 text-orange' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'/></svg></div>
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-[2px] text-text-muted font-semibold block mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Response Time</span>
                      <span className="text-sm text-text-primary">Within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
