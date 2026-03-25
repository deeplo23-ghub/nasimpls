"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animations";

type ThankYouPageProps = {
  searchParams: Promise<{
    form?: string;
  }>;
};

export default function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = use(searchParams);
  const isStory = params.form === "story";

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-6 py-16">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm md:p-12"
      >
        <motion.p variants={itemVariants} className="text-xl font-bold text-brand-red">Thank You</motion.p>
        <motion.h1 variants={itemVariants} className="mt-4 font-serif text-5xl font-black text-brand-deep-green md:text-6xl">
          Message received.
        </motion.h1>
        <motion.p variants={itemVariants} className="mx-auto mt-6 max-w-xl text-xl leading-8 text-brand-brown">
          {isStory
            ? "Thank you for sharing your story. That kind of context matters, and it will help shape what NASI builds next."
            : "Your order has been submitted. NASI will follow up directly to confirm details and payment."}
        </motion.p>
        <motion.a
          variants={itemVariants}
          href={isStory ? "/contact" : "/rantang"}
          className="cta-button mt-8"
        >
          Go back
        </motion.a>
      </motion.div>
    </main>
  );
}
