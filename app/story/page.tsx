import { PageShell } from "@/components/layout/page-shell";
import { SectionHero } from "@/components/sections/section-hero";
import { Divider } from "@/components/ui/divider";
import { storyContent } from "@/content/story";

export default function StoryPage() {
  return (
    <PageShell>
      <SectionHero label={storyContent.label} title={storyContent.title} />
      <section className="page-section pt-0">
        <div className="page-body">
          <div className="space-y-6">
            {storyContent.paragraphs.map((paragraph) => (
              <p key={paragraph} className="story-copy">
                {paragraph}
              </p>
            ))}
            <Divider className="my-8" />
            <p className="font-baskerville text-sm text-brand-charcoal">
              — {storyContent.signature.name} ·{" "}
              <a
                href={storyContent.signature.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-brand-mid-red"
              >
                {storyContent.signature.instagramLabel}
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
