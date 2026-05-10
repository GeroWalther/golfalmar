import type { NextRequest } from "next/server";

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export function checkAdminBasicAuth(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.toLowerCase().startsWith("basic ")) return false;
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false;
  let decoded: string;
  try {
    decoded = atob(authHeader.slice(6).trim());
  } catch {
    return false;
  }
  const idx = decoded.indexOf(":");
  if (idx < 0) return false;
  const user = decoded.slice(0, idx);
  const pass = decoded.slice(idx + 1);
  return constantTimeEqual(user, expectedUser) && constantTimeEqual(pass, expectedPass);
}

export function isAdminRequest(req: NextRequest | Request): boolean {
  const auth = req.headers.get("authorization") ?? req.headers.get("Authorization");
  return checkAdminBasicAuth(auth);
}
