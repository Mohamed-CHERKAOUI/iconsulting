import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  centered?: boolean;
};

export function SectionHeader({ eyebrow, title, text, centered }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center")}>
      {eyebrow && (
        <p data-i18n={eyebrow === "Services" ? "servicesEyebrow" : eyebrow === "Process" ? "processEyebrow" : eyebrow === "Insights" ? "insightsEyebrow" : eyebrow === "Methodology" ? "expertiseEyebrow" : undefined} className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-cyber">
          {eyebrow}
        </p>
      )}
      <h2 data-i18n={title.startsWith("High-trust") ? "servicesTitle" : title.startsWith("A controlled") ? "processTitle" : title.startsWith("Signals") ? "insightsTitle" : title.startsWith("Built on international") ? "expertiseTitle" : title.startsWith("The operating principles") ? "valuesTitle" : undefined} className="font-display text-3xl font-bold tracking-[-0.03em] text-text sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text && <p data-i18n={text.startsWith("A focused portfolio") ? "servicesText" : text.startsWith("Our methodology") ? "expertiseText" : undefined} className="mt-5 text-base leading-8 text-muted sm:text-lg">{text}</p>}
    </div>
  );
}
