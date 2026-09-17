"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LineChart,
  Coins,
  Sprout,
  ShieldAlert,
  Wallet,
  Star,
  Bell,
  Vote,
  Brain,
  Fish,
} from "lucide-react";
import { LogoMark } from "@/components/icons/logo-mark";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/insights", label: "AI Insights", icon: Brain },
    ],
  },
  {
    label: "Markets",
    items: [
      { href: "/stocks", label: "Stocks", icon: LineChart },
      { href: "/etfs", label: "ETFs", icon: Coins },
      { href: "/yield", label: "Yield", icon: Sprout },
      { href: "/whales", label: "Whales", icon: Fish },
      { href: "/risk", label: "Risk Engine", icon: ShieldAlert },
    ],
  },
  {
    label: "You",
    items: [
      { href: "/portfolio", label: "Portfolio", icon: Wallet },
      { href: "/watchlists", label: "Watchlists", icon: Star },
      { href: "/alerts", label: "Alerts", icon: Bell },
    ],
  },
  {
    label: "Protocol",
    items: [{ href: "/governance", label: "Governance", icon: Vote }],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface/40">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <LogoMark className="size-7" />
        <span className="font-semibold tracking-tight">
          Asset<span className="text-gradient">IQ</span>
        </span>
      </div>
      <nav className="scrollbar-none flex-1 overflow-y-auto px-3 py-5">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-2">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted hover:bg-white/[0.05] hover:text-foreground"
                    )}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-border p-4">
        <div className="card-surface rounded-xl p-3.5">
          <p className="text-xs font-medium text-primary">Upgrade to Pro</p>
          <p className="mt-1 text-xs text-muted">Unlock AI insights & whale tracking.</p>
          <Link href="/#pricing" className="mt-2 inline-block text-xs font-medium text-teal hover:underline">
            View plans →
          </Link>
        </div>
      </div>
    </div>
  );
}
