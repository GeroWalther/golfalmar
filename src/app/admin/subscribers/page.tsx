import { Download, CheckCircle2, Circle } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { connectDB } from "@/lib/db";
import {
  NewsletterSubscriber,
  type NewsletterSubscriberDoc,
} from "@/lib/models/newsletter-subscriber";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  let subscribers: NewsletterSubscriberDoc[] = [];
  let dbError = false;
  try {
    await connectDB();
    subscribers = await NewsletterSubscriber.find({})
      .sort({ createdAt: -1 })
      .lean<NewsletterSubscriberDoc[]>();
  } catch (e) {
    console.error("[admin/subscribers]", e);
    dbError = true;
  }

  const total = subscribers.length;
  const withCode = subscribers.filter((s) => s.discountCode).length;
  const codesUsed = subscribers.filter((s) => s.discountUsedAt).length;

  const dateFmt = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <AdminNav />
      <main className="container-page py-10 space-y-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">Newsletter</p>
            <h1 className="display text-3xl">Subscribers</h1>
          </div>
          <a
            href="/api/admin/subscribers/export"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider rounded-md border border-border px-2.5 py-2 hover:bg-muted"
          >
            <Download className="size-3.5" />
            CSV
          </a>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Subscribers" value={String(total)} />
          <Stat
            label="With code"
            value={String(withCode)}
            hint="Welcome code issued"
          />
          <Stat
            label="Codes used"
            value={String(codesUsed)}
            hint="Redeemed at checkout"
          />
        </div>

        {dbError ? (
          <p className="text-sm text-destructive">
            Could not connect to the database. Check MONGODB_URI.
          </p>
        ) : subscribers.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-16 text-center">
            <p className="text-sm text-muted-foreground">No subscribers yet.</p>
          </div>
        ) : (
          <div className="rounded-md border border-border overflow-x-auto bg-card">
            <table className="w-full min-w-[820px] text-sm">
              <thead className="bg-muted/40 text-left">
                <tr className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Locale</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Used</th>
                  <th className="px-4 py-3">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s) => (
                  <tr
                    key={String(s._id)}
                    className="border-t border-border/60 hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${s.email}`}
                        className="font-semibold hover:underline"
                      >
                        {s.email}
                      </a>
                      {s.name && (
                        <div className="text-xs text-muted-foreground">
                          {s.name}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs uppercase">
                      {s.locale ?? "en"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {s.source ?? "—"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {s.discountCode ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      {s.discountUsedAt ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-fairway">
                          <CheckCircle2 className="size-3.5" />
                          {dateFmt.format(s.discountUsedAt)}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Circle className="size-3.5" />
                          unused
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {dateFmt.format(s.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 font-heading text-2xl font-extrabold">{value}</p>
      {hint && <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>}
    </div>
  );
}
