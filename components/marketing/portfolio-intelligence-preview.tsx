import { Wallet, ShieldCheck, PieChart as PieIcon, Gauge } from "lucide-react";
import { SectionHeader } from "@/components/marketing/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChangeValue } from "@/components/ui/change-value";
import { AllocationPie } from "@/components/charts/allocation-pie";
import { api } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";

const riskMetrics = [
  { label: "Concentration Risk", value: "Medium", icon: Gauge },
  { label: "Volatility", value: "18.2%", icon: ShieldCheck },
  { label: "Diversification Score", value: "76 / 100", icon: PieIcon },
  { label: "Portfolio Health Score", value: "84 / 100", icon: ShieldCheck },
];

export async function PortfolioIntelligencePreview() {
  const portfolio = await api.getPortfolio();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portfolio Intelligence"
          title="One dashboard for your entire on-chain portfolio"
          description="Connect MetaMask, Rabby, Coinbase Wallet, or Arc Wallet to track allocation, performance, and risk across every tokenized asset you hold."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">Portfolio Value</p>
                <p className="mono-tabular mt-1 text-3xl font-semibold">{formatCurrency(portfolio.value)}</p>
              </div>
              <ChangeValue value={portfolio.change24h} />
            </div>
            <div className="mt-6">
              <AllocationPie data={portfolio.allocation} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
              {portfolio.allocation.map((a) => (
                <div key={a.name} className="flex items-center gap-2 text-xs">
                  <span className="size-2 rounded-full" style={{ background: a.color }} />
                  <span className="text-muted">{a.name}</span>
                  <span className="mono-tabular ml-auto font-medium">{a.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
            {riskMetrics.map((m) => (
              <Card key={m.label} className="flex flex-col justify-between p-5">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <m.icon className="size-4 text-teal" />
                  {m.label}
                </div>
                <p className="mono-tabular mt-4 text-2xl font-semibold">{m.value}</p>
              </Card>
            ))}
            <Card className="col-span-full flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
              <div>
                <p className="font-medium">Ready to connect your wallet?</p>
                <p className="mt-1 text-sm text-muted">See your full risk-adjusted portfolio breakdown in seconds.</p>
              </div>
              <Button href="/portfolio">
                <Wallet className="size-4" /> Open Portfolio Intelligence
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
