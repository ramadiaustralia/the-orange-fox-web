'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t, menuItems, locale } = useLanguage();

  const footerFrameworkCMS = menuItems.filter(m => m.location === 'footer_framework' && m.locale === locale);
  const footerMainCMS = menuItems.filter(m => m.location === 'footer_main' && m.locale === locale);

  const frameworkLinks = footerFrameworkCMS.length > 0
    ? footerFrameworkCMS.map(m => ({ href: m.href, label: m.label }))
    : [
        { href: '/services', label: t('nav_what_we_deliver') },
        { href: '/process', label: t('nav_how_we_work') },
        { href: '/pricing', label: t('nav_pricing') },
        { href: '/faq', label: t('nav_faq') },
      ];

  const mainLinks = footerMainCMS.length > 0
    ? footerMainCMS.map(m => ({ href: m.href, label: m.label }))
    : [
        { href: '/', label: t('nav_home') },
        { href: '/shop', label: t('nav_shop' as any) },
        { href: '/about', label: t('nav_about') },
        { href: '/contact', label: t('nav_contact') },
      ];

  return (
    <footer className="bg-dark py-16 px-6">
      <div className="max-w-[1000px] mx-auto">
        {/* Top: Logo + Tagline */}
        <div className="text-center mb-10">
          <Image src="/images/logo-fox.png" alt="The Orange Fox" width={28} height={28} className="h-7 w-auto opacity-40 mx-auto mb-4" />
          <p className="text-[0.85rem] italic text-white/50" style={{ fontFamily: 'var(--font-body)' }}>
            {t('footer_tagline')}
          </p>
        </div>

        {/* Links in two groups */}
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mb-10">
          {/* Framework */}
          <div className="text-center">
            <p className="text-orange/60 text-[0.65rem] uppercase tracking-[2px] font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{t('nav_framework')}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {frameworkLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-white/30 hover:text-orange text-xs uppercase tracking-wider no-underline transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Main */}
          <div className="text-center">
            <p className="text-orange/60 text-[0.65rem] uppercase tracking-[2px] font-semibold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{t('footer_nav')}</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {mainLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-white/30 hover:text-orange text-xs uppercase tracking-wider no-underline transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-white/5 pt-6">
          <p className="text-[0.75rem] text-white/30" style={{ fontFamily: 'var(--font-body)' }}>
            {t('footer_rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
