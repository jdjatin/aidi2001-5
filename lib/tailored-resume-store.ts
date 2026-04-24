import { getPrismaClient } from '@/lib/prisma';
import { createLocalTailoredResume } from '@/lib/local-tailored-store';
import {
  isDatabaseConnectionError,
  isMissingTailoredResumeStorageError,
} from '@/lib/runtime-errors';

export async function persistTailoredResume(input: {
  resumeId: string;
  jobDescription: string;
  tailoredText: string;
  summaryOfChanges: string[];
  highlightedKeywords: string[];
  provider: string;
}) {
  const prisma = getPrismaClient();

  if (!prisma) {
    const localRecord = await createLocalTailoredResume(input);
    return {
      storage: 'local' as const,
      recordId: localRecord.id,
      createdAt: localRecord.createdAt,
    };
  }

  try {
    const record = await prisma.tailoredResume.create({
      data: {
        resumeId: input.resumeId,
        jobDescription: input.jobDescription,
        tailoredText: input.tailoredText,
        summaryOfChanges: input.summaryOfChanges,
        highlightedKeywords: input.highlightedKeywords,
        provider: input.provider,
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return {
      storage: 'database' as const,
      recordId: record.id,
      createdAt: record.createdAt.toISOString(),
    };
  } catch (error) {
    if (!isDatabaseConnectionError(error) && !isMissingTailoredResumeStorageError(error)) {
      throw error;
    }

    const localRecord = await createLocalTailoredResume(input);
    return {
      storage: 'local' as const,
      recordId: localRecord.id,
      createdAt: localRecord.createdAt,
    };
  }
}
