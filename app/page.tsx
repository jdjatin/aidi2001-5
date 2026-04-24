import ResumeLibrary from '@/components/ResumeLibrary';
import { getMissingEnvVars } from '@/lib/env';
import { getResumeLibraryStateLabel, listResumes } from '@/lib/resume-service';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const data = await listResumes();
  const missingEnvVars = getMissingEnvVars();

  return (
    <main className="page-shell">
      <div className="page-frame">
        <section className="hero">
          <span className="eyebrow">Resume Tailoring Workflow</span>
          <h1>Resume Variant Lab</h1>
          <p>
            Upload a resume, let the app parse it, then tailor it to a job description and save the
            generated result.
          </p>
          {missingEnvVars.length > 0 ? (
            <p className="helper">
              Missing env: {missingEnvVars.join(', ')}. The app will fall back to local storage
              until the database is available.
            </p>
          ) : null}
        </section>

        <ResumeLibrary
          initialResumes={data.resumes}
          stateLabel={getResumeLibraryStateLabel()}
          databaseReady={data.databaseReady}
        />
      </div>
    </main>
  );
}
