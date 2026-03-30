"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/i18n";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;
  const nav = translations[language].nav;

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/images/logo-fox.png" alt="The Orange Fox" width={32} height={32} />
              <span className="text-white font-semibold tracking-tight">The Orange Fox</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">{t.tagline}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-4">{t.navigation}</h4>
            <div className="space-y-2.5">
              {[
                { label: nav.home, href: "/" },
                { label: nav.services, href: "/services" },
                { label: nav.process, href: "/process" },
                { label: nav.about, href: "/about" },
                { label: nav.contact, href: "/contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="block text-sm text-white/40 hover:text-[#ea7810] transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-4">{t.connect}</h4>
            <div className="space-y-2.5 text-sm text-white/40">
              <p>theorangefoxx@outlook.com</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/[0.04] text-center text-xs text-white/20">
          &copy; {new Date().getFullYear()} The Orange Fox. {t.rights}
        </div>
      </div>
    </footer>
  );
}
