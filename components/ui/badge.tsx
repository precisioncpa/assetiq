import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-white/[0.06] text-muted border border-border",
        primary: "bg-primary/10 text-primary border border-primary/20",
        teal: "bg-teal/10 text-teal border border-teal/20",
        danger: "bg-danger/10 text-danger border border-danger/20",
        warning: "bg-warning/10 text-warning border border-warning/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
