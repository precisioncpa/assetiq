export type StockToken = {
  symbol: string;
  name: string;
  logoInitial: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  holders: number;
  supply: number;
  sparkline: number[];
  riskScore: number;
  opportunityScore: number;
  momentumScore: number;
  sector: string;
  buyRatio: number;
  whaleHoldingsPct: number;
  contract: string;
};

export type AiSignal = {
  id: string;
  symbol: string;
  type: "bullish" | "bearish" | "neutral";
  headline: string;
  detail: string;
  confidence: number;
  timeAgo: string;
};

export type WhaleWallet = {
  address: string;
  label?: string;
  score: number;
  portfolioValue: number;
  pnl30d: number;
  topHoldings: string[];
  winRate: number;
};

export type YieldOpportunity = {
  id: string;
  protocol: string;
  asset: string;
  type: "Lending" | "LP" | "Vault" | "Staking";
  apr: number;
  tvl: number;
  risk: "Low" | "Medium" | "High";
};

export type EtfBasket = {
  id: string;
  name: string;
  symbol: string;
  creator: string;
  holdings: { symbol: string; weight: number }[];
  aum: number;
  change24h: number;
  performanceYtd: number;
};

export type GovernanceProposal = {
  id: string;
  title: string;
  status: "Active" | "Passed" | "Failed" | "Pending";
  votesFor: number;
  votesAgainst: number;
  endsIn: string;
  category: string;
};

export type MarketStats = {
  totalMarketCap: number;
  totalVolume24h: number;
  activeInvestors: number;
  totalStockTokens: number;
  tvl: number;
  marketCapChange: number;
};

export type PortfolioAllocationSlice = { name: string; value: number; color: string };

export type NewsItem = { id: string; source: string; title: string; timeAgo: string };

export type RoadmapQuarter = {
  quarter: string;
  title: string;
  status: "done" | "active" | "upcoming";
  items: string[];
};

export type Faq = { q: string; a: string };

export type PricingTier = {
  name: string;
  price: number | null;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
};

export type TrustedMetric = { label: string; value: string };

export type AlertRule = {
  id: string;
  label: string;
  type: "Price" | "Risk" | "Whale" | "Volatility";
  active: boolean;
};

export type PortfolioHolding = StockToken & { qty: number };

export type PortfolioResponse = {
  value: number;
  change24h: number;
  allocation: PortfolioAllocationSlice[];
  history: number[];
  holdings: PortfolioHolding[];
};
