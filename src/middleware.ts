import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, or other unneccessary pages
  if (
    token &&
    (url.pathname.startsWith("/signin") || url.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/Inheritance", request.url));
  }

  if (
    !token &&
    (url.pathname.startsWith("/Inheritance") ||
      url.pathname.startsWith("/profile"))
  ) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Inheritance/:path*",
    "/profile/:path*",
    "/signin",
    "/signup",
    "/",
    "/verify/:path*",
  ],
};
