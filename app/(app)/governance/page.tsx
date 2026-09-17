import { PageHeader } from "@/components/dashboard/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { formatCompactNumber, cn } from "@/lib/utils";
import { Vote } from "lucide-react";

const statusVariant = { Active: "primary", Passed: "teal", Failed: "danger", Pending: "default" } as const;

export default async function GovernancePage() {
  const governanceProposals = await api.getGovernanceProposals();

  return (
    <div>
      <PageHeader
        title="Governance"
        description="AIQ holders vote on new features, treasury allocation, ecosystem grants, and protocol integrations."
        action={<Button size="sm"><Vote className="size-4" /> New Proposal</Button>}
      />

      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="p-5 text-center">
          <p className="mono-tabular text-2xl font-semibold">4</p>
          <p className="mt-1 text-xs text-muted">Total Proposals</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="mono-tabular text-2xl font-semibold text-primary">2</p>
          <p className="mt-1 text-xs text-muted">Active Votes</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="mono-tabular text-2xl font-semibold">{formatCompactNumber(41_600_000)}</p>
          <p className="mt-1 text-xs text-muted">AIQ Staked for Voting</p>
        </Card>
        <Card className="p-5 text-center">
          <p className="mono-tabular text-2xl font-semibold">62%</p>
          <p className="mt-1 text-xs text-muted">Avg Participation</p>
        </Card>
      </div>

      <div className="space-y-3">
        {governanceProposals.map((p) => {
          const total = p.votesFor + p.votesAgainst;
          const forPct = (p.votesFor / total) * 100;
          return (
            <Card key={p.id} className="p-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-2">{p.id}</span>
                    <Badge variant={statusVariant[p.status]}>{p.status}</Badge>
                    <Badge>{p.category}</Badge>
                  </div>
                  <p className="mt-1.5 font-medium">{p.title}</p>
                </div>
                <span className="shrink-0 text-xs text-muted">{p.endsIn}</span>
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs text-muted">
                  <span className="text-primary">For {forPct.toFixed(0)}% · {formatCompactNumber(p.votesFor)}</span>
                  <span className="text-danger">Against {(100 - forPct).toFixed(0)}% · {formatCompactNumber(p.votesAgainst)}</span>
                </div>
                <div className="flex h-2 overflow-hidden rounded-full bg-danger/30">
                  <div className={cn("h-full bg-primary")} style={{ width: `${forPct}%` }} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle>How Governance Works</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted leading-relaxed">
            Stake AIQ to receive voting power proportional to your stake. Proposals require a minimum quorum to pass,
            and passed proposals are queued for implementation by the AssetIQ core team and ecosystem contributors.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
