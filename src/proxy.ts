import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = ["/api/v1/auth/login", "/api/v1/auth/logout"];

const protectedRoutes = ["/api/v1/auth/me"];

async function authenticate(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = publicRoutes.some((route) => pathname.startsWith(route));
  if (isPublic) {
    return NextResponse.next();
  }

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (!isProtected) return NextResponse.next();

  const payload = await authenticate(req);
  if (!payload) {
    return NextResponse.json(
      { success: false, message: "Sesi tidak valid, silakan login kembali" },
      { status: 401 },
    );
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", payload.sub as string);
  requestHeaders.set("x-user-role", payload.role as string);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/api/v1/:path*"],
};
