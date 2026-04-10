/**
 * Resume Repository - Data access abstraction layer
 * Handles all Resume-related database operations
 */

import { getPrismaClient } from '@/lib/prisma';
import { Resume, DomainErrors } from '@/lib/types';

export interface IResumeRepository {
  create(data: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>): Promise<Resume>;
  findById(id: string): Promise<Resume | null>;
  findBySlug(slug: string): Promise<Resume | null>;
  list(): Promise<Resume[]>;
  updateParseStatus(
    id: string,
    status: Resume['parseStatus'],
    extractedText?: string,
    error?: string
  ): Promise<Resume>;
  updateStructuredData(id: string, data: unknown): Promise<Resume>;
}

export class ResumeRepository implements IResumeRepository {
  private prisma = getPrismaClient();

  async create(data: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!this.prisma) {
      throw DomainErrors.DATABASE_ERROR('Database not configured');
    }

    const resume = await this.prisma.resume.create({
      data: {
        title: data.title,
        slug: data.slug,
        sourceType: data.sourceType,
        originalFilename: data.originalFilename,
        filePath: data.filePath,
        parseStatus: data.parseStatus,
        sourceText: data.sourceText,
        extractedText: data.extractedText,
      },
    });

    return this.mapToResume(resume);
  }

  async findById(id: string) {
    if (!this.prisma) {
      throw DomainErrors.DATABASE_ERROR('Database not configured');
    }

    const resume = await this.prisma.resume.findUnique({
      where: { id },
    });

    return resume ? this.mapToResume(resume) : null;
  }

  async findBySlug(slug: string) {
    if (!this.prisma) {
      throw DomainErrors.DATABASE_ERROR('Database not configured');
    }

    const resume = await this.prisma.resume.findUnique({
      where: { slug },
    });

    return resume ? this.mapToResume(resume) : null;
  }

  async list() {
    if (!this.prisma) {
      throw DomainErrors.DATABASE_ERROR('Database not configured');
    }

    const resumes = await this.prisma.resume.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return resumes.map(r => this.mapToResume(r));
  }

  async updateParseStatus(
    id: string,
    status: Resume['parseStatus'],
    extractedText?: string,
    error?: string
  ) {
    if (!this.prisma) {
      throw DomainErrors.DATABASE_ERROR('Database not configured');
    }

    const resume = await this.prisma.resume.update({
      where: { id },
      data: {
        parseStatus: status,
        extractedText: extractedText || undefined,
        parseError: error || undefined,
      },
    });

    return this.mapToResume(resume);
  }

  async updateStructuredData(id: string, data: unknown) {
    if (!this.prisma) {
      throw DomainErrors.DATABASE_ERROR('Database not configured');
    }

    const resume = await this.prisma.resume.update({
      where: { id },
      data: { structuredData: data },
    });

    return this.mapToResume(resume);
  }

  private mapToResume(data: any): Resume {
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      sourceType: data.sourceType,
      originalFilename: data.originalFilename,
      filePath: data.filePath,
      parseStatus: data.parseStatus,
      sourceText: data.sourceText,
      extractedText: data.extractedText,
      parseError: data.parseError,
      structuredData: data.structuredData,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
