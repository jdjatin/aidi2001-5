/**
 * AI Adapter - External AI provider integration
 * Abstracts Gemini API interactions with retry logic
 */

import { getGeminiClient } from '@/lib/gemini';
import { generateWithRetry } from '@/lib/gemini-retry';
import { z } from 'zod';
import { DomainErrors } from '@/lib/types';

export interface IAIAdapter {
  generateTailoredResume(params: {
    resume: string;
    jobDescription: string;
  }): Promise<{
    tailoredResume: string;
    summaryOfChanges: string[];
    highlightedKeywords: string[];
  }>;
  scoreResume(params: {
    resume: string;
    jobDescription: string;
  }): Promise<number>;
}

const tailorResultSchema = z.object({
  tailored_resume: z.string().min(50),
  summary_of_changes: z.array(z.string()).min(1),
  highlighted_keywords: z.array(z.string()).default([]),
});

const scoreSchema = z.object({
  score: z.number().min(0).max(100),
});

export class GeminiAIAdapter implements IAIAdapter {
  async generateTailoredResume(params: {
    resume: string;
    jobDescription: string;
  }) {
    const ai = await getGeminiClient();
    if (!ai) {
      throw DomainErrors.AI_GENERATION_ERROR('GEMINI_API_KEY not configured');
    }

    const prompt = `
You tailor resumes to job descriptions.

Rules:
- Use only information already present in the resume.
- Do not invent employers, dates, tools, certifications, or achievements.
- Rephrase, reorder, and prioritize content to better match the job description.

Resume:
${params.resume}

Job Description:
${params.jobDescription}

Return a JSON object with:
- tailored_resume: the tailored resume text
- summary_of_changes: array of 3-5 bullet points explaining changes
- highlighted_keywords: array of key skills/keywords from the job description that appear in the tailored resume
`;

    const result = await generateWithRetry(prompt);
    return tailorResultSchema.parse(result);
  }

  async scoreResume(params: {
    resume: string;
    jobDescription: string;
  }): Promise<number> {
    const ai = await getGeminiClient();
    if (!ai) {
      throw DomainErrors.AI_GENERATION_ERROR('GEMINI_API_KEY not configured');
    }

    const prompt = `
You score how well a resume matches a job description on a scale of 0-100.

Resume:
${params.resume}

Job Description:
${params.jobDescription}

Consider:
- Skill alignment
- Experience level match
- Keyword coverage
- Responsibility alignment

Return a JSON object with:
- score: number between 0 and 100
`;

    const result = await generateWithRetry(prompt);
    return scoreSchema.parse(result).score;
  }
}
