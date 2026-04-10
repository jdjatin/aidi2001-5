import fs from 'node:fs/promises';
import path from 'node:path';
import { getPrismaClient } from '@/lib/prisma';
import { extractTextFromPdf, parseResumeText } from '@/lib/resume-parser';

const uploadDir = path.join(process.cwd(), 'storage', 'resumes');

async function ensureUploadDir() {
  await fs.mkdir(uploadDir, { recursive: true });
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export async function storeUploadedResumeFile(file: File, slug: string) {
  await ensureUploadDir();

  const ext = path.extname(file.name) || '.pdf';
  const filePath = path.join(uploadDir, `${slug}${ext}`);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return { filePath, buffer };
}

export async function processResumeParse(resumeId: string) {
  const prisma = getPrismaClient();
  if (!prisma) {
    return;
  }

  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
    select: {
      id: true,
      sourceType: true,
      sourceText: true,
      filePath: true,
    },
  });

  if (!resume) {
    return;
  }

  await prisma.resume.update({
    where: { id: resumeId },
    data: {
      parseStatus: 'PARSING',
      parseError: null,
    },
  });

  try {
    const extractedText =
      resume.sourceType === 'TEXT'
        ? resume.sourceText || ''
        : await extractTextFromPdf(await fs.readFile(resume.filePath!));

    const parsed = parseResumeText(extractedText);

    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        parseStatus: 'PARSED',
        extractedText: parsed.extractedText,
        structuredData: parsed.structuredData,
        parseError: null,
      },
    });
  } catch (error) {
    await prisma.resume.update({
      where: { id: resumeId },
      data: {
        parseStatus: 'FAILED',
        parseError: error instanceof Error ? error.message : 'Resume parsing failed.',
      },
    });
  }
}

export function scheduleResumeParse(resumeId: string) {
  setTimeout(() => {
    void processResumeParse(resumeId);
  }, 0);
}

export function createResumeSlug(title: string) {
  const base = slugify(title);
  return `${base}-${Math.random().toString(36).slice(2, 8)}`;
}
