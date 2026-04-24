import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

export type LocalResumeRecord = {
  id: string;
  title: string;
  slug: string;
  parseStatus: 'UPLOADED' | 'PARSING' | 'PARSED' | 'FAILED';
  sourceType: 'TEXT' | 'PDF';
  createdAt: string;
  updatedAt: string;
  originalFilename?: string | null;
  filePath?: string | null;
  sourceText?: string | null;
  extractedText?: string | null;
  parseError?: string | null;
  structuredData?: unknown | null;
};

const storageDir = path.join(process.cwd(), 'storage');
const storageFile = path.join(storageDir, 'local-resumes.json');
let writeQueue = Promise.resolve();

async function ensureStoreFile() {
  await fs.mkdir(storageDir, { recursive: true });

  try {
    await fs.access(storageFile);
  } catch {
    await fs.writeFile(storageFile, '[]', 'utf8');
  }
}

async function readStore() {
  await writeQueue;
  await ensureStoreFile();
  const raw = await fs.readFile(storageFile, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as LocalResumeRecord[]) : [];
}

async function writeStore(records: LocalResumeRecord[]) {
  await ensureStoreFile();
  await fs.writeFile(storageFile, `${JSON.stringify(records, null, 2)}\n`, 'utf8');
}

export async function listLocalResumes() {
  const records = await readStore();
  return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getLocalResumeById(id: string) {
  const records = await readStore();
  return records.find((record) => record.id === id) ?? null;
}

export async function createLocalResume(
  input: Omit<LocalResumeRecord, 'id' | 'createdAt' | 'updatedAt'>,
) {
  return enqueueWrite(async () => {
    const records = await readStoreUnsafe();
    const now = new Date().toISOString();

    const record: LocalResumeRecord = {
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      ...input,
    };

    records.unshift(record);
    await writeStore(records);
    return record;
  });
}

export async function updateLocalResume(
  id: string,
  updates: Partial<Omit<LocalResumeRecord, 'id' | 'createdAt'>>,
) {
  return enqueueWrite(async () => {
    const records = await readStoreUnsafe();
    const index = records.findIndex((record) => record.id === id);

    if (index === -1) {
      return null;
    }

    const nextRecord: LocalResumeRecord = {
      ...records[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    records[index] = nextRecord;
    await writeStore(records);
    return nextRecord;
  });
}

async function readStoreUnsafe() {
  await ensureStoreFile();
  const raw = await fs.readFile(storageFile, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as LocalResumeRecord[]) : [];
}

function enqueueWrite<T>(operation: () => Promise<T>) {
  const next = writeQueue.then(operation, operation);
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}
