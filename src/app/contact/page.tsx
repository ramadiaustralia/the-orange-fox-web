'use client';
import { useState, useRef, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

/* ── Package metadata (keys match CMS + i18n) ──────────────────────── */
interface PackageDef {
  key: string;          // e.g. "pkg_premium_web"
  priceKey: string;     // e.g. "pkg_premium_web_price"
  categoryKey: string;  // e.g. "pricing_category_web"
  fallbackPrice: string;
  highlight?: boolean;
}

const PACKAGES: PackageDef[] = [
  { key: 'pkg_premium_web',  priceKey: 'pkg_premium_web_price',  categoryKey: 'pricing_category_web',      fallbackPrice: '$1,250' },
  { key: 'pkg_exclusive_web', priceKey: 'pkg_exclusive_web_price', categoryKey: 'pricing_category_web',     fallbackPrice: '$2,000' },
  { key: 'pkg_premium_app',  priceKey: 'pkg_premium_app_price',  categoryKey: 'pricing_category_app',      fallbackPrice: '$1,750' },
  { key: 'pkg_exclusive_app', priceKey: 'pkg_exclusive_app_price', categoryKey: 'pricing_category_app',     fallbackPrice: '$3,000' },
  { key: 'pkg_ultimate',     priceKey: 'pkg_ultimate_price',     categoryKey: 'pricing_category_complete', fallbackPrice: '$4,000', highlight: true },
];

/* ── Category grouping order ──────────────────────────────────────── */
const CATEGORY_ORDER = ['pricing_category_web', 'pricing_category_app', 'pricing_category_complete'];

/* ── Shared package list renderer ─────────────────────────────────── */
function PackageList({
  grouped,
  value,
  resolvePrice,
  t,
  onSelect,
}: {
  grouped: { catKey: string; label: string; packages: PackageDef[] }[];
  value: string;
  resolvePrice: (pkg: PackageDef) => string;
  t: (key: any) => string;
  onSelect: (name: string) => void;
}) {
  return (
    <>
      {grouped.map((group) => (
        <div key={group.catKey}>
          <div className="px-3 pt-2.5 pb-1.5">
            <span
              className="text-[0.55rem] uppercase tracking-[2px] text-text-muted/60 font-semibold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {group.label}
            </span>
          </div>
          {group.packages.map((pkg) => {
            const isSelected = t(pkg.key as any) === value;
            const price = resolvePrice(pkg);
            const name = t(pkg.key as any);
            const desc = t(`${pkg.key}_desc` as any);
            return (
              <button
                key={pkg.key}
                type="button"
                onClick={() => onSelect(name)}
                className={`
                  w-full text-left rounded-xl px-3.5 py-3 transition-all duration-200 group
                  ${isSelected
                    ? 'bg-orange/[0.07] border border-orange/20'
                    : 'bg-transparent border border-transparent hover:bg-off-white hover:border-border-light'}
                `}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-[0.82rem] font-semibold truncate ${
                          isSelected ? 'text-orange' : 'text-text-primary group-hover:text-orange'
                        } transition-colors duration-200`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {name}
                      </span>
                      {pkg.highlight && (
                        <span
                          className="shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[0.5rem] font-bold uppercase tracking-wider bg-orange text-white"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          Best
                        </span>
                      )}
                    </div>
                    <p className="text-[0.7rem] text-text-muted leading-snug truncate">
                      {desc !== `${pkg.key}_desc` ? desc : ''}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span
                      className={`text-sm font-bold ${isSelected ? 'text-orange' : 'text-text-primary'}`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {price}
                    </span>
                    <span className="block text-[0.55rem] text-text-muted uppercase tracking-wider">USD</span>
                  </div>
                  {isSelected && (
                    <svg className="w-4.5 h-4.5 text-orange shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ))}
      {value && (
        <button
          type="button"
          onClick={() => onSelect('')}
          className="w-full text-center text-[0.75rem] text-text-muted hover:text-orange py-2 mt-1 border-t border-border-light transition-colors duration-200"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          ✕ Clear selection
        </button>
      )}
    </>
  );
}

/* ── Custom Package Selector Component ────────────────────────────── */
function PackageSelector({
  value,
  onChange,
  t,
}: {
  value: string;
  onChange: (val: string) => void;
  t: (key: any) => string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Lock body scroll when bottom-sheet is open on mobile
  useEffect(() => {
    if (open) {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
      }
    }
  }, [open]);

  // Close on outside click (desktop dropdown only)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const selectedPkg = PACKAGES.find((p) => t(p.key as any) === value);

  const grouped = CATEGORY_ORDER.map((catKey) => ({
    catKey,
    label: t(catKey as any),
    packages: PACKAGES.filter((p) => p.categoryKey === catKey),
  })).filter((g) => g.packages.length > 0);

  function resolvePrice(pkg: PackageDef): string {
    const raw = t(pkg.priceKey as any);
    return raw !== pkg.priceKey ? raw : pkg.fallbackPrice;
  }

  function handleSelect(name: string) {
    onChange(name);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      {/* ── Trigger Button ─────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
          w-full flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-xl border text-sm text-left
          outline-none transition-all duration-300
          ${open
            ? 'border-orange shadow-[0_0_0_3px_rgba(212,105,42,0.1)] bg-white'
            : 'border-border bg-off-white hover:border-orange/40'}
          ${!value ? 'text-text-muted' : 'text-text-primary'}
        `}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {selectedPkg ? (
          <span className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2.5 min-w-0">
            <span
              className={`shrink-0 inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[0.55rem] font-bold uppercase tracking-[1.5px] ${
                selectedPkg.highlight
                  ? 'bg-orange text-white'
                  : 'bg-orange/10 text-orange'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t(selectedPkg.categoryKey as any)}
            </span>
            <span className="truncate font-medium text-[0.8rem] sm:text-sm">{t(selectedPkg.key as any)}</span>
            <span className="shrink-0 text-orange font-semibold text-[0.8rem] sm:text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
              {resolvePrice(selectedPkg)}
            </span>
          </span>
        ) : (
          <span>{t('contact_package_placeholder')}</span>
        )}
        <svg
          className={`w-4 h-4 shrink-0 text-text-muted transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ── Desktop Dropdown (hidden on mobile) ────────────────── */}
      <div
        className={`
          hidden sm:block
          absolute z-50 left-0 right-0 mt-2 origin-top
          bg-white rounded-2xl border border-border-light
          shadow-[0_20px_60px_rgba(0,0,0,0.08),0_0_0_1px_rgba(212,105,42,0.04)]
          overflow-hidden
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${open
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-[0.97] -translate-y-2 pointer-events-none'}
        `}
      >
        <div className="max-h-[340px] overflow-y-auto p-2 space-y-1 custom-scroll">
          <PackageList grouped={grouped} value={value} resolvePrice={resolvePrice} t={t} onSelect={handleSelect} />
        </div>
      </div>

      {/* ── Mobile Bottom Sheet (hidden on desktop) ────────────── */}
      {open && (
        <div className="sm:hidden fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setOpen(false)}
          />
          {/* Sheet */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.12)] animate-[slideUp_0.3s_ease-out]"
            style={{ maxHeight: '70vh' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 border-b border-border-light">
              <span className="text-[0.7rem] uppercase tracking-[2px] text-text-muted font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('contact_package')}
              </span>
              <button type="button" onClick={() => setOpen(false)} className="w-7 h-7 rounded-full bg-off-white flex items-center justify-center text-text-muted hover:text-orange transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Scrollable list */}
            <div className="overflow-y-auto p-2 space-y-1" style={{ maxHeight: 'calc(70vh - 80px)' }}>
              <PackageList grouped={grouped} value={value} resolvePrice={resolvePrice} t={t} onSelect={handleSelect} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════
   Contact Page
   ══════════════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  const { t, getSetting } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', package: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPackage: ${formData.package || 'Not specified'}\n\n${formData.message}`);
    const contactEmail = getSetting('social_email', 'theorgfox@gmail.com');
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
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

              {/* ── Custom Package Selector (CMS-driven) ─────────── */}
              <div>
                <label className="block text-[0.7rem] uppercase tracking-[2px] text-text-muted font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{t('contact_package')}</label>
                <PackageSelector
                  value={formData.package}
                  onChange={(val) => setFormData({ ...formData, package: val })}
                  t={t}
                />
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
                <a href={`mailto:${getSetting('social_email', 'theorgfox@gmail.com')}`} className="inline-flex items-center gap-2.5 text-sm text-text-primary no-underline hover:text-orange transition-colors group">
                  <span className="w-9 h-9 rounded-lg bg-orange/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-orange/20">
                    <svg className='w-4.5 h-4.5 text-orange' fill='none' stroke='currentColor' strokeWidth='1.5' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.25L2.25 6.75'/></svg>
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)' }}>{getSetting('social_email', 'theorgfox@gmail.com')}</span>
                </a>

                {/* Divider */}
                <span className="hidden sm:block w-px h-6 bg-border" />

                {/* Instagram */}
                {(() => {
                  const igUrl = getSetting('social_instagram', 'https://instagram.com/theorgfox');
                  const igHandle = igUrl.includes('instagram.com/') ? '@' + igUrl.split('instagram.com/').pop()?.replace(/\/$/, '') : igUrl;
                  return (
                    <a href={igUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-sm text-text-primary no-underline hover:text-orange transition-colors group">
                      <span className="w-9 h-9 rounded-lg bg-orange/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-orange/20">
                        <svg className='w-5 h-5 text-orange' viewBox='0 0 24 24' fill='currentColor'><path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z'/></svg>
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)' }}>{igHandle}</span>
                    </a>
                  );
                })()}
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
