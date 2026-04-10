const required = ['DATABASE_URL'] as const;

export function getMissingEnvVars() {
  return required.filter((key) => !process.env[key]);
}

export function hasDatabaseConfig() {
  return getMissingEnvVars().length === 0;
}

export function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || null;
}

export function hasGeminiConfig() {
  return Boolean(getGeminiApiKey());
}
