import { PageShell } from "@/components/layout/page-shell";
import { RantangForm } from "@/components/forms/rantang-form";
import { ContentCard } from "@/components/sections/content-card";
import { FaqList } from "@/components/sections/faq-list";
import { SectionHero } from "@/components/sections/section-hero";
import { Divider } from "@/components/ui/divider";
import { rantangContent } from "@/content/rantang";

export default function RantangPage() {
  return (
    <PageShell>
      <SectionHero
        label={rantangContent.label}
        title={rantangContent.title}
        subtitle={rantangContent.subtitle}
        announcement={
          <>
            {rantangContent.announcement}{" "}
            <a
              href="https://instagram.com/nasi.mpls"
              target="_blank"
              rel="noreferrer"
              className="font-bold text-brand-green"
            >
              @nasi.mpls
            </a>
          </>
        }
      />
      <section className="page-section pt-0">
        <div className="page-body space-y-5">
          {rantangContent.cards.map((card) => (
            <ContentCard key={card}>
              <p>{card}</p>
            </ContentCard>
          ))}

          <div className="form-panel mt-8">
            <h2 className="font-serif text-3xl font-black text-brand-yellow">
              {rantangContent.form.title}
            </h2>
            <p className="mt-2 max-w-2xl font-baskerville text-sm leading-7 text-brand-cream/65">
              {rantangContent.form.subtitle}
            </p>
            <div className="mt-5">
              <RantangForm />
            </div>
          </div>

          <Divider className="mt-12" />

          <section className="pt-2">
            <h2 className="mb-5 font-serif text-3xl font-black text-brand-deep-green">FAQ</h2>
            <FaqList items={rantangContent.faqs} />
          </section>
        </div>
      </section>
    </PageShell>
  );
}
