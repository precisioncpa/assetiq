import { SectionHeader } from "@/components/marketing/section-header";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { api } from "@/lib/api-client";

export async function FaqSection() {
  const faqs = await api.getFaqs();

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
