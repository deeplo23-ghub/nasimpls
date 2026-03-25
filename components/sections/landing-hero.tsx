"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { InstagramIcon } from "@/components/ui/instagram-icon";
import { siteConfig } from "@/content/site";

// Grain Overlay
function GrainOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[40] opacity-[0.04] contrast-150 brightness-100">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-60" />
    </div>
  );
}


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.85, rotate: -3 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 8,
      mass: 0.8
    }
  }
} as const;

function SlotText({ text, className }: { text: string; active?: boolean; className?: string }) {
  return (
    <div className={className}>
      <span className="block font-bold">{text}</span>
    </div>
  );
}

const logoColors = [
  "#dcc0a5", // Cream
  "#f2f2f2", // White
  "#f20505", // Red
  "#155c28", // Green
  "#f2ae30", // Yellow
  "#2805f2", // Blue
  "#f26905", // Orange
  "#c7c76f", // Lime
  ];

const tornSweepStart = "polygon(100% 0%, 100% 100%, 102% 100%, 106% 90%, 100% 80%, 107% 70%, 101% 60%, 108% 50%, 99% 40%, 105% 30%, 102% 20%, 108% 10%, 102% 0%)";
const tornSweepEnd = "polygon(100% 0%, 100% 100%, -23% 100%, -19% 90%, -25% 80%, -18% 70%, -24% 60%, -17% 50%, -26% 40%, -20% 30%, -23% 20%, -17% 10%, -23% 0%)";

const tornOutlineStart = "polygon(100% 0%, 100% 100%, 99% 100%, 103% 90%, 97% 80%, 104% 70%, 98% 60%, 105% 50%, 96% 40%, 102% 30%, 99% 20%, 105% 10%, 99% 0%)";
const tornOutlineEnd = "polygon(100% 0%, 100% 100%, -26% 100%, -22% 90%, -28% 80%, -21% 70%, -27% 60%, -20% 50%, -29% 40%, -23% 30%, -26% 20%, -20% 10%, -26% 0%)";

export function LogoTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92, rotate: -2, transition: { type: "spring", stiffness: 400, damping: 10 } }}
      className="relative mb-6 w-full max-w-[280px] md:mb-10 md:max-w-[500px] lg:max-w-[580px] cursor-none perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(40px)" }} 
        className="relative drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] drop-shadow-[0_0_15px_rgba(0,0,0,0.85)] hover:drop-shadow-[0_30px_50px_rgba(0,0,0,0.95)] hover:drop-shadow-[0_0_25px_rgba(0,0,0,0.95)] transition-all duration-300"
      >
        {/* Invisible Image to push the layout boundaries perfectly */}
        <Image
          src="/images/NASI_orange.png"
          alt="NASI footprint"
          width={1080}
          height={1350}
          priority
          className="mx-auto h-auto w-full opacity-0 pointer-events-none select-none"
        />

        {/* Full Indonesian Flag Background Layer (Base layer for text "Indonesian Food Experience") */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ 
            WebkitMaskImage: 'url(/images/NASI_orange.png)',
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: 'url(/images/NASI_orange.png)',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center'
          }}
        >
          {/* Default static white background so the rest of the text "food experience" stays solid white */}
          <div className="absolute inset-0" style={{ backgroundColor: "#f2f2f2" }} />

          {/* Wrapper to clip the Waving Flag horizontally down to just the word "Indonesian" (~30% of image width) */}
          <div className="absolute inset-0" style={{ clipPath: "polygon(0% 0%, 42% 0%, 42% 100%, 0% 100%)" }}>
            {/* A sweeping flag layer that is 200% wide for a seamless looping wave */}
            <motion.div
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 w-[200%] h-full"
            >
               <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 1000">
                 {/* Bottom half: White */}
                 <rect width="100%" height="100%" fill="#f2f2f2" />
                 <path d="M0,0 L0,915 Q125,925 250,915 T500,915 T750,915 T1000,915 L1000,0 Z" fill="#f20505" />
               </svg>
            </motion.div>
          </div>
        </div>

        {/* Graphics Wrapper: Restricts visual part above the text (~15% spacing) to static Yellow */}
        <div className="absolute inset-0" style={{ clipPath: "inset(0 0 15% 0)" }}>
          <div
            className="absolute inset-0"
            style={{ 
              backgroundColor: "#F2AE30", // Static Brand Yellow
              WebkitMaskImage: 'url(/images/NASI_orange.png)',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskImage: 'url(/images/NASI_orange.png)',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center'
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function TiltCard({ btn, isSmall = false, isExternal = false, icon: Icon }: { 
  btn: any, 
  isSmall?: boolean, 
  isExternal?: boolean,
  icon?: any
}) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const Content = (
    <div className={`flex ${Icon ? "flex-row items-center gap-3" : "flex-col items-center text-center"} w-full`} style={{ transform: "translateZ(30px)" }}>
      {Icon && (
        <div className={`flex ${isSmall ? "h-8 w-8" : "h-10 w-10"} shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] text-white shadow-lg transition-transform group-hover:rotate-12`}>
          <Icon className={`${isSmall ? "h-5 w-5" : "h-6 w-6"}`} />
        </div>
      )}
      <div className={`flex flex-col ${Icon ? "items-start text-left" : "items-center text-center"} w-full`}>
        {!isSmall && !Icon && (
          <span className="block text-xl font-black uppercase tracking-[0.2em] text-brand-deep-green/40 leading-none mb-1">
            Explore
          </span>
        )}
        {btn.subLabel && (
          <span className="block text-xl font-black uppercase tracking-widest text-brand-deep-green/40 leading-none mb-1">
            {btn.subLabel}
          </span>
        )}
        <SlotText 
          text={btn.label} 
          className={`font-serif font-black text-brand-deep-green leading-none w-full ${
            isSmall 
              ? "text-xl" 
              : Icon 
                ? "text-xl sm:text-2xl" 
                : "text-2xl sm:text-3xl"
          }`}
        />
      </div>
    </div>
  );

  const cardClasses = `group relative block w-full rounded-[1.75rem] border-[3px] border-brand-deep-green ${btn.bg} shadow-[8px_8px_0_0_#1D261D] transition-all hover:shadow-[12px_12px_0_0_#1D261D] ${isSmall ? (Icon ? "p-3 px-4" : "py-7 px-2") : Icon ? "p-4 px-5" : "p-7"}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Standard navigation
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false); }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative perspective-1000 ${isSmall ? "w-full md:w-32" : "w-full md:w-60"} ${btn.rotate}`}
    >
      {isExternal ? (
        <a href={btn.href} target="_blank" rel="noreferrer" onClick={handleClick} style={{ transform: "translateZ(50px)" }} className={cardClasses}>
          {Content}
        </a>
      ) : (
        <Link href={btn.href} onClick={handleClick} style={{ transform: "translateZ(50px)" }} className={cardClasses}>
          {Content}
        </Link>
      )}
    </motion.div>
  );
}

