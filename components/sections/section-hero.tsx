"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";
import { Bell } from "lucide-react";

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
  const [isExpanded, setIsExpanded] = useState(true);
  const [showContent, setShowContent] = useState(true);
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
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {announcement && (
            <motion.div
              layout
              initial={false}
              animate={{ 
                width: isExpanded ? "auto" : "56px",
                height: "56px"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30 
              }}
              onAnimationComplete={(definition: any) => {
                if (isExpanded && (definition.width === "auto" || definition === "expanded")) {
                  setShowContent(true);
                }
              }}
              className={`group relative flex items-center bg-brand-yellow shadow-[0_20px_50px_rgba(0,0,0,0.2)] shadow-brand-yellow/30 ring-1 ring-brand-brown/10 backdrop-blur-xl overflow-hidden ${
                isExpanded ? "rounded-3xl p-2" : "rounded-full justify-center cursor-pointer hover:bg-brand-yellow/90"
              }`}
              onClick={() => {
                if (!isExpanded) {
                  setIsExpanded(true);
                }
              }}
            >
              {/* Bell Icon Box - always visible */}
              <div 
                className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
                  isExpanded ? "bg-brand-deep-green/10 text-brand-deep-green ml-0" : "text-brand-deep-green"
                }`}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, -15, 15, -15, 15, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                  style={{ originY: 0 }}
                >
                  <Bell className="h-5 w-5 fill-brand-deep-green/10" />
                </motion.div>
              </div>
              
              <AnimatePresence mode="wait">
                {isExpanded && showContent && (
                  <motion.div 
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    <div className="min-w-[260px] max-w-[360px] pl-2 pr-10 text-brand-deep-green">
                      <div className="text-xl font-bold leading-snug tracking-tight">
                        {announcement}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(false);
                        setShowContent(false);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-brand-deep-green/5 text-brand-deep-green/40 transition-all hover:bg-brand-deep-green/10 hover:text-brand-deep-green"
                      aria-label="Collapse notification"
                    >
                      <span className="text-xs font-bold">✕</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <section className="page-section pb-8 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="page-body relative"
        >
          <motion.div
            variants={labelVariants}
            className="mb-4 flex items-center text-xl md:text-2xl font-black tracking-wide text-brand-red"
          >
            {label}
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
            <div className="relative inline-block overflow-visible shrink-0">
              {/* Cartoonish Wavy/Jagged Underline - Now placed BEHIND the title and shifted down slightly */}
              <div className="absolute -bottom-2 left-0 z-0 w-full md:-bottom-3 lg:-bottom-4">
                <svg 
                  viewBox="0 0 400 20" 
                  preserveAspectRatio="none" 
                  className="h-3 w-full overflow-visible md:h-4 lg:h-6"
                >
                  <defs>
                    <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f20505" />
                      <stop offset="50%" stopColor="#a60303" />
                      <stop offset="100%" stopColor="#620202" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    variants={underlineVariants}
                    d="M0,10 C40,0 60,20 100,10 C140,0 160,20 200,10 C240,0 260,20 300,10 C340,0 360,20 400,10"
                    fill="none"
                    stroke="url(#underline-gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className=""
                  />
                </svg>
              </div>

              <motion.h1
                variants={titleVariants}
                className="relative z-10 font-serif text-5xl font-black leading-[1.05] tracking-tight text-brand-deep-green md:text-7xl lg:text-8xl"
              >
                {title}
              </motion.h1>
            </div>

            {subtitle ? (
              <div className="flex items-center gap-8 flex-1 mt-6 lg:mt-0">
                <div className="hidden lg:block w-[1px] h-12 bg-brand-deep-green/10" />
                <motion.p
                  variants={subtitleVariants}
                  className="font-baskerville text-xl leading-relaxed text-brand-deep-green/80 lg:text-2xl italic tracking-tight"
                >
                  {subtitle}
                </motion.p>
              </div>
            ) : null}
          </div>
        </motion.div>
      </section>
    </>
  );
}
