"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="waitlist" className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="glow-border card-surface relative overflow-hidden rounded-2xl p-10 text-center sm:p-14">
          <div className="grid-overlay absolute inset-0 -z-10 opacity-30" />
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Join the <span className="text-gradient">AssetIQ</span> waitlist
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Be first to get access to new intelligence products, AIQ token updates, and early Pro-tier invites.
          </p>

          {submitted ? (
            <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
              <CheckCircle2 className="size-4" /> You&apos;re on the list. Watch your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 flex-1 rounded-lg border border-border-strong bg-white/[0.03] px-4 text-sm outline-none placeholder:text-muted-2 focus:border-primary/50"
              />
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Joining…" : "Join Waitlist"} <ArrowRight className="size-4" />
              </Button>
            </form>
          )}
          {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        </div>
      </div>
    </section>
  );
}
