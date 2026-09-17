import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { MarketHeatmap } from "@/components/dashboard/market-heatmap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChangeValue } from "@/components/ui/change-value";
import { Sparkline } from "@/components/charts/sparkline";
import { AllocationPie } from "@/components/charts/allocation-pie";
import { api } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";
import { Brain, TrendingUp } from "lucide-react";

export default async function DashboardPage() {
  const [marketStats, stockTokens, aiSignals, newsFeed, portfolio] = await Promise.all([
    api.getMarketStats(),
    api.getStocks(),
    api.getSignals(),
    api.getNews(),
    api.getPortfolio(),
  ]);

  return (
    <div>
      <PageHeader title="Dashboard" description="Your Arc Chain market overview, at a glance." />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Market Heatmap</CardTitle>
              <span className="mono-tabular text-xs text-muted">
                Cap {formatCurrency(marketStats.totalMarketCap, { compact: true })}
              </span>
            </CardHeader>
            <CardContent>
              <MarketHeatmap stocks={stockTokens} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Trending Assets</CardTitle>
              <Link href="/stocks" className="text-xs text-teal hover:underline">View all</Link>
            </CardHeader>
            <CardContent className="space-y-1">
              {stockTokens.slice(0, 5).map((s) => (
                <Link
                  key={s.symbol}
                  href={`/stocks/${s.symbol}`}
                  className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-semibold">
                      {s.logoInitial}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{s.symbol}</p>
                      <p className="text-xs text-muted">{s.sector}</p>
                    </div>
                  </div>
                  <div className="hidden w-20 sm:block"><Sparkline data={s.sparkline} positive={s.change24h >= 0} height={28} /></div>
                  <p className="mono-tabular w-20 text-right text-sm">{formatCurrency(s.price)}</p>
                  <ChangeValue value={s.change24h} className="w-16 justify-end" />
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>News Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {newsFeed.map((n) => (
                <div key={n.id} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm">{n.title}</p>
                    <p className="mt-1 text-xs text-muted-2">{n.source}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-2">{n.timeAgo}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Portfolio Snapshot</CardTitle>
              <Link href="/portfolio" className="text-xs text-teal hover:underline">Details</Link>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="mono-tabular text-2xl font-semibold">{formatCurrency(portfolio.value)}</p>
                <ChangeValue value={portfolio.change24h} />
              </div>
              <div className="mt-4">
                <AllocationPie data={portfolio.allocation} size={140} />
              </div>
              <div className="mt-4 space-y-1.5">
                {portfolio.allocation.map((a) => (
                  <div key={a.name} className="flex items-center gap-2 text-xs">
                    <span className="size-2 rounded-full" style={{ background: a.color }} />
                    <span className="text-muted">{a.name}</span>
                    <span className="mono-tabular ml-auto">{a.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-1.5"><Brain className="size-3.5" /> AI Signals</CardTitle>
              <Link href="/insights" className="text-xs text-teal hover:underline">All signals</Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSignals.slice(0, 3).map((s) => (
                <div key={s.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <Badge variant={s.type === "bullish" ? "primary" : s.type === "bearish" ? "danger" : "default"}>
                      <TrendingUp className="size-3" /> ${s.symbol}
                    </Badge>
                    <span className="text-xs text-muted-2">{s.timeAgo}</span>
                  </div>
                  <p className="mt-2 text-xs leading-snug text-muted">{s.headline}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Watchlist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {stockTokens.slice(2, 6).map((s) => (
                <div key={s.symbol} className="flex items-center justify-between">
                  <span className="font-mono text-sm">{s.symbol}</span>
                  <div className="flex items-center gap-3">
                    <span className="mono-tabular text-sm">{formatCurrency(s.price)}</span>
                    <ChangeValue value={s.change24h} className="w-14 justify-end" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
