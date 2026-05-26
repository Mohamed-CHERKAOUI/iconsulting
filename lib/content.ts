import {
  Banknote,
  BedDouble,
  Building2,
  ClipboardCheck,
  Crosshair,
  GraduationCap,
  HeartPulse,
  Layers3,
  LockKeyhole,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Target,
  Users
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const services = [
  {
    title: "IT Audit & Governance",
    slug: "it-audit-governance",
    icon: ClipboardCheck,
    description:
      "Independent audits that clarify control maturity, expose gaps and align governance with business risk.",
    included: ["Governance maturity review", "Control mapping", "Executive risk memo"]
  },
  {
    title: "IS Project Review",
    slug: "is-project-review",
    icon: Layers3,
    description:
      "Structured reviews of information-system projects before budget, architecture or delivery drift becomes expensive.",
    included: ["Architecture checkpoints", "Delivery risk assessment", "Remediation roadmap"]
  },
  {
    title: "Digital Transformation (SDSI)",
    slug: "digital-transformation-sdsi",
    icon: Rocket,
    description:
      "Digital roadmaps that translate strategy into secure operating models, platforms and measurable transformation plans.",
    included: ["SDSI framing", "Target operating model", "Transformation portfolio"]
  },
  {
    title: "Cybersecurity Assessment",
    slug: "cybersecurity-assessment",
    icon: ShieldCheck,
    description:
      "Baseline assessments across identity, infrastructure, endpoints and policies to prioritize practical risk reduction.",
    included: ["Security posture scan", "Risk heatmap", "Prioritized action plan"]
  },
  {
    title: "Penetration Testing",
    slug: "penetration-testing",
    icon: Crosshair,
    description:
      "Controlled offensive testing that validates exposure, exploitability and business impact with clear evidence.",
    included: ["Web and network testing", "Proof-of-impact report", "Retest guidance"]
  },
  {
    title: "Device Hardening",
    slug: "device-hardening",
    icon: LockKeyhole,
    description:
      "Endpoint, server and device configuration baselines that reduce attack surface without slowing operations.",
    included: ["Hardening checklist", "Configuration baseline", "Operational handover"]
  },
  {
    title: "IT Administration",
    slug: "it-administration",
    icon: ServerCog,
    description:
      "Reliable administration support for infrastructure, identity, availability and everyday operational resilience.",
    included: ["Infrastructure operations", "Identity administration", "Continuity checks"]
  }
];

export const stats = [
  { value: 82, suffix: "%", label: "Risk Exposure Reduced" },
  { value: 68, suffix: "%", label: "Governance Maturity Improved" },
  { value: 91, suffix: "%", label: "Security Baseline Score" }
];

export const sectors = [
  { label: "Banks", icon: Banknote },
  { label: "Hotels", icon: BedDouble },
  { label: "Clinics", icon: HeartPulse },
  { label: "Schools", icon: GraduationCap },
  { label: "Startups", icon: Sparkles },
  { label: "SMEs", icon: Building2 }
];

export const processSteps = [
  {
    title: "Diagnose",
    text: "Understand the environment, controls and strategic constraints."
  },
  {
    title: "Identify Risks",
    text: "Prioritize exposure through evidence, impact and likelihood."
  },
  {
    title: "Secure Infrastructure",
    text: "Apply controls, hardening and monitoring where it matters."
  },
  {
    title: "Transform Systems",
    text: "Move from remediation to a resilient digital operating model."
  }
];

export const insights = [
  {
    title: "How SMEs Can Build a Practical Security Baseline",
    category: "Security",
    date: "May 12, 2026",
    readTime: "6 min read",
    excerpt:
      "A pragmatic sequence for identity, endpoints, backups and governance that reduces exposure quickly.",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Audit Evidence That Executives Actually Use",
    category: "Audit",
    date: "April 28, 2026",
    readTime: "5 min read",
    excerpt:
      "Moving beyond checklists into decision-grade reporting for boards and operational leaders.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Designing an SDSI Roadmap Without Losing Control",
    category: "Transformation",
    date: "April 9, 2026",
    readTime: "7 min read",
    excerpt:
      "How to connect ambition, architecture and cybersecurity into one transformation portfolio.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "What Penetration Testing Should Prove",
    category: "Security",
    date: "March 22, 2026",
    readTime: "4 min read",
    excerpt:
      "A useful test answers business questions, not only technical curiosity.",
    image:
      "https://images.unsplash.com/photo-1516321165247-7d6f897f3b6b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Governance Models for Growing IT Teams",
    category: "Audit",
    date: "March 5, 2026",
    readTime: "6 min read",
    excerpt:
      "Lightweight accountability patterns that scale from founder-led teams to mature operations.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Digital Transformation Starts With Operating Clarity",
    category: "Transformation",
    date: "February 18, 2026",
    readTime: "5 min read",
    excerpt:
      "Before tools and platforms, transformation needs ownership, controls and measurable outcomes.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"
  }
];

export const standards = [
  {
    title: "ISO/IEC 27001",
    text: "Information security management controls, governance and continual improvement."
  },
  {
    title: "NIST CSF",
    text: "Identify, Protect, Detect, Respond and Recover as a practical cyber risk model."
  },
  {
    title: "NIST SP 800-53",
    text: "Control families for security, privacy and resilience in complex environments."
  },
  {
    title: "EBIOS Risk Manager",
    text: "Scenario-based cyber risk analysis for critical assets and business impact."
  },
  {
    title: "COBIT",
    text: "IT governance, accountability and value alignment for enterprise systems."
  },
  {
    title: "CIS Controls",
    text: "Prioritized technical safeguards for hardening, monitoring and operations."
  }
];

export const values = [
  { title: "Trust", icon: ShieldCheck, text: "Confidential, direct and grounded in evidence." },
  { title: "Rigor", icon: Target, text: "Structured methods, clear controls and traceable findings." },
  { title: "Clarity", icon: Sparkles, text: "Executive-ready recommendations without noise." },
  { title: "Impact", icon: Users, text: "Focused changes that improve resilience and operations." }
];
