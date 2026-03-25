"use client";

import { PageShell } from "@/components/layout/page-shell";
import { RantangForm } from "@/components/forms/rantang-form";
import { ContentCard } from "@/components/sections/content-card";
import { FaqList } from "@/components/sections/faq-list";
import { SectionHero } from "@/components/sections/section-hero";
import { Divider } from "@/components/ui/divider";
import { rantangContent } from "@/content/rantang";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";

export default function RantangPage() {
  return (
    <PageShell>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
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
        </motion.div>
        
        <section className="page-section pt-0">
          <div className="page-body space-y-5">
            {rantangContent.cards.map((card) => (
              <motion.div key={card} variants={itemVariants}>
                <ContentCard>
                  <p>{card}</p>
                </ContentCard>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="form-panel mt-5 max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl font-black text-brand-yellow text-center md:text-left">
                {rantangContent.form.title}
              </h2>
              <p className="mt-1 font-baskerville text-sm leading-7 text-brand-cream/65 text-center md:text-left">
                {rantangContent.form.subtitle}
              </p>
              <div className="mt-5">
                <RantangForm />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Divider className="mt-12" />
            </motion.div>

            <motion.section variants={itemVariants} className="pt-2">
              <h2 className="mb-5 font-serif text-3xl font-black text-brand-deep-green">FAQ</h2>
              <FaqList items={rantangContent.faqs} />
            </motion.section>
          </div>
        </section>
      </motion.div>
    </PageShell>
  );
}
