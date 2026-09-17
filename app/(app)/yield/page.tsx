import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";

const riskVariant = { Low: "primary", Medium: "warning", High: "danger" } as const;

export default async function YieldPage() {
  const yieldOpportunities = await api.getYieldOpportunities();
  const totalTvl = yieldOpportunities.reduce((sum, y) => sum + y.tvl, 0);
  const avgApr = yieldOpportunities.reduce((sum, y) => sum + y.apr, 0) / yieldOpportunities.length;

  return (
    <div>
      <PageHeader title="Yield Intelligence" description="Lending markets, liquidity pools, vaults, and staking across Arc Chain DeFi." />

      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card className="p-5 text-center">
          <p className="mono-tabular text-2xl font-semibold">{formatCurrency(totalTvl, { compact: true })}</p>
          <p className="mt-1 text-xs text-muted">Total TVL Tracked</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="mono-tabular text-2xl font-semibold text-primary">{avgApr.toFixed(1)}%</p>
          <p className="mt-1 text-xs text-muted">Average APR</p>
        </Card>
        <Card className="col-span-2 p-5 text-center sm:col-span-1">
          <p className="mono-tabular text-2xl font-semibold">{yieldOpportunities.length}</p>
          <p className="mt-1 text-xs text-muted">Active Opportunities</p>
        </Card>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-5 py-3 font-medium">Protocol</th>
                <th className="px-5 py-3 font-medium">Asset</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">APR</th>
                <th className="px-5 py-3 font-medium">TVL</th>
                <th className="px-5 py-3 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {yieldOpportunities.map((y) => (
                <tr key={y.id} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-4 font-medium">{y.protocol}</td>
                  <td className="mono-tabular px-5 py-4">{y.asset}</td>
                  <td className="px-5 py-4"><Badge>{y.type}</Badge></td>
                  <td className="mono-tabular px-5 py-4 font-semibold text-primary">{y.apr}%</td>
                  <td className="mono-tabular px-5 py-4">{formatCurrency(y.tvl, { compact: true })}</td>
                  <td className="px-5 py-4"><Badge variant={riskVariant[y.risk]}>{y.risk}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
