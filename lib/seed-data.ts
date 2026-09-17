import type {
  AiSignal,
  AlertRule,
  EtfBasket,
  GovernanceProposal,
  StockToken,
  WhaleWallet,
  YieldOpportunity,
} from "./types";

function genSparkline(base: number, points = 24, volatility = 0.03) {
  const arr: number[] = [];
  let v = base;
  for (let i = 0; i < points; i++) {
    v = v * (1 + (Math.random() - 0.48) * volatility);
    arr.push(Number(v.toFixed(2)));
  }
  return arr;
}

export const stockTokens: StockToken[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    logoInitial: "A",
    price: 238.42,
    change24h: 2.14,
    marketCap: 3_640_000_000_000,
    volume24h: 182_400_000,
    holders: 48_213,
    supply: 15_270_000_000,
    sparkline: genSparkline(232),
    riskScore: 89,
    opportunityScore: 74,
    momentumScore: 81,
    sector: "Technology",
    buyRatio: 62,
    whaleHoldingsPct: 34,
    contract: "0x7a3F...9eC1",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    logoInitial: "T",
    price: 412.87,
    change24h: -3.42,
    marketCap: 1_320_000_000_000,
    volume24h: 341_200_000,
    holders: 61_940,
    supply: 3_200_000_000,
    sparkline: genSparkline(428, 24, 0.05),
    riskScore: 84,
    opportunityScore: 88,
    momentumScore: 76,
    sector: "Automotive",
    buyRatio: 54,
    whaleHoldingsPct: 41,
    contract: "0x1bE0...4fA2",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    logoInitial: "N",
    price: 187.63,
    change24h: 5.87,
    marketCap: 4_610_000_000_000,
    volume24h: 512_800_000,
    holders: 73_402,
    supply: 24_600_000_000,
    sparkline: genSparkline(178, 24, 0.06),
    riskScore: 91,
    opportunityScore: 93,
    momentumScore: 95,
    sector: "Semiconductors",
    buyRatio: 71,
    whaleHoldingsPct: 29,
    contract: "0x9Dc4...2Bb7",
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    logoInitial: "M",
    price: 612.19,
    change24h: 1.05,
    marketCap: 1_560_000_000_000,
    volume24h: 98_600_000,
    holders: 29_884,
    supply: 2_540_000_000,
    sparkline: genSparkline(605),
    riskScore: 82,
    opportunityScore: 69,
    momentumScore: 64,
    sector: "Technology",
    buyRatio: 58,
    whaleHoldingsPct: 37,
    contract: "0x4eF1...7Ac9",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    logoInitial: "A",
    price: 224.55,
    change24h: -0.68,
    marketCap: 2_360_000_000_000,
    volume24h: 121_300_000,
    holders: 35_120,
    supply: 10_500_000_000,
    sparkline: genSparkline(226),
    riskScore: 86,
    opportunityScore: 71,
    momentumScore: 68,
    sector: "E-Commerce",
    buyRatio: 55,
    whaleHoldingsPct: 31,
    contract: "0x2Cc8...5Dd3",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    logoInitial: "M",
    price: 468.91,
    change24h: 0.92,
    marketCap: 3_480_000_000_000,
    volume24h: 87_900_000,
    holders: 41_205,
    supply: 7_430_000_000,
    sparkline: genSparkline(464),
    riskScore: 90,
    opportunityScore: 70,
    momentumScore: 66,
    sector: "Technology",
    buyRatio: 60,
    whaleHoldingsPct: 33,
    contract: "0x8Ba2...1Ef4",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    logoInitial: "G",
    price: 198.34,
    change24h: 1.73,
    marketCap: 2_430_000_000_000,
    volume24h: 76_500_000,
    holders: 27_610,
    supply: 12_100_000_000,
    sparkline: genSparkline(195),
    riskScore: 87,
    opportunityScore: 75,
    momentumScore: 72,
    sector: "Technology",
    buyRatio: 59,
    whaleHoldingsPct: 30,
    contract: "0x6Fa9...3Cc5",
  },
  {
    symbol: "COIN",
    name: "Coinbase Global, Inc.",
    logoInitial: "C",
    price: 284.76,
    change24h: 7.32,
    marketCap: 71_800_000_000,
    volume24h: 156_200_000,
    holders: 19_402,
    supply: 252_000_000,
    sparkline: genSparkline(266, 24, 0.08),
    riskScore: 67,
    opportunityScore: 85,
    momentumScore: 90,
    sector: "Financial Services",
    buyRatio: 68,
    whaleHoldingsPct: 46,
    contract: "0x3Ad7...8Fe1",
  },
];

