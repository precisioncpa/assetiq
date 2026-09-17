"use client";

import { useState } from "react";
import { Bell, Menu, Search, Sparkles, X } from "lucide-react";
import { ConnectWalletButton } from "@/components/wallet/connect-wallet-button";
import { Sidebar } from "@/components/dashboard/sidebar";
import { LogoMark } from "@/components/icons/logo-mark";

export function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
        <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu className="size-5" />
        </button>

        <div className="relative hidden max-w-sm flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-2" />
          <input
            placeholder="Search assets, wallets, proposals…"
            className="h-9 w-full rounded-lg border border-border bg-white/[0.03] pl-9 pr-3 text-sm outline-none placeholder:text-muted-2 focus:border-primary/40"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setAiOpen((o) => !o)}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-border-strong bg-white/[0.02] px-3 text-sm hover:bg-white/[0.06]"
          >
            <Sparkles className="size-4 text-primary" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>
          <button className="relative flex size-9 items-center justify-center rounded-lg hover:bg-white/[0.06]">
            <Bell className="size-4.5" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </button>
          <ConnectWalletButton size="sm" />
        </div>
      </header>

      {aiOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-80 rounded-2xl glass p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="size-4 text-primary" /> AssetIQ Assistant
            </div>
            <button onClick={() => setAiOpen(false)}>
              <X className="size-4 text-muted" />
            </button>
          </div>
          <p className="mt-3 text-xs text-muted leading-relaxed">
            Ask me about any tokenized stock, risk score, or portfolio move — AI chat wiring connects here once an
            LLM API key is configured.
          </p>
          <input
            placeholder="Ask about NVDA risk…"
            className="mt-3 h-9 w-full rounded-lg border border-border bg-white/[0.03] px-3 text-sm outline-none placeholder:text-muted-2 focus:border-primary/40"
            disabled
          />
        </div>
      )}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="relative flex w-64 flex-col bg-background">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2">
                <LogoMark className="size-7" />
                <span className="font-semibold">AssetIQ</span>
              </div>
              <button onClick={() => setMobileOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
