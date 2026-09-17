"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";

export function PriceAreaChart({ data, positive, height = 192 }: { data: number[]; positive: boolean; height?: number }) {
  const chartData = data.map((v, i) => ({ i, v }));
  const color = positive ? "var(--primary)" : "var(--danger)";

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="detailArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fill="url(#detailArea)" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
