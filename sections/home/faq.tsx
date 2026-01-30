"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group rounded-2xl border border-slate-200/70 bg-white px-6 py-5 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer list-none items-center justify-between text-left text-base font-semibold text-slate-900 focus:outline-none"
      >
        <span>{question}</span>
        <span className="ml-4 relative flex h-5 w-5 items-center justify-center">
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute text-xl"
          >
            +
          </motion.span>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm text-slate-600">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection = () => {
  const initialQuestions = [
    {
      question: "Do I have to host all the time?",
      answer: "No. You choose when your space is available and can pause or stop hosting anytime."
    },
    {
      question: "What kind of parking spaces can I list?",
      answer: "We're happy to help with more details. Reach out and we'll guide you through the specifics."
    },
    {
      question: "How much effort is involved?",
      answer: "We're happy to help with more details. Reach out and we'll guide you through the specifics."
    },
    {
      question: "What if a driver leaves earlier than expected?",
      answer: "We're happy to help with more details. Reach out and we'll guide you through the specifics."
    },
    {
      question: "Do I need to accept every booking?",
      answer: "We're happy to help with more details. Reach out and we'll guide you through the specifics."
    },
    {
      question: "Is Parking Oath handling payments for commercial car parks?",
      answer: "We're happy to help with more details. Reach out and we'll guide you through the specifics."
    }
  ];

  return (
    <section
      id="faqs"
      className="bg-[#f5f7fb] bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:64px_64px]"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:py-28">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
            Frequently asked
            <br />
            questions
          </h2>
        </div>
        <div className="mt-12 space-y-4">
          {initialQuestions.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
