# Netlify Forms Setup

The forms are coded for Netlify capture using the Next.js runtime v5-compatible pattern.

## Form names

- `rantang-order`
- `share-your-story`

## What is already in the code

- A static blueprint file exists at `/__forms.html` for Netlify form detection during build.
- Each React form still includes `data-netlify="true"` and a hidden `form-name` field.
- Each form includes a honeypot field using `netlify-honeypot="bot-field"`.
- Live submissions are sent with client-side `fetch()` instead of full-page form POST navigation.
- Successful submissions redirect to `/thank-you`.

## What you need to do in Netlify

1. Deploy the site.
2. Open the Netlify dashboard for the site.
3. Go to `Forms`.
4. Confirm both forms appear after the first deploy.
5. Open each form and enable email notifications.
6. Add the founder's email address as a notification recipient.

## Important note

Netlify email notifications are configured in the Netlify dashboard, not in the Next.js codebase.
