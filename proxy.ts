import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const APEX_HOST = "parkingoath.com.au";
const CANONICAL_HOST = "www.parkingoath.com.au";
const ANDROID_ASSET_LINKS_PATH = "/.well-known/assetlinks.json";
const APPLE_APP_SITE_ASSOCIATION_PATH = "/.well-known/apple-app-site-association";
const DOMAIN_ASSOCIATION_PATHS = new Set([
  ANDROID_ASSET_LINKS_PATH,
  APPLE_APP_SITE_ASSOCIATION_PATH,
]);

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":", 1)[0].toLowerCase();
  if (hostname === APEX_HOST && !DOMAIN_ASSOCIATION_PATHS.has(request.nextUrl.pathname)) {
    const destination = request.nextUrl.clone();
    destination.protocol = "https";
    destination.hostname = CANONICAL_HOST;
    destination.port = "";
    return NextResponse.redirect(destination, 307);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
