import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary to-teal text-black font-semibold hover:brightness-110 hover:shadow-[0_0_30px_rgba(0,230,160,0.35)]",
        outline:
          "border border-border-strong bg-white/[0.02] text-foreground hover:bg-white/[0.06] hover:border-primary/40",
        ghost: "text-muted hover:text-foreground hover:bg-white/[0.05]",
        subtle: "bg-surface-2 text-foreground border border-border hover:border-border-strong",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
  };

export function Button({ className, variant, size, href, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        {props.children as React.ReactNode}
      </Link>
    );
  }
  return <button className={classes} {...props} />;
}