export const aiSignals: AiSignal[] = [
  {
    id: "s1",
    symbol: "TSLA",
    type: "bullish",
    headline: "TSLA sentiment increased 23% in the last 24 hours",
    detail:
      "Elevated social and on-chain wallet accumulation follows the delivery-numbers beat. Momentum score climbed from 61 to 76.",
    confidence: 82,
    timeAgo: "12m ago",
  },
  {
    id: "s2",
    symbol: "NVDA",
    type: "bullish",
    headline: "Whale wallets added $42M in NVDA tokens overnight",
    detail:
      "Three top-100 wallets increased NVDA exposure by an average of 18%, coinciding with a breakout above the 20-day volume average.",
    confidence: 88,
    timeAgo: "38m ago",
  },
  {
    id: "s3",
    symbol: "META",
    type: "neutral",
    headline: "META consolidating ahead of earnings window",
    detail:
      "Volatility has compressed to a 6-week low. AssetIQ Score holds steady at 82 with no significant directional signal.",
    confidence: 64,
    timeAgo: "1h ago",
  },
  {
    id: "s4",
    symbol: "COIN",
    type: "bearish",
    headline: "Elevated concentration risk detected in COIN token",
    detail:
      "Top 10 wallets now hold 46% of circulating supply, up from 39% last week. Liquidity depth has thinned on the AIQ-tracked venues.",
    confidence: 71,
    timeAgo: "2h ago",
  },
  {
    id: "s5",
    symbol: "AAPL",
    type: "bullish",
    headline: "AAPL options-implied volatility signals accumulation phase",
    detail:
      "AI trend detection flags a rounded-bottom pattern forming over 15 sessions, historically correlated with 4-8% upside moves.",
    confidence: 76,
    timeAgo: "3h ago",
  },
];

export const whales: WhaleWallet[] = [
  {
    address: "0x8f2a1b3c4d5e6f7089a1b2c3d4e5f60718293a4b",
    label: "Apex Capital",
    score: 96,
    portfolioValue: 48_200_000,
    pnl30d: 18.4,
    topHoldings: ["NVDA", "TSLA", "COIN"],
    winRate: 74,
  },
  {
    address: "0x3c9e7d2f1a8b4c6e9f0a1b2c3d4e5f6071829304",
    label: "Meridian Fund",
    score: 91,
    portfolioValue: 31_600_000,
    pnl30d: 9.2,
    topHoldings: ["AAPL", "MSFT", "GOOGL"],
    winRate: 68,
  },
  {
    address: "0x1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d",
    score: 88,
    portfolioValue: 22_900_000,
    pnl30d: 24.7,
    topHoldings: ["TSLA", "NVDA"],
    winRate: 81,
  },
  {
    address: "0x9f8e7d6c5b4a39281706f5e4d3c2b1a09876543",
    label: "Northstar DAO Treasury",
    score: 85,
    portfolioValue: 64_500_000,
    pnl30d: 5.1,
    topHoldings: ["AAPL", "AMZN", "META", "MSFT"],
    winRate: 63,
  },
  {
    address: "0x2d4e6f8a1c3e5b7d9f0a2c4e6b8d0f1a3c5e7b9d",
    label: "Lumen Digital",
    score: 79,
    portfolioValue: 14_300_000,
    pnl30d: -4.3,
    topHoldings: ["COIN", "TSLA"],
    winRate: 55,
  },
];

export const yieldOpportunities: YieldOpportunity[] = [
  { id: "y1", protocol: "Morpho", asset: "USDC / ARC-AAPL", type: "Lending", apr: 8.4, tvl: 42_000_000, risk: "Low" },
  { id: "y2", protocol: "Morpho", asset: "ARC-NVDA Vault", type: "Vault", apr: 12.1, tvl: 18_600_000, risk: "Medium" },
  { id: "y3", protocol: "Aerodrome Arc", asset: "ARC-TSLA / USDC", type: "LP", apr: 21.7, tvl: 9_200_000, risk: "High" },
  { id: "y4", protocol: "Arc Staking", asset: "AIQ", type: "Staking", apr: 15.3, tvl: 61_400_000, risk: "Low" },
  { id: "y5", protocol: "Ionic Markets", asset: "ARC-META Vault", type: "Vault", apr: 9.8, tvl: 11_100_000, risk: "Medium" },
  { id: "y6", protocol: "Aerodrome Arc", asset: "ARC-COIN / USDC", type: "LP", apr: 34.2, tvl: 4_800_000, risk: "High" },
];

