import { z } from 'zod';
import { getGeminiClient } from '@/lib/gemini';
import { generateWithRetry } from '@/lib/gemini-retry';
import { getPrismaClient } from '@/lib/prisma';
import { getLocalResumeById } from '@/lib/local-resume-store';
import {
  generateBaselineTailoredResume,
  generateCurrentTailoredResume,
} from '@/lib/local-tailor';
import { isDatabaseConnectionError, isGeminiUnavailableError } from '@/lib/runtime-errors';
import { persistTailoredResume } from '@/lib/tailored-resume-store';

const tailorResultSchema = z.object({
  tailored_resume: z.string().min(50),
  summary_of_changes: z.array(z.string()).min(1),
  highlighted_keywords: z.array(z.string()).default([]),
});

type TailorResult = z.infer<typeof tailorResultSchema>;

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

  const baselinePrompt = `
Tailor this resume to the job description.
Return valid JSON only in this shape:
{
  "tailored_resume": "full updated resume text",
  "summary_of_changes": ["bullet 1", "bullet 2"],
  "highlighted_keywords": ["keyword 1", "keyword 2"]
}

Resume:
${resumeText}

Job description:
${jobDescription}
`;

  const currentPrompt = `
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

  const baselineGenerated = !ai
    ? generateBaselineFallback({ resumeText, jobDescription, resumeTitle: resume.title })
    : await generateModelResult({
        ai,
        prompt: baselinePrompt,
        resume,
        resumeText,
        jobDescription,
        strategy: 'baseline',
      });

  const currentGenerated = !ai
    ? generateCurrentFallback({ resumeText, jobDescription, resumeTitle: resume.title })
    : await generateModelResult({
        ai,
        prompt: currentPrompt,
        resume,
        resumeText,
        jobDescription,
        strategy: 'current',
      });

  const baselinePersisted = await persistTailoredResume({
    resumeId,
    jobDescription,
    tailoredText: baselineGenerated.result.tailored_resume,
    summaryOfChanges: baselineGenerated.result.summary_of_changes,
    highlightedKeywords: baselineGenerated.result.highlighted_keywords,
    provider: baselineGenerated.provider,
  });

  const currentPersisted = await persistTailoredResume({
    resumeId,
    jobDescription,
    tailoredText: currentGenerated.result.tailored_resume,
    summaryOfChanges: currentGenerated.result.summary_of_changes,
    highlightedKeywords: currentGenerated.result.highlighted_keywords,
    provider: currentGenerated.provider,
  });

  return {
    resumeTitle: resume.title,
    baseline: {
      ...baselineGenerated.result,
      tailoredResumeId: baselinePersisted.recordId,
      savedTo: baselinePersisted.storage,
      savedAt: baselinePersisted.createdAt,
      provider: baselineGenerated.provider,
    },
    current: {
      ...currentGenerated.result,
      tailoredResumeId: currentPersisted.recordId,
      savedTo: currentPersisted.storage,
      savedAt: currentPersisted.createdAt,
      provider: currentGenerated.provider,
    },
  };
}

async function generateModelResult({
  ai,
  prompt,
  resume,
  resumeText,
  jobDescription,
  strategy,
}: {
  ai: NonNullable<Awaited<ReturnType<typeof getGeminiClient>>>;
  prompt: string;
  resume: { title: string };
  resumeText: string;
  jobDescription: string;
  strategy: 'baseline' | 'current';
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
      return strategy === 'baseline'
        ? generateBaselineFallback({ resumeText, jobDescription, resumeTitle: resume.title })
        : generateCurrentFallback({ resumeText, jobDescription, resumeTitle: resume.title });
    }

    throw error;
  }

  const rawText = response.text ?? '';
  return {
    provider: `${strategy}:gemini-2.5-flash` as const,
    result: tailorResultSchema.parse(JSON.parse(rawText)),
  };
}

function generateBaselineFallback({
  resumeText,
  jobDescription,
  resumeTitle,
}: {
  resumeText: string;
  jobDescription: string;
  resumeTitle: string;
}) {
  const result = tailorResultSchema.parse(
    generateBaselineTailoredResume({
      resumeText,
      jobDescription,
      resumeTitle,
    }),
  );

  return {
    provider: 'baseline:fallback' as const,
    result: {
      ...result,
      summary_of_changes: [
        'Used a simple baseline prompt or fallback heuristic for comparison.',
        ...result.summary_of_changes.slice(0, 2),
      ],
    } satisfies TailorResult,
  };
}

function generateCurrentFallback({
  resumeText,
  jobDescription,
  resumeTitle,
}: {
  resumeText: string;
  jobDescription: string;
  resumeTitle: string;
}) {
  const result = tailorResultSchema.parse(
    generateCurrentTailoredResume({
      resumeText,
      jobDescription,
      resumeTitle,
    }),
  );

  return {
    provider: 'current:fallback' as const,
    result: {
      ...result,
      summary_of_changes: [
        'Used the current structured tailoring path with stronger prompt constraints.',
        ...result.summary_of_changes.slice(0, 2),
      ],
    } satisfies TailorResult,
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
