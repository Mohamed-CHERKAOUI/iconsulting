import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { MotionDiv, MotionSection } from "@/components/motion";
import { SectionHeader } from "@/components/SectionHeader";
import { processSteps, sectors, standards, values } from "@/lib/content";
import { fadeUp, stagger } from "@/lib/animations";

export const metadata: Metadata = {
  title: "About",
  description: "Consulting discipline built around evidence and control in Casablanca, Morocco.",
  openGraph: { images: [{ url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80", width: 1200, height: 630 }] }
};

export default function AboutPage() {
  return (
    <main className="bg-ink pt-28">
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber">About iConsulting</p>
          <h1 data-i18n="aboutHero" className="mt-6 max-w-5xl font-display text-5xl font-bold tracking-[-0.03em] text-text sm:text-7xl">
            Consulting discipline built around evidence and control.
          </h1>
          <blockquote data-i18n="aboutQuote" className="mt-12 max-w-4xl border-l-2 border-cyan pl-7 font-display text-2xl italic leading-10 tracking-[-0.03em] text-text">
            We help organizations move through digital change with clear risk visibility, practical controls and decisions leaders can trust.
          </blockquote>
        </div>
      </section>
      <MotionSection variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionDiv variants={fadeUp}>
            <SectionHeader eyebrow="Values" title="The operating principles behind every engagement." />
          </MotionDiv>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <MotionDiv key={value.title} variants={fadeUp} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur transition hover:border-cyan/40 hover:shadow-glow">
                  <Icon className="h-7 w-7 text-cyan" />
                  <h3 data-i18n={value.title === "Trust" ? "trust" : value.title === "Rigor" ? "rigor" : value.title === "Clarity" ? "clarity" : "impact"} className="mt-6 font-display text-xl font-semibold text-text">{value.title}</h3>
                  <p data-i18n={value.title === "Trust" ? "trustText" : value.title === "Rigor" ? "rigorText" : value.title === "Clarity" ? "clarityText" : "impactText"} className="mt-3 text-sm leading-7 text-muted">{value.text}</p>
                </MotionDiv>
              );
            })}
          </div>
        </div>
      </MotionSection>
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <SectionHeader
            eyebrow="Methodology"
            title="Structured around international audit and cybersecurity references."
            text="We use recognized frameworks as anchors, then adapt controls, evidence and priorities to the organization."
          />
          <div className="grid gap-4">
            {standards.map((standard) => (
              <div key={standard.title} className="rounded-2xl border border-white/[0.07] bg-surface/70 p-5">
                <h3 className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-cyan">{standard.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{standard.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader centered eyebrow="Sectors" title="Built for Morocco's high-trust operating environments." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {sectors.slice(0, 5).map((sector) => {
              const Icon = sector.icon;
              return (
                <div key={sector.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Icon className="h-5 w-5 text-cyan" />
                  <span className="font-medium text-text">{sector.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Our experts" title="Senior advisors, analysts and security specialists." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["Lead Cybersecurity Advisor", "IT Audit Consultant", "Transformation Strategist"].map((role) => (
              <div key={role} className="rounded-2xl border border-dashed border-white/12 bg-white/[0.025] p-6">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-electric/30 to-cyan/10" />
                <h3 className="mt-5 font-display text-lg font-semibold text-text">{role}</h3>
                <p className="mt-2 text-sm text-muted">Confidential expert profile available during engagement scoping.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </main>
  );
}
