import Link from "next/link";
import { TrendingDown, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/marketing/section-header";
import { Card } from "@/components/ui/card";
import { ChangeValue } from "@/components/ui/change-value";
import { Sparkline } from "@/components/charts/sparkline";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

export async function LiveMarketOverview() {
  const [marketStats, stockTokens] = await Promise.all([api.getMarketStats(), api.getStocks()]);

  const stats = [
    { label: "Total Market Cap", value: formatCurrency(marketStats.totalMarketCap, { compact: true }) },
    { label: "24h Volume", value: formatCurrency(marketStats.totalVolume24h, { compact: true }) },
    { label: "Active Investors", value: formatCompactNumber(marketStats.activeInvestors) },
    { label: "Stock Tokens", value: marketStats.totalStockTokens.toString() },
    { label: "TVL", value: formatCurrency(marketStats.tvl, { compact: true }) },
  ];

  const sorted = [...stockTokens].sort((a, b) => b.change24h - a.change24h);
  const gainers = sorted.slice(0, 3);
  const losers = sorted.slice(-3).reverse();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Live Market Data"
          title="Live Market Overview"
          description="Stock-token pricing sourced from Arc APIs and Chainlink data feeds, refreshed in real time."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {stats.map((s) => (
            <Card key={s.label} className="p-4 text-center sm:p-5">
              <p className="mono-tabular text-xl font-semibold sm:text-2xl">{s.value}</p>
              <p className="mt-1 text-xs text-muted">{s.label}</p>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
              <TrendingUp className="size-4" /> Top Gainers
            </div>
            <div className="space-y-1">
              {gainers.map((s) => (
                <TickerRow key={s.symbol} symbol={s.symbol} initial={s.logoInitial} price={s.price} change={s.change24h} />
              ))}
            </div>
          </Card>
          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-danger">
              <TrendingDown className="size-4" /> Top Losers
            </div>
            <div className="space-y-1">
              {losers.map((s) => (
                <TickerRow key={s.symbol} symbol={s.symbol} initial={s.logoInitial} price={s.price} change={s.change24h} />
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Stock Token Tracker</h3>
            <Button href="/stocks" variant="ghost" size="sm">View all →</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stockTokens.slice(0, 6).map((s) => (
              <Link key={s.symbol} href={`/stocks/${s.symbol}`}>
                <Card className="p-4 transition-colors hover:border-primary/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06] text-sm font-semibold">
                        {s.logoInitial}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{s.symbol}</p>
                        <p className="text-xs text-muted">{s.sector}</p>
                      </div>
                    </div>
                    <ChangeValue value={s.change24h} />
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <p className="mono-tabular text-lg font-semibold">{formatCurrency(s.price)}</p>
                    <div className="h-8 w-24"><Sparkline data={s.sparkline} positive={s.change24h >= 0} /></div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TickerRow({
  symbol,
  initial,
  price,
  change,
}: {
  symbol: string;
  initial: string;
  price: number;
  change: number;
}) {
  return (
    <Link href={`/stocks/${symbol}`} className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-white/[0.03]">
      <div className="flex items-center gap-2.5">
        <div className="flex size-7 items-center justify-center rounded-md bg-white/[0.06] text-xs font-semibold">
          {initial}
        </div>
        <p className="text-sm font-medium">{symbol}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="mono-tabular text-sm">{formatCurrency(price)}</p>
        <ChangeValue value={change} className="w-16 justify-end" />
      </div>
    </Link>
  );
}
