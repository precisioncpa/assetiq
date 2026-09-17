import Link from "next/link";
import { LogoMark } from "@/components/icons/logo-mark";

const columns = [
  {
    title: "Product",
    links: [
      { href: "/insights", label: "AI Insights" },
      { href: "/portfolio", label: "Portfolio Intelligence" },
      { href: "/stocks", label: "Stock Intelligence" },
      { href: "/etfs", label: "ETF Explorer" },
      { href: "/yield", label: "Yield Intelligence" },
      { href: "/whales", label: "Whale Intelligence" },
      { href: "/risk", label: "AI Risk Engine" },
    ],
  },
  {
    title: "Platform",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/governance", label: "Governance" },
      { href: "/developers", label: "API Platform" },
      { href: "/#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/#faq", label: "FAQ" },
      { href: "/#roadmap", label: "Roadmap" },
      { href: "/developers", label: "Documentation" },
      { href: "/#partners", label: "Partners" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Blog" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark className="size-8" />
              <span className="text-lg font-semibold tracking-tight">
                Asset<span className="text-gradient">IQ</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              The intelligence layer for on-chain investing — built for Arc Chain.
            </p>
            <p className="mt-6 text-xs text-muted-2">
              $AIQ is a utility token. Nothing on this site is financial advice.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-medium text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-2">© {new Date().getFullYear()} AssetIQ. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted-2">
            <Link href="#" className="hover:text-muted">Privacy Policy</Link>
            <Link href="#" className="hover:text-muted">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
