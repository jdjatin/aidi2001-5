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
          <span className="eyebrow">Issue #2 tracer bullet</span>
          <h1>Resume Variant Lab</h1>
          <p>
            One base resume in, many ATS-friendly variants out. This first slice stands up the
            full-stack app shell, remote-database wiring, and a minimal resume library so we have a
            stable home for the rest of the workflow.
          </p>
          {missingEnvVars.length > 0 ? (
            <p className="helper">
              Missing env: {missingEnvVars.join(', ')}. The UI falls back to seed records until you
              plug in Supabase Postgres.
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
