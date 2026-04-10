## Problem Statement

Students and job seekers often have one base resume but need to adapt it for multiple job descriptions. Manually tailoring a resume for each role is slow, repetitive, and hard to do consistently. Existing resume tools often provide generic feedback instead of producing concrete, job-specific outputs that are easy to compare, edit, save, and export.

The user wants a full-stack application that accepts one base resume, compares it against up to five pasted job descriptions, and produces separate ATS-friendly resume variants for each job description. The app should also explain the changes, show gap analysis, track versions, persist results in a remote database, and support lightweight editing before export.

## Solution

Build a full-stack web application that lets a user upload a resume as PDF or plain text, asynchronously parse it into a structured internal model, and then submit up to five job descriptions in one generation run. For each job description, the system will:

- parse the JD into structured requirements
- compute a weighted ATS-style compatibility score before tailoring
- generate a tailored resume variant using a standardized single-column template
- compute the tailored score after generation
- display gap analysis, a lightweight diff, and a change explanation
- allow the user to edit structured fields and save edited variants
- preserve version history across regenerations
- export tailored resumes as TXT or PDF

The app will be built as a single Next.js application with App Router and API routes, backed by Supabase Postgres and Prisma. AI generation will use Google AI Studio via the `@google/genai` SDK with a low-cost Gemini model. Background work will be handled through simple database-backed jobs processed inside the Next.js app, and the frontend will poll for progress updates.

## User Stories

1. As a user, I want to upload a base resume in PDF format, so that I can start tailoring it for jobs without manually re-entering my information.
2. As a user, I want to paste my resume text manually, so that I can still use the app when PDF parsing fails or when I only have plain text.
3. As a user, I want the app to parse my resume automatically, so that I can move quickly into tailoring without extra setup.
4. As a user, I want an optional review step for parsed resume content, so that I can fix extraction mistakes before generating variants.
5. As a user, I want the resume to be represented as structured sections, so that generated outputs and edits stay organized.
6. As a user, I want to keep multiple base resumes in the system, so that I can maintain different baseline resumes for different career directions.
7. As a user, I want to browse a resume library once data exists, so that I can reopen and continue prior work.
8. As a user, I want to choose one active base resume at a time, so that the generation workflow stays focused and understandable.
9. As a user, I want to paste up to five job descriptions in one run, so that I can batch-tailor my resume efficiently.
10. As a user, I want job descriptions entered as raw pasted text, so that I do not need to upload and manage extra files.
11. As a user, I want each JD parsed into structured fields behind the scenes, so that scoring and explanations feel specific and believable.
12. As a user, I want generation to run asynchronously, so that I am not blocked on one long request.
13. As a user, I want each job description to have its own status, so that I can see progress across a batch run.
14. As a user, I want results to appear progressively as each JD finishes, so that I can start reviewing outputs before the whole run completes.
15. As a user, I want a master-detail results layout, so that I can switch between JD variants cleanly.
16. As a user, I want an ATS-style compatibility score for each job description, so that I can quickly understand fit.
17. As a user, I want to see both before and after scores, so that I can tell whether the tailored version improved the match.
18. As a user, I want the score to reflect more than raw keywords, so that the output feels smarter than a word-count tool.
19. As a user, I want a separate skills-gap panel, so that I can clearly see what the JD is asking for that is missing or weakly represented.
20. As a user, I want missing keywords and weak requirements called out, so that I know what parts of my resume are not aligned.
21. As a user, I want a tailored resume variant for each JD, so that I receive a usable output rather than only advice.
22. As a user, I want all tailored resumes to use a clean single-column ATS-friendly template, so that formatting is consistent and exportable.
23. As a user, I want the app to rewrite content with medium aggressiveness, so that the result feels meaningfully improved without becoming unrecognizable.
24. As a user, I want the app to rewrite summaries, reorder skills, and improve bullets, so that the tailored resume emphasizes my most relevant background.
25. As a user, I want a clear explanation of what changed and why, so that I can trust and learn from the generated result.
26. As a user, I want a lightweight diff view, so that I can see what changed from the original resume at the section or bullet level.
27. As a user, I want to manually edit the generated variant inside the app, so that I can refine the output before exporting.
28. As a user, I want those edits saved persistently, so that I do not lose work between sessions.
29. As a user, I want edited variants stored separately from AI-generated variants, so that I can distinguish system output from my own revisions.
30. As a user, I want regeneration to create a new version rather than overwrite the old one, so that I can compare attempts safely.
31. As a user, I want version history per JD, so that I can review earlier generated variants if a new one is worse.
32. As a user, I want the latest version to be selected by default, so that the interface stays simple.
33. As a user, I want to export a tailored resume as TXT, so that I can reuse the content anywhere.
34. As a user, I want to export a tailored resume as PDF, so that I can submit a polished file directly.
35. As a user, I want the app to recover gracefully from parsing failures, so that a single bad upload does not end my workflow.
36. As a user, I want the app to be English-only in V1, so that the parsing and scoring are consistent and predictable.
37. As a user, I want my past generation runs visible within a resume detail page, so that I can revisit previous work without a separate dashboard.
38. As a user, I want a remote database backing the app, so that my resumes, JDs, variants, and run history persist across sessions.
39. As a developer, I want a single Next.js codebase for frontend and backend, so that the system is easier to build, deploy, and demo.
40. As a developer, I want background jobs represented in the database, so that asynchronous state transitions are observable and testable.
41. As a developer, I want the generation orchestrator to be the deepest core module, so that async workflow complexity is hidden behind a small interface.
42. As a developer, I want deterministic scoring logic combined with LLM generation, so that the system is more explainable and debuggable than a pure prompt chain.
43. As a developer, I want polling for progress updates, so that the frontend stays simple while still showing live job status.
44. As a developer, I want Playwright end-to-end coverage for the main workflow, so that the full product path can be verified reliably.

