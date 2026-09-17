import { PriceAreaChart } from "@/components/charts/price-area-chart";
import { Sparkline } from "@/components/charts/sparkline";
import { ChangeValue } from "@/components/ui/change-value";
import { ScoreRing } from "@/components/charts/score-ring";
import { api } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";
import { Brain, Radio } from "lucide-react";

export async function HeroDashboardMock() {
  const [stockTokens, signals, portfolio] = await Promise.all([
    api.getStocks(),
    api.getSignals(),
    api.getPortfolio(),
  ]);
  const watchlist = stockTokens.slice(0, 5);
  const signal = signals[0];

  return (
    <div className="glow-border card-surface mx-auto max-w-5xl rounded-2xl p-2 shadow-2xl">
      <div className="rounded-xl bg-background/60 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-danger/70" />
            <span className="size-3 rounded-full bg-warning/70" />
            <span className="size-3 rounded-full bg-primary/70" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Radio className="size-3 text-primary pulse-dot" />
            Live · Arc Chain
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="card-surface rounded-xl p-4 lg:col-span-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">Portfolio Value</p>
                <p className="mono-tabular mt-1 text-2xl font-semibold">{formatCurrency(portfolio.value)}</p>
              </div>
              <ChangeValue value={portfolio.change24h} />
            </div>
            <div className="mt-3">
              <PriceAreaChart data={portfolio.history} positive height={112} />
            </div>

            <div className="mt-4 space-y-2">
              {watchlist.map((s) => (
                <div key={s.symbol} className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-white/[0.03]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-md bg-white/[0.06] text-xs font-semibold">
                      {s.logoInitial}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{s.symbol}</p>
                    </div>
                  </div>
                  <div className="hidden w-20 sm:block"><Sparkline data={s.sparkline} positive={s.change24h >= 0} height={28} /></div>
                  <p className="mono-tabular w-16 text-right text-sm">{formatCurrency(s.price)}</p>
                  <ChangeValue value={s.change24h} className="w-16 justify-end" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="card-surface rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-teal">
                <Brain className="size-3.5" /> AI Insight
              </div>
              <p className="mt-2 text-sm font-medium leading-snug">{signal.headline}</p>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">{signal.detail}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-2">
                <span>{signal.timeAgo}</span>
                <span className="mono-tabular text-primary">{signal.confidence}% confidence</span>
              </div>
            </div>

            <div className="card-surface flex flex-1 items-center gap-4 rounded-xl p-4">
              <ScoreRing score={91} size={64} />
              <div>
                <p className="text-xs text-muted">AssetIQ Score™</p>
                <p className="text-sm font-medium">NVDA · Very Low Risk</p>
                <p className="mt-1 text-xs text-muted-2">Liquidity, volume & momentum weighted</p>
              </div>
            </div>

            <div className="card-surface flex items-center justify-around rounded-xl p-3 text-center">
              {["Arc Chain", "Chainlink", "Alchemy"].map((p) => (
                <span key={p} className="text-xs font-medium text-muted-2">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
