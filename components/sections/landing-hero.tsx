"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { InstagramIcon } from "@/components/ui/instagram-icon";
import { siteConfig } from "@/content/site";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

const accents = [
  {
    border: "border-brand-green/75",
    bg: "bg-brand-green/92",
    hover: "hover:bg-brand-green hover:-translate-y-2 hover:rotate-0 hover:shadow-brand-green/20",
    rotate: "-rotate-2",
    text: ""
  },
  {
    border: "border-brand-yellow/85",
    bg: "bg-brand-yellow/92",
    hover: "hover:bg-brand-yellow hover:-translate-y-2 hover:rotate-0 hover:shadow-brand-yellow/20 hover:text-brand-deep-green",
    rotate: "rotate-1",
    text: ""
  },
  {
    border: "border-brand-red/85",
    bg: "bg-brand-red/92",
    hover: "hover:bg-brand-red hover:-translate-y-2 hover:rotate-0 hover:shadow-brand-red/20",
    rotate: "-rotate-1",
    text: ""
  },
  {
    border: "border-[#F26905]/85",
    bg: "bg-[#F26905]/92",
    hover: "hover:bg-[#F26905] hover:-translate-y-2 hover:rotate-0 hover:shadow-[#F26905]/20",
    rotate: "rotate-2",
    text: ""
  },
  {
    border: "border-brand-mid-red/85",
    bg: "bg-brand-mid-red/92",
    hover: "hover:bg-brand-mid-red hover:-translate-y-2 hover:rotate-0 hover:shadow-brand-mid-red/20",
    rotate: "-rotate-1",
    text: ""
  }
] as const;

export function LandingHero() {
  return (
    <section className="relative flex h-screen max-h-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/bancakan_event2.jpeg"
        alt="Bancakan gathering experience with traditional Indonesian meal"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center brightness-[0.82] contrast-[1.04] saturate-[1.02]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,38,29,0.16)_0%,rgba(29,38,29,0.36)_48%,rgba(29,38,29,0.84)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,174,48,0.18),transparent_35%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 py-16 text-center md:px-10 md:py-24 lg:px-14 lg:py-28"
      >
        <motion.div
          variants={itemVariants}
          className="relative mb-14 w-full max-w-[286px] md:mb-16 md:max-w-[420px] lg:mb-20 lg:max-w-[500px]"
        >
          <Image
            src="/images/NASI_orange.png"
            alt="NASI Poster Artwork"
            width={1080}
            height={1350}
            priority
            className="mx-auto h-auto w-full drop-shadow-[0_28px_80px_rgba(0,0,0,0.32)]"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid w-full max-w-[24rem] grid-cols-2 gap-3 sm:max-w-[30rem] sm:gap-4 md:flex md:max-w-none md:flex-wrap md:items-center md:justify-center md:gap-6"
        >
          {siteConfig.nav.map((item, index) => {
            const accent = accents[index % accents.length];

            return (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto"
              >
                <Link
                  href={item.href}
                  className={`group block min-h-[5.7rem] w-full rounded-[1.25rem] border px-4 py-4 text-left text-brand-cream shadow-[0_18px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300 sm:min-h-[6rem] sm:px-5 md:min-h-0 md:min-w-[150px] md:w-auto ${accent.border} ${accent.bg} ${accent.rotate} ${accent.hover} ${accent.text ?? ""}`}
                >
                  <div className="text-[13px] font-bold text-current/70">
                    Explore
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <span className="font-serif text-[1.35rem] font-black leading-none sm:text-[1.55rem] md:text-2xl">
                      {item.label}
                    </span>
                    <span
                      className="text-xl leading-none transition group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      ↗︎
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants} className="w-full sm:w-auto">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-14 inline-flex w-full items-center justify-center gap-4 rounded-2xl border border-brand-cream/35 bg-brand-cream/90 px-6 py-4 text-sm font-medium text-brand-deep-green shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white sm:mt-20 sm:w-auto sm:justify-start"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-brand-cream shadow-lg">
              <InstagramIcon className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block text-[13px] font-bold text-brand-charcoal opacity-70">
                Join the Table
              </span>
              <span className="block font-serif text-xl font-black leading-none text-brand-deep-green">
                @nasi.mpls
              </span>
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

