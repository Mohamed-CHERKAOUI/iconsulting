"use client";

import { CheckCircle2, Clock, Mail } from "lucide-react";
import toast from "react-hot-toast";

export function ContactSidebar() {
  const copyEmail = async () => {
    toast.success("Secure channel details are shared after the first request.");
  };

  return (
    <aside className="h-fit rounded-3xl border border-white/[0.07] bg-white/[0.035] p-6 backdrop-blur-xl">
      <h2 data-i18n="whatToExpect" className="font-display text-2xl font-semibold tracking-[-0.03em] text-text">What to expect</h2>
      <div className="mt-6 grid gap-4">
        {[
          ["Response in 1 business day", "responseDay"],
          ["Confidential assessment", "confidential"],
          ["No commitment required", "noCommitment"]
        ].map(([item, key]) => (
          <div key={item} className="flex items-center gap-3 text-sm text-muted">
            <CheckCircle2 className="h-5 w-5 text-cyber" />
            <span data-i18n={key}>{item}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 border-t border-white/10 pt-8">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <span className="flex min-w-0 items-center gap-3 text-sm text-muted">
            <Mail className="h-4 w-4 shrink-0 text-cyan" />
            <span data-i18n="secureChannel" className="truncate">Secure consultation channel</span>
          </span>
          <button type="button" onClick={copyEmail} aria-label="Secure contact details" className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-cyan transition hover:border-cyan/40 hover:text-cyber">
            Info
          </button>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted">
          <Clock className="h-4 w-4 text-cyan" />
          <span data-i18n="officeHours">Office hours · Mon-Fri · 09:00-18:00</span>
        </div>
      </div>
    </aside>
  );
}
