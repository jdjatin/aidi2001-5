# Failure Analysis

This file highlights concrete failure cases from the Assignment 6 evaluation results and ties each one to the part of the pipeline that caused it.

## Case 1: `fail-cloud-security-mismatch`

### What failed

The system produced a tailored resume for a candidate whose background was junior web development, while the job description asked for a senior cloud security engineer with AWS, Kubernetes, Terraform, SIEM, incident response, and leadership experience.

The current output still framed the resume as:

- `Targeted for roles emphasizing seeking, senior, cloud, security.`

That wording makes the resume sound more aligned than it really is, even though the body of the resume still lacks the required qualifications.

### Why it failed

The system can only reorder and restate the existing resume text. In this case, the source resume simply does not contain the required cloud security experience. The tailoring logic still tried to optimize around the job description, so it produced a summary with high-value role terms but without the underlying evidence to support them.

### Pipeline cause

Primary cause: `logic`

- The ranking logic in [local-tailor.ts](/home/jd/Downloads/aidi2001-assignment5/lib/local-tailor.ts) rewards overlap with extracted JD keywords, even when the overall candidate-job match is fundamentally weak.
- There is no mismatch detector or confidence threshold that says "this resume is not a real fit for this role."

Secondary cause: `prompt`

- The current summary template pushes job-description terms into the output summary, which can overstate alignment.

Not mainly caused by: `parsing`

- This case used clean text input, so resume parsing was not the core problem.

## Case 2: `fail-short-vague-jd`

### What failed

The system generated a tailored output from the job description `Need a good worker ASAP.`

The current output included:

- `Targeted for roles emphasizing good, worker, asap..`

This is not a meaningful tailoring result. The job description is too short and too vague to support useful resume adaptation.

### Why it failed

The evaluation runner allowed generation to proceed even though the JD did not contain enough information about responsibilities, skills, or role type. As a result, the system treated generic words like `good`, `worker`, and `asap` as if they were useful tailoring signals.

### Pipeline cause

Primary cause: `logic`

- The keyword extraction logic accepts low-value words from vague job descriptions and uses them directly in the generated summary.
- There is no "insufficient job description quality" check inside the evaluation runner or heuristic tailoring path.

Secondary cause: `prompt`

- The summary template blindly inserts the extracted keywords, so bad inputs turn directly into bad summaries.

Important note about the app pipeline:

- The real API route in [route.ts](/home/jd/Downloads/aidi2001-assignment5/app/api/resumes/[id]/tailor/route.ts) already rejects job descriptions shorter than 50 characters.
- This failure still matters because it shows a gap between the production request validation and the offline evaluation pipeline.

Not mainly caused by: `parsing`

- Parsing was not the issue here; the input itself was too weak.

## Case 3: `rep-frontend-engineer` and similar keyword pollution

### What failed

Even in otherwise successful cases, the current output sometimes promotes weak or awkward keywords into the summary, for example:

- `Targeted for roles emphasizing hiring, frontend, engineer, accessible.`

Similar patterns appear in other results with words like `seeking` and `looking`.

### Why it failed

The keyword extraction logic is too literal. It removes some stopwords, but it still keeps generic recruitment words that should not be treated as meaningful tailoring targets. This inflates keyword-based scores and slightly degrades output quality.

### Pipeline cause

Primary cause: `logic`

- The stopword list in [local-tailor.ts](/home/jd/Downloads/aidi2001-assignment5/lib/local-tailor.ts) is incomplete.
- The current logic scores keyword overlap without distinguishing between meaningful skills and generic recruiting language.

Secondary cause: `prompt`

- The summary format makes these low-value keywords visible instead of hiding them.

Not mainly caused by: `parsing`

- The resume text itself was parsed fine; the problem came from JD term selection.

## Takeaway

The main failure pattern is not raw parsing accuracy. It is that the current tailoring pipeline lacks:

- a strong filter for low-value or generic job-description keywords
- a confidence or mismatch check for clearly unqualified resume-role pairs
- a validation layer in the offline evaluation path that mirrors the real API guardrails

These are good targets for the next improvement step because they are small, testable, and directly supported by the evaluation evidence.
