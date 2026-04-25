import { beforeEach, describe, expect, it, vi } from 'vitest';

const createLocalResume = vi.fn();
const listLocalResumes = vi.fn();
const parseUploadedPdfFile = vi.fn();
const getPrismaClient = vi.fn();
const hasDatabaseConfig = vi.fn();
const isDatabaseConnectionError = vi.fn();

vi.mock('@/lib/local-resume-store', () => ({
  createLocalResume,
  listLocalResumes,
}));

vi.mock('@/lib/resume-parser', () => ({
  parseUploadedPdfFile,
}));

vi.mock('@/lib/prisma', () => ({
  getPrismaClient,
}));

vi.mock('@/lib/env', () => ({
  hasDatabaseConfig,
}));

vi.mock('@/lib/runtime-errors', () => ({
  isDatabaseConnectionError,
}));

vi.mock('@/lib/resume-ingestion', () => ({
  createResumeSlug: (title: string) => `${title.toLowerCase().replace(/\s+/g, '-')}-slug`,
  scheduleResumeParse: vi.fn(),
}));

describe('createResumeFromFile', () => {
  beforeEach(() => {
    vi.resetModules();
    createLocalResume.mockReset();
    listLocalResumes.mockReset();
    parseUploadedPdfFile.mockReset();
    getPrismaClient.mockReset();
    hasDatabaseConfig.mockReset();
    isDatabaseConnectionError.mockReset();
    delete process.env.DATABASE_URL;
    getPrismaClient.mockReturnValue(null);
    hasDatabaseConfig.mockReturnValue(false);
    isDatabaseConnectionError.mockReturnValue(false);
  });

  it('parses uploaded PDFs in-memory and persists the parsed result immediately', async () => {
    parseUploadedPdfFile.mockResolvedValueOnce({
      extractedText: 'Jane Doe\nSkills\nTypeScript, React',
      structuredData: { rawText: 'Jane Doe\nSkills\nTypeScript, React' },
    });

    createLocalResume.mockImplementationOnce(async (input) => ({
      id: 'resume-1',
      createdAt: '2026-04-24T00:00:00.000Z',
      updatedAt: '2026-04-24T00:00:00.000Z',
      ...input,
    }));

    const { createResumeFromFile } = await import('../lib/resume-service');
    const file = new File([new Uint8Array([1, 2, 3])], 'resume.pdf', {
      type: 'application/pdf',
    });

    const result = await createResumeFromFile({
      title: 'Resume Upload',
      file,
    });

    expect(parseUploadedPdfFile).toHaveBeenCalledWith(file);
    expect(createLocalResume).toHaveBeenCalledWith(
      expect.objectContaining({
        sourceType: 'PDF',
        originalFilename: 'resume.pdf',
        filePath: null,
        parseStatus: 'PARSED',
        parseError: null,
        extractedText: 'Jane Doe\nSkills\nTypeScript, React',
        structuredData: { rawText: 'Jane Doe\nSkills\nTypeScript, React' },
      }),
    );
    expect(result.created).toBe(true);
    expect(result.databaseReady).toBe(false);
    expect(result.resume.parseStatus).toBe('PARSED');
  });
});
