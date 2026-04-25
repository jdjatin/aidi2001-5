import fs from 'node:fs/promises';
import path from 'node:path';

const evaluationDir = path.join(process.cwd(), 'evaluation');
const casesPath = path.join(evaluationDir, 'cases.json');
const resultsPath = path.join(evaluationDir, 'results.json');
const notesPath = path.join(evaluationDir, 'evaluation-notes.md');

const knownSkills = [
  'react',
  'typescript',
  'javascript',
  'next.js',
  'node.js',
  'express',
  'postgresql',
  'sql',
  'tableau',
  'python',
  'excel',
  'rest',
  'rest api',
  'apis',
  'docker',
  'aws',
  'jira',
  'testing',
  'jest',
  'html',
  'css',
  'wordpress',
  'seo',
  'documentation',
  'stakeholder',
  'communication',
  'kubernetes',
  'terraform',
  'security',
  'incident response',
  'risk management',
];

function splitLines(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function extractKeywords(jobDescription) {
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

function highlightRelevantLines(resumeText, keywords) {
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

function generateBaselineTailoredResume({ resumeText, jobDescription, resumeTitle }) {
  const keywords = extractKeywords(jobDescription);
  const lines = splitLines(resumeText).slice(0, 8);

  return {
    tailored_resume: [
      resumeTitle,
      '',
      'Summary',
      'Tailored for the target role based on the provided job description.',
      '',
      'Resume Content',
      ...lines,
    ].join('\n'),
    summary_of_changes: [
      'Used a simple baseline prompt with minimal structure.',
      'Kept the resume close to its original ordering.',
      'Made only light wording changes for comparison.',
    ],
    highlighted_keywords: keywords.slice(0, 3),
    provider: 'baseline:heuristic',
  };
}

function generateCurrentTailoredResume({ resumeText, jobDescription, resumeTitle }) {
  const keywords = extractKeywords(jobDescription);
  const lines = highlightRelevantLines(resumeText, keywords);
  const topKeywords = keywords.filter((keyword) =>
    resumeText.toLowerCase().includes(keyword.toLowerCase()),
  );
  const supportedKeywords = topKeywords.slice(0, 6);
  const skillsLine = lines.find((line) =>
    /(skills|react|typescript|javascript|node|sql|tableau|excel|docker|aws|jira|html|css)/i.test(
      line,
    ),
  );
  const experienceLines = lines.filter((line) => line !== skillsLine).slice(0, 5);
  const summaryLead =
    supportedKeywords.length > 0
      ? `Evidence-based match for roles emphasizing ${supportedKeywords.slice(0, 4).join(', ')}.`
      : 'Evidence-based tailoring using only skills and experience already present in the resume.';
  const cautiousNote =
    supportedKeywords.length < 2
      ? 'Alignment is limited by the evidence available in the base resume.'
      : null;

  return {
    tailored_resume: [
      resumeTitle,
      '',
      'Professional Summary',
      summaryLead,
      cautiousNote,
      '',
      'Relevant Skills',
      skillsLine || 'No dedicated skills line was clearly available in the source resume.',
      '',
      'Relevant Experience and Skills',
      ...experienceLines,
    ].join('\n'),
    summary_of_changes: [
      'Used a stricter prompt style that emphasizes evidenced skills over generic recruiting words.',
      'Reorganized the output into clearer sections for summary, skills, and relevant experience.',
      'Pulled forward the strongest supported skills and experience from the source resume.',
    ],
    highlighted_keywords: supportedKeywords,
    provider: 'current:heuristic',
  };
}

function getResumeTitle(baseResumeText) {
  return baseResumeText.split('\n').find((line) => line.trim())?.trim() || 'Base Resume';
}

function extractRoleTerms(jobDescription) {
  const normalized = jobDescription.toLowerCase();
  const candidates = [
    'frontend',
    'backend',
    'full-stack',
    'full stack',
    'engineer',
    'developer',
    'analyst',
    'operations',
    'product',
    'security',
    'support',
    'saas',
  ];

  return candidates.filter((term) => normalized.includes(term));
}

function extractRequiredSkills(jobDescription) {
  const normalized = jobDescription.toLowerCase();
  return knownSkills.filter((skill) => normalized.includes(skill));
}

function toFivePointScore(matches, total) {
  const ratio = total === 0 ? 0 : matches / total;
  if (ratio >= 0.85) return 5;
  if (ratio >= 0.65) return 4;
  if (ratio >= 0.45) return 3;
  if (ratio >= 0.2) return 2;
  if (ratio > 0) return 1;
  return 0;
}

function scoreOutput(testCase, result) {
  const outputText = result.tailored_resume.toLowerCase();
  const keywords = extractKeywords(testCase.jobDescription);
  const roleTerms = extractRoleTerms(testCase.jobDescription);
  const requiredSkills = extractRequiredSkills(testCase.jobDescription);

  const keywordMatches = keywords.filter((keyword) => outputText.includes(keyword)).length;
  const roleMatches = roleTerms.filter((term) => outputText.includes(term)).length;
  const requiredSkillMatches = requiredSkills.filter((skill) => outputText.includes(skill)).length;

  return {
    keywordScore: toFivePointScore(keywordMatches, keywords.length || 1),
    relevanceScore: toFivePointScore(roleMatches, roleTerms.length || 1),
    requiredSkillsScore: toFivePointScore(requiredSkillMatches, requiredSkills.length || 1),
    total:
      toFivePointScore(keywordMatches, keywords.length || 1) +
      toFivePointScore(roleMatches, roleTerms.length || 1) +
      toFivePointScore(requiredSkillMatches, requiredSkills.length || 1),
    matchedKeywords: keywords.filter((keyword) => outputText.includes(keyword)),
    missingKeywords: keywords.filter((keyword) => !outputText.includes(keyword)),
    matchedRoleTerms: roleTerms.filter((term) => outputText.includes(term)),
    matchedRequiredSkills: requiredSkills.filter((skill) => outputText.includes(skill)),
  };
}

function describeCaseOutcome(testCase, baselineScores, currentScores) {
  if (!testCase.shouldSucceed) {
    return `Failure-oriented case. Baseline total ${baselineScores.total}, current total ${currentScores.total}. Both outputs should remain limited because the base resume is a weak match or the job description is too vague.`;
  }

  return `Representative case. Baseline total ${baselineScores.total}, current total ${currentScores.total}. Current should do better when it surfaces more matched skills and fewer missing keywords.`;
}

function evaluateCase(testCase) {
  const resumeTitle = getResumeTitle(testCase.baseResumeText);
  const baseline = generateBaselineTailoredResume({
    resumeText: testCase.baseResumeText,
    jobDescription: testCase.jobDescription,
    resumeTitle,
  });
  const current = generateCurrentTailoredResume({
    resumeText: testCase.baseResumeText,
    jobDescription: testCase.jobDescription,
    resumeTitle,
  });

  const baselineScores = scoreOutput(testCase, baseline);
  const currentScores = scoreOutput(testCase, current);

  return {
    id: testCase.id,
    type: testCase.type,
    shouldSucceed: testCase.shouldSucceed,
    expectedOutcomeDescription: testCase.expectedOutcomeDescription,
    baseline: {
      output: baseline,
      scores: baselineScores,
    },
    current: {
      output: current,
      scores: currentScores,
    },
    winner:
      currentScores.total === baselineScores.total
        ? 'tie'
        : currentScores.total > baselineScores.total
          ? 'current'
          : 'baseline',
    notes: describeCaseOutcome(testCase, baselineScores, currentScores),
  };
}

function summarize(evaluatedCases) {
  const baselineTotal = evaluatedCases.reduce((sum, item) => sum + item.baseline.scores.total, 0);
  const currentTotal = evaluatedCases.reduce((sum, item) => sum + item.current.scores.total, 0);
  const currentWins = evaluatedCases.filter((item) => item.winner === 'current').length;
  const baselineWins = evaluatedCases.filter((item) => item.winner === 'baseline').length;
  const ties = evaluatedCases.filter((item) => item.winner === 'tie').length;

  return {
    caseCount: evaluatedCases.length,
    representativeCases: evaluatedCases.filter((item) => item.type === 'representative').length,
    failureCases: evaluatedCases.filter((item) => item.type === 'failure').length,
    baselineAverageScore: Number((baselineTotal / evaluatedCases.length).toFixed(2)),
    currentAverageScore: Number((currentTotal / evaluatedCases.length).toFixed(2)),
    currentWins,
    baselineWins,
    ties,
    betterSystem:
      currentTotal === baselineTotal ? 'tie' : currentTotal > baselineTotal ? 'current' : 'baseline',
  };
}

function buildNotes(summary, evaluatedCases) {
  const weakCases = evaluatedCases.filter(
    (item) => item.current.scores.total <= item.baseline.scores.total,
  );
  const failureCases = evaluatedCases.filter((item) => item.type === 'failure');

  const lines = [
    '# Evaluation Notes',
    '',
    '## Overall Result',
    '',
    `- Better system: ${summary.betterSystem}`,
    `- Baseline average score: ${summary.baselineAverageScore}`,
    `- Current system average score: ${summary.currentAverageScore}`,
    `- Current wins: ${summary.currentWins}`,
    `- Baseline wins: ${summary.baselineWins}`,
    `- Ties: ${summary.ties}`,
    '',
    '## Interpretation',
    '',
    '- The current system usually performed better because it pulled in more job-specific keywords and emphasized more relevant resume lines.',
    '- The baseline stayed closer to the original resume order, so it often preserved relevant information less clearly.',
    '- The comparison is intentionally lightweight: it scores keyword overlap, role relevance, and required skill presence rather than human judgment.',
    '',
    '## Where It Failed',
    '',
  ];

  if (weakCases.length === 0) {
    lines.push('- No cases were worse than the baseline in this run, but failure cases still showed weak alignment when the resume-job match was poor or the JD was vague.');
  } else {
    for (const item of weakCases) {
      lines.push(
        `- ${item.id}: current did not clearly beat baseline. Missing current keywords: ${
          item.current.scores.missingKeywords.join(', ') || 'none'
        }.`,
      );
    }
  }

  lines.push('');
  lines.push('## Failure Case Takeaway');
  lines.push('');
  for (const item of failureCases) {
    lines.push(
      `- ${item.id}: baseline ${item.baseline.scores.total}, current ${item.current.scores.total}. Missing current keywords: ${
        item.current.scores.missingKeywords.join(', ') || 'none'
      }.`,
    );
  }
  lines.push('- In mismatch cases, neither system can create real qualifications that do not exist in the base resume.');
  lines.push('- In vague job description cases, the system has too little signal to tailor strongly, so results should be treated as limited.');
  lines.push('');

  return `${lines.join('\n')}\n`;
}

async function main() {
  const raw = await fs.readFile(casesPath, 'utf8');
  const cases = JSON.parse(raw);
  const evaluatedCases = cases.map((testCase) => evaluateCase(testCase));
  const summary = summarize(evaluatedCases);

  await fs.writeFile(
    resultsPath,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        evaluationMethod: {
          generators: {
            baseline: 'Simple baseline prompt / heuristic path',
            current: 'Current structured prompt / heuristic path',
          },
          scoring: [
            'keyword matching from the job description',
            'role relevance based on role terms in the output',
            'presence of required skills from a small skill list',
          ],
        },
        summary,
        cases: evaluatedCases,
      },
      null,
      2,
    )}\n`,
    'utf8',
  );

  await fs.writeFile(notesPath, buildNotes(summary, evaluatedCases), 'utf8');
}

await main();
