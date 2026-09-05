import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-[var(--color-topbar)] border-b border-white/5">
      <div className="container-x py-10 text-center">
        {eyebrow && <p className="text-primary font-semibold tracking-widest text-sm mb-3">{eyebrow}</p>}
        <h1 className="text-2xl md:text-2xl text-white">{title}</h1>
        {subtitle && <p className="mt-4 text-white/70 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}
