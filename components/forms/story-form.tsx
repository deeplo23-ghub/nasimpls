"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
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
      className="max-w-2xl mx-auto space-y-6"
    >
      <input type="hidden" name="form-name" value={netlifyForms.story} />
      <input type="hidden" name="bot-field" />
      
      <div className="space-y-4">
        {/* Identity Section */}
        <div className="space-y-3">
          <h3 className="text-center font-serif text-[0.85rem] font-black tracking-normal text-brand-green/50">
            About You
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="story-name" className="font-serif text-[1.05rem] font-bold text-brand-deep-green">
                Your Name
              </Label>
              <Input id="story-name" name="name" placeholder="Name or a nickname..." className="h-10 border-brand-green/10 bg-brand-cream/20 focus-visible:border-brand-green" />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="story-origin" className="font-serif text-[1.05rem] font-bold text-brand-deep-green">
                Where are you from?
              </Label>
              <Input id="story-origin" name="origin" placeholder="E.g. Jakarta, or grew up in MN" className="h-10 border-brand-green/10 bg-brand-cream/20 focus-visible:border-brand-green" />
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="space-y-3 pt-2">
          <h3 className="text-center font-serif text-[0.85rem] font-black tracking-normal text-brand-green/50">
            The Narrative
          </h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="story-connection" className="font-serif text-[1.05rem] font-bold text-brand-deep-green">
                Connection to Indo food
              </Label>
              <Input
                id="story-connection"
                name="connection"
                placeholder="Indonesian, traveled there, or just a big fan?"
                className="h-10 border-brand-green/10 bg-brand-cream/20 focus-visible:border-brand-green"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="story-body" className="font-serif text-[1.05rem] font-bold text-brand-green">
                Tell us your story *
              </Label>
              <Textarea
                id="story-body"
                name="story"
                required
                className="min-h-32 border-brand-green/10 bg-brand-cream/20 focus-visible:border-brand-green text-sm"
                placeholder="A memory of a meal, a person who cooked for you, or a taste that takes you home..."
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-3 pt-2">
          <h3 className="text-center font-serif text-[0.85rem] font-black tracking-normal text-brand-green/50">
            Final Details
          </h3>
          <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="story-dish" className="font-serif text-[1.05rem] font-bold text-brand-deep-green">
                Favorite dish
              </Label>
              <Input id="story-dish" name="favorite_dish" placeholder="E.g. Nasi Goreng, Rendang..." className="h-10 border-brand-green/10 bg-brand-cream/20 focus-visible:border-brand-green" />
            </div>

            <div className="space-y-2">
              <Label className="font-serif text-[1.05rem] font-bold text-brand-deep-green">Can we share this?</Label>
              <RadioGroup name="sharing_preference" className="flex flex-row gap-4">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <RadioGroupItem value="Yes" id="share-yes" className="size-4 border-brand-green/20 data-[checked]:border-brand-green data-[checked]:bg-brand-green" />
                  <Label htmlFor="share-yes" className="cursor-pointer font-sans text-[10px] font-semibold text-brand-deep-green/70 transition group-hover:text-brand-green">Yes!</Label>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <RadioGroupItem value="Anonymous" id="share-anon" className="size-4 border-brand-green/20 data-[checked]:border-brand-green data-[checked]:bg-brand-green" />
                  <Label htmlFor="share-anon" className="cursor-pointer font-sans text-[10px] font-semibold text-brand-deep-green/70 transition group-hover:text-brand-green">Anon</Label>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer">
                  <RadioGroupItem value="Private" id="share-private" className="size-4 border-brand-green/20 data-[checked]:border-brand-green data-[checked]:bg-brand-green" />
                  <Label htmlFor="share-private" className="cursor-pointer font-sans text-[10px] font-semibold text-brand-deep-green/70 transition group-hover:text-brand-green">Private</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-2">
        <Button 
          type="submit" 
          size="lg"
          className="h-11 w-full md:w-auto px-10 text-[0.95rem] font-black bg-brand-green text-brand-cream hover:bg-brand-deep-green shadow-md transition-all hover:scale-[1.02]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send My Story"}
        </Button>
        {error ? <p className="text-sm font-bold text-brand-mid-red">{error}</p> : null}
      </div>
    </form>
  );
}
