"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/i18n";

const navLinks = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "process", href: "/process" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image src="/images/logo-fox.png" alt="The Orange Fox" width={36} height={36} className="transition-transform group-hover:scale-110" />
          <span className="text-white font-semibold tracking-tight text-sm hidden sm:block">The Orange Fox</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.key} href={link.href}
              className="px-4 py-2 text-[13px] tracking-wide text-white/60 hover:text-white transition-colors relative group">
              {t[link.key as keyof typeof t]}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#ea7810] transition-all group-hover:w-3/4" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-white/[0.04] rounded-full p-0.5 border border-white/[0.06]">
            <button onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 text-xs rounded-full transition-all ${language === "en" ? "bg-[#ea7810] text-white shadow-lg shadow-orange-500/20" : "text-white/40 hover:text-white/70"}`}>
              EN
            </button>
            <button onClick={() => setLanguage("id")}
              className={`px-2.5 py-1 text-xs rounded-full transition-all ${language === "id" ? "bg-[#ea7810] text-white shadow-lg shadow-orange-500/20" : "text-white/40 hover:text-white/70"}`}>
              ID
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white/60 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/[0.06] px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.key} href={link.href} onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-white/60 hover:text-white transition-colors">
              {t[link.key as keyof typeof t]}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
