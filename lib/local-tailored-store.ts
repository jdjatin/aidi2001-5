import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

export type LocalTailoredResumeRecord = {
  id: string;
  resumeId: string;
  jobDescription: string;
  tailoredText: string;
  summaryOfChanges: string[];
  highlightedKeywords: string[];
  provider: string;
  createdAt: string;
  updatedAt: string;
};

const storageDir = path.join(process.cwd(), 'storage');
const storageFile = path.join(storageDir, 'local-tailored-resumes.json');
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
  return Array.isArray(parsed) ? (parsed as LocalTailoredResumeRecord[]) : [];
}

async function writeStore(records: LocalTailoredResumeRecord[]) {
  await ensureStoreFile();
  await fs.writeFile(storageFile, `${JSON.stringify(records, null, 2)}\n`, 'utf8');
}

export async function createLocalTailoredResume(
  input: Omit<LocalTailoredResumeRecord, 'id' | 'createdAt' | 'updatedAt'>,
) {
  return enqueueWrite(async () => {
    const records = await readStoreUnsafe();
    const now = new Date().toISOString();

    const record: LocalTailoredResumeRecord = {
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

async function readStoreUnsafe() {
  await ensureStoreFile();
  const raw = await fs.readFile(storageFile, 'utf8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as LocalTailoredResumeRecord[]) : [];
}

function enqueueWrite<T>(operation: () => Promise<T>) {
  const next = writeQueue.then(operation, operation);
  writeQueue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}
