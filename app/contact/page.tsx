"use client";

import { StoryForm } from "@/components/forms/story-form";
import { PageShell } from "@/components/layout/page-shell";
import { ContactInfo } from "@/components/sections/contact-info";
import { SectionHero } from "@/components/sections/section-hero";
import { contactContent } from "@/content/contact";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";

export default function ContactPage() {
  return (
    <PageShell>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <SectionHero
            label={contactContent.label}
            title={contactContent.title}
            subtitle={contactContent.subtitle}
          />
        </motion.div>
        
        <section className="page-section pt-0">
          <motion.div variants={itemVariants} className="page-body grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <ContactInfo />
            <div className="rounded-lg border border-brand-green/10 bg-white p-6 shadow-sm md:p-8 max-w-2xl mx-auto lg:mx-0">
              <h2 className="font-serif text-3xl font-black text-brand-deep-green text-center md:text-left">
                {contactContent.storyForm.title}
              </h2>
              <p className="mt-2 font-baskerville text-sm leading-7 text-brand-charcoal text-center md:text-left">
                {contactContent.storyForm.subtitle}
              </p>
              <div className="mt-8">
                <StoryForm />
              </div>
            </div>
          </motion.div>
        </section>
      </motion.div>
    </PageShell>
  );
}
