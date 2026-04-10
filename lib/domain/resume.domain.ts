/**
 * Resume Domain - Core business logic
 * Orchestrates resume parsing, Storage, and tailoring workflows
 */

import { Resume, ResumeStructure, DomainErrors } from '@/lib/types';
import { parseResume } from '@/lib/resume-parser';
import { ResumeRepository } from '@/lib/repositories/resume.repository';

export class ResumeDomain {
  constructor(private repository: ResumeRepository) {}

  /**
   * Parse resume text and update resume record with structured data
   */
  async parse(resume: Resume): Promise<Resume> {
    if (resume.parseStatus === 'PARSED') {
      return resume;
    }

    if (resume.parseStatus === 'PARSING') {
      throw DomainErrors.INVALID_STATE('Resume is already being parsed');
    }

    if (!resume.sourceText && !resume.extractedText) {
      throw DomainErrors.INVALID_STATE('No resume text available to parse');
    }

    const resumeText = resume.extractedText || resume.sourceText || '';

    try {
      const structured = await parseResume(resumeText);

      const updated = await this.repository.updateStructuredData(
        resume.id,
        structured
      );

      return await this.repository.updateParseStatus(
        resume.id,
        'PARSED',
        resumeText
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw DomainErrors.PARSE_FAILED(message);
    }
  }

  /**
   * Validate resume is in appropriate state for tailoring
   */
  validateForTailoring(resume: Resume): void {
    if (resume.parseStatus !== 'PARSED') {
      throw DomainErrors.INVALID_STATE(
        `Resume must be PARSED to tailor. Current status: ${resume.parseStatus}`
      );
    }

    if (!resume.extractedText && !resume.sourceText) {
      throw DomainErrors.INVALID_STATE(
        'No parsed resume text available for tailoring'
      );
    }
  }

  /**
   * Get resume text for processing (extracted or source)
   */
  getTextForProcessing(resume: Resume): string {
    return resume.extractedText || resume.sourceText || '';
  }
}