## Implementation Decisions

- The product will be a single Next.js application using the App Router for the web UI and backend route handlers for API functionality.
- The app will use Supabase Postgres as the remote database.
- Prisma will be the primary ORM and schema management layer.
- The app will not include authentication in V1; it will behave as a single-user demo application.
- The AI provider will be Google AI Studio via the `@google/genai` SDK.
- V1 will use one low-cost Gemini model across parsing, explanation, and generation steps to keep cost and complexity low.
- The app will support one base resume input per generation run and up to five job descriptions in the same batch.
- Resume inputs for V1 will be PDF and plain text.
- Job descriptions will be pasted as raw text only in V1.
- Resume parsing will happen asynchronously after upload rather than blocking the upload request.
- Job description processing and variant generation will also run asynchronously.
- Background processing will use simple database-backed jobs managed inside the Next.js application rather than an external queue or worker service.
- Frontend progress updates will use polling rather than server-sent events or websockets.
- The results experience will use a master-detail layout.
- History will live inside each resume detail page rather than in a dedicated dashboard.
- The system will persist users, resumes, job descriptions, generation runs, generated variants, edited variants, and change logs.
- The internal source of truth for resume content will be a structured resume model rather than freeform text blobs.
- Resume variants will also be stored as structured data and rendered into a standardized ATS-friendly single-column template.
- Tailoring strength will be medium: rewrite summary, prioritize skills, improve and reorder bullets, but avoid a heavy freeform rewrite approach.
- The ATS-style score will be a weighted formula rather than simple keyword overlap.
- The initial scoring formula will weight skills match, responsibility alignment, keyword coverage, and section completeness.
- The UI will show both original and tailored scores for each JD.
- The system will display a separate skills-gap panel for missing or weakly represented requirements.
- The system will show a lightweight diff and a narrative “what changed and why” explanation for each generated variant.
- Users will be able to edit structured content fields in-app, including sections such as summary, skills, and bullets.
- User edits will be saved as separate user-edited variants rather than overwriting AI-generated variants.
- Regeneration will always create a new variant version.
- The latest variant version will be the default selected view, while older versions remain accessible in version history.
- Export formats for V1 will be TXT and PDF.
- The application will be English-only in V1.
- The generation orchestrator will be treated as the deepest core module because it owns run creation, job claiming, state transitions, and result persistence.

