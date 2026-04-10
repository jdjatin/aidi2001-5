import { z } from 'zod';
import { getPrismaClient } from '@/lib/prisma';
import { hasDatabaseConfig } from '@/lib/env';
import {
  createResumeSlug,
  scheduleResumeParse,
  storeUploadedResumeFile,
} from '@/lib/resume-ingestion';

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
    return {
      source: 'seed' as const,
      resumes: seedResumes,
      databaseReady: false,
    };
  }

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
}

export async function createResumeFromText(input: unknown) {
  const parsed = createResumeSchema.parse(input);
  const prisma = getPrismaClient();

  if (!prisma) {
    return {
      created: false,
      databaseReady: false,
      message: 'Database is not configured yet. Add DATABASE_URL and DIRECT_URL to persist resumes.',
    };
  }

  const slug = createResumeSlug(parsed.title);

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

  if (!prisma) {
    return {
      created: false,
      databaseReady: false,
      message: 'Database is not configured yet. Add DATABASE_URL to persist resumes.',
    };
  }

  const slug = createResumeSlug(parsed.title);
  const stored = await storeUploadedResumeFile(file, slug);

  const resume = await prisma.resume.create({
    data: {
      title: parsed.title,
      slug,
      sourceType: 'PDF',
      originalFilename: file.name,
      filePath: stored.filePath,
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
}

export function getResumeLibraryStateLabel() {
  return hasDatabaseConfig() ? 'Connected to database' : 'Seed mode until env is configured';
}
