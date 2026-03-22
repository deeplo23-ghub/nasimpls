"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

type SectionHeroProps = {
  label: string;
  title: string;
  subtitle?: ReactNode;
  announcement?: ReactNode;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const labelVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

const underlineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1, 
    transition: { 
      delay: 0.8, 
      duration: 1.2, 
      ease: "easeInOut" 
    } 
  }
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function SectionHero({ label, title, subtitle, announcement }: SectionHeroProps) {
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {announcement && isAnnouncementVisible ? (
        <div 
          className={`fixed inset-x-0 z-40 mx-auto w-fit px-4 pt-4 transition-all duration-300 ${
            isScrolled ? "top-[54px] md:top-[60px]" : "top-[96px] md:top-[116px]"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex items-center gap-6 rounded-xl bg-brand-yellow border border-brand-brown/10 px-5 py-3 shadow-2xl shadow-brand-yellow/30 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 flex-none">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-red"></span>
              </span>
              <div className="text-[13px] font-bold leading-none tracking-tight text-brand-deep-green md:whitespace-nowrap md:text-sm">
                {announcement}
              </div>
            </div>
            <button
              onClick={() => setIsAnnouncementVisible(false)}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep-green/10 text-brand-deep-green/60 transition-colors hover:bg-brand-deep-green/20 hover:text-brand-deep-green"
              aria-label="Dismiss announcement"
            >
              <span className="text-xs">✕</span>
            </button>
          </motion.div>
        </div>
      ) : null}

      <section className="page-section overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="page-body relative"
        >
          <motion.div
            variants={labelVariants}
            className="mb-4 flex items-center gap-3 text-[14px] font-bold text-brand-red"
          >
            <span className="h-[1px] w-6 bg-brand-red/40" aria-hidden="true" />
            {label}
          </motion.div>

          <div className="relative inline-block overflow-visible">
            {/* Cartoonish Wavy/Jagged Underline - Now placed BEHIND the title and shifted down slightly */}
            <div className="absolute -bottom-2 left-0 z-0 w-full md:-bottom-3 lg:-bottom-4">
              <svg 
                viewBox="0 0 400 20" 
                preserveAspectRatio="none" 
                className="h-3 w-full overflow-visible md:h-4 lg:h-6"
              >
                <motion.path
                  variants={underlineVariants}
                  d="M0,10 C40,0 60,20 100,10 C140,0 160,20 200,10 C240,0 260,20 300,10 C340,0 360,20 400,10"
                  fill="none"
                  stroke="#F20505"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className=""
                />
              </svg>
            </div>

            <motion.h1
              variants={titleVariants}
              className="relative z-10 max-w-4xl font-serif text-5xl font-black leading-[1.05] tracking-tight text-brand-deep-green md:text-7xl lg:text-8xl"
            >
              {title}
            </motion.h1>
          </div>

          {subtitle ? (
            <motion.p
              variants={subtitleVariants}
              className="mt-4 max-w-3xl whitespace-pre-line font-baskerville text-lg leading-relaxed text-brand-brown/90 md:mt-6 md:text-xl lg:text-2xl"
            >
              {subtitle}
            </motion.p>
          ) : null}
        </motion.div>
      </section>
    </>
  );
}
