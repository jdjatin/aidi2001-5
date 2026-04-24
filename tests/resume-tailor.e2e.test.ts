import { beforeEach, describe, expect, it, vi } from 'vitest';

const generateTailoredResume = vi.fn();

vi.mock('@/lib/resume-tailor', () => ({
  generateTailoredResume,
}));

describe('tailor resume route', () => {
  beforeEach(() => {
    generateTailoredResume.mockReset();
  });

  it('returns 400 when the job description is too short', async () => {
    const { POST } = await import('../app/api/resumes/[id]/tailor/route');

    const response = await POST(
      new Request('http://localhost/api/resumes/resume-1/tailor', {
        method: 'POST',
        body: JSON.stringify({ jobDescription: 'too short' }),
        headers: { 'Content-Type': 'application/json' },
      }),
      { params: Promise.resolve({ id: 'resume-1' }) },
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: 'Add a fuller job description before generating.',
    });
  });

  it('returns 404 when the resume cannot be found', async () => {
    generateTailoredResume.mockRejectedValueOnce(new Error('Resume not found.'));

    const { POST } = await import('../app/api/resumes/[id]/tailor/route');

    const response = await POST(
      new Request('http://localhost/api/resumes/missing/tailor', {
        method: 'POST',
        body: JSON.stringify({
          jobDescription:
            'We need a full-stack engineer with experience in TypeScript, React, APIs, tests, collaboration, delivery, and stakeholder communication across product teams.',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
      { params: Promise.resolve({ id: 'missing' }) },
    );

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'Resume not found.' });
  });

  it('returns 409 when a resume has not finished parsing', async () => {
    generateTailoredResume.mockRejectedValueOnce(
      new Error('Resume must finish parsing before tailoring.'),
    );

    const { POST } = await import('../app/api/resumes/[id]/tailor/route');

    const response = await POST(
      new Request('http://localhost/api/resumes/pending/tailor', {
        method: 'POST',
        body: JSON.stringify({
          jobDescription:
            'We need a backend engineer with strong API design, TypeScript, testing, system reliability, observability, and communication skills across teams.',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
      { params: Promise.resolve({ id: 'pending' }) },
    );

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      error: 'Resume must finish parsing before tailoring.',
    });
  });

  it('returns the generated tailored resume payload on success', async () => {
    generateTailoredResume.mockResolvedValueOnce({
      resumeTitle: 'API Smoke Resume',
      tailored_resume: 'tailored output',
      summary_of_changes: ['highlighted matching skills'],
      highlighted_keywords: ['TypeScript', 'React'],
    });

    const { POST } = await import('../app/api/resumes/[id]/tailor/route');

    const response = await POST(
      new Request('http://localhost/api/resumes/resume-1/tailor', {
        method: 'POST',
        body: JSON.stringify({
          jobDescription:
            'We need a frontend engineer with strong React, TypeScript, testing, accessibility, stakeholder communication, and delivery experience.',
        }),
        headers: { 'Content-Type': 'application/json' },
      }),
      { params: Promise.resolve({ id: 'resume-1' }) },
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      resumeTitle: 'API Smoke Resume',
      tailored_resume: 'tailored output',
      summary_of_changes: ['highlighted matching skills'],
      highlighted_keywords: ['TypeScript', 'React'],
    });
  });
});
