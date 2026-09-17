import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercent } from "@/lib/utils";

export function ChangeValue({ value, className }: { value: number; className?: string }) {
  const positive = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 mono-tabular text-sm font-medium",
        positive ? "text-primary" : "text-danger",
        className
      )}
    >
      {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
      {formatPercent(value)}
    </span>
  );
}
