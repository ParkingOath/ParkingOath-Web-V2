"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    fbLeadId?: string;
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaPixelLeadTracker() {
  const searchParams = useSearchParams();
  const trackedLeadId = useRef<string | null>(null);
  const leadId = searchParams.get("lead_id");

  useEffect(() => {
    if (!leadId || trackedLeadId.current === leadId) {
      return;
    }

    trackedLeadId.current = leadId;
    window.fbLeadId = leadId;

    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", {}, { eventID: leadId });
    }
  }, [leadId]);

  return null;
}
