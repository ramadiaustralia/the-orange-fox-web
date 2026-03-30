import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "The Orange Fox — Web Architecture & Development",
  description: "Premium web development studio crafting exceptional digital experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        <LanguageProvider>
          <AnimatedBackground />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
