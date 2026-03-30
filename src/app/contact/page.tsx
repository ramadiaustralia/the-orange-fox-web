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
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-lg shrink-0">📧</div>
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-[2px] text-text-muted font-semibold block mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Email</span>
                      <a href="mailto:theorangefoxx@outlook.com" className="text-sm text-text-primary no-underline hover:text-orange transition-colors">theorangefoxx@outlook.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-lg shrink-0">💬</div>
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-[2px] text-text-muted font-semibold block mb-1" style={{ fontFamily: 'var(--font-heading)' }}>WhatsApp</span>
                      <span className="text-sm text-text-primary">Available on request</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-lg shrink-0">🌐</div>
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-[2px] text-text-muted font-semibold block mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Social</span>
                      <span className="text-sm text-text-primary">@theorangefox</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center text-lg shrink-0">⏰</div>
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
