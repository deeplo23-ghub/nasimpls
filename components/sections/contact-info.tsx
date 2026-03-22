import { siteConfig } from "@/content/site";

export function ContactInfo() {
  return (
    <div className="space-y-3 rounded-lg bg-white p-6 text-brand-deep-green shadow-sm">
      <p>
        <span className="mr-2">Email</span>
        <a href={siteConfig.social.emailHref} className="font-medium text-brand-green hover:text-brand-mid-red">
          {siteConfig.social.email}
        </a>
      </p>
      <p>
        <span className="mr-2">Phone</span>
        <a href={siteConfig.social.phoneHref} className="font-medium text-brand-green hover:text-brand-mid-red">
          {siteConfig.social.phone}
        </a>
      </p>
      <p>
        <span className="mr-2">Founder</span>
        <a
          href={siteConfig.social.founderInstagram}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand-green hover:text-brand-mid-red"
        >
          @ra.dzk
        </a>{" "}
        genuinely loves connecting with people.
      </p>
      <p>
        <span className="mr-2">Instagram</span>
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-brand-green hover:text-brand-mid-red"
        >
          @nasi.mpls
        </a>
      </p>
    </div>
  );
}
