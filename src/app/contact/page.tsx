"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/i18n";
import ScrollReveal from "@/components/ScrollReveal";

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#ea7810]/[0.03] rounded-full blur-[100px]" />
      <div className="relative max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-[11px] font-semibold tracking-[0.3em] text-[#ea7810]/60 uppercase mb-3">{t.contact.label}</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{t.contact.title}</h1>
          <p className="text-white/30 text-lg max-w-xl mb-12 font-light">{t.contact.description}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/30 mb-2 tracking-wide">{t.contact.form.name}</label>
                <input type="text" className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#ea7810]/30 transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-white/30 mb-2 tracking-wide">{t.contact.form.email}</label>
                <input type="email" className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#ea7810]/30 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/30 mb-2 tracking-wide">{t.contact.form.company}</label>
              <input type="text" className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#ea7810]/30 transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-white/30 mb-2 tracking-wide">{t.contact.form.message}</label>
              <textarea rows={5} className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#ea7810]/30 transition-colors resize-none" />
            </div>
            <button type="submit"
              className="px-8 py-3.5 bg-gradient-to-r from-[#ea7810] to-[#d96a08] text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5">
              {t.contact.form.send} →
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
