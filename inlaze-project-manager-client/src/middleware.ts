import { verifyJWT } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  // return NextResponse.redirect(new URL("/dashboard", request.url));
  // const token = request.cookies.get("token")?.value;
  //
  // const pathname = request.nextUrl.pathname;
  //
  // if (pathname.startsWith("/")) {
  //   console.log("entered");
  //   if (!token || !verifyJWT(token)) {
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }
  // }
  //
  // if (pathname === "/") {
  //   if (token && verifyJWT(token)) {
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  // }
  //
  // return NextResponse.next();
};

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
