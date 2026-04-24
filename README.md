# Move to Spain Services

Astro, TypeScript, Tailwind CSS, and Vercel starter site for Move to Spain Services.

## Getting started

1. Install Node.js 20 or newer.
2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

## Email form setup

The on-site form posts to `/api/contact` and is prepared for Resend.

Required environment variables:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CONTACT_EMAIL`

## Pages

- `/` Home
- `/privacy-policy` Privacy Policy
