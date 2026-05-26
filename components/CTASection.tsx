import { ButtonLink } from "./ButtonLink";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-surface py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(0,102,255,.22),transparent_34%),radial-gradient(circle_at_75%_45%,rgba(124,58,237,.22),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(0,255,178,.12),transparent_30%)]" />
      <div className="relative mx-auto max-w-5xl px-5 text-center lg:px-8">
        <h2 data-i18n="ctaTitle" className="font-display text-4xl font-bold tracking-[-0.03em] text-text sm:text-5xl">
          Let&apos;s secure your information system.
        </h2>
        <p data-i18n="ctaText" className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
          Start with a focused conversation about your risks, systems and priorities.
        </p>
        <div className="mt-9">
          <ButtonLink href="/contact" size="lg"><span data-i18n="bookConsultation">Book a Consultation</span></ButtonLink>
        </div>
      </div>
    </section>
  );
}