### Proposed Modules

- `generation orchestrator`: creates runs, schedules per-JD jobs, claims queued work, manages state transitions, and exposes run status.
- `resume ingestion`: handles upload intake, parse lifecycle, plain-text fallback, and structured resume extraction.
- `job description parser`: extracts structured requirements from raw JD text.
- `matching and scoring engine`: computes before/after ATS-style scores, keyword gaps, and section-level alignment signals.
- `variant generator`: produces tailored structured resume variants, diff summaries, and change explanations.
- `variant editor and versioning`: applies user edits, stores new versions, and distinguishes AI-generated variants from user-edited ones.
- `export renderer`: renders structured variants into TXT and PDF outputs using the standard template.
- `persistence layer`: encapsulates Prisma-based reads and writes for resumes, runs, jobs, variants, and history.

### Data Shape Decisions

- A resume record should store source metadata and the latest structured parsed representation.
- Job descriptions should store raw text plus extracted structured fields.
- Generation runs should link one resume to multiple job descriptions.
- Each job description in a generation run should have its own status and result lifecycle.
- Variants should be versioned per resume and per job description.
- Change logs should be stored separately enough to support explanation and diff displays without recomputing them at read time.

### API Contract Decisions

- Uploading a resume should create a persisted resume record and enqueue parse work.
- Starting a generation run should create a run record plus one job per JD.
- Run status retrieval should provide aggregate progress and per-JD status.
- Resume detail retrieval should include prior generation runs and the latest variant summaries.
- Variant retrieval should include the structured content, scores, gap analysis, diff summary, and version metadata.
- Editing a variant should create a new saved user-edited variant version rather than mutating history in place.
- Export requests should generate TXT or PDF from a stored structured variant.

## Testing Decisions

- Good tests should verify user-visible behavior through public interfaces rather than internal helper functions or direct database inspection alone.
- The first tracer-bullet test should target the generation run lifecycle because it exercises the full vertical slice through persistence, orchestration, and status retrieval.
- The generation orchestrator should have strong behavior tests covering run creation, job claiming, status transitions, completion, and failure handling.
- Resume ingestion should be tested through its public intake and parse lifecycle behavior, including parsing fallback paths.
- The matching and scoring engine should be tested through stable inputs and expected external score/gap outputs rather than implementation-specific substeps.
- Variant versioning should be tested through behaviors such as regeneration creating a new version and edits producing a separate user-edited variant.
- API route handlers should be tested through request/response behavior and persisted outcomes.
- Playwright should cover the main end-to-end flow: upload or paste resume, submit multiple JDs, observe polling-based progress, review a generated result, edit it, and export it.
- Tests should prefer boundary-level verification of modules over implementation-detail mocks wherever possible.
- The architecture should aim for deep modules so that complex internal logic can be exercised from a small number of stable interfaces.

## Out of Scope

- Authentication and multi-user access control
- Team collaboration features
- Real-time push updates via websockets or server-sent events
- DOCX import or export
- Preservation of the uploaded resume’s original visual formatting
- Multiple visual resume templates
- Multilingual resume and JD support
- Deletion UI for resumes, JDs, or variants
- Chat-based conversational assistance
- External queue infrastructure such as Redis-backed workers
- Enterprise-scale throughput concerns

## Further Notes

- The app should be framed as an ATS-oriented tailoring and analysis tool, not as a guarantee of interview success or ATS passage.
- The score should be described as an internal compatibility indicator rather than a literal external ATS result.
- The standardized template is a feature, not a compromise: the uploaded resume acts as the source of facts, while the app generates consistent ATS-friendly outputs.
- Because the workspace is not connected to a GitHub repository and the `gh` CLI is unavailable, this PRD is stored locally and can be turned into issues after repository setup.
