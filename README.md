# Resume Variant Lab

One base resume in, many ATS-friendly variants out.

This is a Next.js application for uploading resumes, parsing them, tailoring them to job descriptions with Gemini, and saving the tailored output.

## Features

- Resume upload from pasted text or PDF
- Async resume parsing
- Gemini-powered tailoring
- Tailored resume persistence in PostgreSQL

## Quick Start

```bash
npm install
npm run db:generate
npm run dev
```

## Environment

- `DATABASE_URL`
- `GEMINI_API_KEY` or `GOOGLE_API_KEY`

## Useful Commands

```bash
npm run dev
npm run build
npm test
npm run db:push
```

## License

MIT
