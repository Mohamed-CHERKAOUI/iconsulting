import { sectors } from "@/lib/content";

export function SectorsTicker() {
  const items = [...sectors, ...sectors, ...sectors];

  return (
    <div className="mt-10 overflow-hidden rounded-full border border-white/10 bg-white/[0.025] py-3 backdrop-blur">
      <div className="flex w-max animate-scroll-x items-center gap-3 px-3">
        {items.map((sector, index) => {
          const Icon = sector.icon;
          return (
            <div key={`${sector.label}-${index}`} className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-muted">
                <Icon className="h-4 w-4 text-cyan" />
                {sector.label}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyber shadow-[0_0_12px_rgba(0,255,178,.75)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
