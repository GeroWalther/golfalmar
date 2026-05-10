import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { checkAdminBasicAuth } from "@/lib/auth";

const intlMiddleware = createMiddleware(routing);

const ADMIN_REALM = 'Basic realm="GOLF AL MAR Admin", charset="UTF-8"';

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": ADMIN_REALM },
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const auth = request.headers.get("authorization");
    if (!checkAdminBasicAuth(auth)) return unauthorized();
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) return NextResponse.next();
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
