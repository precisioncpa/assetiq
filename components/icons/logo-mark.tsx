export function LogoMark({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo-mark.png" alt="AssetIQ" className={`${className ?? ""} rounded-lg object-contain`} />;
}