export const etfBaskets: EtfBasket[] = [
  {
    id: "e1",
    name: "Arc Mag 7",
    symbol: "ARCMAG7",
    creator: "Arc",
    holdings: [
      { symbol: "AAPL", weight: 18 },
      { symbol: "NVDA", weight: 20 },
      { symbol: "MSFT", weight: 16 },
      { symbol: "GOOGL", weight: 14 },
      { symbol: "AMZN", weight: 14 },
      { symbol: "META", weight: 10 },
      { symbol: "TSLA", weight: 8 },
    ],
    aum: 218_000_000,
    change24h: 1.62,
    performanceYtd: 34.8,
  },
  {
    id: "e2",
    name: "AI Compute Basket",
    symbol: "AICOMP",
    creator: "AssetIQ Community",
    holdings: [
      { symbol: "NVDA", weight: 45 },
      { symbol: "MSFT", weight: 30 },
      { symbol: "GOOGL", weight: 25 },
    ],
    aum: 64_500_000,
    change24h: 3.21,
    performanceYtd: 51.2,
  },
  {
    id: "e3",
    name: "Fintech Momentum",
    symbol: "FINMO",
    creator: "0x8f2a...93a4",
    holdings: [
      { symbol: "COIN", weight: 55 },
      { symbol: "AMZN", weight: 25 },
      { symbol: "AAPL", weight: 20 },
    ],
    aum: 12_300_000,
    change24h: 4.98,
    performanceYtd: 22.4,
  },
];

export const governanceProposals: GovernanceProposal[] = [
  {
    id: "AIP-14",
    title: "Add whale-wallet clustering to Risk Engine v2",
    status: "Active",
    votesFor: 4_820_000,
    votesAgainst: 612_000,
    endsIn: "2d 6h",
    category: "Feature",
  },
  {
    id: "AIP-13",
    title: "Allocate 250,000 AIQ to ecosystem grants program",
    status: "Active",
    votesFor: 3_140_000,
    votesAgainst: 1_980_000,
    endsIn: "4d 1h",
    category: "Treasury",
  },
  {
    id: "AIP-12",
    title: "Integrate Chainlink CCIP for cross-chain portfolio view",
    status: "Passed",
    votesFor: 6_720_000,
    votesAgainst: 340_000,
    endsIn: "Ended",
    category: "Integration",
  },
  {
    id: "AIP-11",
    title: "Reduce Pro tier price to $24/month",
    status: "Failed",
    votesFor: 1_120_000,
    votesAgainst: 5_430_000,
    endsIn: "Ended",
    category: "Governance",
  },
];

export const marketStats = {
  totalMarketCap: 19_640_000_000_000,
  totalVolume24h: 1_420_000_000,
  activeInvestors: 284_912,
  totalStockTokens: 142,
  tvl: 612_000_000,
  marketCapChange: 2.4,
};

export const portfolioAllocation = [
  { name: "Stocks", value: 58, color: "var(--primary)" },
  { name: "ETFs", value: 18, color: "var(--teal)" },
  { name: "Stablecoins", value: 12, color: "#6ee7b7" },
  { name: "DeFi", value: 8, color: "#a78bfa" },
  { name: "Cash", value: 4, color: "#8a9a95" },
];

export const portfolioHistory = genSparkline(20500, 30, 0.025);

export const portfolioSnapshot = {
  value: 23482,
  change24h: 8.7,
};

export const portfolioQuantities = [42, 12, 30, 8, 15];

export const alertRules: AlertRule[] = [
  { id: "a1", label: "NVDA price crosses $200", type: "Price", active: true },
  { id: "a2", label: "AssetIQ Score for COIN drops below 60", type: "Risk", active: true },
  { id: "a3", label: "Whale wallet Apex Capital trades >$1M", type: "Whale", active: false },
  { id: "a4", label: "TSLA 24h change exceeds ±5%", type: "Volatility", active: true },
];

