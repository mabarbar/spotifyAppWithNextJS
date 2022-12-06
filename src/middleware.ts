import { getToken } from "next-auth/jwt";
import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextRequest, NextResponse } from "next/server";
import { NEXTAUTH_SECRET } from "~/config/common.config";

export async function middleware(
  req: NextRequest
): Promise<NextMiddlewareResult> {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: NEXTAUTH_SECRET,
  });

  if (!token && pathname !== "/authenticate")
    return NextResponse.rewrite(new URL("/authenticate", req.url));
}

export const config = {
  matcher: ["/", "/error", "/playlist/:path*"],
};

export default middleware;