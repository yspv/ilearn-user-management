import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./lib/auth";

const protectedRoutes = ["/", "/dashboard"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isAuth = await isAuthenticated();
  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isPublicRoute && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  return NextResponse.next();
}
