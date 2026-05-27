import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { put } from "@vercel/blob";
import convertHeic from "heic-convert";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/heic",
  "image/heif",
]);

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export async function POST(req: Request) {
  let file: File;
  try {
    const form = await req.formData();
    const value = form.get("file");
    if (!(value instanceof File)) {
      return NextResponse.json({ error: "No file in request" }, { status: 400 });
    }
    file = value;
  } catch {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large (max 5MB)" },
      { status: 413 },
    );
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type || "unknown"}` },
      { status: 415 },
    );
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Image storage not configured. Set BLOB_READ_WRITE_TOKEN in your Vercel project (Storage → Blob).",
      },
      { status: 500 },
    );
  }

  let buffer = Buffer.from(await file.arrayBuffer());
  let outMime = file.type;
  let outExt = EXT_BY_MIME[file.type] ?? "bin";

  // iPhone photos default to HEIC. Transcode to JPEG so Next/Image can
  // serve them and every browser can render them.
  if (file.type === "image/heic" || file.type === "image/heif") {
    try {
      const converted = await convertHeic({
        buffer: buffer as unknown as ArrayBufferLike,
        format: "JPEG",
        quality: 0.9,
      });
      buffer = Buffer.from(converted);
      outMime = "image/jpeg";
      outExt = "jpg";
    } catch (e) {
      console.error("[blog/upload] heic conversion failed", e);
      return NextResponse.json(
        { error: "Could not convert HEIC image. Try a JPEG/PNG instead." },
        { status: 422 },
      );
    }
  }

  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}.${outExt}`;
  try {
    const blob = await put(`blog/${filename}`, buffer, {
      access: "public",
      contentType: outMime,
    });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    console.error("[blog/upload] blob put failed", e);
    return NextResponse.json(
      { error: "Storage failed. Try again in a moment." },
      { status: 500 },
    );
  }
}
