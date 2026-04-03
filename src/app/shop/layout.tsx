import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop — The Orange Fox',
  description: 'Build your digital presence module by module. Pick the building blocks you need — each module is independently functional.',
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
