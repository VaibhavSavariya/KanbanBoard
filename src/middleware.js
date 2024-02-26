import { NextResponse } from "next/server";

export function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  const isPublicPath = pathname === "/login" || pathname === "/";
  const isPrivatePath = pathname === "/boards" || pathname === "/boards/:id";
  const token = req.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/boards", req.nextUrl));
  }
  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next();
}
