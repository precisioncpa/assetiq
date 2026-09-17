import { Hero } from "@/components/marketing/hero";
import { HeroDashboardMock } from "@/components/marketing/hero-dashboard-mock";
import { TrustedMetrics } from "@/components/marketing/trusted-metrics";
import { LiveMarketOverview } from "@/components/marketing/live-market-overview";
import { AiInsightsDemo } from "@/components/marketing/ai-insights-demo";
import { PortfolioIntelligencePreview } from "@/components/marketing/portfolio-intelligence-preview";
import { WhaleTrackingPreview } from "@/components/marketing/whale-tracking-preview";
import { RiskEnginePreview } from "@/components/marketing/risk-engine-preview";
import { TokenUtility } from "@/components/marketing/token-utility";
import { PricingSection } from "@/components/marketing/pricing-section";
import { RoadmapSection } from "@/components/marketing/roadmap-section";
import { PartnersSection } from "@/components/marketing/partners-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { NewsletterSection } from "@/components/marketing/newsletter-section";

export default function HomePage() {
  return (
    <>
      <Hero dashboardMock={<HeroDashboardMock />} />
      <TrustedMetrics />
      <LiveMarketOverview />
      <AiInsightsDemo />
      <PortfolioIntelligencePreview />
      <WhaleTrackingPreview />
      <RiskEnginePreview />
      <TokenUtility />
      <PricingSection />
      <RoadmapSection />
      <PartnersSection />
      <FaqSection />
      <NewsletterSection />
    </>
  );
}
