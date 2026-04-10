import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateTailoredResume } from '@/lib/resume-tailor';

export const dynamic = 'force-dynamic';

const requestSchema = z.object({
  jobDescription: z.string().trim().min(50, 'Add a fuller job description before generating.'),
});

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = requestSchema.parse(body);

    const result = await generateTailoredResume({
      resumeId: id,
      jobDescription: parsed.jobDescription,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Tailor route error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || 'Invalid request.' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to tailor the resume.' },
      { status: 500 },
    );
  }
}
