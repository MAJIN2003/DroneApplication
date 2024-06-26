import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
    "/",
    "/login",
    "/register",
    "/dashboard/:path*",
  ],
};

export const middleware = async (request: NextRequest) => {
  const hasAccessToken = request.cookies.has("token");
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");
  const isRegisterPage = request.nextUrl.pathname.startsWith("/register");
  const isRootPage = request.nextUrl.pathname === "/";

  console.log("hasAccessToken", hasAccessToken);

  if (!hasAccessToken && !isLoginPage && !isRegisterPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!hasAccessToken && isRootPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasAccessToken && isLoginPage) {
    return NextResponse.redirect(
      new URL("/dashboard/gestor-reportes", request.url)
    );
  }

  if (hasAccessToken && isRegisterPage) {
    return NextResponse.redirect(
      new URL("/dashboard/gestor-reportes", request.url)
    );
  }

  if (hasAccessToken && isRootPage) {
    return NextResponse.redirect(
      new URL("/dashboard/gestor-reportes", request.url)
    );
  }

  return NextResponse.next();
};
