import type { StockToken } from "@/lib/types";
import { cn, formatPercent } from "@/lib/utils";

function intensity(change: number) {
  const clamped = Math.max(-8, Math.min(8, change));
  return Math.abs(clamped) / 8;
}

export function MarketHeatmap({ stocks }: { stocks: StockToken[] }) {
  const sorted = [...stocks].sort((a, b) => b.marketCap - a.marketCap);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {sorted.map((s, i) => {
        const positive = s.change24h >= 0;
        const alpha = 0.15 + intensity(s.change24h) * 0.55;
        return (
          <div
            key={s.symbol}
            className={cn(
              "flex flex-col justify-between rounded-lg border p-3",
              positive ? "border-primary/20" : "border-danger/20",
              i === 0 && "sm:col-span-2 sm:row-span-2"
            )}
            style={{
              background: positive
                ? `rgba(0, 230, 160, ${alpha})`
                : `rgba(255, 92, 108, ${alpha})`,
            }}
          >
            <span className="font-mono text-sm font-semibold">{s.symbol}</span>
            <span className={cn("mono-tabular text-xs font-medium", positive ? "text-primary" : "text-danger")}>
              {formatPercent(s.change24h)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
