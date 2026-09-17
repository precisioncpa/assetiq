import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import {
  stockTokens as seedStocks,
  aiSignals as seedSignals,
  whales as seedWhales,
  yieldOpportunities as seedYield,
  etfBaskets as seedEtfs,
  governanceProposals as seedGovernance,
  marketStats as seedMarketStats,
  newsFeed as seedNews,
  roadmap as seedRoadmap,
  faqs as seedFaqs,
  pricingTiers as seedPricing,
  trustedMetrics as seedTrustedMetrics,
  alertRules as seedAlerts,
  portfolioAllocation as seedAllocation,
  portfolioHistory as seedHistory,
  portfolioSnapshot as seedSnapshot,
  portfolioQuantities as seedQuantities,
} from "./seed-data";
import type {
  AiSignal,
  AlertRule,
  EtfBasket,
  Faq,
  GovernanceProposal,
  MarketStats,
  NewsItem,
  PortfolioAllocationSlice,
  PortfolioHolding,
  PortfolioResponse,
  PricingTier,
  RoadmapQuarter,
  StockToken,
  TrustedMetric,
  WhaleWallet,
  YieldOpportunity,
} from "./types";

declare global {
  // eslint-disable-next-line no-var
  var __assetiqDb: Database.Database | undefined;
}

function createDatabase() {
  const dataDir = path.join(process.cwd(), "data");
  fs.mkdirSync(dataDir, { recursive: true });
  const database = new Database(path.join(dataDir, "assetiq.db"));
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  database.pragma("busy_timeout = 5000");
  return database;
}

const db = globalThis.__assetiqDb ?? createDatabase();
if (process.env.NODE_ENV !== "production") globalThis.__assetiqDb = db;

