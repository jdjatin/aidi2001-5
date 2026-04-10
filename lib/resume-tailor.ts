import { z } from 'zod';
import { getGeminiClient } from '@/lib/gemini';
import { generateWithRetry } from '@/lib/gemini-retry';
import { getPrismaClient } from '@/lib/prisma';

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
  if (!prisma) {
    throw new Error('Database is not configured.');
  }

  const ai = await getGeminiClient();
  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured.');
  }

  const resume = await prisma.resume.findUnique({
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
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('"code":503') || message.includes('UNAVAILABLE')) {
      throw new Error('Gemini is busy right now. Please retry in a moment.');
    }

    throw error;
  }

  const rawText = response.text;
  return {
    resumeTitle: resume.title,
    ...tailorResultSchema.parse(JSON.parse(rawText)),
  };
}
