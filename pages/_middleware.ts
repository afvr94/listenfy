import { NextRequest, NextResponse } from "next/server";

const signedinPages = ["/", "/playlist", "/library"];

export default function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  if (signedinPages.find((p) => p === pathname)) {
    const token = req.cookies.LISTENFY_ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect(`${origin}/signin`);
    }
  }
}
