"use client";

import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

export function Sparkline({
  data,
  positive,
  height = 40,
}: {
  data: number[];
  positive: boolean;
  height?: number;
}) {
  const chartData = data.map((v, i) => ({ i, v }));
  const color = positive ? "var(--primary)" : "var(--danger)";
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 4, bottom: 4, left: 0, right: 0 }}>
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.75}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
