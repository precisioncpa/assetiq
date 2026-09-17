import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AssetIQ — The Intelligence Layer for On-Chain Investing",
  description:
    "Real-time analytics, AI-powered insights, risk scoring, portfolio intelligence, and tokenized stock research built for Arc Chain.",
};

// Injected wallets (MetaMask, etc.) run their own scripts as soon as the page
// loads and sometimes throw from inside their own extension code — e.g.
// MetaMask's "Error restoring session: Failed to connect to MetaMask" when its
// MV3 background service worker hasn't woken up yet. That's a browser-extension
// fault, not an app error, but left unhandled it surfaces as a Next.js "Runtime
// Error" overlay. Next's dev overlay registers its own window 'error' /
// 'unhandledrejection' listeners after this script runs (beforeInteractive is
// the earliest a page script can register), so stopImmediatePropagation() here
// stops that later listener from ever seeing the event — preventDefault() alone
// is not enough, since it doesn't stop other listeners on the same target from
// still running and showing the overlay.
const WALLET_EXTENSION_ERROR_GUARD = `
(function () {
  function isWalletExtensionNoise(source, message) {
    if (source && /chrome-extension:\\/\\//.test(source)) return true;
    if (message && /failed to connect to metamask/i.test(message)) return true;
    return false;
  }
  window.addEventListener("error", function (event) {
    if (isWalletExtensionNoise(event.filename, event.message)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      console.warn("[wallet] Ignored browser extension error:", event.message);
    }
  });
  window.addEventListener("unhandledrejection", function (event) {
    var reason = event.reason;
    var message = reason && reason.message ? reason.message : String(reason);
    var stack = reason && reason.stack ? reason.stack : undefined;
    if (isWalletExtensionNoise(stack, message)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      console.warn("[wallet] Ignored browser extension rejection:", message);
    }
  });
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script id="wallet-extension-error-guard" strategy="beforeInteractive">
          {WALLET_EXTENSION_ERROR_GUARD}
        </Script>
        {children}
      </body>
    </html>
  );
}
