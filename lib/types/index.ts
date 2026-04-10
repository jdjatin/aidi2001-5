/**
 * Domain types for Resume Tailor application
 */

export type ResumeParseStatus = 'UPLOADED' | 'PARSING' | 'PARSED' | 'FAILED';
export type ResumeSourceType = 'PDF' | 'TEXT';

export interface Resume {
  id: string;
  title: string;
  slug: string;
  sourceType: ResumeSourceType;
  originalFilename?: string | null;
  filePath?: string | null;
  parseStatus: ResumeParseStatus;
  sourceText?: string | null;
  extractedText?: string | null;
  parseError?: string | null;
  structuredData?: unknown | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeStructure {
  summary?: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    description: string;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    field: string;
  }>;
}

export interface TailoredResume {
  resumeId: string;
  jobDescriptionId: string;
  content: string;
  structuredData?: ResumeStructure;
  summaryOfChanges: string[];
  highlightedKeywords: string[];
  beforeScore?: number;
  afterScore?: number;
  createdAt: Date;
}

export interface JobDescription {
  id: string;
  resumeId: string;
  content: string;
  requirements?: string[];
  keywords?: string[];
  createdAt: Date;
}

/**
 * Error types for domain operations
 */
export class DomainError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'DomainError';
  }
}

export const DomainErrors = {
  NOT_FOUND: (resource: string) =>
    new DomainError('NOT_FOUND', `${resource} not found`, 404),
  INVALID_STATE: (message: string) =>
    new DomainError('INVALID_STATE', message, 400),
  PARSE_FAILED: (message: string) =>
    new DomainError('PARSE_FAILED', message, 400),
  DATABASE_ERROR: (message: string) =>
    new DomainError('DATABASE_ERROR', message, 500),
  AI_GENERATION_ERROR: (message: string) =>
    new DomainError('AI_GENERATION_ERROR', message, 500),
};
