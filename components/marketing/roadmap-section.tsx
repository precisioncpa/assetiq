import { Check, Loader2, Circle } from "lucide-react";
import { SectionHeader } from "@/components/marketing/section-header";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";

const statusConfig = {
  done: { icon: Check, color: "text-primary bg-primary/15", label: "Shipped" },
  active: { icon: Loader2, color: "text-teal bg-teal/15", label: "In Progress" },
  upcoming: { icon: Circle, color: "text-muted bg-white/[0.06]", label: "Upcoming" },
};

export async function RoadmapSection() {
  const roadmap = await api.getRoadmap();

  return (
    <section id="roadmap" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Roadmap" title="Where AssetIQ is headed" />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((r) => {
            const cfg = statusConfig[r.status];
            return (
              <Card key={r.quarter} className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-2">{r.quarter}</span>
                  <span className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", cfg.color)}>
                    <cfg.icon className={cn("size-3", r.status === "active" && "animate-spin")} />
                    {cfg.label}
                  </span>
                </div>
                <h3 className="mt-3 font-medium">{r.title}</h3>
                <ul className="mt-4 space-y-2">
                  {r.items.map((item) => (
                    <li key={item} className="text-sm text-muted leading-snug">• {item}</li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
