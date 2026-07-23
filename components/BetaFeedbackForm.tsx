"use client";

import { type FormEvent, type ReactNode, useState } from "react";

import { Button } from "@/components/Button";

type Role = "Driver only" | "Host only" | "Both";
type YesNoMaybe = "Yes" | "No" | "Maybe";

interface BetaFormData {
  role: Role | "";
  driverFindEase: string;
  driverBookingClarity: string;
  driverMapUsefulness: string;
  driverOverall: string;
  hostListEase: string;
  hostAvailabilityClarity: string;
  hostEarningsConfidence: string;
  hostOverall: string;
  voiceFindEase: string;
  voiceUnderstanding: string;
  voiceVsTyping: string;
  voiceUseAgain: YesNoMaybe | "";
  whenUse: string[];
  expectedPrice: string;
  whyChoose: string;
  referralReason: string;
  churnReason: string;
  otherApps: string;
  comparison: string;
  nps: string;
}

const INITIAL_FORM: BetaFormData = {
  role: "",
  driverFindEase: "",
  driverBookingClarity: "",
  driverMapUsefulness: "",
  driverOverall: "",
  hostListEase: "",
  hostAvailabilityClarity: "",
  hostEarningsConfidence: "",
  hostOverall: "",
  voiceFindEase: "",
  voiceUnderstanding: "",
  voiceVsTyping: "",
  voiceUseAgain: "",
  whenUse: [],
  expectedPrice: "",
  whyChoose: "",
  referralReason: "",
  churnReason: "",
  otherApps: "",
  comparison: "",
  nps: "",
};

const WHEN_USE_OPTIONS = [
  "Daily commute",
  "Weekend events",
  "Sports and concerts",
  "Shopping",
  "Visiting friends or family",
  "Other",
];

const RATING_SCALE = ["1", "2", "3", "4", "5"];
const NPS_SCALE = Array.from({ length: 11 }, (_, i) => String(i));

const inputClass =
  "w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white";

const textareaClass = `${inputClass} resize-none`;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-base font-semibold text-slate-900 mb-6 pb-2 border-b border-slate-200">
        {title}
      </h2>
      <div className="space-y-7">{children}</div>
    </div>
  );
}

function Question({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-700 mb-3">{label}</p>
      {children}
    </div>
  );
}

