"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

type StatRingProps = {
  value: number;
  suffix: string;
  label: string;
};

export function StatRing({ value, suffix, label }: StatRingProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div ref={ref} className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-5 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,.08)" strokeWidth="8" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="url(#statGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={inView ? offset : circumference}
              className="transition-[stroke-dashoffset] duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="statGradient" x1="0" x2="1" y1="0" y2="1">
                <stop stopColor="#0066FF" />
                <stop offset="1" stopColor="#00FFB2" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 grid place-items-center font-mono text-xl font-bold text-text">
            {inView ? <CountUp end={value} duration={2} suffix={suffix} /> : `0${suffix}`}
          </div>
        </div>
        <p data-i18n={label.includes("Risk") ? "statRisk" : label.includes("Governance") ? "statGovernance" : "statBaseline"} className="max-w-[9rem] text-sm font-medium leading-6 text-muted">{label}</p>
      </div>
    </div>
  );
}
