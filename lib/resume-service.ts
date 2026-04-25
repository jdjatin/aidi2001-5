import { z } from 'zod';
import { getPrismaClient } from '@/lib/prisma';
import { hasDatabaseConfig } from '@/lib/env';
import { parseUploadedPdfFile } from '@/lib/resume-parser';
import {
  createResumeSlug,
  scheduleResumeParse,
} from '@/lib/resume-ingestion';
import { createLocalResume, listLocalResumes } from '@/lib/local-resume-store';
import { isDatabaseConnectionError } from '@/lib/runtime-errors';

type ResumeRecord = {
  id: string;
  title: string;
  slug: string;
  parseStatus: 'UPLOADED' | 'PARSING' | 'PARSED' | 'FAILED';
  sourceType: string;
  createdAt: string;
  originalFilename?: string | null;
  parseError?: string | null;
};

const seedResumes: ResumeRecord[] = [
  {
    id: 'seed-product-analyst',
    title: 'Product Analyst Base Resume',
    slug: 'product-analyst-base-resume',
    parseStatus: 'PARSED',
    sourceType: 'TEXT',
    createdAt: new Date('2026-04-09T12:00:00.000Z').toISOString(),
    originalFilename: null,
    parseError: null,
  },
  {
    id: 'seed-fullstack-engineer',
    title: 'Full-Stack Engineer Base Resume',
    slug: 'full-stack-engineer-base-resume',
    parseStatus: 'UPLOADED',
    sourceType: 'PDF',
    createdAt: new Date('2026-04-08T09:30:00.000Z').toISOString(),
    originalFilename: 'full-stack-engineer.pdf',
    parseError: null,
  },
];

const createResumeSchema = z.object({
  title: z.string().trim().min(3).max(120),
  sourceText: z.string().trim().optional().or(z.literal('')),
  originalFilename: z.string().trim().optional().nullable(),
});

export async function listResumes() {
  const prisma = getPrismaClient();

  if (!prisma) {
    const localResumes = await listLocalResumes();
    return {
      source: (localResumes.length > 0 ? 'local' : 'seed') as 'local' | 'seed',
      resumes: [...localResumes, ...seedResumes],
      databaseReady: false,
    };
  }

  try {
    const resumes = await prisma.resume.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        parseStatus: true,
        sourceType: true,
        originalFilename: true,
        parseError: true,
        createdAt: true,
      },
    });

    return {
      source: 'database' as const,
      resumes: resumes.map((resume) => ({
        ...resume,
        createdAt: resume.createdAt.toISOString(),
      })),
      databaseReady: true,
    };
  } catch (error) {
    if (!isDatabaseConnectionError(error)) {
      throw error;
    }

    const localResumes = await listLocalResumes();
    return {
      source: (localResumes.length > 0 ? 'local' : 'seed') as 'local' | 'seed',
      resumes: [...localResumes, ...seedResumes],
      databaseReady: false,
    };
  }
}

export async function createResumeFromText(input: unknown) {
  const parsed = createResumeSchema.parse(input);
  const prisma = getPrismaClient();

  if (!prisma) {
    const localResume = await createLocalResume({
      title: parsed.title,
      slug: createResumeSlug(parsed.title),
      sourceType: 'TEXT',
      originalFilename: parsed.originalFilename ?? null,
      sourceText: parsed.sourceText || null,
      parseStatus: 'UPLOADED',
      parseError: null,
      extractedText: null,
      structuredData: null,
    });

    scheduleResumeParse(localResume.id);

    return {
      created: true,
      databaseReady: false,
      resume: localResume,
      message: 'Saved locally because the database is not configured.',
    };
  }

  const slug = createResumeSlug(parsed.title);
  try {
    const resume = await prisma.resume.create({
      data: {
        title: parsed.title,
        slug,
        sourceType: 'TEXT',
        originalFilename: parsed.originalFilename ?? null,
        sourceText: parsed.sourceText || null,
        parseStatus: 'UPLOADED',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        parseStatus: true,
        sourceType: true,
        originalFilename: true,
        parseError: true,
        createdAt: true,
      },
    });

    scheduleResumeParse(resume.id);

    return {
      created: true,
      databaseReady: true,
      resume: {
        ...resume,
        createdAt: resume.createdAt.toISOString(),
      },
    };
  } catch (error) {
    if (!isDatabaseConnectionError(error)) {
      throw error;
    }

    const localResume = await createLocalResume({
      title: parsed.title,
      slug,
      sourceType: 'TEXT',
      originalFilename: parsed.originalFilename ?? null,
      sourceText: parsed.sourceText || null,
      parseStatus: 'UPLOADED',
      parseError: null,
      extractedText: null,
      structuredData: null,
    });

    scheduleResumeParse(localResume.id);

    return {
      created: true,
      databaseReady: false,
      resume: localResume,
      message: 'Saved locally because the remote database is currently unavailable.',
    };
  }
}

export async function createResumeFromFile({
  title,
  file,
}: {
  title: string;
  file: File;
}) {
  const parsed = createResumeSchema.parse({
    title,
    originalFilename: file.name,
    sourceText: '',
  });
  const prisma = getPrismaClient();
  const parsedPdf = await parseUploadedPdfFile(file);

  if (!prisma) {
    const slug = createResumeSlug(parsed.title);
    const localResume = await createLocalResume({
      title: parsed.title,
      slug,
      sourceType: 'PDF',
      originalFilename: file.name,
      filePath: null,
      sourceText: null,
      parseStatus: 'PARSED',
      parseError: null,
      extractedText: parsedPdf.extractedText,
      structuredData: parsedPdf.structuredData,
    });

    return {
      created: true,
      databaseReady: false,
      resume: localResume,
      message: 'Saved locally because the database is not configured.',
    };
  }

  const slug = createResumeSlug(parsed.title);
  try {
    const resume = await prisma.resume.create({
      data: {
        title: parsed.title,
        slug,
        sourceType: 'PDF',
        originalFilename: file.name,
        filePath: null,
        parseStatus: 'PARSED',
        extractedText: parsedPdf.extractedText,
        structuredData: parsedPdf.structuredData,
        parseError: null,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        parseStatus: true,
        sourceType: true,
        originalFilename: true,
        parseError: true,
        createdAt: true,
      },
    });

    return {
      created: true,
      databaseReady: true,
      resume: {
        ...resume,
        createdAt: resume.createdAt.toISOString(),
      },
    };
  } catch (error) {
    if (!isDatabaseConnectionError(error)) {
      throw error;
    }

    const localResume = await createLocalResume({
      title: parsed.title,
      slug,
      sourceType: 'PDF',
      originalFilename: file.name,
      filePath: null,
      sourceText: null,
      parseStatus: 'PARSED',
      parseError: null,
      extractedText: parsedPdf.extractedText,
      structuredData: parsedPdf.structuredData,
    });

    return {
      created: true,
      databaseReady: false,
      resume: localResume,
      message: 'Saved locally because the remote database is currently unavailable.',
    };
  }
}

export function getResumeLibraryStateLabel() {
  return hasDatabaseConfig() ? 'Connected to database' : 'Local fallback mode';
}
