import { cn } from "@/lib/utils";

type Row = {
  label: string;
  value: number;
  className: string;
};

export function StatusBreakdown({
  paid,
  fulfilled,
  cancelled,
  refunded,
}: {
  paid: number;
  fulfilled: number;
  cancelled: number;
  refunded: number;
}) {
  const rows: Row[] = [
    { label: "Paid", value: paid, className: "bg-volt" },
    { label: "Fulfilled", value: fulfilled, className: "bg-fairway" },
    { label: "Cancelled", value: cancelled, className: "bg-muted-foreground/40" },
    { label: "Refunded", value: refunded, className: "bg-destructive/60" },
  ];
  const total = rows.reduce((s, r) => s + r.value, 0);

  return (
    <div className="rounded-md border border-border bg-card p-5">
      <p className="eyebrow">Order status</p>
      <p className="mt-2 font-heading text-2xl font-extrabold">{total}</p>
      <p className="text-xs text-muted-foreground mt-0.5">total orders</p>

      {total === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">No orders yet.</p>
      ) : (
        <>
          <div className="mt-6 flex h-2 w-full overflow-hidden rounded-full bg-muted">
            {rows
              .filter((r) => r.value > 0)
              .map((r) => (
                <span
                  key={r.label}
                  className={cn("h-full", r.className)}
                  style={{ width: `${(r.value / total) * 100}%` }}
                  title={`${r.label}: ${r.value}`}
                />
              ))}
          </div>
          <ul className="mt-4 space-y-2">
            {rows.map((r) => (
              <li
                key={r.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={cn("inline-block size-2 rounded-full", r.className)}
                  />
                  {r.label}
                </span>
                <span className="font-mono">{r.value}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
