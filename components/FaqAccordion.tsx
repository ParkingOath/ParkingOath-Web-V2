"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface FaqAccordionItem {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqAccordionItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all hover:border-blue-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between text-left text-base font-semibold text-slate-900 focus:outline-none"
        type="button"
      >
        <span>{question}</span>
        <span className="relative ml-4 flex h-5 w-5 items-center justify-center">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute text-2xl text-blue-600"
          >
            +
          </motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqAccordion({ items }: { items: FaqAccordionItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <FaqItem key={`${item.question}-${index}`} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
