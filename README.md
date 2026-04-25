# Resume Variant Lab

Resume Variant Lab is a Next.js app for uploading a base resume, parsing it, tailoring it to a pasted job description, and saving both baseline and current-system outputs for comparison.

## Quick Start

```bash
npm install
npm run db:generate
npm run dev
```

Useful commands:

```bash
npm test
npm run build
npm run eval:assignment6
npm run db:push
```

Environment variables:

- `DATABASE_URL`
- `GEMINI_API_KEY` or `GOOGLE_API_KEY`

## Architecture

This system is best classified as `prompt-first`.

Why:

- The main intelligence comes from placing the parsed resume text and pasted job description directly into the model prompt.
- The system does not use retrieval over an external document store.
- The system does not depend on tool calling or multi-step planning to complete the main task.

Why not `RAG`:

- The app works on one uploaded resume and one pasted job description at a time, so there is not a large knowledge base to retrieve from.
- The amount of source data is small enough to fit directly into prompt context.
- Adding retrieval would increase storage, indexing, debugging, and operational overhead without clearly improving this version of the app.

Main alternative considered: `RAG`

- RAG would make more sense if the app needed to search across many resumes, supporting documents, or long career-history files.
- I did not use it here because prompt-first is cheaper, simpler to debug, easier to deploy, and enough for the current scope.

## Pipeline / Data Flow

The main flow is:

1. Resume upload
2. Parsing
3. Tailoring
4. Output and persistence

Details:

- Resume upload: the user submits pasted resume text or a PDF through the UI.
- Parsing: the backend extracts PDF text when needed and builds a lightweight structured representation.
- Tailoring: the system sends the parsed resume plus the job description into a baseline path and a current prompt-first tailoring path.
- Output: the tailored resume, summary of changes, highlighted keywords, and storage metadata are returned to the UI and saved locally or in the database.

Relevant files:

- [app/api/resumes/route.ts](/home/jd/Downloads/aidi2001-assignment5/app/api/resumes/route.ts)
- [app/api/resumes/[id]/tailor/route.ts](/home/jd/Downloads/aidi2001-assignment5/app/api/resumes/[id]/tailor/route.ts)
- [lib/resume-parser.ts](/home/jd/Downloads/aidi2001-assignment5/lib/resume-parser.ts)
- [lib/resume-service.ts](/home/jd/Downloads/aidi2001-assignment5/lib/resume-service.ts)
- [lib/resume-tailor.ts](/home/jd/Downloads/aidi2001-assignment5/lib/resume-tailor.ts)

## Evaluation

The repo includes lightweight Assignment 6 evaluation artifacts under [evaluation](/home/jd/Downloads/aidi2001-assignment5/evaluation).

Evaluation areas:

- Output quality: compared baseline vs current system using keyword matching, role relevance, and required-skill presence.
- End-to-end success: checked through the existing API and workflow tests plus representative evaluation cases.
- Upstream component: resume parsing and prompt behavior were evaluated through parser logic, tests, and saved failure analysis.

Main files:

- [evaluation/cases.json](/home/jd/Downloads/aidi2001-assignment5/evaluation/cases.json)
- [evaluation/results.json](/home/jd/Downloads/aidi2001-assignment5/evaluation/results.json)
- [evaluation/evaluation-notes.md](/home/jd/Downloads/aidi2001-assignment5/evaluation/evaluation-notes.md)
- [tests/resume-service.test.ts](/home/jd/Downloads/aidi2001-assignment5/tests/resume-service.test.ts)
- [tests/resume-tailor.e2e.test.ts](/home/jd/Downloads/aidi2001-assignment5/tests/resume-tailor.e2e.test.ts)

## Failure Cases

The main documented failure cases are:

- clear resume-role mismatch
- vague or low-information job descriptions
- keyword pollution from generic recruiting terms

See:

- [evaluation/failure-analysis.md](/home/jd/Downloads/aidi2001-assignment5/evaluation/failure-analysis.md)

## Baseline Comparison

The app stores and compares:

- `baseline`: simpler prompt / heuristic output
- `current`: stronger prompt with clearer structure and stricter alignment rules

This gives a lightweight baseline without building a second full system.

Relevant files:

- [lib/resume-tailor.ts](/home/jd/Downloads/aidi2001-assignment5/lib/resume-tailor.ts)
- [evaluation/results.json](/home/jd/Downloads/aidi2001-assignment5/evaluation/results.json)

## Improvement

Based on the failure analysis, I improved the current tailoring prompt to:

- emphasize supported skills more clearly
- produce cleaner structured output
- avoid generic job-description terms
- use more cautious wording on weak matches

See:

- [evaluation/improvement-summary.md](/home/jd/Downloads/aidi2001-assignment5/evaluation/improvement-summary.md)

## What The System Supports

- uploading resume text or PDF
- parsing resume content
- tailoring one active resume to a pasted job description
- comparing baseline and current outputs
- saving tailored outputs locally or in PostgreSQL
- lightweight evaluation artifacts for Assignment 6

## What The System Does Not Support

- retrieval / RAG over a document collection
- tool-calling workflows
- authentication or multi-user accounts
- DOCX support
- advanced confidence scoring for mismatch detection
- strong handling of very vague job descriptions beyond basic validation

## License

MIT
