import Link from "next/link";

import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-deep-green/10 bg-white/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-brand-charcoal md:flex-row md:items-center md:justify-between md:px-10 lg:px-14">
        <p>{siteConfig.name}</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href={siteConfig.social.emailHref} className="hover:text-brand-green">
            {siteConfig.social.email}
          </a>
          <a href={siteConfig.social.phoneHref} className="hover:text-brand-green">
            {siteConfig.social.phone}
          </a>
          <Link href="/contact" className="hover:text-brand-green">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
