import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./app/utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("Authentication")?.value;

  const protectedPaths = ["/myExpense"];

  //verified token must same at the backend
  const verifiedToken = token && (await verifyAuth(token));

  if (!verifiedToken) {
    if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/register", req.url));
    }
  }
  if (verifiedToken) {
    if (
      req.nextUrl.pathname.startsWith("/register") ||
      req.nextUrl.pathname.startsWith("/login")
    ) {
      return NextResponse.redirect(new URL("/myExpense", req.url));
    }
  }
}
export const config = {
  matcher: ["/register", "/login", "/myExpense"],
};
