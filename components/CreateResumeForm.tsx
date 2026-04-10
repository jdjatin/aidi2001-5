'use client';

import { useState } from 'react';
import { LoaderCircle, Plus } from 'lucide-react';

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

export default function CreateResumeForm({
  onCreated,
}: {
  onCreated: (resume: Resume) => void;
}) {
  const [title, setTitle] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('sourceText', sourceText);
      if (file) {
        formData.append('file', file);
      }

      const response = await fetch('/api/resumes', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to create resume.');
      }

      if (data.resume) {
        onCreated(data.resume);
        setTitle('');
        setSourceText('');
        setFile(null);
        setMessage('Resume submitted. Parsing now runs asynchronously in the background.');
      } else {
        setMessage(data.message || 'Resume could not be persisted yet.');
      }
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        Resume title
        <input
          className="input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Data Analyst Base Resume"
          required
        />
      </label>

      <label className="label">
        Optional resume text
        <textarea
          className="textarea"
          value={sourceText}
          onChange={(event) => setSourceText(event.target.value)}
          placeholder="Paste resume text now, or leave this blank to wire PDF upload in the next slice."
        />
      </label>

      <label className="label">
        Or upload a PDF
        <input
          className="input"
          accept="application/pdf"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          type="file"
        />
      </label>

      <p className="helper">
        Use either pasted resume text or a PDF upload. If parsing fails, you can retry later with
        text input as the fallback path.
      </p>

      <button className="cta" disabled={isSubmitting} type="submit">
        {isSubmitting ? <LoaderCircle size={18} className="animate-spin" /> : <Plus size={18} />}
        Create resume
      </button>

      {message ? <p className="helper">{message}</p> : null}
      {error ? <p className="helper error">{error}</p> : null}
    </form>
  );
}
