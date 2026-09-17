import { api } from "@/lib/api-client";

export async function TrustedMetrics() {
  const trustedMetrics = await api.getTrustedMetrics();

  return (
    <section className="border-y border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {trustedMetrics.map((m) => (
            <div key={m.label} className="text-center">
              <p className="mono-tabular text-2xl font-semibold sm:text-3xl">{m.value}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
