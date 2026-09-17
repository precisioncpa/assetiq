import { Brain, TrendingUp, TrendingDown, Minus, Search } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/charts/score-ring";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const typeConfig = {
  bullish: { icon: TrendingUp, color: "text-primary", badge: "primary" as const, label: "Bullish" },
  bearish: { icon: TrendingDown, color: "text-danger", badge: "danger" as const, label: "Bearish" },
  neutral: { icon: Minus, color: "text-muted", badge: "default" as const, label: "Neutral" },
};

export default async function InsightsPage() {
  const [aiSignals, stockTokens] = await Promise.all([api.getSignals(), api.getStocks()]);
  const scanner = [...stockTokens]
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .map((s) => ({
      symbol: s.symbol,
      risk: s.riskScore,
      opportunity: s.opportunityScore,
      momentum: s.momentumScore,
    }));

  return (
    <div>
      <PageHeader
        title="AI Insights"
        description="AI market analysis, opportunity scanning, and smart summaries across every tracked asset."
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-1.5"><Brain className="size-3.5" /> Live AI Signals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSignals.map((s) => {
                const cfg = typeConfig[s.type];
                const Icon = cfg.icon;
                return (
                  <div key={s.id} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant={cfg.badge}>
                        <Icon className="size-3" /> {cfg.label}
                      </Badge>
                      <span className="text-xs text-muted-2">{s.timeAgo}</span>
                    </div>
                    <p className="mt-3 text-sm font-medium leading-snug">{s.headline}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{s.detail}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                      <span className="font-mono text-xs font-semibold text-teal">${s.symbol}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="h-1 w-24 overflow-hidden rounded-full bg-white/[0.08]">
                          <div className={cn("h-full rounded-full", cfg.color.replace("text-", "bg-"))} style={{ width: `${s.confidence}%` }} />
                        </div>
                        <span className="mono-tabular text-xs text-muted-2">{s.confidence}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5"><Search className="size-3.5" /> AI Opportunity Scanner</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {scanner.slice(0, 4).map((s) => (
                <div key={s.symbol} className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold">{s.symbol}</span>
                  <div className="flex items-center gap-4">
                    <ScoreRing score={s.opportunity} size={44} />
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-2">Ranked by Opportunity Score across tokenized stocks, ETFs, lending markets, and yield venues.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted">
                Semiconductor and AI-compute tokens are leading momentum this week, led by <span className="text-foreground font-medium">NVDA</span> and{" "}
                <span className="text-foreground font-medium">COIN</span>. Concentration risk is rising in exchange-linked tokens as whale wallets
                consolidate positions. Overall market breadth remains positive with 5 of 8 tracked assets showing bullish signals.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
