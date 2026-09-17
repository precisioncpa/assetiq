"use client";

import { useState } from "react";
import { Wallet, ChevronDown, LogOut, Copy, Check } from "lucide-react";
import { useWallet } from "@/lib/use-wallet";
import { truncateAddress, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ConnectWalletButton({ size = "md" }: { size?: "sm" | "md" }) {
  const { address, connect, disconnect, connecting, error, hasProvider } = useWallet();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!address) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          size={size}
          onClick={connect}
          disabled={connecting}
        >
          <Wallet className="size-4" />
          {connecting ? "Connecting…" : "Connect Wallet"}
        </Button>
        {error && (
          <div className="absolute right-0 top-full mt-2 w-64 rounded-lg glass p-3 text-xs text-danger z-50">
            {error}
            {!hasProvider && (
              <p className="mt-1 text-muted">
                Supported: MetaMask, Rabby, Coinbase Wallet, Arc Wallet.
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-border-strong bg-white/[0.03] px-3 text-sm font-medium hover:bg-white/[0.06] transition-colors",
          size === "sm" ? "h-8" : "h-10"
        )}
      >
        <span className="size-2 rounded-full bg-primary pulse-dot" />
        <span className="mono-tabular">{truncateAddress(address)}</span>
        <ChevronDown className="size-3.5 text-muted" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg glass p-1.5 z-50">
          <button
            onClick={() => {
              navigator.clipboard?.writeText(address);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-foreground hover:bg-white/[0.06]"
          >
            {copied ? <Check className="size-3.5 text-primary" /> : <Copy className="size-3.5 text-muted" />}
            {copied ? "Copied" : "Copy address"}
          </button>
          <button
            onClick={() => {
              disconnect();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-danger hover:bg-white/[0.06]"
          >
            <LogOut className="size-3.5" />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
