import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { MotionDiv, MotionSection } from "@/components/motion";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/content";
import { fadeUp, stagger } from "@/lib/animations";

export const metadata: Metadata = {
  title: "Services",
  description: "IT audit, cybersecurity assessment, penetration testing, SDSI and digital transformation services.",
  openGraph: { images: [{ url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80", width: 1200, height: 630 }] }
};

export default function ServicesPage() {
  return (
    <main className="bg-ink pt-28">
      <section className="relative overflow-hidden px-5 py-20 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,102,255,.24),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber">Home / Services</p>
          <h1 data-i18n="servicesHero" className="mt-6 max-w-4xl bg-gradient-to-r from-text via-cyan to-cyber bg-clip-text font-display text-5xl font-bold tracking-[-0.03em] text-transparent sm:text-7xl">
            Advisory services for systems that demand control.
          </h1>
          <p data-i18n="servicesHeroText" className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            From audit evidence to infrastructure hardening, each engagement is designed to reveal risk, guide decisions and improve operational resilience.
          </p>
        </div>
      </section>
      <MotionSection variants={stagger} initial="hidden" animate="show" className="px-5 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionDiv variants={fadeUp}>
            <SectionHeader eyebrow="Capabilities" title="Seven focused ways to strengthen your digital estate." />
          </MotionDiv>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <MotionDiv key={service.slug} variants={fadeUp}>
                <ServiceCard service={{ title: service.title, description: service.description, slug: service.slug, included: service.included }} expandable large />
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>
      <CTASection />
    </main>
  );
}