function RatingScale({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="flex gap-4">
        {RATING_SCALE.map((r) => (
          <label key={r} className="flex flex-col items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={r}
              checked={value === r}
              onChange={() => onChange(r)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-sm text-slate-600">{r}</span>
          </label>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-2">1 = very difficult · 5 = very easy</p>
    </div>
  );
}

function NPSScale({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {NPS_SCALE.map((n) => (
          <label
            key={n}
            className={`flex items-center justify-center w-10 h-10 rounded-lg border cursor-pointer text-sm font-medium transition-colors ${
              value === n
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-600 hover:border-blue-300"
            }`}
          >
            <input
              type="radio"
              name="nps"
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
            />
            {n}
          </label>
        ))}
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-2">
        <span>0 = Not at all likely</span>
        <span>10 = Extremely likely</span>
      </div>
    </div>
  );
}

export default function BetaFeedbackForm() {
  const [form, setForm] = useState<BetaFormData>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const set = (key: keyof BetaFormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleWhenUse = (option: string) => {
    setForm((prev) => ({
      ...prev,
      whenUse: prev.whenUse.includes(option)
        ? prev.whenUse.filter((o) => o !== option)
        : [...prev.whenUse, option],
    }));
  };

  const showDriver = form.role === "Driver only" || form.role === "Both";
  const showHost = form.role === "Host only" || form.role === "Both";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.role) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/beta-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(typeof data.message === "string" ? data.message : "Submission failed");
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-blue-50 border border-blue-100 p-10 text-center">
        <p className="text-2xl mb-3">Thanks so much for your feedback you Legend!</p>
        <p className="text-slate-600 text-sm">
          Your response has been received and the ParkingOath team really appreciate your support. ParkingOath, makes hard parking easy.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Section title="About your test">
        <Question label="Which role(s) did you test?">
          <div className="flex flex-col gap-3">
            {(["Driver only", "Host only", "Both"] as Role[]).map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={option}
                  checked={form.role === option}
                  onChange={() => set("role", option)}
                  className="w-4 h-4 accent-blue-600"
                  required
                />
                <span className="text-sm text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </Question>
      </Section>

      {showDriver && (
        <Section title="Driver experience">
          <p className="text-xs text-slate-400 -mt-4">Rate 1 to 5, where 1 = very difficult and 5 = very easy</p>
          <Question label="How easy was it to find a parking space near your destination?">
            <RatingScale name="driverFindEase" value={form.driverFindEase} onChange={(v) => set("driverFindEase", v)} />
          </Question>
          <Question label="How clear was the booking process?">
            <RatingScale name="driverBookingClarity" value={form.driverBookingClarity} onChange={(v) => set("driverBookingClarity", v)} />
          </Question>
          <Question label="How useful was the map view for finding spaces?">
            <RatingScale name="driverMapUsefulness" value={form.driverMapUsefulness} onChange={(v) => set("driverMapUsefulness", v)} />
          </Question>
          <Question label="How would you rate the overall driver experience?">
            <RatingScale name="driverOverall" value={form.driverOverall} onChange={(v) => set("driverOverall", v)} />
          </Question>
        </Section>
      )}

      {showHost && (
        <Section title="Host experience">
          <p className="text-xs text-slate-400 -mt-4">Rate 1 to 5, where 1 = very difficult and 5 = very easy</p>
          <Question label="How easy was it to list your parking space?">
            <RatingScale name="hostListEase" value={form.hostListEase} onChange={(v) => set("hostListEase", v)} />
          </Question>
          <Question label="How clear were the instructions for setting your availability?">
            <RatingScale name="hostAvailabilityClarity" value={form.hostAvailabilityClarity} onChange={(v) => set("hostAvailabilityClarity", v)} />
          </Question>
          <Question label="How confident did you feel about how earnings are displayed?">
            <RatingScale name="hostEarningsConfidence" value={form.hostEarningsConfidence} onChange={(v) => set("hostEarningsConfidence", v)} />
          </Question>
          <Question label="How would you rate the overall host experience?">
            <RatingScale name="hostOverall" value={form.hostOverall} onChange={(v) => set("hostOverall", v)} />
          </Question>
        </Section>
      )}

      <Section title="Voice search">
        <Question label="How easy was it to find the voice search feature?">
          <RatingScale name="voiceFindEase" value={form.voiceFindEase} onChange={(v) => set("voiceFindEase", v)} />
        </Question>
        <Question label="How well did voice search understand what you said?">
          <RatingScale name="voiceUnderstanding" value={form.voiceUnderstanding} onChange={(v) => set("voiceUnderstanding", v)} />
        </Question>
        <Question label="How useful did you find voice search compared to typing?">
          <RatingScale name="voiceVsTyping" value={form.voiceVsTyping} onChange={(v) => set("voiceVsTyping", v)} />
        </Question>
        <Question label="Would you use voice search again?">
          <div className="flex gap-4">
            {(["Yes", "No", "Maybe"] as YesNoMaybe[]).map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="voiceUseAgain"
                  value={option}
                  checked={form.voiceUseAgain === option}
                  onChange={() => set("voiceUseAgain", option)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </Question>
      </Section>

      <Section title="About how you'd use ParkingOath">
        <Question label="When would you most likely use ParkingOath? (Select all that apply)">
          <div className="flex flex-col gap-3">
            {WHEN_USE_OPTIONS.map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={form.whenUse.includes(option)}
                  onChange={() => toggleWhenUse(option)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </Question>
        <Question label="What would you expect to pay for a parking space per hour in your area?">
          <input
            type="text"
            value={form.expectedPrice}
            onChange={(e) => set("expectedPrice", e.target.value)}
            placeholder="e.g. $5–$8"
            className={inputClass}
          />
        </Question>
        <Question label="What would make you choose ParkingOath over a parking station or street parking?">
          <textarea
            value={form.whyChoose}
            onChange={(e) => set("whyChoose", e.target.value)}
            rows={3}
            className={textareaClass}
          />
        </Question>
        <Question label="What would make you recommend ParkingOath to a friend?">
          <textarea
            value={form.referralReason}
            onChange={(e) => set("referralReason", e.target.value)}
            rows={3}
            className={textareaClass}
          />
        </Question>
        <Question label="What would stop you from using ParkingOath again?">
          <textarea
            value={form.churnReason}
            onChange={(e) => set("churnReason", e.target.value)}
            rows={3}
            className={textareaClass}
          />
        </Question>
      </Section>

      <Section title="Competitive context">
        <Question label="Have you used any other parking apps before? If yes, which ones?">
          <textarea
            value={form.otherApps}
            onChange={(e) => set("otherApps", e.target.value)}
            rows={2}
            className={textareaClass}
          />
        </Question>
        <Question label="How does ParkingOath compare?">
          <textarea
            value={form.comparison}
            onChange={(e) => set("comparison", e.target.value)}
            rows={3}
            className={textareaClass}
          />
        </Question>
      </Section>

      <Section title="Overall">
        <Question label="On a scale of 0 to 10, how likely are you to recommend ParkingOath to a friend or colleague?">
          <NPSScale value={form.nps} onChange={(v) => set("nps", v)} />
        </Question>
      </Section>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={!form.role || status === "loading"}
        className="w-full"
      >
        {status === "loading" ? "Submitting..." : "Submit feedback"}
      </Button>
    </form>
  );
}
