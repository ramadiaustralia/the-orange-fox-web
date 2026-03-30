"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/i18n";
import ScrollReveal from "@/components/ScrollReveal";
import { IconGlobe, IconDashboard, IconServer, IconTrending, IconBook, IconShield } from "@/components/Icons";

const serviceIcons = [IconGlobe, IconDashboard, IconServer, IconTrending, IconBook, IconShield];

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ea7810]/[0.03] rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <ScrollReveal>
            <p className="text-[11px] font-semibold tracking-[0.3em] text-[#ea7810]/80 uppercase mb-8">
              {t.hero.subtitle}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="mb-8">
              <Image src="/images/logo-fox.png" alt="The Orange Fox" width={100} height={100}
                className="mx-auto opacity-90" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-white">{t.hero.title.split(" ").slice(0, -2).join(" ")} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea7810] to-[#f5a623]">
                {t.hero.title.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              {t.hero.description}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact"
                className="group px-8 py-3.5 bg-gradient-to-r from-[#ea7810] to-[#d96a08] text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5">
                {t.hero.cta}
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link href="/services"
                className="px-8 py-3.5 text-white/50 text-sm font-medium rounded-full border border-white/[0.08] hover:border-white/20 hover:text-white/80 transition-all">
                {t.hero.secondary}
              </Link>
            </div>
          </ScrollReveal>

          {/* Scroll indicator */}
          <div className="mt-20 animate-bounce">
            <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-[11px] font-semibold tracking-[0.3em] text-[#ea7810]/60 uppercase text-center mb-3">
              {t.services.label}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 tracking-tight">{t.services.title}</h2>
            <p className="text-white/30 text-center max-w-xl mx-auto mb-16 font-light">{t.services.description}</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.services.items.map((item, i) => {
              const Icon = serviceIcons[i];
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-[#ea7810]/20 hover:bg-white/[0.04] transition-all duration-500">
                    <div className="w-10 h-10 rounded-xl bg-[#ea7810]/10 flex items-center justify-center mb-4 group-hover:bg-[#ea7810]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#ea7810]" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                    <p className="text-white/30 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.5}>
            <div className="text-center mt-12">
              <Link href="/services" className="text-sm text-[#ea7810]/70 hover:text-[#ea7810] transition-colors">
                {t.services.cta} →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <div className="p-12 rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06]">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">{t.cta.title}</h2>
              <p className="text-white/30 mb-8 font-light">{t.cta.description}</p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#ea7810] to-[#d96a08] text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5">
                {t.cta.button} →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
