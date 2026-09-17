import { PageHeader } from "@/components/dashboard/page-header";
import { Card } from "@/components/ui/card";
import { ChangeValue } from "@/components/ui/change-value";
import { Sparkline } from "@/components/charts/sparkline";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";
import { Plus, Star } from "lucide-react";

export default async function WatchlistsPage() {
  const watched = await api.getWatchlist();

  return (
    <div>
      <PageHeader
        title="Watchlists"
        description="Assets you're tracking across Arc Chain."
        action={<Button size="sm"><Plus className="size-4" /> Add Asset</Button>}
      />

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted">
                <th className="px-5 py-3 font-medium">Asset</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">24h</th>
                <th className="px-5 py-3 font-medium">Chart</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {watched.map((s) => (
                <tr key={s.symbol} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-semibold">
                        {s.logoInitial}
                      </div>
                      <p className="font-medium">{s.symbol}</p>
                    </div>
                  </td>
                  <td className="mono-tabular px-5 py-4">{formatCurrency(s.price)}</td>
                  <td className="px-5 py-4"><ChangeValue value={s.change24h} /></td>
                  <td className="w-28 px-5 py-4"><Sparkline data={s.sparkline} positive={s.change24h >= 0} /></td>
                  <td className="px-5 py-4 text-right">
                    <Star className="ml-auto size-4 fill-primary text-primary" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
