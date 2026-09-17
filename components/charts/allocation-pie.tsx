"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { PortfolioAllocationSlice } from "@/lib/types";

export function AllocationPie({ data, size = 180 }: { data: PortfolioAllocationSlice[]; size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="relative mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="62%"
            outerRadius="100%"
            paddingAngle={3}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs text-muted">Total</span>
        <span className="mono-tabular text-lg font-semibold">100%</span>
      </div>
    </div>
  );
}
