"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-10 space-y-3">
      {faqs.map((f, i) => {
        const open = openIndex === i;
        return (
          <div key={f.q} className="card-surface rounded-xl">
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium">{f.q}</span>
              <ChevronDown className={cn("size-4 shrink-0 text-muted transition-transform", open && "rotate-180")} />
            </button>
            {open && <p className="px-5 pb-4 text-sm leading-relaxed text-muted">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
