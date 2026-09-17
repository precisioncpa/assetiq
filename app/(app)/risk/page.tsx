import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreRing } from "@/components/charts/score-ring";
import { api } from "@/lib/api-client";

const components = [
  { label: "Liquidity", weight: 20 },
  { label: "Volume", weight: 18 },
  { label: "Volatility", weight: 17 },
  { label: "Holder Concentration", weight: 17 },
  { label: "Market Activity", weight: 14 },
  { label: "Historical Performance", weight: 14 },
];

export default async function RiskPage() {
  const stockTokens = await api.getStocks();
  const ranked = [...stockTokens].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div>
      <PageHeader title="AI Risk Engine" description={"The AssetIQ Score™ — a single 0-100 risk-adjusted rating for every tracked asset."} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Methodology</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {components.map((c) => (
              <div key={c.label}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="text-muted">{c.label}</span>
                  <span className="mono-tabular text-foreground">{c.weight}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-teal" style={{ width: `${c.weight * 5}%` }} />
                </div>
              </div>
            ))}
            <p className="pt-2 text-xs leading-relaxed text-muted-2">
              Scores are recalculated continuously as on-chain liquidity, wallet concentration, and volatility shift.
            </p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Asset Scores</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            {ranked.map((s) => (
              <div key={s.symbol} className="flex items-center justify-between rounded-lg px-2 py-2.5 hover:bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-semibold">
                    {s.logoInitial}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{s.symbol}</p>
                    <p className="text-xs text-muted">{s.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden text-center sm:block">
                    <p className="mono-tabular text-sm font-medium">{s.opportunityScore}</p>
                    <p className="text-xs text-muted-2">Opportunity</p>
                  </div>
                  <div className="hidden text-center sm:block">
                    <p className="mono-tabular text-sm font-medium">{s.momentumScore}</p>
                    <p className="text-xs text-muted-2">Momentum</p>
                  </div>
                  <ScoreRing score={s.riskScore} size={48} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
