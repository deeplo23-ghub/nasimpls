"use client";

import { PageShell } from "@/components/layout/page-shell";
import { SectionHero } from "@/components/sections/section-hero";
import { Divider } from "@/components/ui/divider";
import { storyContent } from "@/content/story";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";

export default function StoryPage() {
  return (
    <PageShell>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHero label={storyContent.label} title={storyContent.title} />
        </motion.div>
        
        <section className="page-section pt-0">
          <div className="page-body">
            <motion.div variants={itemVariants} className="space-y-6">
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
            </motion.div>
          </div>
        </section>
      </motion.div>
    </PageShell>
  );
}
