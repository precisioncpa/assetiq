"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/icons/logo-mark";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/insights", label: "Insights" },
  { href: "/stocks", label: "Stocks" },
  { href: "/etfs", label: "ETFs" },
  { href: "/yield", label: "Yield" },
  { href: "/whales", label: "Whales" },
  { href: "/risk", label: "Risk Engine" },
  { href: "/developers", label: "Developers" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark className="size-8" />
          <span className="text-lg font-semibold tracking-tight">
            Asset<span className="text-gradient">IQ</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" href="#waitlist">
            Join Waitlist
          </Button>
          <Button variant="primary" size="sm" href="/dashboard">
            Launch Dashboard
          </Button>
        </div>

        <button
          className="flex items-center justify-center lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted hover:bg-white/[0.04] hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <Button variant="outline" size="md" href="#waitlist">
              Join Waitlist
            </Button>
            <Button variant="primary" size="md" href="/dashboard">
              Launch Dashboard
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
