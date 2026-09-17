import { Fish } from "lucide-react";
import { SectionHeader } from "@/components/marketing/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChangeValue } from "@/components/ui/change-value";
import { api } from "@/lib/api-client";
import { formatCurrency, truncateAddress } from "@/lib/utils";

export async function WhaleTrackingPreview() {
  const whales = await api.getWhales();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Whale Intelligence"
          title="Follow smart money in real time"
          description="Track top-performing wallets, institutional movements, and large trades across every stock token on Arc Chain."
        />

        <Card className="mt-12 overflow-hidden p-0">
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
                      <p className="font-medium">{w.label ?? "Unlabeled Wallet"}</p>
                      <p className="mono-tabular text-xs text-muted-2">{truncateAddress(w.address)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="mono-tabular font-semibold text-primary">{w.score}</span>
                    </td>
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

        <div className="mt-10 flex justify-center">
          <Button href="/whales" size="lg">
            <Fish className="size-4" /> Open Whale Intelligence
          </Button>
        </div>
      </div>
    </section>
  );
}
