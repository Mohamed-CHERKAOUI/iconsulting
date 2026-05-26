import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { CTASection } from "@/components/CTASection";
import { MotionDiv, MotionSection, MotionSpan } from "@/components/motion";
import { ParticleField } from "@/components/ParticleField";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { StatRing } from "@/components/StatRing";
import { insights, services, standards, stats } from "@/lib/content";
import { InsightCard } from "@/components/InsightCard";
import { Timeline } from "@/components/Timeline";
import { fadeUp, stagger } from "@/lib/animations";

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-ink">
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 lg:px-8">
        <ParticleField />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,102,255,.18),transparent_32%),linear-gradient(180deg,rgba(5,10,20,.1),#050A14_92%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <MotionDiv variants={stagger} initial="hidden" animate="show" className="max-w-5xl">
            <MotionDiv variants={fadeUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cyber shadow-[0_0_18px_rgba(0,255,178,.85)]" />
              <span data-i18n="trustedBadge" className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Trusted Security Partner · Cybersecurity & IT Audit</span>
            </MotionDiv>
            <h1 className="font-display text-5xl font-bold tracking-[-0.03em] text-text sm:text-7xl lg:text-8xl">
              {["Secure.", "Audit.", "Transform."].map((word, index) => (
                <MotionSpan
                  key={word}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                  className="mr-4 inline-block"
                >
                  <span data-i18n={index === 0 ? "heroSecure" : index === 1 ? "heroAudit" : "heroTransform"}>{word}</span>
                </MotionSpan>
              ))}
            </h1>
            <MotionDiv variants={fadeUp} className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              <span data-i18n="heroSub">We design, audit and secure your information systems for a controlled digital future.</span>
            </MotionDiv>
            <MotionDiv variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" size="lg"><span data-i18n="bookConsultation">Book a Consultation</span></ButtonLink>
              <ButtonLink href="/services" size="lg" variant="secondary"><span data-i18n="discoverServices">Discover Services</span></ButtonLink>
            </MotionDiv>
          </MotionDiv>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <StatRing key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <MotionSection variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <MotionDiv variants={fadeUp}>
            <SectionHeader
              centered
              eyebrow="Services"
              title="High-trust advisory for digital systems that must hold."
              text="A focused portfolio for leaders who need clarity across risk, security, governance and transformation."
            />
          </MotionDiv>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {services.map((service, index) => (
              <MotionDiv key={service.slug} variants={fadeUp} className={index < 3 ? "lg:col-span-2" : "lg:col-span-3"}>
                <ServiceCard service={{ title: service.title, description: service.description, slug: service.slug, included: service.included }} />
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionSection>

      <Timeline />

      <section className="relative overflow-hidden px-5 py-24 lg:px-8">
        <Image
          src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1800&q=80"
          alt="Cybersecurity operations dashboard"
          fill
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/70" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Methodology"
              title="Built on international audit and cybersecurity references."
              text="Our methodology is grounded in international audit, governance and cybersecurity references, then adapted to each operating context."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Risk-based approach", "Audit framework", "Governance model", "Security methodology"].map((item) => (
                <div key={item} className="group rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-medium text-muted transition hover:border-cyan/40 hover:text-text">
                  <span className="mr-3 inline-block h-2 w-2 rounded-full bg-cyan transition group-hover:translate-x-1" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {standards.map((standard) => (
                <div key={standard.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyan">{standard.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{standard.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-surface/70 shadow-glow">
            <ParticleField compact />
            <div className="absolute inset-0 grid place-items-center">
              <div className="rounded-full border border-cyan/25 bg-cyan/10 px-6 py-4 font-mono text-sm text-cyan shadow-glow">
                GLOBAL CONTROL FABRIC
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader eyebrow="Insights" title="Signals for safer digital decisions." />
            <ButtonLink href="/insights" variant="secondary">View all insights</ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {insights.slice(0, 3).map((article) => (
              <InsightCard key={article.title} article={article} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
