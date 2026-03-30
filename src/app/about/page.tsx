"use client";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/i18n";
import ScrollReveal from "@/components/ScrollReveal";
import { IconTarget, IconLightning, IconHandshake, IconDiamond } from "@/components/Icons";

const valueIcons = [IconTarget, IconLightning, IconHandshake, IconDiamond];

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-[#ea7810]/[0.02] rounded-full blur-[120px]" />
      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#ea7810]/60 uppercase mb-3">{t.about.label}</p>
          <div className="flex items-center gap-5 mb-6">
            <Image src="/images/logo-fox.png" alt="The Orange Fox" width={60} height={60} className="opacity-90" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{t.about.title}</h1>
          </div>
          <p className="text-white/30 text-lg max-w-2xl mb-20 font-light leading-relaxed">{t.about.description}</p>
        </ScrollReveal>

        {/* Mission */}
        <ScrollReveal delay={0.1}>
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] mb-12">
            <h2 className="text-xs font-semibold tracking-[0.2em] text-[#ea7810]/60 uppercase mb-4">{t.about.mission}</h2>
            <p className="text-white/50 text-lg leading-relaxed font-light">{t.about.missionText}</p>
          </div>
        </ScrollReveal>

        {/* Values */}
        <ScrollReveal delay={0.2}>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-[#ea7810]/60 uppercase mb-6">{t.about.values}</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-4">
          {t.about.valuesList.map((value, i) => {
            const Icon = valueIcons[i];
            return (
              <ScrollReveal key={i} delay={0.2 + i * 0.08}>
                <div className="group p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04] hover:border-[#ea7810]/15 hover:bg-white/[0.03] transition-all duration-500">
                  <div className="w-10 h-10 rounded-xl bg-[#ea7810]/10 flex items-center justify-center mb-4 group-hover:bg-[#ea7810]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#ea7810]" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{value.title}</h3>
                  <p className="text-white/30 text-sm leading-relaxed font-light">{value.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
