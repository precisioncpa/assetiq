"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero({ dashboardMock }: { dashboardMock: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 sm:pt-28">
      <div className="grid-overlay absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border-strong bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted"
          >
            <Sparkles className="size-3.5 text-primary" />
            Built for Arc Chain
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl"
          >
            The Intelligence Layer for{" "}
            <span className="text-gradient">On-Chain Investing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted"
          >
            Real-time analytics, AI-powered insights, risk scoring, portfolio
            intelligence, and tokenized stock research built for Arc
            Chain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" href="/dashboard">
              Launch Dashboard <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" href="#waitlist">
              Join Waitlist
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mt-16"
        >
          <div
            className="pointer-events-none absolute -inset-x-20 -top-10 -z-10 h-72 opacity-60 blur-3xl"
            style={{ background: "var(--gradient-primary)" }}
          />
          {dashboardMock}
        </motion.div>
      </div>
    </section>
  );
}
