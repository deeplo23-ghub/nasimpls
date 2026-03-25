"use client";

import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/content/site";
import { routes } from "@/lib/routes";

import { InstagramIcon } from "@/components/ui/instagram-icon";

export function SiteHeader() {
  return (
    <header className="sticky top-0 w-full z-[150] bg-brand-deep-green">
      <div className="mx-auto flex w-full flex-col items-center px-4 sm:px-6 md:flex-row md:justify-between md:px-10 xl:px-[190px] gap-3 py-4 md:gap-6">
        <Link
          href={routes.home}
          className="block hover:opacity-90 transition"
          aria-label="NASI home"
        >
          <Image
            src="/images/NASI_orange1.png"
            alt="NASI"
            width={240}
            height={96}
            priority
            style={{ objectFit: 'contain' }}
            className="h-10 md:h-12 w-auto brightness-0 invert"
          />
        </Link>
        <nav className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 md:w-auto md:justify-end md:gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-bold text-brand-cream hover:text-brand-yellow transition-colors text-lg sm:text-xl md:text-[1.5rem]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center justify-center rounded-full border border-brand-cream p-2 text-brand-cream transition-colors hover:border-brand-yellow hover:text-brand-yellow md:ml-0"
            aria-label="NASI on Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </nav>
      </div>
      <div className="h-1 bg-gradient-to-r from-brand-red via-brand-yellow to-brand-green" />
    </header>
  );
}
