'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainLinks = [
    { href: '/', label: t('nav_home') },
  ];

  const dropdownLinks = [
    { href: '/services', label: t('nav_what_we_deliver') },
    { href: '/process', label: t('nav_how_we_work') },
    { href: '/pricing', label: t('nav_pricing') },
    { href: '/faq', label: t('nav_faq') },
  ];

  const afterDropdownLinks = [
    { href: '/about', label: t('nav_about') },
    { href: '/contact', label: t('nav_contact') },
  ];

  const isDropdownActive = pathname === '/services' || pathname === '/process' || pathname === '/pricing' || pathname === '/faq';

  const allMobileLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/services', label: t('nav_what_we_deliver') },
    { href: '/process', label: t('nav_how_we_work') },
    { href: '/pricing', label: t('nav_pricing') },
    { href: '/faq', label: t('nav_faq') },
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
        <ul className="hidden md:flex gap-7 list-none items-center">
          {mainLinks.map((link) => (
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

          {/* Dropdown - Framework */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`text-[0.75rem] font-medium tracking-[1.5px] uppercase transition-colors duration-300 relative flex items-center gap-1 bg-transparent border-none cursor-pointer
                ${isDropdownActive ? 'text-orange' : 'text-text-primary hover:text-orange'}
              `}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t('nav_framework')}
              <svg className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
              <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-orange transition-all duration-300 ${isDropdownActive ? 'w-full' : 'w-0'}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.08)] py-2 min-w-[200px] overflow-hidden">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                {dropdownLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDropdownOpen(false)}
                    className={`block px-5 py-2.5 text-[0.75rem] font-medium tracking-[1.5px] uppercase no-underline transition-all duration-200
                      ${pathname === link.href ? 'text-orange bg-orange/5' : 'text-text-primary hover:text-orange hover:bg-orange/5'}
                    `}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </li>

          {afterDropdownLinks.map((link) => (
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
          {allMobileLinks.map((link) => (
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
