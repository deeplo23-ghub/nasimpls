"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3.5 group/faq">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div 
            key={item.question} 
            layout
            initial={false}
            className={`overflow-hidden rounded-3xl border transition-all duration-300 ${
              isOpen 
                ? "border-brand-green/20 bg-white shadow-[0_15px_30px_rgba(21,92,40,0.06)]" 
                : "border-brand-deep-green/5 bg-white/60 hover:bg-white hover:border-brand-deep-green/10"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-all group/btn"
              aria-expanded={isOpen}
            >
              <span className={`text-[1.1rem] font-black transition-colors duration-300 ${
                isOpen ? "text-brand-green" : "text-brand-deep-green/80 group-hover/btn:text-brand-deep-green"
              }`}>
                {item.question}
              </span>
              
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                isOpen ? "bg-brand-green text-white rotate-180" : "bg-brand-deep-green/5 text-brand-deep-green/30 group-hover/btn:bg-brand-deep-green/10 group-hover/btn:text-brand-deep-green/50"
              }`}>
                <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "stroke-[3]" : "stroke-[2]"}`} />
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: "auto", 
                    opacity: 1,
                    transition: { height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }, opacity: { duration: 0.25, delay: 0.1 } }
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    transition: { height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }, opacity: { duration: 0.2 } }
                  }}
                >
                  <div className="border-t border-brand-deep-green/5 px-6 pb-6 pt-4 text-[1rem] leading-relaxed text-brand-charcoal/80 font-medium">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
