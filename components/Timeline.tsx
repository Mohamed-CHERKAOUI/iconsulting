"use client";

import { useInView } from "react-intersection-observer";
import { MotionDiv, MotionPath } from "@/components/motion";
import { processSteps } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";
import { fadeUp, stagger } from "@/lib/animations";

export function Timeline() {
  const { ref, inView } = useInView({ threshold: 0.35, triggerOnce: true });

  return (
    <section ref={ref} className="relative px-5 py-24 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,102,255,.12),transparent_35%)]" />
      <MotionDiv variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="relative mx-auto max-w-7xl">
        <MotionDiv variants={fadeUp}>
          <SectionHeader centered eyebrow="Process" title="A controlled sequence from diagnosis to transformation." />
        </MotionDiv>
        <div className="relative mt-16">
          <svg className="absolute left-8 top-0 hidden h-full w-[calc(100%-4rem)] lg:block" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M10 60 C 250 10, 350 110, 500 60 S 760 10, 990 60" stroke="rgba(255,255,255,.08)" strokeWidth="2" fill="none" />
            <MotionPath
              d="M10 60 C 250 10, 350 110, 500 60 S 760 10, 990 60"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" x2="1">
                <stop stopColor="#0066FF" />
                <stop offset=".5" stopColor="#00C2FF" />
                <stop offset="1" stopColor="#00FFB2" />
              </linearGradient>
            </defs>
          </svg>
          <div className="grid gap-5 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <MotionDiv key={step.title} variants={fadeUp} className="relative rounded-2xl border border-white/[0.07] bg-surface/70 p-6 backdrop-blur">
                <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric to-cyan font-mono text-sm font-bold text-white shadow-glow">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 data-i18n={["processDiagnose", "processRisks", "processSecure", "processTransform"][index]} className="font-display text-xl font-semibold tracking-[-0.03em] text-text">{step.title}</h3>
                <p data-i18n={["processDiagnoseText", "processRisksText", "processSecureText", "processTransformText"][index]} className="mt-3 text-sm leading-7 text-muted">{step.text}</p>
              </MotionDiv>
            ))}
          </div>
        </div>
      </MotionDiv>
    </section>
  );
}
