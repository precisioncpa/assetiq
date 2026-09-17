function colorFor(score: number) {
  if (score >= 80) return "var(--primary)";
  if (score >= 60) return "var(--teal)";
  if (score >= 40) return "var(--warning)";
  return "var(--danger)";
}

export function ScoreRing({ score, size = 72 }: { score: number; size?: number }) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = colorFor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="mono-tabular font-semibold" style={{ fontSize: size * 0.28, color }}>
          {score}
        </span>
      </div>
    </div>
  );
}
