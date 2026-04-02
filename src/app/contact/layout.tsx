import { getPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("contact");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
