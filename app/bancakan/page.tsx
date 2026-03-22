import Image from "next/image";

import { PageShell } from "@/components/layout/page-shell";
import { ContentCard } from "@/components/sections/content-card";
import { SectionHero } from "@/components/sections/section-hero";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { bancakanContent } from "@/content/bancakan";

export default function BancakanPage() {
  return (
    <PageShell>
      <SectionHero
        label={bancakanContent.label}
        title={bancakanContent.title}
        subtitle={bancakanContent.subtitle}
      />
      <section className="page-section pt-0">
        <div className="page-body">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="w-full max-w-[380px] flex-none">
              <Image
                src="/images/bancakan_event.png"
                alt="Bancakan Vol. 1 poster"
                width={1080}
                height={1350}
                className="w-full rounded-md shadow-poster"
              />
            </div>
            <div className="flex-1 space-y-5">
              {bancakanContent.cards.map((card) => (
                <ContentCard key={card}>
                  <p>{card}</p>
                </ContentCard>
              ))}
              <Divider className="my-8" />
              <p className="max-w-2xl font-baskerville text-base leading-8 text-brand-brown">
                {bancakanContent.eventNote}
              </p>
              <Button href={bancakanContent.cta.href} external>
                {bancakanContent.cta.label} →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
