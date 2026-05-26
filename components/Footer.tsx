import Link from "next/link";
import { Linkedin, Mail, ShieldCheck } from "lucide-react";
import { navItems, services } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
            Cybersecurity, IT audit and digital transformation advisory for organizations that need control before scale.
          </p>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold text-text">Company</h3>
          <div className="mt-4 grid gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-muted transition hover:text-cyan">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold text-text">Services</h3>
          <div className="mt-4 grid gap-3">
            {services.slice(0, 5).map((service) => (
              <Link key={service.slug} href="/services" className="text-sm text-muted transition hover:text-cyan">
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold text-text">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-cyan" /> Secure consultation channel</span>
          </div>
          <div className="mt-6 flex gap-3">
            <Link href="https://www.linkedin.com" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition hover:border-cyan/50 hover:text-cyan hover:shadow-glow">
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link href="/contact" aria-label="Security contact" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition hover:border-cyan/50 hover:text-cyan hover:shadow-glow">
              <ShieldCheck className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-2 border-t border-white/5 px-5 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between lg:px-8">
        <span>© 2026 iConsulting. All rights reserved.</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyber shadow-[0_0_14px_rgba(0,255,178,.8)]" /> Secure. Audit. Transform.</span>
      </div>
    </footer>
  );
}
