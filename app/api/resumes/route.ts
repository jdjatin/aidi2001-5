import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import {
  createResumeFromFile,
  createResumeFromText,
  listResumes,
} from '@/lib/resume-service';
import { isDatabaseConnectionError } from '@/lib/runtime-errors';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await listResumes();
    return NextResponse.json(data);
  } catch (error) {
    if (isDatabaseConnectionError(error)) {
      return NextResponse.json(
        {
          error: 'Resume storage is temporarily unavailable.',
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ error: 'Unable to list resumes.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let result;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const title = String(formData.get('title') || '');
      const sourceText = String(formData.get('sourceText') || '');
      const file = formData.get('file');

      if (sourceText.trim()) {
        result = await createResumeFromText({ title, sourceText });
      } else if (file instanceof File && file.size > 0) {
        result = await createResumeFromFile({ title, file });
      } else {
        return NextResponse.json(
          { error: 'Provide resume text or upload a PDF file.' },
          { status: 400 },
        );
      }
    } else {
      const body = await request.json();
      result = await createResumeFromText(body);
    }

    if (!result.created) {
      return NextResponse.json(result, { status: 202 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Invalid input.' },
        { status: 400 },
      );
    }

    if (isDatabaseConnectionError(error)) {
      return NextResponse.json(
        { error: 'Resume storage is temporarily unavailable.' },
        { status: 503 },
      );
    }

    return NextResponse.json({ error: 'Unable to create resume.' }, { status: 500 });
  }
}
