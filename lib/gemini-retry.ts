type RetryOptions = {
  retries?: number;
  sleep?: (ms: number) => Promise<void>;
};

function isRetryableGeminiError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('"code":503') || message.includes('UNAVAILABLE');
}

function defaultSleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function generateWithRetry<T>(
  generator: () => Promise<T>,
  options: RetryOptions = {},
) {
  const retries = options.retries ?? 3;
  const sleep = options.sleep ?? defaultSleep;

  let attempt = 0;
  let lastError: unknown;

  while (attempt < retries) {
    try {
      return await generator();
    } catch (error) {
      lastError = error;
      attempt += 1;

      if (attempt >= retries || !isRetryableGeminiError(error)) {
        throw error;
      }

      await sleep(1000 * 2 ** (attempt - 1));
    }
  }

  throw lastError;
}
