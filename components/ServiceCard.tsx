"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, ClipboardCheck, Crosshair, Layers3, LockKeyhole, Rocket, ServerCog, ShieldCheck } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: {
    title: string;
    description: string;
    slug: string;
    included: string[];
  };
  expandable?: boolean;
  large?: boolean;
};

const iconBySlug = {
  "it-audit-governance": ClipboardCheck,
  "is-project-review": Layers3,
  "digital-transformation-sdsi": Rocket,
  "cybersecurity-assessment": ShieldCheck,
  "penetration-testing": Crosshair,
  "device-hardening": LockKeyhole,
  "it-administration": ServerCog
};

export function ServiceCard({ service, expandable, large }: ServiceCardProps) {
  const [open, setOpen] = useState(false);
  const Icon = iconBySlug[service.slug as keyof typeof iconBySlug] ?? ShieldCheck;
  const titleKey = {
    "it-audit-governance": "serviceAuditTitle",
    "is-project-review": "serviceProjectTitle",
    "digital-transformation-sdsi": "serviceDigitalTitle",
    "cybersecurity-assessment": "serviceCyberTitle",
    "penetration-testing": "servicePentestTitle",
    "device-hardening": "serviceHardeningTitle",
    "it-administration": "serviceAdminTitle"
  }[service.slug];
  const descKey = {
    "it-audit-governance": "serviceAuditDesc",
    "is-project-review": "serviceProjectDesc",
    "digital-transformation-sdsi": "serviceDigitalDesc",
    "cybersecurity-assessment": "serviceCyberDesc",
    "penetration-testing": "servicePentestDesc",
    "device-hardening": "serviceHardeningDesc",
    "it-administration": "serviceAdminDesc"
  }[service.slug];

  return (
    <motion.article
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 backdrop-blur-md transition duration-300 hover:border-cyan/45 hover:bg-white/[0.055] hover:shadow-glow",
        large && "p-7"
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-cyan/20 bg-cyan/10 text-cyan">
        <Icon className="h-6 w-6 transition duration-300 group-hover:scale-110" />
      </div>
      <h3 data-i18n={titleKey} className="font-display text-xl font-semibold tracking-[-0.03em] text-text">{service.title}</h3>
      <p data-i18n={descKey} className={cn("mt-4 text-sm leading-7 text-muted", large && "text-base")}>{service.description}</p>
      {expandable ? (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-medium text-text transition hover:border-cyan/40"
            aria-expanded={open}
          >
            What&apos;s included
            <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180")} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid gap-3 pt-4">
                  {service.included.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyber" />
                      {item}
                    </li>
                  ))}
                </div>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan opacity-90 transition group-hover:translate-x-1">
          <span data-i18n="learnMore">Learn more</span> <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </motion.article>
  );
}
