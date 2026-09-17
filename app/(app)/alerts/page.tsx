import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { Bell, Plus, TrendingUp, ShieldAlert, Fish } from "lucide-react";

const iconForType = { Price: TrendingUp, Risk: ShieldAlert, Whale: Fish, Volatility: TrendingUp };

export default async function AlertsPage() {
  const alerts = await api.getAlerts();

  return (
    <div>
      <PageHeader
        title="Alerts"
        description="Custom notifications for price moves, risk changes, and whale activity."
        action={<Button size="sm"><Plus className="size-4" /> New Alert</Button>}
      />

      <Card>
        <CardHeader className="flex flex-row items-center gap-1.5">
          <Bell className="size-4" /> <CardTitle>Active Alerts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {alerts.map((a) => {
            const Icon = iconForType[a.type];
            return (
            <div key={a.id} className="flex items-center justify-between rounded-lg border border-border p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06]">
                  <Icon className="size-4 text-teal" />
                </div>
                <div>
                  <p className="text-sm font-medium">{a.label}</p>
                  <Badge className="mt-1">{a.type}</Badge>
                </div>
              </div>
              <span className={`text-xs font-medium ${a.active ? "text-primary" : "text-muted-2"}`}>
                {a.active ? "Active" : "Paused"}
              </span>
            </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
