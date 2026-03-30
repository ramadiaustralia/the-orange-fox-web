'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/process', label: 'Process' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-dark py-12 px-6 text-center">
      <Image src="/images/logo-fox.png" alt="The Orange Fox" width={28} height={28} className="h-7 w-auto opacity-40 mx-auto mb-4" />
      <p className="text-[0.85rem] italic text-white/50 mb-4" style={{ fontFamily: 'var(--font-body)' }}>
        {t('footer_tagline')}
      </p>
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        {footerLinks.map((link) => (
          <Link key={link.href} href={link.href} className="text-white/30 hover:text-orange text-xs uppercase tracking-wider no-underline transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
            {link.label}
          </Link>
        ))}
      </div>
      <p className="text-[0.75rem] text-white/30" style={{ fontFamily: 'var(--font-body)' }}>
        {t('footer_rights')}
      </p>
    </footer>
  );
}
