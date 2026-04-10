/**
 * Refactored Resumes API route using new layered architecture
 * 
 * ARCHITECTURE IMPROVEMENTS:
 * - Separated concerns: service layer handles business logic
 * - Standardized error handling via ApiResponse class
 * - Clear dependency injection through service instantiation
 * - Consistent API contracts
 * - Testable via dependency interfaces
 */

import { NextResponse } from 'next/server';
import { ResumeService } from '@/lib/services/resume.service';
import { ApiResponse } from '@/lib/api/response';
import { DomainError } from '@/lib/types';

export const dynamic = 'force-dynamic';

const resumeService = new ResumeService();

export async function GET() {
  try {
    const result = await resumeService.listResumes();
    return ApiResponse.success(result);
  } catch (error) {
    return ApiResponse.error(error);
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let title: string;
    let sourceText: string | undefined;
    let originalFilename: string | undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      title = String(formData.get('title') || '');
      sourceText = String(formData.get('sourceText') || '') || undefined;
      
      const file = formData.get('file');
      if (file instanceof File && file.size > 0) {
        // Extract filename for future PDF processing
        originalFilename = file.name;
        // TODO: In production, upload to file storage and set filePath
      }
    } else {
      const body = await request.json();
      title = body.title;
      sourceText = body.sourceText;
    }

    // Validate input
    if (!title || title.trim().length < 3) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'Title must be at least 3 characters',
        400
      );
    }

    if (!sourceText && !originalFilename) {
      throw new DomainError(
        'VALIDATION_ERROR',
        'Provide resume text or upload a PDF file',
        400
      );
    }

    // Create resume via service
    const resume = await resumeService.createResume(
      title.trim(),
      sourceText,
      originalFilename
    );

    return ApiResponse.success(resume);
  } catch (error) {
    return ApiResponse.error(error);
  }
}
