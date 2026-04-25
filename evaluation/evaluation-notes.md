# Evaluation Notes

## Overall Result

- Better system: current
- Baseline average score: 7.57
- Current system average score: 11.43
- Current wins: 7
- Baseline wins: 0
- Ties: 0

## Interpretation

- The current system usually performed better because it pulled in more job-specific keywords and emphasized more relevant resume lines.
- The baseline stayed closer to the original resume order, so it often preserved relevant information less clearly.
- The comparison is intentionally lightweight: it scores keyword overlap, role relevance, and required skill presence rather than human judgment.

## Where It Failed

- No cases were worse than the baseline in this run, but failure cases still showed weak alignment when the resume-job match was poor or the JD was vague.

## Failure Case Takeaway

- fail-cloud-security-mismatch: baseline 0, current 7. Missing current keywords: engineer, expertise, aws, architecture.
- fail-short-vague-jd: baseline 0, current 5. Missing current keywords: none.
- In mismatch cases, neither system can create real qualifications that do not exist in the base resume.
- In vague job description cases, the system has too little signal to tailor strongly, so results should be treated as limited.