db.exec(`
  CREATE TABLE IF NOT EXISTS stocks (
    symbol TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo_initial TEXT NOT NULL,
    price REAL NOT NULL,
    change_24h REAL NOT NULL,
    market_cap REAL NOT NULL,
    volume_24h REAL NOT NULL,
    holders INTEGER NOT NULL,
    supply REAL NOT NULL,
    sparkline TEXT NOT NULL,
    risk_score INTEGER NOT NULL,
    opportunity_score INTEGER NOT NULL,
    momentum_score INTEGER NOT NULL,
    sector TEXT NOT NULL,
    buy_ratio INTEGER NOT NULL,
    whale_holdings_pct INTEGER NOT NULL,
    contract TEXT NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS ai_signals (
    id TEXT PRIMARY KEY,
    symbol TEXT NOT NULL REFERENCES stocks(symbol),
    type TEXT NOT NULL,
    headline TEXT NOT NULL,
    detail TEXT NOT NULL,
    confidence INTEGER NOT NULL,
    time_ago TEXT NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS whales (
    address TEXT PRIMARY KEY,
    label TEXT,
    score INTEGER NOT NULL,
    portfolio_value REAL NOT NULL,
    pnl_30d REAL NOT NULL,
    top_holdings TEXT NOT NULL,
    win_rate INTEGER NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS yield_opportunities (
    id TEXT PRIMARY KEY,
    protocol TEXT NOT NULL,
    asset TEXT NOT NULL,
    type TEXT NOT NULL,
    apr REAL NOT NULL,
    tvl REAL NOT NULL,
    risk TEXT NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS etf_baskets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    creator TEXT NOT NULL,
    holdings TEXT NOT NULL,
    aum REAL NOT NULL,
    change_24h REAL NOT NULL,
    performance_ytd REAL NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS governance_proposals (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    votes_for REAL NOT NULL,
    votes_against REAL NOT NULL,
    ends_in TEXT NOT NULL,
    category TEXT NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS market_stats (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    total_market_cap REAL NOT NULL,
    total_volume_24h REAL NOT NULL,
    active_investors INTEGER NOT NULL,
    total_stock_tokens INTEGER NOT NULL,
    tvl REAL NOT NULL,
    market_cap_change REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS news_feed (
    id TEXT PRIMARY KEY,
    source TEXT NOT NULL,
    title TEXT NOT NULL,
    time_ago TEXT NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS roadmap (
    quarter TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    items TEXT NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pricing_tiers (
    name TEXT PRIMARY KEY,
    price REAL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    features TEXT NOT NULL,
    cta TEXT NOT NULL,
    highlight INTEGER NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS trusted_metrics (
    label TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS alert_rules (
    id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    type TEXT NOT NULL,
    active INTEGER NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS watchlist_items (
    symbol TEXT PRIMARY KEY REFERENCES stocks(symbol),
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS portfolio_holdings (
    symbol TEXT PRIMARY KEY REFERENCES stocks(symbol),
    qty REAL NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS portfolio_snapshot (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    value REAL NOT NULL,
    change_24h REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS portfolio_allocation (
    name TEXT PRIMARY KEY,
    value REAL NOT NULL,
    color TEXT NOT NULL,
    sort_order INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS portfolio_history (
    idx INTEGER PRIMARY KEY,
    value REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS waitlist_signups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

function seedIfEmpty() {
  const seed = db.transaction(() => {
    // Re-check inside the write transaction: with concurrent build workers,
    // another process may have already seeded between the outer check and
    // this transaction acquiring the write lock.
    const { count } = db.prepare("SELECT COUNT(*) AS count FROM stocks").get() as { count: number };
    if (count > 0) return;

    const insertStock = db.prepare(
      `INSERT OR IGNORE INTO stocks (symbol, name, logo_initial, price, change_24h, market_cap, volume_24h, holders, supply, sparkline, risk_score, opportunity_score, momentum_score, sector, buy_ratio, whale_holdings_pct, contract, sort_order)
       VALUES (@symbol, @name, @logoInitial, @price, @change24h, @marketCap, @volume24h, @holders, @supply, @sparkline, @riskScore, @opportunityScore, @momentumScore, @sector, @buyRatio, @whaleHoldingsPct, @contract, @sortOrder)`
    );
    seedStocks.forEach((s, i) => insertStock.run({ ...s, sparkline: JSON.stringify(s.sparkline), sortOrder: i }));

    const insertSignal = db.prepare(
      `INSERT INTO ai_signals (id, symbol, type, headline, detail, confidence, time_ago, sort_order)
       VALUES (@id, @symbol, @type, @headline, @detail, @confidence, @timeAgo, @sortOrder)`
    );
    seedSignals.forEach((s, i) => insertSignal.run({ ...s, sortOrder: i }));

    const insertWhale = db.prepare(
      `INSERT INTO whales (address, label, score, portfolio_value, pnl_30d, top_holdings, win_rate, sort_order)
       VALUES (@address, @label, @score, @portfolioValue, @pnl30d, @topHoldings, @winRate, @sortOrder)`
    );
    seedWhales.forEach((w, i) =>
      insertWhale.run({ ...w, label: w.label ?? null, topHoldings: JSON.stringify(w.topHoldings), sortOrder: i })
    );

    const insertYield = db.prepare(
      `INSERT INTO yield_opportunities (id, protocol, asset, type, apr, tvl, risk, sort_order)
       VALUES (@id, @protocol, @asset, @type, @apr, @tvl, @risk, @sortOrder)`
    );
    seedYield.forEach((y, i) => insertYield.run({ ...y, sortOrder: i }));

    const insertEtf = db.prepare(
      `INSERT INTO etf_baskets (id, name, symbol, creator, holdings, aum, change_24h, performance_ytd, sort_order)
       VALUES (@id, @name, @symbol, @creator, @holdings, @aum, @change24h, @performanceYtd, @sortOrder)`
    );
    seedEtfs.forEach((e, i) => insertEtf.run({ ...e, holdings: JSON.stringify(e.holdings), sortOrder: i }));

    const insertProposal = db.prepare(
      `INSERT INTO governance_proposals (id, title, status, votes_for, votes_against, ends_in, category, sort_order)
       VALUES (@id, @title, @status, @votesFor, @votesAgainst, @endsIn, @category, @sortOrder)`
    );
    seedGovernance.forEach((p, i) => insertProposal.run({ ...p, sortOrder: i }));

    db.prepare(
      `INSERT INTO market_stats (id, total_market_cap, total_volume_24h, active_investors, total_stock_tokens, tvl, market_cap_change)
       VALUES (1, @totalMarketCap, @totalVolume24h, @activeInvestors, @totalStockTokens, @tvl, @marketCapChange)`
    ).run(seedMarketStats);

    const insertNews = db.prepare(
      `INSERT INTO news_feed (id, source, title, time_ago, sort_order) VALUES (@id, @source, @title, @timeAgo, @sortOrder)`
    );
    seedNews.forEach((n, i) => insertNews.run({ ...n, sortOrder: i }));

    const insertRoadmap = db.prepare(
      `INSERT INTO roadmap (quarter, title, status, items, sort_order) VALUES (@quarter, @title, @status, @items, @sortOrder)`
    );
    seedRoadmap.forEach((r, i) => insertRoadmap.run({ ...r, items: JSON.stringify(r.items), sortOrder: i }));

    const insertFaq = db.prepare(`INSERT INTO faqs (question, answer, sort_order) VALUES (@q, @a, @sortOrder)`);
    seedFaqs.forEach((f, i) => insertFaq.run({ ...f, sortOrder: i }));

    const insertTier = db.prepare(
      `INSERT INTO pricing_tiers (name, price, period, description, features, cta, highlight, sort_order)
       VALUES (@name, @price, @period, @description, @features, @cta, @highlight, @sortOrder)`
    );
    seedPricing.forEach((t, i) =>
      insertTier.run({ ...t, features: JSON.stringify(t.features), highlight: t.highlight ? 1 : 0, sortOrder: i })
    );

    const insertMetric = db.prepare(`INSERT INTO trusted_metrics (label, value, sort_order) VALUES (@label, @value, @sortOrder)`);
    seedTrustedMetrics.forEach((m, i) => insertMetric.run({ ...m, sortOrder: i }));

    const insertAlert = db.prepare(
      `INSERT INTO alert_rules (id, label, type, active, sort_order) VALUES (@id, @label, @type, @active, @sortOrder)`
    );
    seedAlerts.forEach((a, i) => insertAlert.run({ ...a, active: a.active ? 1 : 0, sortOrder: i }));

    const insertWatchlist = db.prepare(`INSERT INTO watchlist_items (symbol, sort_order) VALUES (?, ?)`);
    seedStocks.slice(0, 5).forEach((s, i) => insertWatchlist.run(s.symbol, i));

    const insertHolding = db.prepare(`INSERT INTO portfolio_holdings (symbol, qty, sort_order) VALUES (?, ?, ?)`);
    seedStocks.slice(0, 5).forEach((s, i) => insertHolding.run(s.symbol, seedQuantities[i], i));

    db.prepare(`INSERT INTO portfolio_snapshot (id, value, change_24h) VALUES (1, ?, ?)`).run(
      seedSnapshot.value,
      seedSnapshot.change24h
    );

    const insertAllocation = db.prepare(
      `INSERT INTO portfolio_allocation (name, value, color, sort_order) VALUES (@name, @value, @color, @sortOrder)`
    );
    seedAllocation.forEach((a, i) => insertAllocation.run({ ...a, sortOrder: i }));

    const insertHistoryPoint = db.prepare(`INSERT INTO portfolio_history (idx, value) VALUES (?, ?)`);
    seedHistory.forEach((v, i) => insertHistoryPoint.run(i, v));
  });

  seed.immediate();
}

seedIfEmpty();

type StockRow = {
  symbol: string;
  name: string;
  logo_initial: string;
  price: number;
  change_24h: number;
  market_cap: number;
  volume_24h: number;
  holders: number;
  supply: number;
  sparkline: string;
  risk_score: number;
  opportunity_score: number;
  momentum_score: number;
  sector: string;
  buy_ratio: number;
  whale_holdings_pct: number;
  contract: string;
};

function mapStock(row: StockRow): StockToken {
  return {
    symbol: row.symbol,
    name: row.name,
    logoInitial: row.logo_initial,
    price: row.price,
    change24h: row.change_24h,
    marketCap: row.market_cap,
    volume24h: row.volume_24h,
    holders: row.holders,
    supply: row.supply,
    sparkline: JSON.parse(row.sparkline),
    riskScore: row.risk_score,
    opportunityScore: row.opportunity_score,
    momentumScore: row.momentum_score,
    sector: row.sector,
    buyRatio: row.buy_ratio,
    whaleHoldingsPct: row.whale_holdings_pct,
    contract: row.contract,
  };
}

export function getStocks(): StockToken[] {
  const rows = db.prepare("SELECT * FROM stocks ORDER BY sort_order").all() as StockRow[];
  return rows.map(mapStock);
}

export function getStock(symbol: string): StockToken | null {
  const row = db.prepare("SELECT * FROM stocks WHERE symbol = ?").get(symbol.toUpperCase()) as StockRow | undefined;
  return row ? mapStock(row) : null;
}

export function getSignals(): AiSignal[] {
  const rows = db.prepare("SELECT * FROM ai_signals ORDER BY sort_order").all() as {
    id: string;
    symbol: string;
    type: AiSignal["type"];
    headline: string;
    detail: string;
    confidence: number;
    time_ago: string;
  }[];
  return rows.map((r) => ({
    id: r.id,
    symbol: r.symbol,
    type: r.type,
    headline: r.headline,
    detail: r.detail,
    confidence: r.confidence,
    timeAgo: r.time_ago,
  }));
}

export function getWhales(): WhaleWallet[] {
  const rows = db.prepare("SELECT * FROM whales ORDER BY sort_order").all() as {
    address: string;
    label: string | null;
    score: number;
    portfolio_value: number;
    pnl_30d: number;
    top_holdings: string;
    win_rate: number;
  }[];
  return rows.map((r) => ({
    address: r.address,
    label: r.label ?? undefined,
    score: r.score,
    portfolioValue: r.portfolio_value,
    pnl30d: r.pnl_30d,
    topHoldings: JSON.parse(r.top_holdings),
    winRate: r.win_rate,
  }));
}

export function getYieldOpportunities(): YieldOpportunity[] {
  const rows = db.prepare("SELECT * FROM yield_opportunities ORDER BY sort_order").all() as {
    id: string;
    protocol: string;
    asset: string;
    type: YieldOpportunity["type"];
    apr: number;
    tvl: number;
    risk: YieldOpportunity["risk"];
  }[];
  return rows.map((r) => ({ ...r }));
}

export function getEtfBaskets(): EtfBasket[] {
  const rows = db.prepare("SELECT * FROM etf_baskets ORDER BY sort_order").all() as {
    id: string;
    name: string;
    symbol: string;
    creator: string;
    holdings: string;
    aum: number;
    change_24h: number;
    performance_ytd: number;
  }[];
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    symbol: r.symbol,
    creator: r.creator,
    holdings: JSON.parse(r.holdings),
    aum: r.aum,
    change24h: r.change_24h,
    performanceYtd: r.performance_ytd,
  }));
}

export function getGovernanceProposals(): GovernanceProposal[] {
  const rows = db.prepare("SELECT * FROM governance_proposals ORDER BY sort_order").all() as {
    id: string;
    title: string;
    status: GovernanceProposal["status"];
    votes_for: number;
    votes_against: number;
    ends_in: string;
    category: string;
  }[];
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    status: r.status,
    votesFor: r.votes_for,
    votesAgainst: r.votes_against,
    endsIn: r.ends_in,
    category: r.category,
  }));
}

export function getMarketStats(): MarketStats {
  const row = db.prepare("SELECT * FROM market_stats WHERE id = 1").get() as {
    total_market_cap: number;
    total_volume_24h: number;
    active_investors: number;
    total_stock_tokens: number;
    tvl: number;
    market_cap_change: number;
  };
  return {
    totalMarketCap: row.total_market_cap,
    totalVolume24h: row.total_volume_24h,
    activeInvestors: row.active_investors,
    totalStockTokens: row.total_stock_tokens,
    tvl: row.tvl,
    marketCapChange: row.market_cap_change,
  };
}

export function getNews(): NewsItem[] {
  const rows = db.prepare("SELECT id, source, title, time_ago FROM news_feed ORDER BY sort_order").all() as {
    id: string;
    source: string;
    title: string;
    time_ago: string;
  }[];
  return rows.map((r) => ({ id: r.id, source: r.source, title: r.title, timeAgo: r.time_ago }));
}

export function getRoadmap(): RoadmapQuarter[] {
  const rows = db.prepare("SELECT * FROM roadmap ORDER BY sort_order").all() as {
    quarter: string;
    title: string;
    status: RoadmapQuarter["status"];
    items: string;
  }[];
  return rows.map((r) => ({ quarter: r.quarter, title: r.title, status: r.status, items: JSON.parse(r.items) }));
}

export function getFaqs(): Faq[] {
  const rows = db.prepare("SELECT question, answer FROM faqs ORDER BY sort_order").all() as {
    question: string;
    answer: string;
  }[];
  return rows.map((r) => ({ q: r.question, a: r.answer }));
}

export function getPricingTiers(): PricingTier[] {
  const rows = db.prepare("SELECT * FROM pricing_tiers ORDER BY sort_order").all() as {
    name: string;
    price: number | null;
    period: string;
    description: string;
    features: string;
    cta: string;
    highlight: number;
  }[];
  return rows.map((r) => ({
    name: r.name,
    price: r.price,
    period: r.period,
    description: r.description,
    features: JSON.parse(r.features),
    cta: r.cta,
    highlight: Boolean(r.highlight),
  }));
}

export function getTrustedMetrics(): TrustedMetric[] {
  return db.prepare("SELECT label, value FROM trusted_metrics ORDER BY sort_order").all() as TrustedMetric[];
}

export function getAlertRules(): AlertRule[] {
  const rows = db.prepare("SELECT * FROM alert_rules ORDER BY sort_order").all() as {
    id: string;
    label: string;
    type: AlertRule["type"];
    active: number;
  }[];
  return rows.map((r) => ({ id: r.id, label: r.label, type: r.type, active: Boolean(r.active) }));
}

export function getWatchlist(): StockToken[] {
  const rows = db
    .prepare(
      `SELECT stocks.* FROM watchlist_items
       JOIN stocks ON stocks.symbol = watchlist_items.symbol
       ORDER BY watchlist_items.sort_order`
    )
    .all() as StockRow[];
  return rows.map(mapStock);
}

export function getPortfolio(): PortfolioResponse {
  const snapshot = db.prepare("SELECT value, change_24h FROM portfolio_snapshot WHERE id = 1").get() as {
    value: number;
    change_24h: number;
  };
  const allocation = db
    .prepare("SELECT name, value, color FROM portfolio_allocation ORDER BY sort_order")
    .all() as PortfolioAllocationSlice[];
  const history = (db.prepare("SELECT value FROM portfolio_history ORDER BY idx").all() as { value: number }[]).map(
    (r) => r.value
  );
  const holdingRows = db
    .prepare(
      `SELECT stocks.*, portfolio_holdings.qty AS qty FROM portfolio_holdings
       JOIN stocks ON stocks.symbol = portfolio_holdings.symbol
       ORDER BY portfolio_holdings.sort_order`
    )
    .all() as (StockRow & { qty: number })[];
  const holdings: PortfolioHolding[] = holdingRows.map((r) => ({ ...mapStock(r), qty: r.qty }));

  return {
    value: snapshot.value,
    change24h: snapshot.change_24h,
    allocation,
    history,
    holdings,
  };
}

export function addWaitlistSignup(email: string) {
  db.prepare("INSERT INTO waitlist_signups (email) VALUES (?)").run(email);
}
