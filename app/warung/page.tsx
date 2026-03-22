import { PageShell } from "@/components/layout/page-shell";
import { SectionHero } from "@/components/sections/section-hero";
import { Button } from "@/components/ui/button";
import { warungContent } from "@/content/warung";

export default function WarungPage() {
  return (
    <PageShell>
      <SectionHero
        label={warungContent.label}
        title={warungContent.title}
        subtitle={warungContent.subtitle}
      />
      <section className="page-section pt-0">
        <div className="page-body text-center">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white px-8 py-16 shadow-sm">
            <div className="font-serif text-6xl font-black leading-none text-brand-red md:text-8xl">
              Coming
              <br />
              <span className="text-brand-green">Soon.</span>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-9 text-brand-brown">
              {warungContent.body} Follow{" "}
              <a
                href={warungContent.cta.href}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-brand-mid-red"
              >
                @nasi.mpls
              </a>{" "}
              so you do not miss it.
            </p>
            <div className="mt-5">
              <Button href={warungContent.cta.href} variant="green" external>
                {warungContent.cta.label} →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
