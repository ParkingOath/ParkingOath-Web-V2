"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbLeadId?: string;
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixelLeadTracker() {
  const trackedLeadId = useRef<string | null>(null);

  useEffect(() => {
    const leadId = new URLSearchParams(window.location.search).get("lead_id");

    if (!leadId || trackedLeadId.current === leadId) {
      return;
    }

    trackedLeadId.current = leadId;
    window.fbLeadId = leadId;

    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {}, { eventID: leadId });
    }
  }, []);

  return null;
}
