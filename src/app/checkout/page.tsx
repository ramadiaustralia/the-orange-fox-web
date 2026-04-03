'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useLanguage } from '@/lib/LanguageContext';
import Link from 'next/link';

/* ── Product data map ─────────────────────────────────────── */
interface Product {
  moduleIndex: number;
  nameKey: string;
  priceKey: string;
  unitKey?: string;
}

const PRODUCTS: Product[] = [
  { moduleIndex: 1, nameKey: 'shop_module_1_name', priceKey: 'shop_module_1_price', unitKey: 'shop_module_1_unit' },
  { moduleIndex: 2, nameKey: 'shop_module_2_name', priceKey: 'shop_module_2_price' },
  { moduleIndex: 3, nameKey: 'shop_module_3_name', priceKey: 'shop_module_3_price' },
  { moduleIndex: 4, nameKey: 'shop_module_4_name', priceKey: 'shop_module_4_price' },
  { moduleIndex: 5, nameKey: 'shop_module_5_name', priceKey: 'shop_module_5_price' },
  { moduleIndex: 6, nameKey: 'shop_module_6_name', priceKey: 'shop_module_6_price' },
];

function CheckoutContent() {
  const searchParams = useSearchParams();
  const moduleParam = searchParams.get('module');
  const { t } = useLanguage();

  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const moduleIndex = moduleParam ? parseInt(moduleParam, 10) : 0;
  const product = PRODUCTS.find((p) => p.moduleIndex === moduleIndex);

  const productName = product ? t(product.nameKey as any) : '';
  const priceStr = product ? t(product.priceKey as any) : '';
  const priceNum = priceStr ? parseFloat(priceStr.replace(/[^0-9.]/g, '')) : 0;
  const unit = product?.unitKey ? t(product.unitKey as any) : '';

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormValid(buyerName.trim().length >= 2 && emailRegex.test(buyerEmail));
  }, [buyerName, buyerEmail]);

  if (!product || !priceNum) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-dark via-dark-soft to-charcoal flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-white/60 text-lg mb-6">Product not found</p>
          <Link href="/shop" className="text-orange hover:underline">← Back to Shop</Link>
        </div>
      </section>
    );
  }

  if (orderComplete) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-dark via-dark-soft to-charcoal flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-white text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            Payment Successful! 🎉
          </h1>
          <p className="text-white/50 mb-2">Order <span className="text-orange font-semibold">{orderNumber}</span></p>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Thank you, {buyerName}! A detailed invoice has been sent to <span className="text-white/60">{buyerEmail}</span>. 
            We&apos;ll be in touch shortly to get started on your project.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange text-white rounded-xl font-semibold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-orange-dark"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            ← Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-dark via-dark-soft to-charcoal px-6 py-20">
      {/* Background orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,105,42,0.08) 0%,transparent 70%)' }} />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Back link */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-white/40 hover:text-orange text-sm mb-8 transition-colors no-underline">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Shop
        </Link>

        {/* Product Card */}
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6">
          <span className="text-[0.6rem] uppercase tracking-[2px] text-white/40 font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
            Module {moduleIndex}
          </span>
          <h2 className="text-white text-xl font-bold mt-1 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            {productName}
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-orange" style={{ fontFamily: 'var(--font-heading)' }}>
              {priceStr}
            </span>
            {unit && <span className="text-white/40 text-sm">{unit}</span>}
            <span className="text-white/30 text-xs uppercase">USD</span>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white rounded-2xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.15)]">
          <h3 className="text-lg font-bold text-text-primary mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
            Your Information
          </h3>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-border-light rounded-xl text-sm text-text-primary focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/20 transition-all"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border-light mb-6" />

          {/* PayPal Buttons */}
          {!formValid ? (
            <div className="text-center py-6">
              <p className="text-text-muted text-sm">Please fill in your name and email to continue with payment.</p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-text-muted mb-4 text-center">Secure payment via PayPal</p>
              {processing && (
                <div className="text-center py-4 mb-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange/10 rounded-xl">
                    <div className="w-4 h-4 border-2 border-orange border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-orange font-medium">Processing payment...</span>
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 text-center">{error}</div>
              )}
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                  currency: 'USD',
                }}
              >
                <PayPalButtons
                  style={{ layout: 'vertical', shape: 'rect', label: 'pay', height: 50 }}
                  disabled={processing}
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
            </div>
          )}

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 mt-6 text-text-muted/50">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[0.65rem] uppercase tracking-widest">Encrypted & Secure</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <section className="min-h-screen bg-gradient-to-br from-dark via-dark-soft to-charcoal flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin" />
      </section>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
