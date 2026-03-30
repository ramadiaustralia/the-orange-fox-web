'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: t('nav_home') },
    { href: '/services', label: t('nav_services') },
    { href: '/portfolio', label: t('nav_portfolio') },
    { href: '/process', label: t('nav_process') },
    { href: '/about', label: t('nav_about') },
    { href: '/contact', label: t('nav_contact') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] bg-white border-b border-gray-100 transition-shadow duration-300 ${scrolled ? 'shadow-[0_1px_12px_rgba(0,0,0,0.06)]' : ''}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-[60px] flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <Image src="/images/logo-fox.png" alt="The Orange Fox" width={32} height={32} className="h-8 w-auto" />
          <span className="font-heading font-bold text-[0.7rem] tracking-[2px] text-orange" style={{ fontFamily: 'var(--font-heading)' }}>
            THE ORANGE FOX
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-7 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[0.75rem] font-medium tracking-[1.5px] uppercase no-underline transition-colors duration-300 relative
                  ${pathname === link.href ? 'text-orange' : 'text-text-primary hover:text-orange'}
                `}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-orange transition-all duration-300 ${pathname === link.href ? 'w-full' : 'w-0'}`} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Language Switcher */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLocale('en')}
            className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-all duration-300 cursor-pointer
              ${locale === 'en' ? 'bg-orange/20 border-orange shadow-[0_0_6px_rgba(212,105,42,0.3)]' : 'bg-gray-50 border-gray-200 hover:bg-orange/10 hover:border-orange/50'}
            `}
          >
            🇬🇧
          </button>
          <button
            onClick={() => setLocale('id')}
            className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-all duration-300 cursor-pointer
              ${locale === 'id' ? 'bg-orange/20 border-orange shadow-[0_0_6px_rgba(212,105,42,0.3)]' : 'bg-gray-50 border-gray-200 hover:bg-orange/10 hover:border-orange/50'}
            `}
          >
            🇮🇩
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 p-2 cursor-pointer bg-transparent border-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`w-5 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`w-5 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-text-primary transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-medium tracking-wider uppercase no-underline
                ${pathname === link.href ? 'text-orange' : 'text-text-primary'}
              `}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
