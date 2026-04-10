/**
 * Resume Tailor - End-to-End Tests with Playwright
 * 
 * Tests real user workflows, not trivial page-load checks:
 * - Upload/paste resume
 * - Submit multiple job descriptions in batch
 * - Poll for progress on async generation
 * - Review tailored results
 * - Edit generated content
 * - Export to TXT/PDF
 * 
 * Run with: npx playwright test --headed