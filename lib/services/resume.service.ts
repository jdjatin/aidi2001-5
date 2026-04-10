/**
 * Resume Service - High-level business orchestration
 * Coordinates resume operations across domain, repositories, and adapters
 */

import { Resume, TailoredResume, DomainErrors } from '@/lib/types';
import { ResumeRepository } from '@/lib/repositories/resume.repository';
import { ResumeDomain } from '@/lib/domain/resume.domain';
import { GeminiAIAdapter } from '@/lib/adapters/ai.adapter';
import {
  createResumeSlug,
  scheduleResumeParse,
  storeUploadedResumeFile,
} from '@/lib/resume-ingestion';
import { v4 as uuidv4 } from 'crypto';

export class ResumeService {
  private repository: ResumeRepository;
  private domain: ResumeDomain;
  private aiAdapter: GeminiAIAdapter;

  constructor() {
    this.repository = new ResumeRepository();
    this.domain = new ResumeDomain(this.repository);
    this.aiAdapter = new GeminiAIAdapter();
  }

  /**
   * List all resumes
   */
  async listResumes(): Promise<
    | { source: 'seed'; resumes: Resume[]; databaseReady: false }
    | { source: 'database'; resumes: Resume[]; databaseReady: true }
  > {
    try {
      const resumes = await this.repository.list();
      return {
        source: 'database',
        resumes,
        databaseReady: true,
      };
    } catch (error) {
      // Fallback to seed data if database unavailable
      return {
        source: 'seed',
        resumes: [],
        databaseReady: false,
      };
    }
  }

  /**
   * Get resume by ID
   */
  async getResumeById(id: string): Promise<Resume> {
    const resume = await this.repository.findById(id);
    if (!resume) {
      throw DomainErrors.NOT_FOUND('Resume');
    }
    return resume;
  }

  /**
   * Create new resume with upload handling
   */
  async createResume(
    title: string,
    sourceText?: string,
    originalFilename?: string
  ): Promise<Resume> {
    const slug = createResumeSlug(title);

    const resume = await this.repository.create({
      title,
      slug,
      sourceType: originalFilename ? 'PDF' : 'TEXT',
      sourceText,
      originalFilename,
      parseStatus: 'UPLOADED',
    });

    // Schedule async parsing
    await scheduleResumeParse(resume.id);

    return resume;
  }

  /**
   * Parse resume - high level orchestration
   */
  async parseResume(resumeId: string): Promise<Resume> {
    const resume = await this.getResumeById(resumeId);
    return this.domain.parse(resume);
  }

  /**
   * Generate tailored resume
   */
  async generateTailoredResume(
    resumeId: string,
    jobDescription: string
  ): Promise<TailoredResume> {
    const resume = await this.getResumeById(resumeId);

    // Validate resume state
    this.domain.validateForTailoring(resume);

    const resumeText = this.domain.getTextForProcessing(resume);

    try {
      const result = await this.aiAdapter.generateTailoredResume({
        resume: resumeText,
        jobDescription,
      });

      return {
        resumeId,
        jobDescriptionId: uuidv4(),
        content: result.tailoredResume,
        summaryOfChanges: result.summaryOfChanges,
        highlightedKeywords: result.highlightedKeywords,
        createdAt: new Date(),
      };
    } catch (error) {
      throw DomainErrors.AI_GENERATION_ERROR(
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }
}
