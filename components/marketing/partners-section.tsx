import { SectionHeader } from "@/components/marketing/section-header";

const partners = ["Arc Chain", "Chainlink", "Alchemy", "Morpho", "Wagmi", "RainbowKit", "Supabase", "OpenAI"];

export function PartnersSection() {
  return (
    <section id="partners" className="border-y border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Ecosystem" title="Built on the infrastructure investors trust" />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {partners.map((p) => (
            <span key={p} className="text-lg font-semibold text-muted-2 transition-colors hover:text-foreground">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
