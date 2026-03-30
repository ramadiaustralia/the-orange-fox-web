"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/i18n";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { IconGlobe, IconDashboard, IconServer, IconTrending, IconBook, IconShield } from "@/components/Icons";

const serviceIcons = [IconGlobe, IconDashboard, IconServer, IconTrending, IconBook, IconShield];

export default function Services() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#ea7810]/[0.02] rounded-full blur-[100px]" />
      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#ea7810]/60 uppercase mb-3">{t.services.label}</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{t.services.title}</h1>
          <p className="text-white/30 text-lg max-w-xl mb-16 font-light">{t.services.description}</p>
        </ScrollReveal>

        <div className="space-y-3">
          {t.services.items.map((item, i) => {
            const Icon = serviceIcons[i];
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="group flex items-start gap-6 p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04] hover:border-[#ea7810]/15 hover:bg-white/[0.03] transition-all duration-500">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-[#ea7810]/10 flex items-center justify-center group-hover:bg-[#ea7810]/20 transition-colors">
                    <Icon className="w-6 h-6 text-[#ea7810]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/30 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 p-10 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] text-center">
            <h2 className="text-2xl font-bold mb-3 tracking-tight">{t.cta.title}</h2>
            <p className="text-white/30 mb-6 font-light">{t.cta.description}</p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#ea7810] to-[#d96a08] text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5">
              {t.cta.button} →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
