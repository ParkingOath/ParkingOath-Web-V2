"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { createMetaEventId, getBrowserCookie } from "@/lib/meta-browser";

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbEventId?: string;
    fbq?: Fbq;
  }
}

export function MetaPixelPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const eventId = createMetaEventId("pv");
    const eventSourceUrl = window.location.href;

    window.fbEventId = eventId;

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView", {}, { eventID: eventId });
    }

    void fetch("/api/meta/page-view", {
      body: JSON.stringify({
        eventId,
        eventSourceUrl,
        fbc: getBrowserCookie("_fbc"),
        fbp: getBrowserCookie("_fbp"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      method: "POST",
    }).catch((error) => {
      console.error("Meta PageView server event failed", error);
    });
  }, [pathname]);

  return null;
}
