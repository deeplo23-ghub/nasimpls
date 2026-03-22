"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { netlifyForms } from "@/lib/constants";
import { encodeNetlifyForm } from "@/lib/netlify-form";

export function StoryForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeNetlifyForm({
          "form-name": netlifyForms.story,
          ...payload
        })
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      router.push("/thank-you?form=story");
    } catch {
      setError("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      name={netlifyForms.story}
      method="POST"
      onSubmit={handleSubmit}
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value={netlifyForms.story} />
      <input type="hidden" name="bot-field" />
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="story-name"
            className="mb-2 block text-sm font-bold text-brand-charcoal"
          >
            Your Name
          </label>
          <input id="story-name" name="name" className="field-control-light" placeholder="First name is fine!" />
        </div>
        <div>
          <label
            htmlFor="story-origin"
            className="mb-2 block text-sm font-bold text-brand-charcoal"
          >
            Where are you from?
          </label>
          <input id="story-origin" name="origin" className="field-control-light" placeholder="City, country" />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="story-connection"
            className="mb-2 block text-sm font-bold text-brand-charcoal"
          >
            Connection to Indonesian food
          </label>
          <input
            id="story-connection"
            name="connection"
            className="field-control-light"
            placeholder="Indonesian, grew up eating it, traveled there..."
          />
        </div>
        <div className="md:col-span-2">
          <label
            htmlFor="story-body"
            className="mb-2 block text-sm font-bold text-brand-charcoal"
          >
            Tell us your story *
          </label>
          <textarea
            id="story-body"
            name="story"
            required
            className="field-control-light min-h-36"
            placeholder="A memory, a dish, a person who fed you..."
          />
        </div>
        <div>
          <label
            htmlFor="story-dish"
            className="mb-2 block text-sm font-bold text-brand-charcoal"
          >
            Favorite Indonesian dish
          </label>
          <input id="story-dish" name="favorite_dish" className="field-control-light" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold text-brand-charcoal">
            Can we share this?
          </label>
          <div className="selection-group">
            <label className="flex">
              <input type="radio" name="sharing_preference" value="Yes" className="peer hidden" />
              <div className="selection-pill-light peer-checked:border-brand-green peer-checked:bg-brand-green peer-checked:text-brand-cream">
                Yes!
              </div>
            </label>
            <label className="flex">
              <input type="radio" name="sharing_preference" value="Anonymous" className="peer hidden" />
              <div className="selection-pill-light peer-checked:border-brand-green peer-checked:bg-brand-green peer-checked:text-brand-cream">
                Anonymously
              </div>
            </label>
            <label className="flex">
              <input type="radio" name="sharing_preference" value="Private" className="peer hidden" />
              <div className="selection-pill-light peer-checked:border-brand-green peer-checked:bg-brand-green peer-checked:text-brand-cream">
                Just for you
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-3">
        <button type="submit" className="cta-button cta-button-green" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Send My Story"}
        </button>
        {error ? <p className="text-sm text-brand-mid-red">{error}</p> : null}
      </div>
    </form>
  );
}
