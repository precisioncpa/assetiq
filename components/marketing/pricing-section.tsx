import { Check } from "lucide-react";
import { SectionHeader } from "@/components/marketing/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";
import { cn } from "@/lib/utils";

export async function PricingSection() {
  const pricingTiers = await api.getPricingTiers();

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Pricing"
          title="Plans built for every kind of investor"
          description="Start free. Upgrade when you need an edge. Or stake AIQ and skip the subscription entirely."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "flex flex-col p-6",
                tier.highlight && "border-primary/40 shadow-[0_0_40px_rgba(0,230,160,0.12)]"
              )}
            >
              {tier.highlight && (
                <span className="mb-3 inline-block w-fit rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted">{tier.description}</p>
              <div className="mt-5">
                {tier.price !== null ? (
                  <span className="text-3xl font-semibold">
                    ${tier.price}
                    <span className="text-sm font-normal text-muted">/{tier.period}</span>
                  </span>
                ) : (
                  <span className="text-xl font-semibold">{tier.period}</span>
                )}
              </div>
              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-6" variant={tier.highlight ? "primary" : "outline"} href="/dashboard">
                {tier.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
