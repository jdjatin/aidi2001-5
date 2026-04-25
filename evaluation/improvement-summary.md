# Improvement Summary

## What Changed

I updated only the tailoring prompt logic for the current system.

Main changes:

- Added instructions to prefer concrete skills, tools, responsibilities, and domain terms over generic recruiting language.
- Added explicit guidance to avoid treating words like `hiring`, `seeking`, `looking`, `candidate`, `role`, `good`, and `ASAP` as meaningful keywords.
- Strengthened the structure requirement so the output is organized into clearer sections such as `Professional Summary`, `Relevant Skills`, and `Relevant Experience`.
- Added a caution rule for weak matches so the system does not overstate fit when the base resume lacks supporting evidence.

## What Improved

Qualitatively, the updated prompt improved several visible output-quality issues from the failure analysis:

- The current system now produces clearer structure, with dedicated summary and skill emphasis instead of a looser blended output.
- It avoids some of the worst keyword pollution patterns. For example, failure cases no longer produce summaries like `Targeted for roles emphasizing good, worker, asap..`
- Weak-match cases are now more honest. In the mismatch and vague-JD cases, the current output uses cautious language such as:
  - `Evidence-based tailoring using only skills and experience already present in the resume.`
  - `Alignment is limited by the evidence available in the base resume.`

That is a better failure behavior for Assignment 6 because it is more defensible and less misleading.

## What the Evaluation Showed

After rerunning the evaluation:

- Baseline average score: `7.57`
- Current system average score after prompt update: `8.14`
- Current wins: `1`
- Ties: `6`

Important note:

- Before this prompt update, the current system average score was `11.43`.
- After the prompt update, the score went down because the evaluation metric strongly rewards raw keyword overlap, including low-value job-description terms.
- Once the prompt stopped echoing weak terms like `hiring`, `seeking`, and `good worker`, the keyword-match score dropped even though the output became cleaner and more cautious.

So the rerun shows a real tradeoff:

- output quality improved in structure and honesty
- the current lightweight metric still over-rewards literal keyword copying

## What Still Fails

### 1. Strong mismatch cases still cannot be fixed by prompt changes alone

Example: `fail-cloud-security-mismatch`

- The prompt is now more cautious, which is better.
- But the resume still does not contain AWS, Kubernetes, Terraform, SIEM, or senior security evidence.
- This is still mainly a pipeline logic problem, not a prompt-only problem.

### 2. Vague job descriptions still give weak tailoring signal

Example: `fail-short-vague-jd`

- The output is less misleading than before.
- But the job description is still too weak to support good tailoring.
- This needs stronger input-quality validation or evaluation guardrails, not just prompt tuning.

### 3. The metric is still imperfect

- The evaluation still scores keyword overlap using extracted JD tokens.
- That means a prompt that is more selective and more realistic can look worse numerically than a prompt that copies more words.
- For future improvement, the output-quality metric should weight supported skill alignment more heavily and generic keyword overlap less heavily.

## Bottom Line

This prompt update improved the readability, structure, and caution of the tailored resume output.

It did **not** solve the deeper mismatch and vague-input problems, and it also exposed a weakness in the current evaluation metric: the metric partly rewards behavior that the failure analysis identified as undesirable.
