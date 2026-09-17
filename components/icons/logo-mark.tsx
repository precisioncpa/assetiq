export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="url(#aiq-grad)" />
      <path
        d="M9 21.5L13.2 11h2.1l4.2 10.5h-2.3l-.95-2.5h-4.1l-.95 2.5H9zm4.35-4.3h2.9l-1.45-4-1.45 4z"
        fill="black"
      />
      <path d="M20 21.5V11h2v10.5h-2z" fill="black" fillOpacity="0.55" />
      <defs>
        <linearGradient id="aiq-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E6A0" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
