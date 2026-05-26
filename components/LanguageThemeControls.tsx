"use client";

import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { translations } from "@/lib/i18n";

type Lang = "en" | "fr";

const english = new Map<string, string>();

export function LanguageThemeControls() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const savedLang = (localStorage.getItem("iconsulting-lang") as Lang | null) || "en";
    setLang(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("iconsulting-lang", lang);
    document.documentElement.lang = lang;
    document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n || "";
      if (!english.has(key)) english.set(key, node.textContent || "");
      node.textContent = lang === "fr" ? translations[key as keyof typeof translations] || english.get(key) || "" : english.get(key) || "";
    });
    document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-i18n-placeholder]").forEach((node) => {
      const key = node.dataset.i18nPlaceholder || "";
      const storeKey = `${key}:placeholder`;
      if (!english.has(storeKey)) english.set(storeKey, node.placeholder || "");
      node.placeholder = lang === "fr" ? translations[key as keyof typeof translations] || english.get(storeKey) || "" : english.get(storeKey) || "";
    });
  }, [lang]);

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex items-center gap-2 rounded-full border border-white/10 bg-surface/85 p-2 shadow-glow backdrop-blur-xl">
      <button
        type="button"
        onClick={() => setLang(lang === "en" ? "fr" : "en")}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-xs font-bold text-text transition hover:border-cyan/40"
        aria-label="Switch language"
      >
        <Languages className="h-4 w-4 text-cyan" />
        {lang.toUpperCase()}
      </button>
    </div>
  );
}
