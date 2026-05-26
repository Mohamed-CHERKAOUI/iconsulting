import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="iConsulting home">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 shadow-glow">
        <span className="absolute inset-0 rounded-xl bg-cyan/10 blur-md animate-pulse-glow" />
        <ShieldCheck className="relative h-5 w-5 text-cyan" />
      </span>
      <span className="font-display text-lg font-bold tracking-[-0.03em] text-text">
        iConsulting
      </span>
    </Link>
  );
}
