import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { NewsletterSubscriber } from "@/lib/models/newsletter-subscriber";

export const runtime = "nodejs";

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export async function GET() {
  await connectDB();
  const subs = await NewsletterSubscriber.find({})
    .sort({ createdAt: -1 })
    .lean();

  const headers = [
    "email",
    "name",
    "locale",
    "source",
    "status",
    "discountCode",
    "codeIssuedAt",
    "codeUsedAt",
    "welcomeEmailSentAt",
    "subscribedAt",
  ];
  const rows = subs.map((s) =>
    [
      s.email,
      s.name ?? "",
      s.locale ?? "",
      s.source ?? "",
      s.status ?? "",
      s.discountCode ?? "",
      s.discountIssuedAt?.toISOString() ?? "",
      s.discountUsedAt?.toISOString() ?? "",
      s.welcomeEmailSentAt?.toISOString() ?? "",
      s.createdAt.toISOString(),
    ]
      .map(csvEscape)
      .join(","),
  );

  const csv = [headers.join(","), ...rows].join("\n");
  const stamp = new Date().toISOString().split("T")[0];
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="golfalmar-subscribers-${stamp}.csv"`,
    },
  });
}