export const newsFeed = [
  { id: "n1", source: "Arc", title: "Arc Chain mainnet throughput hits new high ahead of Q4 listings", timeAgo: "18m" },
  { id: "n2", source: "AssetIQ Research", title: "AssetIQ Score methodology v2.1 released with holder-concentration weighting", timeAgo: "51m" },
  { id: "n3", source: "Chainlink", title: "New CCIP price feeds live for 12 additional tokenized equities", timeAgo: "2h" },
  { id: "n4", source: "Morpho", title: "ARC-NVDA lending market surpasses $18M in deposits", timeAgo: "3h" },
  { id: "n5", source: "AssetIQ Research", title: "Whale accumulation in semiconductor tokens up 31% week-over-week", timeAgo: "5h" },
];

export const roadmap = [
  {
    quarter: "Q1",
    title: "Foundation",
    status: "done" as const,
    items: ["AssetIQ Score v1 launch", "Stock Intelligence pages for top 50 tokens", "Portfolio tracking (read-only)"],
  },
  {
    quarter: "Q2",
    title: "Intelligence Layer",
    status: "done" as const,
    items: ["AI Insights engine (beta)", "Whale wallet tracking", "AIQ token generation event"],
  },
  {
    quarter: "Q3",
    title: "Expansion",
    status: "active" as const,
    items: ["Yield Intelligence across Arc Chain DeFi", "ETF Explorer + community baskets", "AIQ staking + Pro tier"],
  },
  {
    quarter: "Q4",
    title: "Institutional",
    status: "upcoming" as const,
    items: ["Governance portal launch", "Public API platform", "Institutional-grade Premium tier"],
  },
];

export const faqs = [
  {
    q: "What is AssetIQ?",
    a: "AssetIQ is an analytics and AI intelligence layer purpose-built for Arc Chain — combining real-time market data, risk scoring, portfolio intelligence, and whale tracking for tokenized stocks, ETFs, and on-chain finance.",
  },
  {
    q: "What is Arc Chain?",
    a: "Arc Chain is an EVM-compatible blockchain purpose-built for tokenized stocks, ETFs, and real-world assets. AssetIQ reads pricing and metadata for stock tokens from Arc's APIs and Chainlink data feeds.",
  },
  {
    q: "How is the AssetIQ Score calculated?",
    a: "The AssetIQ Score (0-100) blends liquidity depth, trading volume, volatility, holder concentration, market activity, and historical performance into a single risk-adjusted rating for every tracked asset.",
  },
  {
    q: "What can I do with AIQ tokens?",
    a: "Stake AIQ to unlock premium analytics, AI-generated reports, and governance voting rights — or hold AIQ as an AssetIQ Staker to access Pro-tier tools without a monthly subscription.",
  },
  {
    q: "Which wallets are supported?",
    a: "AssetIQ supports any standard EVM wallet, including MetaMask, Rabby, Coinbase Wallet, and Arc Wallet, since Arc Chain is fully EVM-compatible.",
  },
  {
    q: "Is there a free tier?",
    a: "Yes. The Free tier includes basic analytics and portfolio tracking. Pro and Premium tiers unlock advanced charting, AI insights, whale tracking, and institutional-grade API access.",
  },
];

export const pricingTiers = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Get started with essential market intelligence.",
    features: ["Basic analytics", "Portfolio tracking", "Delayed AI signals", "Community support"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: 29,
    period: "month",
    description: "For active investors who need an edge.",
    features: ["Everything in Free", "Advanced charts & indicators", "Real-time AI insights", "Whale wallet tracking", "Custom watchlists & alerts"],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Premium",
    price: 99,
    period: "month",
    description: "Institutional-grade tools for funds and desks.",
    features: ["Everything in Pro", "Institutional analytics", "Full API access", "Advanced alerting & webhooks", "Dedicated support"],
    cta: "Contact Sales",
    highlight: false,
  },
  {
    name: "AIQ Staker",
    price: null,
    period: "stake to unlock",
    description: "Unlock Pro-tier tools by staking AIQ — no subscription required.",
    features: ["No monthly fee", "Governance voting power", "Premium tools access", "Early feature access"],
    cta: "Stake AIQ",
    highlight: false,
  },
];

export const trustedMetrics = [
  { label: "Assets Tracked", value: "142" },
  { label: "Total Market Cap Monitored", value: "$19.6T" },
  { label: "Active Investors", value: "284K+" },
  { label: "AI Signals Generated Daily", value: "12,400+" },
];
