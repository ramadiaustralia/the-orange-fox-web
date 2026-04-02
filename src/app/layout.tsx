import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { LanguageProvider } from "@/lib/LanguageContext";
import { createClient } from "@supabase/supabase-js";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: global } = await supabase
      .from("seo_settings")
      .select("*")
      .eq("page", "global")
      .single();
    
    const base: Metadata = {
      title: "The Orange Fox | Premium Web Development Studio",
      description: "Crafting premium digital experiences. Custom web development, design, and digital solutions.",
      icons: { icon: "/images/logo-fox.png" },
    };

    if (global) {
      if (global.title) base.title = global.title;
      if (global.description) base.description = global.description;
      if (global.keywords) base.keywords = global.keywords;
      if (global.og_title || global.og_description || global.og_image) {
        base.openGraph = {
          ...(global.og_title && { title: global.og_title }),
          ...(global.og_description && { description: global.og_description }),
          ...(global.og_image && { images: [global.og_image] }),
        };
      }
    }

    return base;
  } catch {
    return {
      title: "The Orange Fox | Premium Web Development Studio",
      description: "Crafting premium digital experiences. Custom web development, design, and digital solutions.",
      icons: { icon: "/images/logo-fox.png" },
    };
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white">
        <LanguageProvider>
          <AnimatedBackground />
          <Navbar />
          <main className="pt-[60px]">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
