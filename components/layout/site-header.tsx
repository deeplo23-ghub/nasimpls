"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { siteConfig } from "@/content/site";
import { routes } from "@/lib/routes";

import { InstagramIcon } from "@/components/ui/instagram-icon";

export function SiteHeader() {
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
      <header className={`sticky top-0 z-50 bg-brand-deep-green transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}>
        <div 
          className={`mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 md:flex-row md:justify-between md:px-10 lg:px-14 transition-all duration-300 ${
            isScrolled ? "gap-1 py-2.5 md:gap-3" : "gap-3 py-4 md:gap-6"
          }`}
        >
          <Link
            href={routes.home}
            className="block transition hover:opacity-90"
            aria-label="NASI home"
          >
            <Image
              src="/images/NASI_orange1.png"
              alt="NASI"
              width={220}
              height={88}
              priority
              className={`h-auto transition-all duration-300 ${
                isScrolled ? "w-[64px] md:w-[72px]" : "w-[118px] md:w-[132px]"
              }`}
            />
          </Link>
          <nav 
            className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 transition-all duration-300 md:w-auto md:justify-end md:gap-8"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-bold text-brand-cream hover:text-brand-yellow transition-all duration-300 ${
                  isScrolled 
                    ? "text-base sm:text-lg md:text-[1.25rem]" 
                    : "text-lg sm:text-xl md:text-[1.5rem]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className={`ml-1 inline-flex items-center justify-center rounded-full border border-brand-cream text-brand-cream transition-all duration-300 hover:border-brand-yellow hover:text-brand-yellow md:ml-0 ${
                isScrolled ? "p-1" : "p-2"
              }`}
              aria-label="NASI on Instagram"
            >
              <InstagramIcon className={`transition-all duration-300 ${isScrolled ? "h-3.5 w-3.5" : "h-5 w-5"}`} />
            </a>
          </nav>
        </div>
        <div className="h-1 bg-gradient-to-r from-brand-red via-brand-yellow to-brand-green" />
      </header>
    </>
  );
}
