import { ShieldAlert } from "lucide-react";
import { SectionHeader } from "@/components/marketing/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/charts/score-ring";
import { api } from "@/lib/api-client";

const components = ["Liquidity", "Volume", "Volatility", "Holder Concentration", "Market Activity", "Historical Performance"];

export async function RiskEnginePreview() {
  const stockTokens = await api.getStocks();
  const ranked = [...stockTokens].sort((a, b) => b.riskScore - a.riskScore).slice(0, 4);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Risk Engine"
          title={"The AssetIQ Score™"}
          description="A single 0-100 score that blends liquidity, volume, volatility, holder concentration, market activity, and historical performance into one risk-adjusted rating."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="p-6 lg:col-span-2">
            <p className="text-sm font-medium">Score Components</p>
            <div className="mt-4 space-y-3">
              {components.map((c, i) => (
                <div key={c} className="flex items-center justify-between">
                  <span className="text-sm text-muted">{c}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/[0.08]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-teal"
                        style={{ width: `${70 + ((i * 7) % 25)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
            {ranked.map((s) => (
              <Card key={s.symbol} className="flex items-center gap-4 p-5">
                <ScoreRing score={s.riskScore} size={64} />
                <div>
                  <p className="font-mono text-sm font-semibold">{s.symbol}</p>
                  <p className="text-xs text-muted">{s.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/risk" size="lg">
            <ShieldAlert className="size-4" /> Explore the Risk Engine
          </Button>
        </div>
      </div>
    </section>
  );
}
