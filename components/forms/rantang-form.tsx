"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { netlifyForms } from "@/lib/constants";
import { encodeNetlifyForm } from "@/lib/netlify-form";

export function RantangForm() {
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
          "form-name": netlifyForms.rantang,
          ...payload
        })
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      router.push("/thank-you?form=rantang");
    } catch {
      setError("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      name={netlifyForms.rantang}
      method="POST"
      onSubmit={handleSubmit}
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value={netlifyForms.rantang} />
      <input type="hidden" name="bot-field" />
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="rantang-name" className="field-label">
            Full Name *
          </label>
          <input id="rantang-name" name="full_name" required className="field-control" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="rantang-phone" className="field-label">
            Phone *
          </label>
          <input id="rantang-phone" name="phone" required className="field-control" placeholder="(612) 000-0000" />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="rantang-address" className="field-label">
            Delivery Address *
          </label>
          <input
            id="rantang-address"
            name="delivery_address"
            required
            className="field-control"
            placeholder="Street address, Minneapolis"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="rantang-dietary" className="field-label">
            Dietary Restrictions
          </label>
          <input
            id="rantang-dietary"
            name="dietary_restrictions"
            className="field-control"
            placeholder="Vegetarian, nut allergy, halal..."
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="rantang-order" className="field-label">
            What to order? *
          </label>
          <textarea
            id="rantang-order"
            name="order_details"
            required
            className="field-control min-h-32"
            placeholder="Dish name x qty, e.g. Rendang x2, Kering Tempe x1..."
          />
        </div>
        <div>
          <label className="field-label">Payment *</label>
          <div className="selection-group">
            <label className="flex">
              <input type="radio" name="payment_method" value="Venmo" className="peer hidden" required />
              <div className="selection-pill flex items-center gap-2.5 peer-checked:border-brand-yellow peer-checked:bg-brand-yellow peer-checked:text-brand-deep-green">
                <Image src="/images/venmo.png" alt="" width={20} height={20} className="h-4 w-auto object-contain" />
                Venmo
              </div>
            </label>
            <label className="flex">
              <input type="radio" name="payment_method" value="Zelle" className="peer hidden" />
              <div className="selection-pill flex items-center gap-2.5 peer-checked:border-brand-yellow peer-checked:bg-brand-yellow peer-checked:text-brand-deep-green">
                <div className="relative flex h-4 w-4 overflow-hidden">
                  <Image src="/images/zelle.png" alt="" width={40} height={40} className="scale-[1.3] object-contain" />
                </div>
                Zelle
              </div>
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="rantang-handle" className="field-label">
            Venmo / Zelle handle
          </label>
          <input id="rantang-handle" name="payment_handle" className="field-control" placeholder="@yourhandle" />
        </div>
        <div className="md:col-span-2">
          <label className="field-label">Have you paid? *</label>
          <div className="selection-group">
            <label className="flex">
              <input type="radio" name="paid_status" value="Yes" className="peer hidden" required />
              <div className="selection-pill peer-checked:border-brand-yellow peer-checked:bg-brand-yellow peer-checked:text-brand-deep-green">
                Yes, all set!
              </div>
            </label>
            <label className="flex">
              <input type="radio" name="paid_status" value="No" className="peer hidden" />
              <div className="selection-pill peer-checked:border-brand-yellow peer-checked:bg-brand-yellow peer-checked:text-brand-deep-green">
                Not yet (do it now!)
              </div>
            </label>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="field-label">Return packaging for 10% off?</label>
          <div className="selection-group">
            <label className="flex">
              <input type="radio" name="return_packaging" value="Yes" className="peer hidden" />
              <div className="selection-pill peer-checked:border-brand-yellow peer-checked:bg-brand-yellow peer-checked:text-brand-deep-green">
                Yes!
              </div>
            </label>
            <label className="flex">
              <input type="radio" name="return_packaging" value="No" className="peer hidden" />
              <div className="selection-pill peer-checked:border-brand-yellow peer-checked:bg-brand-yellow peer-checked:text-brand-deep-green">
                Not this time
              </div>
            </label>
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="rantang-notes" className="field-label">
            Anything else?
          </label>
          <textarea
            id="rantang-notes"
            name="notes"
            className="field-control min-h-28"
            placeholder="Gate codes, delivery notes, special requests..."
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-3">
        <button type="submit" className="cta-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Order"}
        </button>
        {error ? <p className="text-sm text-brand-yellow">{error}</p> : null}
      </div>
    </form>
  );
}
