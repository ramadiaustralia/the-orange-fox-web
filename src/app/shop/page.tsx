'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

/* ── Module definitions (6 modules) ─────────────────────────── */
interface ModuleDef {
  index: number;
  icon: React.ReactNode;
  featureCount: number;
  hasUnit?: boolean;
  color: string;
}

const MODULES: ModuleDef[] = [
  {
    index: 1,
    featureCount: 3,
    hasUnit: true,
    color: 'from-orange/10 to-amber-500/10',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    index: 2,
    featureCount: 4,
    color: 'from-blue-500/10 to-indigo-500/10',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    index: 3,
    featureCount: 4,
    color: 'from-emerald-500/10 to-green-500/10',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    index: 4,
    featureCount: 3,
    color: 'from-violet-500/10 to-purple-500/10',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    index: 5,
    featureCount: 3,
    color: 'from-rose-500/10 to-pink-500/10',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    index: 6,
    featureCount: 3,
    color: 'from-cyan-500/10 to-teal-500/10',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
];

/* ── Checkout Modal ─────────────────────────────────────────── */
function CheckoutModal({ moduleIndex, onClose }: { moduleIndex: number; onClose: () => void }) {
  const { t } = useLanguage();
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const productName = t(`shop_module_${moduleIndex}_name` as any);
  const priceStr = t(`shop_module_${moduleIndex}_price` as any);
  const priceNum = priceStr ? parseFloat(priceStr.replace(/[^0-9.]/g, '')) : 0;
  const unit = t(`shop_module_${moduleIndex}_unit` as any);
  const hasUnit = unit && !unit.startsWith('shop_module_');

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormValid(buyerName.trim().length >= 2 && emailRegex.test(buyerEmail));
  }, [buyerName, buyerEmail]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (orderComplete) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Payment Successful! 🎉</h2>
          <p className="text-sm text-orange font-mono mb-3">{orderNumber}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Thank you, <strong>{buyerName}</strong>! A detailed invoice has been sent to <strong>{buyerEmail}</strong>. We&apos;ll be in touch within 24 hours.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-dark text-white rounded-xl font-semibold text-sm hover:bg-orange transition-colors border-none cursor-pointer"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal p-6 rounded-t-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white text-xl bg-transparent border-none cursor-pointer">✕</button>
          <span className="text-[0.6rem] uppercase tracking-[2px] text-white/50 font-semibold block" style={{ fontFamily: 'var(--font-heading)' }}>Module {moduleIndex}</span>
          <h3 className="text-white text-xl font-bold mt-1" style={{ fontFamily: 'var(--font-heading)' }}>{productName}</h3>
          <div className="mt-2">
            <span className="text-2xl font-bold text-orange" style={{ fontFamily: 'var(--font-heading)' }}>{priceStr}</span>
            {hasUnit && <span className="text-white/40 text-sm ml-2">{unit}</span>}
            <span className="text-white/30 text-xs ml-1">USD</span>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Your Information</h4>
          <div className="space-y-3 mb-5">
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1.5 block">Full Name *</label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1.5 block">Email Address *</label>
              <input
                type="email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all"
              />
            </div>
          </div>

          <div className="h-px bg-border-light mb-5" />

          {/* PayPal */}
          {!formValid ? (
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <p className="text-gray-400 text-sm">Please fill in your name and email to continue with payment.</p>
            </div>
          ) : (
            <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, currency: 'USD' }}>
              <div className="text-center mb-3">
                <p className="text-xs text-gray-400">Secure payment via PayPal</p>
              </div>
              {processing && (
                <div className="bg-orange/5 rounded-xl p-4 text-center mb-3">
                  <p className="text-orange text-sm animate-pulse">Processing payment...</p>
                </div>
              )}
              {error && (
                <div className="bg-red-50 rounded-xl p-4 text-center mb-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}
              <PayPalButtons
                style={{ layout: 'vertical', shape: 'rect', label: 'pay' }}
                createOrder={async () => {
                  setError('');
                  const res = await fetch('/api/paypal/create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      productName,
                      price: priceNum,
                      currency: 'USD',
                      buyerName,
                      buyerEmail,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.error);
                  return data.id;
                }}
                onApprove={async (data) => {
                  setProcessing(true);
                  setError('');
                  try {
                    const res = await fetch('/api/paypal/capture-order', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        orderID: data.orderID,
                        buyerName,
                        buyerEmail,
                        productName,
                        price: priceNum,
                        currency: 'USD',
                      }),
                    });
                    const result = await res.json();
                    if (result.success) {
                      setOrderNumber(result.orderNumber);
                      setOrderComplete(true);
                    } else {
                      setError(result.error || 'Payment processing failed');
                    }
                  } catch {
                    setError('Something went wrong. Please contact us.');
                  } finally {
                    setProcessing(false);
                  }
                }}
                onError={() => {
                  setError('PayPal encountered an error. Please try again.');
                }}
              />
            </PayPalScriptProvider>
          )}

          <div className="mt-4 text-center">
            <p className="text-[0.65rem] text-gray-300 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Encrypted &amp; Secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Shop Page ─────────────────────────────────────────── */
