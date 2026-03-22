"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="overflow-hidden rounded-lg border border-brand-deep-green/10 bg-white">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-brand-deep-green">{item.question}</span>
              <span className="text-xl leading-none text-brand-red">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen ? (
              <div className="border-t border-brand-deep-green/10 px-5 py-4 text-sm leading-7 text-brand-charcoal">
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
