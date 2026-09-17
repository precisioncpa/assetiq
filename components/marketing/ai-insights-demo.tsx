import { Brain, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { SectionHeader } from "@/components/marketing/section-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const typeConfig = {
  bullish: { icon: TrendingUp, color: "text-primary", badge: "primary" as const, label: "Bullish" },
  bearish: { icon: TrendingDown, color: "text-danger", badge: "danger" as const, label: "Bearish" },
  neutral: { icon: Minus, color: "text-muted", badge: "default" as const, label: "Neutral" },
};

export async function AiInsightsDemo() {
  const aiSignals = await api.getSignals();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI Insights"
          title="Signals before the crowd sees them"
          description="AssetIQ's AI continuously scans price action, wallet flows, and sentiment to surface bullish and bearish signals, risk shifts, and emerging trends."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aiSignals.map((s) => {
            const cfg = typeConfig[s.type];
            const Icon = cfg.icon;
            return (
              <Card key={s.id} className="p-5">
                <div className="flex items-center justify-between">
                  <Badge variant={cfg.badge}>
                    <Icon className="size-3" /> {cfg.label}
                  </Badge>
                  <span className="text-xs text-muted-2">{s.timeAgo}</span>
                </div>
                <p className="mt-3 text-sm font-medium leading-snug">{s.headline}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{s.detail}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="font-mono text-xs font-semibold text-teal">${s.symbol}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1 w-16 overflow-hidden rounded-full bg-white/[0.08]">
                      <div className={cn("h-full rounded-full", cfg.color.replace("text-", "bg-"))} style={{ width: `${s.confidence}%` }} />
                    </div>
                    <span className="mono-tabular text-xs text-muted-2">{s.confidence}%</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href="/insights" size="lg">
            <Brain className="size-4" /> Explore AI Insights
          </Button>
        </div>
      </div>
    </section>
  );
}
