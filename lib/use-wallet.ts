"use client";

import { useCallback, useEffect, useState } from "react";

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
  isMetaMask?: boolean;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasProvider] = useState(() => typeof window !== "undefined" && Boolean(window.ethereum));

  useEffect(() => {
    const provider = typeof window !== "undefined" ? window.ethereum : undefined;
    if (!provider?.on) return;
    const handleAccounts = (...args: unknown[]) => {
      const accounts = args[0] as string[];
      setAddress(accounts?.[0] ?? null);
    };
    provider.on("accountsChanged", handleAccounts);
    return () => provider.removeListener?.("accountsChanged", handleAccounts);
  }, []);

  const connect = useCallback(async () => {
    setError(null);
    const provider = typeof window !== "undefined" ? window.ethereum : undefined;
    if (!provider) {
      setError("No EVM wallet detected. Install MetaMask, Rabby, or Coinbase Wallet.");
      return;
    }
    try {
      setConnecting(true);
      const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
      setAddress(accounts?.[0] ?? null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (/failed to connect to metamask/i.test(message)) {
        setError("MetaMask couldn't be reached. Reload the page (or the extension) and try again.");
      } else {
        setError("Connection request was rejected.");
      }
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  return { address, connect, disconnect, connecting, error, hasProvider };
}
