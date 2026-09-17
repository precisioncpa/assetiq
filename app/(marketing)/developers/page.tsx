import { SectionHeader } from "@/components/marketing/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, LineChart, ShieldAlert, Wallet, Key, Zap } from "lucide-react";

const apis = [
  {
    icon: DollarSign,
    name: "Price API",
    desc: "Real-time and historical pricing for every tokenized stock, ETF, and RWA on Arc Chain.",
    endpoint: "GET /v1/price/{symbol}",
  },
  {
    icon: LineChart,
    name: "Analytics API",
    desc: "Volume, liquidity, holder distribution, and trading activity for any tracked asset.",
    endpoint: "GET /v1/analytics/{symbol}",
  },
  {
    icon: ShieldAlert,
    name: "Risk API",
    desc: "Programmatic access to the AssetIQ Score™ and its underlying components.",
    endpoint: "GET /v1/risk/{symbol}",
  },
  {
    icon: Wallet,
    name: "Portfolio API",
    desc: "Read-only portfolio valuation, allocation, and risk metrics for any connected wallet.",
    endpoint: "GET /v1/portfolio/{address}",
  },
];

const codeSample = `curl https://api.assetiq.xyz/v1/risk/NVDA \\
  -H "Authorization: Bearer $AIQ_API_KEY"

{
  "symbol": "NVDA",
  "assetIQScore": 91,
  "risk": "Very Low",
  "components": {
    "liquidity": 94,
    "volume": 90,
    "volatility": 88,
    "holderConcentration": 85,
    "marketActivity": 92,
    "historicalPerformance": 89
  }
}`;

export default function DevelopersPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="API Platform"
          title="Build on AssetIQ"
          description="Programmatic access to the same pricing, analytics, and risk data that powers the AssetIQ terminal — built on top of Arc's stock-token APIs and Chainlink data feeds."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {apis.map((api) => (
              <Card key={api.name} className="p-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-teal/20">
                  <api.icon className="size-5 text-primary" />
                </div>
                <h3 className="mt-3 font-medium">{api.name}</h3>
                <p className="mt-1.5 text-sm text-muted">{api.desc}</p>
                <p className="mt-3 font-mono text-xs text-teal">{api.endpoint}</p>
              </Card>
            ))}
          </div>

          <Card className="overflow-hidden p-0">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
              <span className="size-2.5 rounded-full bg-danger/70" />
              <span className="size-2.5 rounded-full bg-warning/70" />
              <span className="size-2.5 rounded-full bg-primary/70" />
              <span className="ml-2 text-xs text-muted">terminal</span>
            </div>
            <pre className="overflow-x-auto p-5 text-xs leading-relaxed">
              <code className="font-mono text-muted">
                {codeSample.split("\n").map((line, i) => (
                  <div key={i} className={line.startsWith("curl") ? "text-teal" : ""}>{line}</div>
                ))}
              </code>
            </pre>
          </Card>
        </div>

        <Card className="mt-6 flex flex-col items-center justify-between gap-6 p-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal">
              <Key className="size-6 text-black" />
            </div>
            <div>
              <p className="font-medium">Get your API key</p>
              <p className="mt-1 text-sm text-muted">Free tier includes 10,000 requests/month. Premium unlocks unlimited access.</p>
            </div>
          </div>
          <Button size="lg" href="/dashboard"><Zap className="size-4" /> Get API Access</Button>
        </Card>
      </div>
    </div>
  );
}
