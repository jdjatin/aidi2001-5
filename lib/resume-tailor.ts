import { z } from 'zod';
import { getGeminiClient } from '@/lib/gemini';
import { generateWithRetry } from '@/lib/gemini-retry';
import { getPrismaClient } from '@/lib/prisma';
import { getLocalResumeById } from '@/lib/local-resume-store';
import { generateTailoredResumeFallback } from '@/lib/local-tailor';
import { isDatabaseConnectionError, isGeminiUnavailableError } from '@/lib/runtime-errors';
import { persistTailoredResume } from '@/lib/tailored-resume-store';

const tailorResultSchema = z.object({
  tailored_resume: z.string().min(50),
  summary_of_changes: z.array(z.string()).min(1),
  highlighted_keywords: z.array(z.string()).default([]),
});

export async function generateTailoredResume({
  resumeId,
  jobDescription,
}: {
  resumeId: string;
  jobDescription: string;
}) {
  const prisma = getPrismaClient();
  const ai = await getGeminiClient();
  const resume = await getResume(resumeId, prisma);

  if (!resume) {
    throw new Error('Resume not found.');
  }

  if (resume.parseStatus !== 'PARSED') {
    throw new Error('Resume must finish parsing before tailoring.');
  }

  const resumeText = resume.extractedText || resume.sourceText || '';
  if (!resumeText.trim()) {
    throw new Error('No parsed resume text is available yet.');
  }

  const prompt = `
You tailor resumes to job descriptions.

Rules:
- Use only information already present in the resume.
- Do not invent employers, dates, tools, certifications, or achievements.
- Rephrase, reorder, and prioritize content to better match the job description.
- Return valid JSON only.

Return exactly:
{
  "tailored_resume": "full updated resume text in a clean ATS-friendly single-column format",
  "summary_of_changes": ["bullet 1", "bullet 2"],
  "highlighted_keywords": ["keyword 1", "keyword 2"]
}

Base resume:
${resumeText}

Job description:
${jobDescription}
`;

  const generated = !ai
    ? {
        provider: 'fallback' as const,
        result: tailorResultSchema.parse(
          generateTailoredResumeFallback({
            resumeText,
            jobDescription,
            resumeTitle: resume.title,
          }),
        ),
      }
    : await generateModelResult({
        ai,
        prompt,
        resume,
        resumeText,
        jobDescription,
      });

  const persisted = await persistTailoredResume({
    resumeId,
    jobDescription,
    tailoredText: generated.result.tailored_resume,
    summaryOfChanges: generated.result.summary_of_changes,
    highlightedKeywords: generated.result.highlighted_keywords,
    provider: generated.provider,
  });

  return {
    resumeTitle: resume.title,
    ...generated.result,
    tailoredResumeId: persisted.recordId,
    savedTo: persisted.storage,
    savedAt: persisted.createdAt,
  };
}

async function generateModelResult({
  ai,
  prompt,
  resume,
  resumeText,
  jobDescription,
}: {
  ai: NonNullable<Awaited<ReturnType<typeof getGeminiClient>>>;
  prompt: string;
  resume: { title: string };
  resumeText: string;
  jobDescription: string;
}) {
  let response;
  try {
    response = await generateWithRetry(() =>
      ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      }),
    );
  } catch (error) {
    if (isGeminiUnavailableError(error)) {
      return {
        provider: 'fallback' as const,
        result: tailorResultSchema.parse(
          generateTailoredResumeFallback({
            resumeText,
            jobDescription,
            resumeTitle: resume.title,
          }),
        ),
      };
    }

    throw error;
  }

  const rawText = response.text ?? '';
  return {
    provider: 'gemini-2.5-flash' as const,
    result: tailorResultSchema.parse(JSON.parse(rawText)),
  };
}

async function getResume(resumeId: string, prisma: ReturnType<typeof getPrismaClient>) {
  if (!prisma) {
    return getLocalResumeById(resumeId);
  }

  try {
    return await prisma.resume.findUnique({
      where: { id: resumeId },
      select: {
        id: true,
        title: true,
        parseStatus: true,
        extractedText: true,
        sourceText: true,
        structuredData: true,
      },
    });
  } catch (error) {
    if (!isDatabaseConnectionError(error)) {
      throw error;
    }

    return getLocalResumeById(resumeId);
  }
}
