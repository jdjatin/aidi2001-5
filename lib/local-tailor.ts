function splitLines(text: string) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function extractKeywords(jobDescription: string) {
  const stopWords = new Set([
    'about',
    'after',
    'along',
    'also',
    'and',
    'are',
    'build',
    'candidate',
    'clear',
    'collaboration',
    'communicate',
    'experience',
    'for',
    'from',
    'have',
    'improve',
    'into',
    'need',
    'role',
    'should',
    'strong',
    'that',
    'the',
    'their',
    'then',
    'they',
    'this',
    'using',
    'with',
    'work',
    'years',
  ]);

  const matches = jobDescription.toLowerCase().match(/[a-z0-9+#.]{3,}/g) ?? [];
  const unique = [...new Set(matches)];

  return unique.filter((word) => !stopWords.has(word)).slice(0, 8);
}

function highlightRelevantLines(resumeText: string, keywords: string[]) {
  const lines = splitLines(resumeText);
  const scored = lines.map((line) => ({
    line,
    score: keywords.reduce((total, keyword) => {
      return total + (line.toLowerCase().includes(keyword) ? 1 : 0);
    }, 0),
  }));

  const matching = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.line);

  return matching.length > 0 ? matching : lines.slice(0, 8);
}

export function generateBaselineTailoredResume({
  resumeText,
  jobDescription,
  resumeTitle,
}: {
  resumeText: string;
  jobDescription: string;
  resumeTitle: string;
}) {
  const keywords = extractKeywords(jobDescription);
  const lines = splitLines(resumeText).slice(0, 8);

  const tailoredResume = [
    resumeTitle,
    '',
    'Summary',
    'Tailored for the target role based on the provided job description.',
    '',
    'Resume Content',
    ...lines,
  ].join('\n');

  return {
    tailored_resume: tailoredResume,
    summary_of_changes: [
      'Used a simple baseline prompt with minimal structure.',
      'Kept the resume close to its original ordering.',
      'Made only light wording changes for comparison.',
    ],
    highlighted_keywords: keywords.slice(0, 3),
    provider: 'fallback' as const,
  };
}

export function generateCurrentTailoredResume({
  resumeText,
  jobDescription,
  resumeTitle,
}: {
  resumeText: string;
  jobDescription: string;
  resumeTitle: string;
}) {
  const keywords = extractKeywords(jobDescription);
  const lines = highlightRelevantLines(resumeText, keywords);
  const topKeywords = keywords.filter((keyword) =>
    resumeText.toLowerCase().includes(keyword.toLowerCase()),
  );

  const tailoredResume = [
    resumeTitle,
    '',
    'Professional Summary',
    `Targeted for roles emphasizing ${keywords.slice(0, 4).join(', ') || 'relevant experience'}.`,
    '',
    'Relevant Experience and Skills',
    ...lines,
  ].join('\n');

  return {
    tailored_resume: tailoredResume,
    summary_of_changes: [
      'Prioritized resume lines that overlap most with the job description.',
      'Added a targeted summary so the strongest matching skills appear first.',
      'Highlighted matching keywords already present in the source resume.',
    ],
    highlighted_keywords: topKeywords,
    provider: 'fallback' as const,
  };
}

export function generateTailoredResumeFallback(args: {
  resumeText: string;
  jobDescription: string;
  resumeTitle: string;
}) {
  return generateCurrentTailoredResume(args);
}
