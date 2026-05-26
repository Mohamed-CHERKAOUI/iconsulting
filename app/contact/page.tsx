import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ContactSidebar } from "@/components/ContactSidebar";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a confidential consultation with iConsulting.",
  openGraph: { images: [{ url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80", width: 1200, height: 630 }] }
};

export default function ContactPage() {
  return (
    <main className="bg-ink px-5 pt-28 lg:px-8">
      <section className="mx-auto max-w-7xl py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber">Consultation</p>
        <h1 data-i18n="contactHero" className="mt-6 max-w-4xl font-display text-5xl font-bold tracking-[-0.03em] text-text sm:text-7xl">
          Book a focused conversation about your risk and systems.
        </h1>
        <p data-i18n="contactHeroText" className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          Tell us what you need to secure, audit or transform. We will respond with a clear next step within one business day.
        </p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 pb-24 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,.8fr)]">
        <ContactForm />
        <ContactSidebar />
      </section>
    </main>
  );
}
