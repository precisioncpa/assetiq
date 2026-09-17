import { notFound } from "next/navigation";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChangeValue } from "@/components/ui/change-value";
import { ScoreRing } from "@/components/charts/score-ring";
import { PriceAreaChart } from "@/components/charts/price-area-chart";
import { getStocks } from "@/lib/db";
import { api } from "@/lib/api-client";
import { formatCurrency, formatCompactNumber, truncateAddress } from "@/lib/utils";
import { Star, Bell } from "lucide-react";

const corporateActions = [
  { type: "Dividend", detail: "$0.25 per share declared", date: "Oct 12, 2026" },
  { type: "Stock Split", detail: "No recent splits", date: "—" },
  { type: "Merger", detail: "No pending corporate actions", date: "—" },
];

const walletDistribution = [
  { label: "Whales (>$1M)", pct: 34 },
  { label: "Institutions", pct: 22 },
  { label: "Retail", pct: 44 },
];

export function generateStaticParams() {
  return getStocks().map((s) => ({ symbol: s.symbol }));
}

export default async function StockDetailPage({ params }: PageProps<"/stocks/[symbol]">) {
  const { symbol } = await params;
  const stock = await api.getStock(symbol);
  if (!stock) notFound();

  return (
    <div>
      <PageHeader
        title={`${stock.symbol} · ${stock.name}`}
        description={stock.sector}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Star className="size-4" /> Watchlist</Button>
            <Button variant="outline" size="sm"><Bell className="size-4" /> Alert</Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="mono-tabular text-3xl font-semibold">{formatCurrency(stock.price)}</p>
                <ChangeValue value={stock.change24h} className="mt-1" />
              </div>
              <div className="text-right text-xs text-muted">
                <p className="font-mono">{stock.contract}</p>
                <p className="mt-1">Arc Chain · ERC-20</p>
              </div>
            </div>
            <div className="mt-4">
              <PriceAreaChart data={stock.sparkline} positive={stock.change24h >= 0} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 sm:grid-cols-4">
              <Stat label="Market Cap" value={formatCurrency(stock.marketCap, { compact: true })} />
              <Stat label="24h Volume" value={formatCurrency(stock.volume24h, { compact: true })} />
              <Stat label="Holders" value={formatCompactNumber(stock.holders)} />
              <Stat label="Supply" value={formatCompactNumber(stock.supply)} />
            </div>
          </Card>

          <Card>
            <CardHeader><CardTitle>Trading Activity</CardTitle></CardHeader>
            <CardContent>
              <div className="mb-5">
                <div className="mb-1.5 flex justify-between text-xs text-muted">
                  <span>Buy / Sell Ratio</span>
                  <span className="mono-tabular">{stock.buyRatio}% buy</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-danger/30">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${stock.buyRatio}%` }} />
                </div>
              </div>
              <p className="mb-2 text-xs text-muted">Wallet Distribution</p>
              <div className="space-y-2">
                {walletDistribution.map((w) => (
                  <div key={w.label} className="flex items-center justify-between">
                    <span className="text-sm text-muted">{w.label}</span>
                    <span className="mono-tabular text-sm font-medium">{w.pct}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg border border-border p-3">
                <span className="text-sm text-muted">Whale Holdings</span>
                <span className="mono-tabular text-sm font-semibold text-teal">{stock.whaleHoldingsPct}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Corporate Actions</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {corporateActions.map((c) => (
                <div key={c.type} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{c.type}</p>
                    <p className="text-xs text-muted">{c.detail}</p>
                  </div>
                  <span className="text-xs text-muted-2">{c.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="flex items-center gap-4 p-5">
            <ScoreRing score={stock.riskScore} size={72} />
            <div>
              <p className="text-xs text-muted">AssetIQ Score™</p>
              <p className="text-sm font-medium">{stock.riskScore >= 80 ? "Very Low Risk" : stock.riskScore >= 60 ? "Low Risk" : "Moderate Risk"}</p>
            </div>
          </Card>
          <Card className="p-5">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="mono-tabular text-lg font-semibold text-primary">{stock.riskScore}</p>
                <p className="text-xs text-muted">Risk</p>
              </div>
              <div>
                <p className="mono-tabular text-lg font-semibold text-teal">{stock.opportunityScore}</p>
                <p className="text-xs text-muted">Opportunity</p>
              </div>
              <div>
                <p className="mono-tabular text-lg font-semibold" style={{ color: "var(--warning)" }}>{stock.momentumScore}</p>
                <p className="text-xs text-muted">Momentum</p>
              </div>
            </div>
          </Card>
          <Card>
            <CardHeader><CardTitle>Top Holders</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="mono-tabular text-muted">{truncateAddress(`0x${(i + 1).toString().repeat(8)}a1b2c3d4e5f6`)}</span>
                  <Badge>{(12 - i * 2.4).toFixed(1)}%</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="mono-tabular mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
