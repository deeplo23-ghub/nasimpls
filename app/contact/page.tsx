import { StoryForm } from "@/components/forms/story-form";
import { PageShell } from "@/components/layout/page-shell";
import { ContactInfo } from "@/components/sections/contact-info";
import { SectionHero } from "@/components/sections/section-hero";
import { contactContent } from "@/content/contact";

export default function ContactPage() {
  return (
    <PageShell>
      <SectionHero
        label={contactContent.label}
        title={contactContent.title}
        subtitle={contactContent.subtitle}
      />
      <section className="page-section pt-0">
        <div className="page-body grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <ContactInfo />
          <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-serif text-3xl font-black text-brand-deep-green">
              {contactContent.storyForm.title}
            </h2>
            <p className="mt-2 max-w-2xl font-baskerville text-sm leading-7 text-brand-charcoal">
              {contactContent.storyForm.subtitle}
            </p>
            <div className="mt-5">
              <StoryForm />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
