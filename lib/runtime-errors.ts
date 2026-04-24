export function isDatabaseConnectionError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('P1001') ||
    message.includes("Can't reach database server") ||
    message.includes('DatabaseNotReachable')
  );
}

export function isGeminiUnavailableError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('"code":503') ||
    message.includes('UNAVAILABLE') ||
    message.includes('GEMINI_API_KEY is not configured')
  );
}

export function isMissingTailoredResumeStorageError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('P2021') ||
    message.includes('tailoredresume') ||
    message.includes('TailoredResume') ||
    message.includes('does not exist in the current database')
  );
}
