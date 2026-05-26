# iConsulting Premium Website

Enterprise-grade Next.js 14 redesign for iConsulting, a cybersecurity, IT audit and digital transformation consulting firm.

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## EmailJS

Create `.env.local` from `.env.example` and provide:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

The consultation form sends through the configured EmailJS template, so the destination stays managed outside the public UI.
