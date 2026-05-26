"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type InsightCardProps = {
  article: {
    title: string;
    category: string;
    date: string;
    readTime: string;
    excerpt: string;
    image: string;
  };
};

export function InsightCard({ article }: InsightCardProps) {
  const index = article.title.includes("SMEs") ? 0 : article.title.includes("Audit Evidence") ? 1 : article.title.includes("SDSI") ? 2 : -1;
  const titleKey = index === 0 ? "insightOneTitle" : index === 1 ? "insightTwoTitle" : index === 2 ? "insightThreeTitle" : undefined;
  const excerptKey = index === 0 ? "insightOneExcerpt" : index === 1 ? "insightTwoExcerpt" : index === 2 ? "insightThreeExcerpt" : undefined;
  const categoryKey = article.category === "Security" ? "categorySecurity" : article.category === "Audit" ? "categoryAudit" : article.category === "Transformation" ? "categoryTransformation" : undefined;
  return (
    <motion.article
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md transition hover:border-cyan/45 hover:shadow-glow"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={article.image}
          alt=""
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-cyan/30 bg-ink/70 px-3 py-1 font-mono text-xs text-cyan backdrop-blur">
          <span data-i18n={categoryKey}>{article.category}</span>
        </span>
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 font-mono text-xs text-muted">
          <span>{article.date}</span>
          <span className="h-1 w-1 rounded-full bg-cyber" />
          <span>{article.readTime}</span>
        </div>
        <h3 data-i18n={titleKey} className="font-display text-xl font-semibold tracking-[-0.03em] text-text">{article.title}</h3>
        <p data-i18n={excerptKey} className="mt-3 line-clamp-2 text-sm leading-7 text-muted">{article.excerpt}</p>
        <Link href="/insights" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan transition group-hover:translate-x-1">
          <span data-i18n="read">Read</span> <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
