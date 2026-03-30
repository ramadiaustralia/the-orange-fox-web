"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/i18n";
import ScrollReveal from "@/components/ScrollReveal";

export default function Process() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ea7810]/[0.02] rounded-full blur-[120px]" />
      <div className="relative max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#ea7810]/60 uppercase mb-3">{t.process.label}</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{t.process.title}</h1>
          <p className="text-white/30 text-lg max-w-xl mb-20 font-light">{t.process.description}</p>
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-[#ea7810]/30 via-[#ea7810]/10 to-transparent" />

          <div className="space-y-10">
            {t.process.steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="flex items-start gap-8 group">
                  <div className="shrink-0 relative">
                    <div className="w-12 h-12 rounded-full bg-[#ea7810]/10 border border-[#ea7810]/20 flex items-center justify-center group-hover:bg-[#ea7810]/20 group-hover:border-[#ea7810]/40 transition-all duration-500">
                      <span className="text-[#ea7810] text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-white/30 text-sm leading-relaxed font-light">{step.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