const mainButtons = [
  { label: "Bancakan", href: "/bancakan", bg: "bg-brand-red", rotate: "-rotate-2" },
  { label: "Rantang", href: "/rantang", bg: "bg-brand-yellow", rotate: "rotate-1" },
  { label: "Warung", href: "/warung", bg: "bg-brand-green", rotate: "-rotate-1" }
];

const secondaryButtons = [
  { label: "Story", href: "/story", bg: "bg-brand-cream", rotate: "rotate-2" },
  { label: "Contact", href: "/contact", bg: "bg-brand-cream", rotate: "-rotate-1" }
];

const titleVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring" as const, 
      stiffness: 100, 
      damping: 15,
      delay: 0.2
    } 
  }
} as const;

export function LandingHero() {
  const router = useRouter();

  const bgX = useSpring(0, { stiffness: 50, damping: 20 });
  const bgY = useSpring(0, { stiffness: 50, damping: 20 });

  const handlePageMouseMove = (e: React.MouseEvent) => {
    const xPct = (e.clientX / window.innerWidth - 0.5) * 20;
    const yPct = (e.clientY / window.innerHeight - 0.5) * 20;
    bgX.set(-xPct);
    bgY.set(-yPct);
  };

  return (
    <section 
      onMouseMove={handlePageMouseMove}
      className="landing-hero-active relative flex h-screen max-h-screen min-h-screen items-center justify-center overflow-hidden py-4 sm:py-8 bg-brand-deep-green cursor-none select-none"
    >
      <style jsx global>{`
        .landing-hero-active * {
          cursor: none !important;
        }
      `}</style>
            
      {/* Background - fades in second (delay 0.4s) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ x: bgX, y: bgY, scale: 1.1 }}
        className="absolute inset-x-[-5%] inset-y-[-5%] z-0"
      >
        <Image
          src="/images/bancakan_event2.jpeg"
          alt="Background"
          fill
          priority
          className="object-cover object-center brightness-[0.7] contrast-[1.05]"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(242,174,48,0.1),transparent_40%)] pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/10 to-black/90 pointer-events-none" 
      />
      
      <GrainOverlay />
      
      <div className="relative z-20 mx-auto flex w-full max-w-[1600px] flex-col items-center px-6 xl:px-[190px] text-center">
        {/* Logo - appears first (delay 0s) */}
        <motion.div
          initial={{ opacity: 0, scale: 0, y: "100vh" }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 14, mass: 1, delay: 0.8 }}
        >
          <LogoTilt />
        </motion.div>

        {/* Buttons - stagger in individually (delay 0.8s+) */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.12, delayChildren: 1.5 } 
            }
          }}
          className="flex flex-col gap-6 md:gap-8 w-full items-center"
        >
          {/* All Buttons Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full flex-wrap lg:flex-nowrap">
            <TiltCard btn={secondaryButtons[0]} isSmall />
            {mainButtons.map((btn) => <TiltCard key={btn.href} btn={btn} />)}
            <TiltCard btn={secondaryButtons[1]} isSmall />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full mt-2">
            <TiltCard 
              isExternal
              icon={InstagramIcon}
              btn={{ 
                label: "@nasi.mpls", 
                href: siteConfig.social.instagram, 
                bg: "bg-white", 
                rotate: "rotate-1",
                subLabel: "Join us"
              }} 
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
}

