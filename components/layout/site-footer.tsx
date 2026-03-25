import Link from "next/link";

import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative w-full z-50 bg-brand-deep-green">
      <div className="h-1 bg-gradient-to-r from-brand-red via-brand-yellow to-brand-green" />
      <div className="mx-auto flex w-full flex-col gap-3 px-6 py-4 text-sm text-brand-cream md:flex-row md:items-center md:justify-between md:px-10 xl:px-[190px]">
        <p className="font-bold opacity-80">{siteConfig.name}</p>
        <div className="flex flex-wrap items-center gap-6">
          <a href={siteConfig.social.emailHref} className="hover:text-brand-yellow transition-colors font-medium">
            {siteConfig.social.email}
          </a>
          <a href={siteConfig.social.phoneHref} className="hover:text-brand-yellow transition-colors font-medium">
            {siteConfig.social.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}
