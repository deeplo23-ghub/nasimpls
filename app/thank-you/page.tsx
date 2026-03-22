type ThankYouPageProps = {
  searchParams: Promise<{
    form?: string;
  }>;
};

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const isStory = params.form === "story";

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-6 py-16">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 text-center shadow-sm md:p-12">
        <p className="text-sm font-bold text-brand-red">Thank You</p>
        <h1 className="mt-4 font-serif text-5xl font-black text-brand-deep-green md:text-6xl">
          Message received.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-brand-brown">
          {isStory
            ? "Thank you for sharing your story. That kind of context matters, and it will help shape what NASI builds next."
            : "Your order has been submitted. NASI will follow up directly to confirm details and payment."}
        </p>
        <a
          href={isStory ? "/contact" : "/rantang"}
          className="cta-button mt-8"
        >
          Go back
        </a>
      </div>
    </main>
  );
}
