"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { InsightCard } from "@/components/InsightCard";
import { MotionDiv } from "@/components/motion";
import { insights } from "@/lib/content";
import { cn } from "@/lib/utils";
import { fadeUp, stagger } from "@/lib/animations";

const categories = ["All", "Audit", "Security", "Transformation"];

export default function InsightsPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return insights.filter((article) => {
      const categoryMatch = category === "All" || article.category === category;
      const queryMatch = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  return (
    <main className="bg-ink px-5 pt-28 lg:px-8">
      <section className="mx-auto max-w-7xl py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyber">Insights</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <h1 data-i18n="insightsHero" className="max-w-4xl font-display text-5xl font-bold tracking-[-0.03em] text-text sm:text-7xl">
            Field notes for safer digital decisions.
          </h1>
          <label className="relative block">
            <span className="sr-only">Search articles</span>
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search insights"
              data-i18n-placeholder="searchInsights"
              className="h-14 w-full rounded-full border border-white/10 bg-white/[0.035] pl-14 pr-5 text-sm text-text outline-none transition placeholder:text-muted focus:border-cyan/40 focus:ring-2 focus:ring-electric/40"
            />
          </label>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "relative rounded-full px-5 py-2 text-sm font-medium text-muted transition hover:text-text",
                category === item && "text-text"
              )}
            >
              {item}
              {category === item && <span className="absolute inset-x-3 -bottom-1 h-px bg-gradient-to-r from-electric to-cyan" />}
            </button>
          ))}
        </div>
      </section>
      <MotionDiv variants={stagger} initial="hidden" animate="show" className="mx-auto grid max-w-7xl gap-6 pb-24 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((article) => (
          <MotionDiv key={article.title} variants={fadeUp}>
            <InsightCard article={article} />
          </MotionDiv>
        ))}
      </MotionDiv>
    </main>
  );
}
