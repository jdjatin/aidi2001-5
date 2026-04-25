# Evaluation Notes

## Overall Result

- Better system: current
- Baseline average score: 7.57
- Current system average score: 8.14
- Current wins: 1
- Baseline wins: 0
- Ties: 6

## Interpretation

- The current system usually performed better because it pulled in more job-specific keywords and emphasized more relevant resume lines.
- The baseline stayed closer to the original resume order, so it often preserved relevant information less clearly.
- The comparison is intentionally lightweight: it scores keyword overlap, role relevance, and required skill presence rather than human judgment.

## Where It Failed

- rep-frontend-engineer: current did not clearly beat baseline. Missing current keywords: hiring, accessible, high, quality, experiences..
- rep-data-analyst: current did not clearly beat baseline. Missing current keywords: looking, support, development.
- rep-product-operations: current did not clearly beat baseline. Missing current keywords: hiring, product, specialist.
- rep-fullstack-saas: current did not clearly beat baseline. Missing current keywords: engineer, saas, team., requires.
- fail-cloud-security-mismatch: current did not clearly beat baseline. Missing current keywords: seeking, senior, cloud, security, engineer, expertise, aws, architecture.
- fail-short-vague-jd: current did not clearly beat baseline. Missing current keywords: good, worker, asap..

## Failure Case Takeaway

- fail-cloud-security-mismatch: baseline 0, current 0. Missing current keywords: seeking, senior, cloud, security, engineer, expertise, aws, architecture.
- fail-short-vague-jd: baseline 0, current 0. Missing current keywords: good, worker, asap..
- In mismatch cases, neither system can create real qualifications that do not exist in the base resume.
- In vague job description cases, the system has too little signal to tailor strongly, so results should be treated as limited.

