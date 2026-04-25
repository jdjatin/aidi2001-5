import 'pdf-parse/worker';
import { PDFParse } from 'pdf-parse';

type SectionKey = 'summary' | 'skills' | 'experience' | 'projects' | 'education' | 'other';

const headings: Record<string, SectionKey> = {
  summary: 'summary',
  profile: 'summary',
  objective: 'summary',
  skills: 'skills',
  'technical skills': 'skills',
  experience: 'experience',
  'work experience': 'experience',
  employment: 'experience',
  projects: 'projects',
  education: 'education',
};

function normalizeText(text: string) {
  return text.replace(/\r/g, '\n').replace(/\t/g, ' ').replace(/[ ]{2,}/g, ' ').trim();
}

function toHeadingKey(line: string) {
  return line.trim().toLowerCase().replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function splitSections(text: string) {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const sections: Record<SectionKey, string[]> = {
    summary: [],
    skills: [],
    experience: [],
    projects: [],
    education: [],
    other: [],
  };

  let current: SectionKey = 'other';

  for (const line of lines) {
    const heading = headings[toHeadingKey(line)];
    if (heading) {
      current = heading;
      continue;
    }
    sections[current].push(line);
  }

  return Object.fromEntries(
    Object.entries(sections).map(([key, value]) => [key, value.join('\n').trim()]),
  ) as Record<SectionKey, string>;
}

function buildStructuredResume(text: string) {
  const cleanedText = normalizeText(text);
  const sections = splitSections(cleanedText);
  const skills = sections.skills
    .split(/[\n,|•]/)
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    rawText: cleanedText,
    sections,
    skills,
    stats: {
      characters: cleanedText.length,
      lines: cleanedText.split('\n').filter(Boolean).length,
      words: cleanedText.split(/\s+/).filter(Boolean).length,
    },
  };
}

export async function extractTextFromPdf(buffer: Buffer) {
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    return normalizeText(result.text || '');
  } finally {
    await parser.destroy();
  }
}

export async function parseUploadedPdfFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const extractedText = await extractTextFromPdf(buffer);
  return parseResumeText(extractedText);
}

export function parseResumeText(text: string) {
  const cleaned = normalizeText(text);
  if (!cleaned) {
    throw new Error('No readable text was found in the resume.');
  }

  return {
    extractedText: cleaned,
    structuredData: buildStructuredResume(cleaned),
  };
}
