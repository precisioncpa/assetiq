import { Coins, Lock, Vote, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/marketing/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Sparkles, title: "Premium Features", desc: "Unlock advanced charting, real-time alerts, and deeper analytics across every product." },
  { icon: Lock, title: "AI Reports", desc: "Access institutional-grade AI research reports generated daily for top tokenized assets." },
  { icon: Vote, title: "Governance Access", desc: "Vote on new features, treasury allocation, ecosystem grants, and protocol integrations." },
];

export function TokenUtility() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 -z-10 grid-overlay opacity-40" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AIQ Token Utility"
          title="Stake AIQ. Unlock the full terminal."
          description="AIQ is the utility and governance token that powers the AssetIQ ecosystem."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((b) => (
            <Card key={b.title} className="p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-teal/20">
                <b.icon className="size-5 text-primary" />
              </div>
              <h3 className="mt-4 font-medium">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.desc}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6 flex flex-col items-center justify-between gap-6 p-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal">
              <Coins className="size-7 text-black" />
            </div>
            <div>
              <p className="text-lg font-medium">Ready to stake $AIQ?</p>
              <p className="text-sm text-muted">Become an AssetIQ Staker and unlock Pro-tier tools with no subscription.</p>
            </div>
          </div>
          <Button size="lg" href="/dashboard">Stake AIQ</Button>
        </Card>
      </div>
    </section>
  );
}
