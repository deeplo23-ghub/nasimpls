"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, Variants, useInView } from "framer-motion";
import Lenis from "lenis";

import { PageShell } from "@/components/layout/page-shell";
import { ContentCard } from "@/components/sections/content-card";
import { SectionHero } from "@/components/sections/section-hero";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { ChevronDown, Calendar, MapPin, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { bancakanContent } from "@/content/bancakan";

const sections = [
  { id: "hero", label: "Top" },
  { id: "vol-1", label: "Vol. 1" },
  { id: "vol-2", label: "Vol. 2" }
];

import { containerVariants, itemVariants } from "@/lib/animations";

function BackgroundDecoration() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Grain - Fades in first */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[url('/images/grainy.png')] bg-repeat" />
      </motion.div>

      {/* Crumbled Texture - Fades in second */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 mix-blend-multiply"
      >
        <div className="absolute inset-0 bg-[url('/images/crumbled.png')] bg-cover bg-center bg-no-repeat" />
      </motion.div>
    </div>
  );
}


function TypingText({ 
  text, 
  delay = 0, 
  className = "",
  linkText,
  linkUrl
}: { 
  text: string, 
  delay?: number, 
  className?: string,
  linkText?: string,
  linkUrl?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isStarted) {
      let idx = 0;
      const interval = setInterval(() => {
        if (idx <= text.length) {
          setCurrentIndex(idx);
          idx++;
        } else {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isStarted, text]);

  const renderContent = () => {
    if (!linkText || !linkUrl) return text.slice(0, currentIndex);
    
    const linkStart = text.indexOf(linkText);
    if (linkStart === -1) return text.slice(0, currentIndex);

    if (currentIndex <= linkStart) {
      return text.slice(0, currentIndex);
    }

    const beforeLink = text.slice(0, linkStart);
    const duringLink = text.slice(linkStart, Math.min(currentIndex, linkStart + linkText.length));
    const isLinkComplete = currentIndex >= linkStart + linkText.length;

    return (
      <>
        {beforeLink}
        <a 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="!text-brand-yellow font-bold underline underline-offset-4 hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          {duringLink}
          {isLinkComplete && <span>&nbsp;↗</span>}
        </a>
      </>
    );
  };

  return <div className={className}>{renderContent()}</div>;
}

function TypewriterText({ 
  occasions, 
  secondLine, 
  prefix = "Got", 
  suffix = "?",
  linkText,
  linkUrl
}: { 
  occasions: string[], 
  secondLine: string,
  prefix?: string,
  suffix?: string,
  linkText?: string,
  linkUrl?: string
}) {
  const [occasionIndex, setOccasionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOccasionIndex((prev) => (prev + 1) % occasions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [occasions.length]);

  return (
    <div className="h-full flex flex-col px-6 pt-6 lg:px-10 lg:pt-10 pb-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          layout: { duration: 0.4 }
        }}
        layout 
        className="font-bold text-4xl lg:text-5xl leading-tight min-h-[1.5em] text-white flex items-center flex-wrap"
      >
        <motion.span layout="position">{prefix}&nbsp;</motion.span>
        <div className="relative inline-flex items-center h-[1.2em] overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={occasionIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center"
            >
              <span className="text-brand-yellow whitespace-nowrap text-4xl lg:text-5xl">
                {occasions[occasionIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        <motion.span layout="position">&nbsp;{suffix}</motion.span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-auto font-medium text-lg lg:text-xl leading-relaxed text-white/80 max-w-2xl"
      >
        {secondLine} 
        {linkText && linkUrl && (
          <motion.a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial="initial"
            whileHover="hover"
            className="group/link relative ml-2 inline-flex flex-col whitespace-nowrap !text-brand-yellow font-bold leading-none"
          >
            <div className="flex items-center">
              {linkText}
              <span className="inline-block transition-transform group-hover/link:translate-x-1">&nbsp;↗</span>
            </div>
            <motion.div 
              variants={{
                initial: { scaleX: 0 },
                hover: { scaleX: 1 }
              }}
              transition={{ duration: 0.3 }}
              className="mt-0 h-[3px] bg-brand-yellow origin-left rounded-full"
            />
          </motion.a>
        )}
      </motion.div>
    </div>
  );
}

function SpreadCarousel() {
  const items = [
    "rice,",
    "rendang,",
    "satay,",
    "gado-gado,",
    "soto,",
    "bakso,",
    "nasi goreng,",
    "tempeh,",
    "kerupuk,",
    "sambals,",
    "the table full."
  ];
  const [index, setIndex] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < items.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    const newOffsets: number[] = [0];
    let current = 0;
    itemRefs.current.forEach((ref, l) => {
      if (ref && l < items.length - 1) {
        current += ref.offsetWidth + 8;
        newOffsets.push(current);
      }
    });
    setOffsets(newOffsets);
  }, [items.length]);

  return (
    <div className="flex items-baseline overflow-hidden text-4xl lg:text-5xl font-bold text-white min-h-[1.5em]">
      <span className="flex-none bg-[#1D261D] z-10">Think&nbsp;</span>
      <div className="relative flex-1 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: -(offsets[index] || 0) }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
            mass: 1
          }}
          className="flex whitespace-nowrap gap-x-2 text-brand-yellow"
        >
          {items.map((item, i) => (
            <span 
              key={i} 
              ref={(el) => { itemRefs.current[i] = el; }}
              className="flex-none"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

interface BancakanHistoryProps {
  volume: number;
  dateStr: string;
  fullDate: string;
  time: string;
  venue: string;
  address: string;
  posterSrc: string;
  isCompleted?: boolean;
  isOpenDefault?: boolean;
}

function BancakanHistoryItem({ 
  volume, 
  dateStr, 
  fullDate, 
  time, 
  venue, 
  address, 
  posterSrc, 
  isCompleted = false,
  isOpenDefault = false,
  onOpenArchive
}: BancakanHistoryProps & { onOpenArchive: (vol: number) => void }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  
  return (
    <div id={`vol-${volume}`} className="mt-[64px] first:mt-16 scroll-mt-32">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="flex items-center gap-6 text-left group w-full"
       >
         <div className={`flex h-14 w-14 items-center justify-center rounded-[20px] bg-brand-deep-green text-brand-yellow transition-all duration-500 ${!isOpen ? 'group-hover:scale-110 shadow-lg' : ''}`}>
           <ChevronDown className={`h-8 w-8 transition-all duration-500 stroke-[3] ${isOpen ? 'rotate-180' : ''}`} />
         </div>
         <div className="flex flex-col">
           <h2 className="font-serif text-4xl md:text-5xl font-black text-brand-deep-green group-hover:text-brand-red transition-colors leading-none">
             Bancakan Vol. {volume} <span className="text-brand-deep-green/60"> — {dateStr}</span>
           </h2>
         </div>
       </button>

       <AnimatePresence>
         {isOpen && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ 
               height: 'auto', 
               opacity: 1,
               transition: { height: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }, opacity: { duration: 0.3, delay: 0.2 } }
              }}
             exit={{ 
               height: 0, 
               opacity: 0,
               transition: { height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }, opacity: { duration: 0.2 } }
              }}
             className="overflow-hidden"
           >
               <div className="pt-12 pr-10 pb-10 flex flex-col lg:flex-row gap-16 items-start !overflow-visible">
                  {/* Poster Left */}
                  <div className="flex-none max-w-sm w-full">
                     <div className="!overflow-visible">
                       <motion.div 
                         initial={{ y: 20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ delay: 0.3 }}
                         className="relative w-full !overflow-visible"
                       >
                           {isCompleted ? (
                             <img 
                               src={posterSrc} 
                               alt={`Bancakan Vol ${volume} Poster`} 
                               className="w-full h-auto" 
                             />
                           ) : (
                             <div className="relative aspect-[3/4] w-full bg-brand-deep-green/5 flex flex-col items-center justify-center text-center p-8 border-4 border-dashed border-brand-deep-green/10">
                               <div className="w-20 h-20 rounded-full bg-brand-deep-green/5 flex items-center justify-center mb-6">
                                 <Image 
                                   src="/images/NASI_orange1.png" 
                                   alt="Logo" 
                                   width={40} 
                                   height={15} 
                                   className="opacity-20 grayscale brightness-0" 
                                 />
                               </div>
                               <h3 className="font-serif text-3xl font-black text-brand-deep-green/40 italic leading-tight">Secret Poster</h3>
                             </div>
                           )}
                       </motion.div>
                     </div>
                  </div>

                  {/* Message Right */}
                   <motion.div 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="flex-1 relative z-10 bg-[#F5EFE3] p-10 rounded-[32px] w-full border-4 border-brand-deep-green shadow-[8px_8px_0_#F2AE30,16px_16px_0_#A60303] transition-shadow duration-300 hover:shadow-[12px_12px_0_#F2AE30,24px_24px_0_#A60303]"
                   >
                     <p className="font-serif text-3xl md:text-5xl font-black italic text-brand-deep-green leading-tight mb-10">
                       {isCompleted ? (
                         <>
                           Come through,<br />
                           bring something to drink,<br />
                           and get ready to eat a lot.
                         </>
                       ) : (
                         <>
                           To be announced. <br />
                           Follow <motion.a 
                             href="https://www.instagram.com/nasi.mpls" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             initial="initial"
                             whileHover="hover"
                             className="group/link relative inline-flex flex-col whitespace-nowrap font-bold leading-none"
                           >
                              <span className="flex items-center text-brand-deep-green group-hover/link:text-brand-red transition-colors">
                                @nasi.mpls<span className="inline-block group-hover/link:translate-x-1 transition-transform">&nbsp;↗</span>
                              </span>
                              <motion.span 
                                variants={{
                                  initial: { scaleX: 0 },
                                  hover: { scaleX: 1 }
                                }}
                                transition={{ duration: 0.3 }}
                                className="mt-0 h-[3px] bg-brand-red origin-left rounded-full block"
                              />
                           </motion.a>
                         </>
                       )}
                     </p>
                     <div className="flex flex-col">
                       <div className="flex flex-col">
                         <p className="font-sans text-lg font-bold text-brand-deep-green capitalize leading-tight mb-1">Date</p>
                         <div className="flex items-center gap-4">
                            <p className="font-serif text-2xl md:text-3xl font-black text-brand-deep-green italic leading-tight">{fullDate}</p>
                            {isCompleted && (
                              <button 
                                onClick={() => {
                                  const calendarContent = [
                                    "BEGIN:VCALENDAR",
                                    "VERSION:2.0",
                                    "BEGIN:VEVENT",
                                    "DTSTART:20260320T190000",
                                    "DTEND:20260321T000000",
                                    "SUMMARY:Bancakan Vol. 1",
                                    "DESCRIPTION:Authentic Indonesian feast by Nasi MPLS. Come through, bring something to drink, and get ready to eat a lot.",
                                    "LOCATION:805 15th Ave SE, Minneapolis, MN",
                                    "END:VEVENT",
                                    "END:VCALENDAR"
                                  ].join("\n");
                                  const blob = new Blob([calendarContent], { type: "text/calendar;charset=utf-8" });
                                  const link = document.createElement("a");
                                  link.href = window.URL.createObjectURL(blob);
                                  link.setAttribute("download", `Bancakan_Vol_${volume}.ics`);
                                  document.body.appendChild(link);
                                  link.click();
                                  document.body.removeChild(link);
                                }}
                                className="flex items-center gap-2 bg-brand-yellow/20 text-brand-deep-green px-4 py-2 rounded-full font-bold text-sm hover:bg-brand-yellow transition-all duration-300 whitespace-nowrap group"
                              >
                                <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
                                Add to calendar
                              </button>
                            )}
                         </div>
                       </div>
                       <div className="flex flex-col mt-4">
                         <p className="font-sans text-lg font-bold text-brand-deep-green capitalize leading-tight mb-1">Time</p>
                         <p className="font-serif text-2xl md:text-3xl font-black text-brand-deep-green italic leading-tight">{time}</p>
                       </div>
                       <div className="flex flex-col mt-4">
                         <p className="font-sans text-lg font-bold text-brand-deep-green capitalize leading-tight mb-1">Where</p>
                         {isCompleted ? (
                         <motion.a 
                           href="https://www.google.com/maps/search/?api=1&query=805+15th+Ave+SE+Minneapolis+MN+55414+Fieldhouse+Dinkytown"
                           target="_blank"
                           rel="noopener noreferrer"
                           initial="initial"
                           whileHover="hover"
                           className="group/link flex flex-col items-start w-fit"
                         >
                             {/* Venue Line */}
                             <div className="flex flex-col relative w-fit leading-none mb-2">
                               <span className="font-serif text-2xl md:text-3xl font-black text-brand-deep-green italic group-hover/link:text-brand-red transition-colors whitespace-nowrap">
                                 {venue}
                               </span>
                               <motion.div 
                                 variants={{
                                   initial: { scaleX: 0 },
                                   hover: { scaleX: 1 }
                                 }}
                                 transition={{ duration: 0.3 }}
                                 className="h-[3px] bg-brand-red origin-left rounded-full"
                               />
                             </div>
                             
                             {/* Address Line */}
                             <div className="flex flex-col relative w-fit leading-none">
                               <span className="font-serif text-2xl md:text-3xl font-black text-brand-deep-green italic group-hover/link:text-brand-red transition-colors flex items-center whitespace-nowrap">
                                 {address} <span className="inline-block group-hover/link:translate-x-1 transition-transform">&nbsp;↗</span>
                               </span>
                               <motion.div 
                                 variants={{
                                   initial: { scaleX: 0 },
                                   hover: { scaleX: 1 }
                                 }}
                                 transition={{ duration: 0.3 }}
                                 className="h-[3px] bg-brand-red origin-left rounded-full"
                               />
                             </div>
                         </motion.a>
                         ) : (
                           <p className="font-serif text-2xl md:text-3xl font-black text-brand-deep-green italic leading-tight">
                             TBA
                           </p>
                         )}
                       </div>
                     </div>
                     <div className="mt-4 flex items-center gap-6">
                        <Button disabled className="bg-brand-deep-green/10 text-brand-deep-green/40 px-10 py-6 rounded-2xl font-bold text-xl cursor-not-allowed border-none shadow-none grayscale">
                          {isCompleted ? 'Sign Up' : 'Soon'}
                        </Button>
                         <div className="font-serif text-lg md:text-xl font-bold text-brand-deep-green leading-none">
                           {isCompleted && (
                             <div className="flex items-baseline gap-1.5 flex-wrap">
                               Feast is over! 
                               <motion.a 
                                 href="https://partiful.com/e/2iuZILzGS7hg1KtlQVXP" 
                                 target="_blank" 
                                 rel="noopener noreferrer" 
                                 initial="initial"
                                 whileHover="hover"
                                 className="group/link relative inline-flex flex-col whitespace-nowrap !text-brand-red font-bold leading-none"
                               >
                                  <span className="flex items-center">
                                    Check Partiful
                                  </span>
                                  <motion.span 
                                    variants={{
                                      initial: { scaleX: 0 },
                                      hover: { scaleX: 1 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-0 h-[3px] bg-brand-red origin-left rounded-full"
                                  />
                               </motion.a> 
                               for more details.
                             </div>
                           )}
                         </div>
                     </div>
                   </motion.div>
               </div>
               
               {isCompleted && (
                 <div className="pt-[48px] flex flex-col !overflow-visible">
                    <div className="w-full flex flex-col">
                        <motion.button 
                          onClick={() => onOpenArchive(volume)} 
                          initial="initial"
                          whileHover="hover"
                          className="flex flex-col group/link w-fit relative mb-8 leading-none"
                        >
                           <div className="flex items-center gap-2">
                             <h3 className="font-serif text-3xl font-black text-brand-deep-green leading-none group-hover/link:text-brand-red transition-colors flex items-center">
                                Gallery<span className="inline-block group-hover/link:translate-x-1 transition-transform">&nbsp;↗</span>
                             </h3>
                           </div>
                          <motion.div 
                            variants={{
                              initial: { scaleX: 0 },
                              hover: { scaleX: 1 }
                            }}
                            transition={{ duration: 0.3 }}
                            className="h-[3px] bg-brand-red origin-left mt-0 rounded-full"
                          />
                        </motion.button>
                        
                        <div className="relative overflow-hidden group/gallery">
                          <motion.div 
                            initial={{ x: 0 }}
                            animate={{ x: "-50%" }}
                            transition={{ 
                              repeat: Infinity, 
                              duration: 35, 
                              ease: "linear"
                            }}
                            className="flex gap-8 whitespace-nowrap w-fit group-hover/gallery:[animation-play-state:paused]"
                          >
                            {[1, 2, 3, 4, 1, 2, 3, 4].map((i, index) => (
                              <motion.div 
                                key={`${i}-${index}`} 
                                className="flex-none w-[420px] h-[560px] bg-brand-deep-green/5 rounded-3xl flex flex-col items-center justify-center text-center p-12 relative overflow-hidden"
                              >
                                <div className="w-24 h-24 rounded-full bg-brand-deep-green/5 flex items-center justify-center mb-8">
                                  <Image 
                                    src="/images/NASI_orange1.png" 
                                    alt="Logo" 
                                    width={48} 
                                    height={18} 
                                    className="opacity-10 grayscale brightness-0" 
                                  />
                                </div>
                                <h4 className="text-4xl font-black text-brand-deep-green/40 italic leading-tight">Gallery Photo #{i}</h4>
                                <div className="mt-10 w-1/2 h-[4px] bg-brand-deep-green/5 rounded-full" />
                                <span className="mt-6 text-base font-black text-brand-deep-green/20 uppercase tracking-[0.2em]">Bancakan Vol. {volume}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                    </div>
                </div>
               )}
            </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
}

function BancakanHistory({ onOpenArchive }: { onOpenArchive: (vol: number) => void }) {
  return (
    <div className="flex flex-col">
      <BancakanHistoryItem 
        volume={1}
        dateStr="March 20"
        fullDate="Friday, March 20"
        time="7:00 PM – 10:00 PM"
        venue="Fieldhouse Dinkytown – 4th Floor Lounge"
        address="805 15th Ave SE, Minneapolis"
        posterSrc="/images/bancakan_event.png"
        isCompleted={true}
        isOpenDefault={true}
        onOpenArchive={onOpenArchive}
      />
      <BancakanHistoryItem 
        volume={2}
        dateStr="Coming Soon"
        fullDate="TBA"
        time="TBA"
        venue="TBA"
        address="TBA"
        posterSrc=""
        isCompleted={false}
        isOpenDefault={false}
        onOpenArchive={onOpenArchive}
      />
    </div>
  );
}

function PageNavigator() {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const observers = sections.map(section => {
      const el = document.getElementById(section.id);
      if (!el) return null;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        });
      }, { threshold: 0.1, rootMargin: "-20% 0px -60% 0px" });
      
      observer.observe(el);
      return observer;
    });

    return () => {
      observers.forEach(o => o?.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = id === "hero" ? null : document.getElementById(id);
    const targetY = !el ? 0 : el.getBoundingClientRect().top + window.pageYOffset - 128;
    
    // Manual animation to bypass any browser/CSS smooth scroll issues
    const startY = window.pageYOffset;
    
    import("framer-motion").then(({ animate }) => {
      animate(startY, targetY, {
        type: "spring",
        stiffness: 70,
        damping: 18,
        mass: 1,
        onUpdate: (latest) => window.scrollTo(0, latest)
      });
    });
  };

  return (
    <motion.div 
      variants={navigatorVariants}
      className="fixed right-8 top-[calc(50%+40px)] z-40 hidden xl:block"
    >
      <div className="relative h-[200px] w-6 flex flex-col items-center justify-center py-6">
        {/* The Track Line */}
        <div className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-[1.5px] bg-brand-deep-green/10" />

        {/* Section Dots */}
        <div className="absolute top-6 bottom-6 left-0 right-0 pointer-events-none">
          {sections.map((section, idx) => {
            const isActive = activeSection === section.id;
            return (
              <div 
                key={section.id} 
                className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-8"
                style={{ 
                  top: idx === 0 ? '0%' : idx === 1 ? '50%' : '100%',
                }}
              >
                <button
                  onClick={() => scrollTo(section.id)}
                  className="group pointer-events-auto relative flex items-center justify-center outline-none"
                >
                  <span className={`absolute right-8 font-serif text-xl font-black tracking-widest transition-all duration-300 whitespace-nowrap ${isActive ? 'text-brand-deep-green opacity-100' : 'text-brand-deep-green/30'}`}>
                    {section.label}
                  </span>
                  <div className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-brand-deep-green' : 'bg-brand-deep-green/20'}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

const navigatorVariants: Variants = {
  hidden: { opacity: 0, x: 20, y: "-50%" },
  visible: { 
    opacity: 1, 
    x: 0,
    y: "-50%",
    transition: {
      delay: 1.05, // Hero stagger (0.25s) + Underline internal delay (0.8s)
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function BancakanPage() {
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <PageShell>
      <BackgroundDecoration />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative"
      >
        <PageNavigator />

        <motion.div id="hero" variants={itemVariants}>
          <SectionHero
            label={bancakanContent.label}
            title={bancakanContent.title}
            subtitle={bancakanContent.subtitle}
          />
        </motion.div>

        <section id="details" className="page-section mt-0 overflow-visible min-h-[calc(100vh-160px)] flex flex-col justify-start">
          <div className="page-body w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-0 pr-4 pb-4">
              <motion.div 
                ref={containerRef}
                variants={itemVariants}
                className="h-[240px]"
              >
                <ContentCard key="first-card" className="bg-[#1D261D] rounded-[40px] shadow-[8px_8px_0_#F2AE30,16px_16px_0_#A60303] transition-shadow duration-300 hover:shadow-[12px_12px_0_#F2AE30,24px_24px_0_#A60303] p-0 border-none text-left h-full w-full">
                      <TypewriterText 
                      occasions={[
                        "a big crew",
                        "a wedding",
                        "a birthday",
                        "a team lunch",
                        "a feast",
                        "a party",
                        "an office jam",
                        "family time",
                        "wild ideas"
                      ]}
                        secondLine="We’ve got you. Bancakan is our catering format, built for groups of 12+ who want a proper Indonesian spread—generous, satisfying, and completely stress-free." 
                      />
                    </ContentCard>
                  </motion.div>

              <motion.div
                variants={itemVariants}
                className="h-[240px]"
              >
                <ContentCard key="second-card" className="bg-[#1D261D] rounded-[40px] shadow-[8px_8px_0_#F2AE30,16px_16px_0_#A60303] transition-shadow duration-300 hover:shadow-[12px_12px_0_#F2AE30,24px_24px_0_#A60303] p-0 border-none text-left h-full w-full">
                      <TypewriterText 
                        prefix="Think"
                        occasions={[
                          "rice",
                          "rendang",
                          "satay",
                          "gado-gado",
                          "soto",
                          "bakso",
                          "nasi goreng",
                          "tempeh",
                          "kerupuk",
                          "sambals"
                        ]}
                        suffix=""
                        linkText="Let’s talk"
                        linkUrl="https://ig.me/m/nasi.mpls"
                        secondLine="Fully customizable, from practical meal prep favorites to specific dietary needs and even your wildest idea—we’ll bring it all together." 
                      />
                    </ContentCard>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <ConcludingMessage />
            </motion.div>

            <motion.div id="history" variants={itemVariants}>
              <BancakanHistory onOpenArchive={(vol) => setSelectedVolume(vol)} />
            </motion.div>
          </div>
        </section>
      </motion.div>
      <ArchiveGalleryModal 
        volume={selectedVolume} 
        onClose={() => setSelectedVolume(null)} 
      />
    </PageShell>
  );
}

function ConcludingMessage() {
  const part1 = "At the end of the day, we just want you and your people to eat well. ";
  const part2 = "That's the whole point.";
  const fullText = part1 + part2;
  const characters = fullText.split("");
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.1
  });
  
  const [visibleChars, setVisibleChars] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
  
  useEffect(() => {
    if (!isInView) return;
    
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleChars(count);
      if (count >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => setIsHighlighting(true), 500);
      }
    }, 45); // Slower for more readability
    return () => clearInterval(interval);
  }, [isInView, fullText.length]);

  return (
    <div ref={containerRef} className="text-3xl lg:text-4xl font-medium text-[#1D261D] max-w-5xl mx-auto leading-[1.6] px-6">
       <span className="relative">
         {/* Part 1 */}
         {part1.split("").map((char, i) => (
           <span key={`p1-${i}`} className="relative inline">
             <motion.span
               initial={{ opacity: 0 }}
               animate={{ opacity: i < visibleChars ? 1 : 0 }}
               transition={{ duration: 0.1 }}
             >
               {char}
             </motion.span>
             
             {i === visibleChars - 1 && visibleChars <= part1.length && (
               <motion.span 
                 layoutId="typing-caret"
                 transition={{
                   layout: { duration: 0.2, ease: "easeOut" }
                 }}
                 className="absolute top-0 right-[-2px] w-[3px] h-[1em] bg-brand-yellow z-20"
               />
             )}
           </span>
         ))}
         
         {/* Part 2 with Highlight */}
         <span className="relative inline-block lg:inline font-bold">
          <div className="absolute inset-x-[-4px] inset-y-[-4px] pointer-events-none z-0 overflow-visible">
            <motion.div
              initial={{ 
                clipPath: "inset(0 100% 0 0)", 
                scaleY: 0.6, 
                rotate: -2,
                opacity: 0
              }}
              animate={isHighlighting ? { 
                clipPath: "inset(0 0% 0 0)", 
                scaleY: 1, 
                rotate: -1,
                opacity: 1
              } : {}}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1]
              }}
              className="h-full w-full relative transform-gpu"
              style={{
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
              }}
            >
               {/* Irregular Torn Paper Shape */}
               <div 
                 className="absolute inset-0 bg-brand-yellow/95"
                 style={{
                   clipPath: "polygon(0% 15%, 4% 5%, 9% 18%, 14% 3%, 19% 15%, 24% 8%, 29% 18%, 34% 10%, 39% 22%, 44% 12%, 49% 22%, 54% 8%, 59% 18%, 64% 10%, 69% 22%, 74% 12%, 79% 18%, 84% 8%, 89% 22%, 94% 12%, 98% 25%, 100% 15%, 100% 85%, 96% 75%, 91% 92%, 86% 80%, 81% 95%, 76% 85%, 71% 92%, 66% 82%, 61% 94%, 56% 84%, 51% 98%, 46% 88%, 41% 95%, 36% 85%, 31% 92%, 26% 82%, 21% 96%, 16% 86%, 11% 94%, 6% 84%, 3% 95%, 0% 85%)"
                 }}
               >
                  {/* Crumbled Texture Overlay */}
                  <div 
                    className="absolute inset-0 opacity-15 mix-blend-multiply contrast-125"
                    style={{
                      backgroundImage: 'url(/images/crumbled.png)',
                      backgroundSize: '500px auto',
                      backgroundRepeat: 'repeat'
                    }}
                  />
               </div>
            </motion.div>
          </div>
            
            <span className="relative z-10">
              {part2.split("").map((char, i) => (
                <span key={`p2-${i}`} className="relative inline">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: (i + part1.length) < visibleChars ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {char}
                  </motion.span>
                  
                  {i + part1.length === visibleChars - 1 && visibleChars < fullText.length && (
                    <motion.span 
                      layoutId="typing-caret"
                      transition={{
                        layout: { duration: 0.2, ease: "easeOut" }
                      }}
                      className="absolute top-0 right-[-2px] w-[3px] h-[1em] bg-brand-yellow z-20"
                    />
                  )}
                </span>
              ))}
            </span>
         </span>
       </span>
    </div>
  );
}

function ArchiveGalleryModal({ 
  volume, 
  onClose 
}: { 
  volume: number | null, 
  onClose: () => void 
}) {
  const [[activeTab, direction], setTab] = useState<['all' | 'photos' | 'videos', number]>(['all', 0]);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [cols, setCols] = useState<3 | 5 | 8>(5);

  const handleTabChange = (newTab: 'all' | 'photos' | 'videos') => {
    const tabs = ['all', 'photos', 'videos'] as const;
    const newIdx = tabs.indexOf(newTab);
    const currentIdx = tabs.indexOf(activeTab);
    setTab([newTab, newIdx > currentIdx ? 1 : -1]);
  };
  const scrollRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    if (activeTab === 'all') {
      return [
        ...Array.from({ length: 12 }).map((_, i) => ({ type: 'video' as const, id: i })),
        ...Array.from({ length: 24 }).map((_, i) => ({ type: 'photo' as const, id: i }))
      ].sort((a, b) => ((a.id * 13 + (a.type === 'video' ? 7 : 0)) % 36) - ((b.id * 13 + (b.type === 'video' ? 7 : 0)) % 36));
    } else if (activeTab === 'photos') {
      return Array.from({ length: 24 }).map((_, i) => ({ type: 'photo' as const, id: i }));
    } else {
      return Array.from({ length: 12 }).map((_, i) => ({ type: 'video' as const, id: i }));
    }
  }, [activeTab]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const nextMedia = useCallback(() => {
    if (selectedMediaIndex === null) return;
    setSelectedMediaIndex((selectedMediaIndex + 1) % items.length);
  }, [selectedMediaIndex, items.length]);

  const prevMedia = useCallback(() => {
    if (selectedMediaIndex === null) return;
    setSelectedMediaIndex((selectedMediaIndex - 1 + items.length) % items.length);
  }, [selectedMediaIndex, items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedMediaIndex !== null) {
          setSelectedMediaIndex(null);
        } else {
          onClose();
        }
      }
      if (selectedMediaIndex !== null) {
        if (e.key === 'ArrowRight') nextMedia();
        if (e.key === 'ArrowLeft') prevMedia();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMediaIndex, onClose, nextMedia, prevMedia]);
  
  
  useEffect(() => {
    if (volume !== null && scrollRef.current) {
      document.body.style.overflow = 'hidden';
      
      const lenis = new Lenis({
        wrapper: scrollRef.current,
        content: scrollRef.current.firstElementChild as HTMLElement,
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        document.body.style.overflow = '';
      };
    }
  }, [volume, activeTab, cols, items.length]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {volume !== null && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] cursor-default bg-brand-deep-green/10 backdrop-blur-sm"
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 30 }}
            transition={{ 
              type: "spring",
              damping: 35,
              stiffness: 450,
              mass: 0.5
            }}
            className="fixed z-[120] left-6 right-6 md:left-10 md:right-10 xl:left-[190px] xl:right-[190px] top-[140px] bottom-12 h-[calc(100vh-140px-48px)]"
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full bg-brand-cream rounded-[40px] shadow-2xl flex flex-col overflow-hidden border-4 border-brand-deep-green relative">
              <div className="flex-none p-6 md:p-8 relative flex items-center justify-between gap-6">
                {/* Left Side: Filter + Columns */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1 bg-brand-deep-green/5 p-1 rounded-full relative overflow-hidden h-8 md:h-[36px]">
                    {(['all', 'photos', 'videos'] as const).map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`px-3 h-full rounded-full font-bold text-[10px] md:text-sm transition-colors relative z-10 capitalize ${activeTab === tab ? 'text-brand-cream' : 'text-brand-deep-green/40 hover:text-brand-deep-green'}`}
                      >
                        {activeTab === tab && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute inset-0 bg-brand-deep-green rounded-full -z-10 shadow-sm"
                            transition={{ 
                              type: "spring", 
                              stiffness: 450,
                              damping: 45,
                              mass: 1,
                              bounce: 0
                            }}
                          />
                        )}
                        {tab}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      const next: Record<3|5|8, 3|5|8> = { 3: 5, 5: 8, 8: 3 };
                      setCols(next[cols]);
                    }}
                    className="flex items-center justify-center h-7 w-7 md:h-[36px] md:w-[36px] rounded-full bg-brand-deep-green/5 text-brand-deep-green hover:bg-brand-deep-green/10 transition-colors shadow-sm active:scale-95 group"
                    aria-label="Cycle grid columns"
                  >
                    <div className="w-5 h-5 relative overflow-hidden">
                      {Array.from({ length: 16 }).map((_, i) => {
                        const gridSide = cols === 3 ? 2 : cols === 5 ? 3 : 4;
                        const count = gridSide * gridSide;
                        const isVisible = i < count;
                        
                        const row = Math.floor(i / gridSide);
                        const col = i % gridSide;
                        
                        const gap = 2;
                        const size = 20;
                        const rectSize = (size - (gridSide - 1) * gap) / gridSide;
                        
                        return (
                          <motion.div
                            key={i}
                            initial={false}
                            animate={{
                              opacity: isVisible ? 1 : 0,
                              scale: isVisible ? 1 : 0.5,
                              x: col * (rectSize + gap),
                              y: row * (rectSize + gap),
                              width: rectSize,
                              height: rectSize,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 28,
                              mass: 0.5,
                              bounce: 0.15
                            }}
                            className="absolute top-0 left-0 bg-current rounded-[1.5px] origin-center"
                          />
                        );
                      })}
                    </div>
                  </button>
                </div>
                
                <h2 className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl md:text-3xl font-black text-brand-deep-green italic leading-none text-center hidden xl:block">
                  Bancakan Vol. {volume} Gallery
                </h2>

                <button 
                  onClick={onClose}
                  className="h-7 w-7 md:h-[36px] md:w-[36px] flex items-center justify-center rounded-full bg-brand-deep-green text-brand-cream hover:bg-brand-red transition-all duration-300 shadow-lg group relative z-10"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 stroke-[3.5] transition-transform group-hover:rotate-90" />
                </button>
              </div>
            
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 pt-0 md:pt-0 custom-scrollbar overscroll-contain relative"
              onWheel={(e) => e.stopPropagation()}
              data-lenis-prevent
            >
              <div>
                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <motion.div 
                      key={activeTab}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ 
                        x: { type: "spring", stiffness: 450, damping: 45, mass: 1 },
                        opacity: { duration: 0.25 }
                      }}
                      layout
                      className={`grid gap-4 relative ${
                        cols === 3 
                          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" 
                          : cols === 5 
                            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" 
                            : "grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
                      }`}
                    >
                      {items.map((item, i) => (
                        <motion.div 
                          key={`${item.type}-${item.id}`}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ 
                            opacity: { duration: 0.2, delay: i * 0.005 },
                            layout: {
                              type: "spring",
                              stiffness: 450,
                              damping: 45,
                              mass: 1
                            }
                          }}
                          onClick={() => setSelectedMediaIndex(i)}
                          className="rounded-3xl overflow-hidden relative group aspect-square bg-brand-deep-green/5 flex items-center justify-center cursor-pointer"
                        >
                        {item.type === 'video' ? (
                          <>
                            <div className="w-16 h-16 rounded-full bg-brand-deep-green text-brand-cream flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                              <Play fill="currentColor" className="w-6 h-6 ml-1" />
                            </div>
                            <div className="absolute inset-0 bg-brand-deep-green/5" />
                            <div className="absolute bottom-4 left-4 right-4 p-3 bg-brand-cream/90 backdrop-blur rounded-2xl border border-brand-deep-green/10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                <p className="font-serif font-black italic text-brand-deep-green text-sm">Video highlight #{item.id + 1}</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Image 
                                src="/images/NASI_orange1.png" 
                                alt="Logo" 
                                width={60} 
                                height={24} 
                                className="opacity-10 grayscale brightness-0" 
                              />
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 p-3 bg-brand-cream/90 backdrop-blur rounded-2xl border border-brand-deep-green/10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                <p className="font-serif font-black italic text-brand-deep-green text-sm">Capture #{item.id + 1}</p>
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
          <AnimatePresence>
            {selectedMediaIndex !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[130] bg-brand-deep-green/95 backdrop-blur-xl flex items-center justify-center"
                onClick={() => setSelectedMediaIndex(null)}
                data-lenis-prevent
              >
                <div 
                  className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setSelectedMediaIndex(null)}
                    className="absolute top-8 right-8 p-4 text-brand-cream hover:text-brand-yellow transition-colors z-[110]"
                  >
                    <X className="w-8 h-8 stroke-[3]" />
                  </button>

                  <button 
                    onClick={(e) => { e.stopPropagation(); prevMedia(); }}
                    className="absolute left-4 md:left-8 p-4 text-brand-cream hover:text-brand-yellow transition-colors z-[110] bg-brand-deep-green/20 rounded-full hover:bg-brand-deep-green/40"
                  >
                    <ChevronLeft className="w-10 h-10 stroke-[3]" />
                  </button>

                  <button 
                    onClick={(e) => { e.stopPropagation(); nextMedia(); }}
                    className="absolute right-4 md:right-8 p-4 text-brand-cream hover:text-brand-yellow transition-colors z-[110] bg-brand-deep-green/20 rounded-full hover:bg-brand-deep-green/40"
                  >
                    <ChevronRight className="w-10 h-10 stroke-[3]" />
                  </button>

                  <motion.div 
                    key={selectedMediaIndex}
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="relative max-w-5xl w-full aspect-square md:aspect-[4/3] bg-brand-cream/5 rounded-[40px] flex items-center justify-center overflow-hidden border-2 border-brand-cream/10"
                  >
                    {items[selectedMediaIndex].type === 'video' ? (
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-brand-yellow text-brand-deep-green flex items-center justify-center shadow-2xl mb-8">
                          <Play fill="currentColor" className="w-10 h-10 ml-1" />
                        </div>
                        <p className="font-serif text-3xl font-black italic text-brand-cream">Video highlight #{items[selectedMediaIndex].id + 1}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Image 
                          src="/images/NASI_orange1.png" 
                          alt="Logo" 
                          width={120} 
                          height={48} 
                          className="opacity-20 grayscale brightness-0 invert mb-8" 
                        />
                        <p className="font-serif text-3xl font-black italic text-brand-cream">Capture #{items[selectedMediaIndex].id + 1}</p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
