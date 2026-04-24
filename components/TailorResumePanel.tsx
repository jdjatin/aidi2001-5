'use client';

import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

type Resume = {
  id: string;
  title: string;
  parseStatus: string;
};

type TailorResult = {
  resumeTitle: string;
  tailored_resume: string;
  summary_of_changes: string[];
  highlighted_keywords: string[];
  tailoredResumeId: string;
  savedTo: 'database' | 'local';
  savedAt: string;
};

export default function TailorResumePanel({
  activeResume,
}: {
  activeResume: Resume | null;
}) {
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<TailorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setResult(null);
    setError(null);
  }, [activeResume?.id]);

  async function handleGenerate() {
    if (!activeResume) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/resumes/${activeResume.id}/tailor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to tailor this resume yet.');
      }

      setResult(data);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <span className="badge">LLM tailoring</span>
        <h2>Generate an updated resume</h2>
        <p className="helper">
          Paste a job description and Gemini will rewrite the active parsed resume to match it more
          closely.
        </p>
      </div>
      <div className="panel-body">
        {!activeResume ? (
          <div className="empty-state">Pick a resume first so we know what to tailor.</div>
        ) : activeResume.parseStatus !== 'PARSED' ? (
          <div className="empty-state">
            This resume is not ready for AI tailoring yet. Wait until parsing reaches `PARSED`.
          </div>
        ) : (
          <div className="form">
            <label className="label">
              Job description
              <textarea
                className="textarea"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                placeholder="Paste the full JD here to generate an updated resume."
              />
            </label>

            <button className="cta" disabled={isLoading} onClick={handleGenerate} type="button">
              <Sparkles size={16} />
              {isLoading ? 'Generating...' : 'Generate updated resume'}
            </button>

            {error ? <p className="helper error">{error}</p> : null}

            {result ? (
              <div className="grid" style={{ gap: 16 }}>
                <div className="resume-output">
                  <h3 style={{ marginTop: 0 }}>Tailored resume</h3>
                  <pre className="resume-pre">{result.tailored_resume}</pre>
                </div>

                <div className="grid" style={{ gap: 12 }}>
                  <div>
                    <h4 style={{ marginBottom: 8 }}>What changed</h4>
                    <ul className="plain-list">
                      {result.summary_of_changes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ marginBottom: 8 }}>Highlighted keywords</h4>
                    <div className="meta-row">
                      {result.highlighted_keywords.map((item) => (
                        <span className="badge" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="helper" style={{ marginBottom: 0 }}>
                    Saved to {result.savedTo} at {new Date(result.savedAt).toLocaleString()}.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
