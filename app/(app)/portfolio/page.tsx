"use client";

import { useEffect, useState } from "react";
import { Wallet, Gauge, ShieldCheck, PieChart as PieIcon, TrendingUp, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChangeValue } from "@/components/ui/change-value";
import { AllocationPie } from "@/components/charts/allocation-pie";
import { Sparkline } from "@/components/charts/sparkline";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { useWallet } from "@/lib/use-wallet";
import type { PortfolioResponse } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const riskMetrics = [
  { label: "Concentration Risk", value: "Medium", icon: Gauge },
  { label: "Volatility", value: "18.2%", icon: ShieldCheck },
  { label: "Diversification Score", value: "76 / 100", icon: PieIcon },
  { label: "Portfolio Health Score", value: "84 / 100", icon: TrendingUp },
];

export default function PortfolioPage() {
  const { address } = useWallet();
  const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);

  useEffect(() => {
    if (!address) {
      setPortfolio(null);
      return;
    }
    let cancelled = false;
    fetch("/api/portfolio")
      .then((res) => res.json())
      .then((data: PortfolioResponse) => {
        if (!cancelled) setPortfolio(data);
      });
    return () => {
      cancelled = true;
    };
  }, [address]);

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border-strong py-24 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-teal/20">
          <Wallet className="size-7 text-primary" />
        </div>
        <h2 className="mt-5 text-xl font-semibold">Connect your wallet to view Portfolio Intelligence</h2>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Supports MetaMask, Rabby, Coinbase Wallet, and Arc Wallet on Arc Chain.
        </p>
        <div className="mt-6"><ConnectWalletButton /></div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center text-muted">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="mt-3 text-sm">Loading portfolio…</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Portfolio Intelligence" description="Your on-chain holdings, allocation, and risk — in one place." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted">Portfolio Value</p>
              <p className="mono-tabular mt-1 text-3xl font-semibold">{formatCurrency(portfolio.value)}</p>
            </div>
            <ChangeValue value={portfolio.change24h} />
          </div>
          <div className="mt-4 h-20">
            <Sparkline data={portfolio.history} positive height={80} />
          </div>
          <div className="mt-4">
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
        </div>
      </div>

      <Card className="mt-4 overflow-hidden p-0">
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-5 py-3 font-medium">Asset</th>
                <th className="px-5 py-3 font-medium">Quantity</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Value</th>
                <th className="px-5 py-3 font-medium">24h</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.holdings.map((h) => (
                <tr key={h.symbol} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="flex items-center gap-2.5 px-5 py-4">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-semibold">
                      {h.logoInitial}
                    </div>
                    <div>
                      <p className="font-medium">{h.symbol}</p>
                      <p className="text-xs text-muted">{h.name}</p>
                    </div>
                  </td>
                  <td className="mono-tabular px-5 py-4">{h.qty}</td>
                  <td className="mono-tabular px-5 py-4">{formatCurrency(h.price)}</td>
                  <td className="mono-tabular px-5 py-4">{formatCurrency(h.price * h.qty)}</td>
                  <td className="px-5 py-4"><ChangeValue value={h.change24h} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" onClick={() => {}}>
          <Wallet className="size-4" /> {address.slice(0, 6)}…{address.slice(-4)} connected
        </Button>
      </div>
    </div>
  );
}
