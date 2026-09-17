import type {
  AiSignal,
  AlertRule,
  EtfBasket,
  Faq,
  GovernanceProposal,
  MarketStats,
  NewsItem,
  PortfolioResponse,
  PricingTier,
  RoadmapQuarter,
  StockToken,
  TrustedMetric,
  WhaleWallet,
  YieldOpportunity,
} from "./types";

async function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  const { headers } = await import("next/headers");
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  return `${protocol}://${host}`;
}

async function apiFetch<T>(path: string): Promise<T> {
  const base = await getBaseUrl();
  const res = await fetch(`${base}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getStocks: () => apiFetch<StockToken[]>("/api/stocks"),
  getStock: async (symbol: string) => {
    const base = await getBaseUrl();
    const res = await fetch(`${base}/api/stocks/${symbol}`, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Request to /api/stocks/${symbol} failed with status ${res.status}`);
    }
    return res.json() as Promise<StockToken>;
  },
  getSignals: () => apiFetch<AiSignal[]>("/api/signals"),
  getWhales: () => apiFetch<WhaleWallet[]>("/api/whales"),
  getYieldOpportunities: () => apiFetch<YieldOpportunity[]>("/api/yield"),
  getEtfBaskets: () => apiFetch<EtfBasket[]>("/api/etfs"),
  getGovernanceProposals: () => apiFetch<GovernanceProposal[]>("/api/governance"),
  getMarketStats: () => apiFetch<MarketStats>("/api/market-stats"),
  getNews: () => apiFetch<NewsItem[]>("/api/news"),
  getRoadmap: () => apiFetch<RoadmapQuarter[]>("/api/roadmap"),
  getFaqs: () => apiFetch<Faq[]>("/api/faqs"),
  getPricingTiers: () => apiFetch<PricingTier[]>("/api/pricing"),
  getTrustedMetrics: () => apiFetch<TrustedMetric[]>("/api/trusted-metrics"),
  getWatchlist: () => apiFetch<StockToken[]>("/api/watchlist"),
  getAlerts: () => apiFetch<AlertRule[]>("/api/alerts"),
  getPortfolio: () => apiFetch<PortfolioResponse>("/api/portfolio"),
};
