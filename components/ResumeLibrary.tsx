'use client';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Database, FileText } from 'lucide-react';
import CreateResumeForm from '@/components/CreateResumeForm';
import TailorResumePanel from '@/components/TailorResumePanel';

type Resume = {
  id: string;
  title: string;
  slug: string;
  parseStatus: string;
  sourceType: string;
  createdAt: string;
  originalFilename?: string | null;
  parseError?: string | null;
};

function formatCreatedAt(value: string) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value));
}

export default function ResumeLibrary({
  initialResumes,
  stateLabel,
  databaseReady,
}: {
  initialResumes: Resume[];
  stateLabel: string;
  databaseReady: boolean;
}) {
  const [resumes, setResumes] = useState(initialResumes);
  const [activeId, setActiveId] = useState(initialResumes[0]?.id ?? null);

  const activeResume = useMemo(
    () => resumes.find((resume) => resume.id === activeId) ?? resumes[0] ?? null,
    [activeId, resumes],
  );

  useEffect(() => {
    const hasActiveParsing = resumes.some(
      (resume) => resume.parseStatus === 'UPLOADED' || resume.parseStatus === 'PARSING',
    );

    if (!hasActiveParsing) {
      return;
    }

    const interval = window.setInterval(async () => {
      try {
        const response = await fetch('/api/resumes');
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        setResumes(data.resumes);
      } catch {
        // Ignore transient polling failures during local development.
      }
    }, 1200);

    return () => window.clearInterval(interval);
  }, [resumes]);

  return (
    <div className="grid library-layout">
      <section className="panel">
        <div className="panel-header">
          <span className="badge">Resume library</span>
          <h2>Stored resumes</h2>
          <p className="helper">Upload a base resume, wait for parsing, then tailor it to a job description.</p>
        </div>
        <div className="panel-body">
          <div className="meta-row" style={{ marginBottom: 18 }}>
            <span className="badge">
              <Database size={14} style={{ marginRight: 6 }} />
              {stateLabel}
            </span>
            <span>{databaseReady ? 'Remote persistence ready' : 'Using local fallback storage'}</span>
          </div>

          {resumes.length > 0 ? (
            <ul className="resume-list">
              {resumes.map((resume) => (
                <li key={resume.id}>
                  <button
                    className={clsx('resume-card', { active: resume.id === activeResume?.id })}
                    onClick={() => setActiveId(resume.id)}
                    type="button"
                    style={{ width: '100%', textAlign: 'left' }}
                  >
                    <div className="meta-row">
                      <span className="badge">{resume.parseStatus}</span>
                      <span>{resume.sourceType}</span>
                      {resume.originalFilename ? <span>{resume.originalFilename}</span> : null}
                    </div>
                    <div>
                      <h3 style={{ marginBottom: 6 }}>{resume.title}</h3>
                      <p className="helper" style={{ marginBottom: 0 }}>
                        /resume/{resume.slug}
                      </p>
                      {resume.parseError ? (
                        <p className="helper error" style={{ marginTop: 8, marginBottom: 0 }}>
                          {resume.parseError}
                        </p>
                      ) : null}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              No resumes yet. Create one on the right and we’ll use it as the active workspace.
            </div>
          )}
        </div>
      </section>

      <section className="grid" style={{ gap: 20 }}>
        <div className="panel">
          <div className="panel-header">
            <span className="badge">Create a resume</span>
            <h2>Upload and parse</h2>
            <p className="helper">Submit a PDF or pasted text and the backend will parse it in the background.</p>
          </div>
          <div className="panel-body">
            <CreateResumeForm
              onCreated={(resume) => {
                setResumes((current) => [resume, ...current]);
                setActiveId(resume.id);
              }}
            />
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="badge">Active resume</span>
            <h2>{activeResume?.title ?? 'No active resume yet'}</h2>
          </div>
          <div className="panel-body">
            {activeResume ? (
              <>
                <div className="meta-row" style={{ marginBottom: 12 }}>
                  <span className="badge">{activeResume.parseStatus}</span>
                  <span>{activeResume.sourceType}</span>
                  <span>{formatCreatedAt(activeResume.createdAt)}</span>
                </div>
                {activeResume.parseStatus === 'FAILED' ? (
                  <p className="helper error">
                    Parsing failed for this resume. The fallback path is to resubmit the resume as
                    pasted text so we can continue without PDF extraction.
                  </p>
                ) : null}
                {activeResume.parseStatus === 'PARSING' || activeResume.parseStatus === 'UPLOADED' ? (
                  <p className="helper">
                    Parsing is still running. This card will refresh automatically while the
                    background parser works.
                  </p>
                ) : null}
                <p className="helper">Use the panel below to paste a job description and generate a tailored text resume.</p>
              </>
            ) : (
              <div className="empty-state">
                <FileText size={18} style={{ marginBottom: 8 }} />
                Create or load a resume to establish the active workspace.
              </div>
            )}
          </div>
        </div>

        <TailorResumePanel activeResume={activeResume ?? null} />
      </section>
    </div>
  );
}
