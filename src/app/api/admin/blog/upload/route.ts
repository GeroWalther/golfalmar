import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];
const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file too large (max 5MB)" }, { status: 413 });
  }
  if (!ALLOWED_MIME.includes(file.type)) {
    return NextResponse.json({ error: "unsupported file type" }, { status: 415 });
  }

  const ext = EXT_BY_MIME[file.type];
  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads", "blog");
  await mkdir(uploadsDir, { recursive: true });
  const filepath = path.join(uploadsDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  // Note: this writes to the local filesystem. Works for self-hosted/local dev;
  // on Vercel you'll want to swap this for `@vercel/blob` (returns a public URL).
  return NextResponse.json({ url: `/uploads/blog/${filename}` });
}