export default function ShopPage() {
  const { t } = useLanguage();
  const [checkoutModule, setCheckoutModule] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-24 md:py-32 text-center overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.12) 0%,transparent 70%)', animation: 'orbFloat 40s ease-in-out infinite' }} />
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.3) 0%,transparent 70%)', animation: 'orbFloat 25s ease-in-out infinite reverse' }} />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.4) 0%,transparent 70%)', animation: 'orbFloat 32s ease-in-out infinite' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6 backdrop-blur-sm" style={{ animation: 'heroFadeIn 1.8s ease-out' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 3.5s ease-in-out infinite' }} />
            <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>{t('shop_label' as any)}</span>
          </div>
          <h1 className="text-white text-[clamp(2rem,5vw,3rem)] font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)', animation: 'heroSlideUp 1.4s ease-out 0.4s both' }}>{t('shop_title' as any)}</h1>
          <p className="text-white/40 text-[0.9rem] max-w-md mx-auto leading-relaxed" style={{ animation: 'heroSlideUp 1.4s ease-out 0.8s both' }}>{t('shop_desc' as any)}</p>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((mod, i) => {
              const name = t(`shop_module_${mod.index}_name` as any);
              const desc = t(`shop_module_${mod.index}_desc` as any);
              const price = t(`shop_module_${mod.index}_price` as any);
              const unit = mod.hasUnit ? t(`shop_module_${mod.index}_unit` as any) : '';
              const paypalLink = t(`shop_module_${mod.index}_paypal` as any);
              const hasPaypal = paypalLink && !paypalLink.startsWith('shop_module_');

              // Collect features
              const features: string[] = [];
              for (let f = 1; f <= mod.featureCount; f++) {
                const feat = t(`shop_module_${mod.index}_f${f}` as any);
                if (feat && !feat.startsWith('shop_module_')) features.push(feat);
              }

              return (
                <ScrollReveal key={mod.index} delay={i * 0.15}>
                  <div className="group relative bg-white border border-border-light rounded-2xl p-7 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_25px_80px_rgba(212,105,42,0.08)] hover:border-orange/30 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-orange mb-5 transition-transform duration-300 group-hover:scale-110`}>
                      {mod.icon}
                    </div>

                    {/* Module number */}
                    <span className="text-[0.6rem] uppercase tracking-[2px] text-text-muted/50 font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                      Module {mod.index}
                    </span>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-text-primary mb-2 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                      {name}
                    </h3>

                    {/* Description */}
                    <p className="text-[0.82rem] text-text-secondary leading-relaxed mb-5">
                      {desc}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6 flex-grow">
                      {features.map((feat, j) => (
                        <li key={j} className="text-[0.78rem] text-text-secondary flex items-start gap-2.5">
                          <svg className="w-4 h-4 text-orange shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div className="h-px bg-border-light mb-5" />

                    {/* Price + CTA */}
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <span className="text-2xl font-bold text-orange" style={{ fontFamily: 'var(--font-heading)' }}>
                          {price}
                        </span>
                        {unit && (
                          <span className="text-text-muted text-sm ml-1">{unit}</span>
                        )}
                        <span className="block text-[0.6rem] text-text-muted uppercase tracking-wider mt-0.5">USD</span>
                      </div>
                      <button
                        onClick={() => hasPaypal ? setCheckoutModule(mod.index) : (window.location.href = '/contact')}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-dark text-white rounded-xl font-semibold text-[0.75rem] tracking-wider uppercase transition-all duration-300 hover:bg-orange hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(212,105,42,0.3)] cursor-pointer border-none"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {t('shop_buy_now' as any)} →
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA — Full Project Scope */}
      <section className="relative bg-gradient-to-br from-dark via-dark-soft to-charcoal py-20 px-6 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.15) 0%,transparent 70%)' }} />
        <div className="max-w-[600px] mx-auto relative z-10 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange" style={{ animation: 'pulse 3.5s ease-in-out infinite' }} />
              <span className="text-[0.65rem] uppercase tracking-[3px] text-white/60" style={{ fontFamily: 'var(--font-heading)' }}>Full Project Scope</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h2 className="text-white text-[clamp(1.6rem,3vw,2.2rem)] font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('shop_cta_title' as any)}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p className="text-white/40 text-[0.9rem] max-w-lg mx-auto mb-8 leading-relaxed">
              {t('shop_cta_desc' as any)}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-orange text-white rounded-xl font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(212,105,42,0.4)] overflow-hidden"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">{t('shop_cta_pricing' as any)} →</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 text-white/70 rounded-xl font-medium text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:border-orange/50 hover:text-orange backdrop-blur-sm"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {t('shop_cta_contact' as any)}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Checkout Modal */}
      {checkoutModule !== null && (
        <CheckoutModal moduleIndex={checkoutModule} onClose={() => setCheckoutModule(null)} />
      )}
    </>
  );
}
