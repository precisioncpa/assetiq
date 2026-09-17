import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { ChangeValue } from "@/components/ui/change-value";
import { api } from "@/lib/api-client";
import { formatCurrency, truncateAddress } from "@/lib/utils";
import { Fish } from "lucide-react";

export default async function WhalesPage() {
  const whales = await api.getWhales();

  return (
    <div>
      <PageHeader title="Whale Intelligence" description="Smart money tracker — top investors, large wallets, and institutional movements." />

      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <p className="mono-tabular text-2xl font-semibold">{whales.length}</p>
          <p className="mt-1 text-xs text-muted">Tracked Wallets</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="mono-tabular text-2xl font-semibold">
            {formatCurrency(whales.reduce((s, w) => s + w.portfolioValue, 0), { compact: true })}
          </p>
          <p className="mt-1 text-xs text-muted">Combined Value</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="mono-tabular text-2xl font-semibold text-primary">
            {(whales.reduce((s, w) => s + w.winRate, 0) / whales.length).toFixed(0)}%
          </p>
          <p className="mt-1 text-xs text-muted">Avg Win Rate</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="mono-tabular text-2xl font-semibold text-teal">
            {(whales.reduce((s, w) => s + w.score, 0) / whales.length).toFixed(0)}
          </p>
          <p className="mt-1 text-xs text-muted">Avg Wallet Score</p>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-5 py-3 font-medium">Wallet</th>
                <th className="px-5 py-3 font-medium">Wallet Score</th>
                <th className="px-5 py-3 font-medium">Portfolio Value</th>
                <th className="px-5 py-3 font-medium">30d P&L</th>
                <th className="px-5 py-3 font-medium">Top Holdings</th>
                <th className="px-5 py-3 font-medium">Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {whales.map((w) => (
                <tr key={w.address} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-teal/20">
                        <Fish className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{w.label ?? "Unlabeled Wallet"}</p>
                        <p className="mono-tabular text-xs text-muted-2">{truncateAddress(w.address)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="mono-tabular font-semibold text-primary">{w.score}</span></td>
                  <td className="mono-tabular px-5 py-4">{formatCurrency(w.portfolioValue, { compact: true })}</td>
                  <td className="px-5 py-4"><ChangeValue value={w.pnl30d} /></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      {w.topHoldings.map((h) => (
                        <span key={h} className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-xs">{h}</span>
                      ))}
                    </div>
                  </td>
                  <td className="mono-tabular px-5 py-4">{w.winRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
