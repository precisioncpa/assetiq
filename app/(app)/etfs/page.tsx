import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChangeValue } from "@/components/ui/change-value";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";

export default async function EtfsPage() {
  const etfBaskets = await api.getEtfBaskets();

  return (
    <div>
      <PageHeader
        title="ETF Explorer"
        description="Arc ETFs and community-created tokenized stock baskets."
        action={<Button size="sm"><Plus className="size-4" /> Create Basket</Button>}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {etfBaskets.map((etf) => (
          <Card key={etf.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{etf.name}</p>
                <p className="font-mono text-xs text-muted">${etf.symbol}</p>
              </div>
              <Badge variant={etf.creator === "Arc" ? "primary" : "teal"}>{etf.creator}</Badge>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-muted">AUM</p>
                <p className="mono-tabular text-lg font-semibold">{formatCurrency(etf.aum, { compact: true })}</p>
              </div>
              <ChangeValue value={etf.change24h} />
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs text-muted">
                <span>YTD Performance</span>
                <span className="mono-tabular text-primary">+{etf.performanceYtd}%</span>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full">
                {etf.holdings.map((h, i) => (
                  <div
                    key={h.symbol}
                    style={{ width: `${h.weight}%`, background: `hsl(${160 + i * 20}, 70%, ${45 + i * 4}%)` }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {etf.holdings.map((h) => (
                <span key={h.symbol} className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-xs">
                  {h.symbol} {h.weight}%
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle>Build Your Own Basket</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted">
            Combine any tokenized stocks into a custom weighted basket, publish it on-chain, and earn a share of
            management fees as other investors mirror your strategy.
          </p>
          <Button className="mt-4" variant="outline"><Plus className="size-4" /> Start Building</Button>
        </CardContent>
      </Card>
    </div>
  );
}
