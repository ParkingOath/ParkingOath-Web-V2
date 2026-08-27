import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const APEX_HOST = "parkingoath.com.au";
const CANONICAL_HOST = "www.parkingoath.com.au";
const ANDROID_ASSET_LINKS_PATH = "/.well-known/assetlinks.json";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":", 1)[0].toLowerCase();
  if (hostname === APEX_HOST && request.nextUrl.pathname !== ANDROID_ASSET_LINKS_PATH) {
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
