import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/lib/LanguageContext";

export const metadata: Metadata = {
  title: "The Orange Fox | Premium Web Development Studio",
  description: "Crafting premium digital experiences. Custom web development, design, and digital solutions.",
  icons: { icon: "/images/logo-fox.png" },
};

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
          <Navbar />
          <main className="pt-[60px]">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
