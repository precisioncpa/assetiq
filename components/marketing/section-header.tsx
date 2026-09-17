import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl", align === "center" ? "text-center" : "text-left ml-0", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </div>
  );
}
