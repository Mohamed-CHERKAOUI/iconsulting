"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ButtonLink } from "./ButtonLink";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-xl transition-all duration-300",
        scrolled && "bg-ink/95 shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Primary">
        <Logo />
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative text-sm font-medium text-muted transition hover:text-text",
                pathname === item.href && "text-text"
              )}
            >
              <span data-i18n={`nav${item.label}`}>{item.label}</span>
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-electric to-cyan transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
        <div className="hidden lg:block">
          <ButtonLink href="/contact"><span data-i18n="bookConsultation">Book a Consultation</span></ButtonLink>
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-text lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-white/5 bg-ink/95 px-5 py-5 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-muted transition hover:bg-white/[0.04] hover:text-text"
                >
                  <span data-i18n={`nav${item.label}`}>{item.label}</span>
                </Link>
              ))}
              <ButtonLink href="/contact" className="mt-2 w-full"><span data-i18n="bookConsultation">Book a Consultation</span></ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
