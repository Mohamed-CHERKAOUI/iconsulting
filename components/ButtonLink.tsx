import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70",
        size === "lg" ? "px-8 py-4 text-base" : "px-5 py-3 text-sm",
        variant === "primary"
          ? "bg-gradient-to-r from-electric to-cyan text-white shadow-glow hover:shadow-glow-strong"
          : "border border-white/10 bg-white/[0.02] text-text hover:border-cyan/50",
        className
      )}
    >
      {variant === "primary" && (
        <span className="absolute inset-y-0 left-0 w-1/2 -translate-x-[120%] skew-x-[-20deg] bg-white/25 transition-transform duration-700 group-hover:animate-shimmer" />
      )}
      <span className="relative flex items-center gap-2">
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
