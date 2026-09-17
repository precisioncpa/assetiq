import Link from "next/link";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { ChangeValue } from "@/components/ui/change-value";
import { Sparkline } from "@/components/charts/sparkline";
import { api } from "@/lib/api-client";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

export default async function StocksPage() {
  const stockTokens = await api.getStocks();

  return (
    <div>
      <PageHeader title="Stock Intelligence" description="Every tokenized stock on Arc Chain, with live pricing and AssetIQ scoring." />

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-5 py-3 font-medium">Asset</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">24h</th>
                <th className="px-5 py-3 font-medium">Market Cap</th>
                <th className="px-5 py-3 font-medium">Volume (24h)</th>
                <th className="px-5 py-3 font-medium">Holders</th>
                <th className="px-5 py-3 font-medium">AssetIQ Score</th>
                <th className="px-5 py-3 font-medium">Chart</th>
              </tr>
            </thead>
            <tbody>
              {stockTokens.map((s) => (
                <tr key={s.symbol} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <Link href={`/stocks/${s.symbol}`} className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-semibold">
                        {s.logoInitial}
                      </div>
                      <div>
                        <p className="font-medium">{s.symbol}</p>
                        <p className="text-xs text-muted">{s.sector}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="mono-tabular px-5 py-4">{formatCurrency(s.price)}</td>
                  <td className="px-5 py-4"><ChangeValue value={s.change24h} /></td>
                  <td className="mono-tabular px-5 py-4">{formatCurrency(s.marketCap, { compact: true })}</td>
                  <td className="mono-tabular px-5 py-4">{formatCurrency(s.volume24h, { compact: true })}</td>
                  <td className="mono-tabular px-5 py-4">{formatCompactNumber(s.holders)}</td>
                  <td className="px-5 py-4">
                    <span className="mono-tabular font-semibold text-primary">{s.riskScore}</span>
                  </td>
                  <td className="w-28 px-5 py-4"><Sparkline data={s.sparkline} positive={s.change24h >= 0} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
