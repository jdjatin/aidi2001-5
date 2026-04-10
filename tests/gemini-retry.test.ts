import { describe, expect, it, vi } from 'vitest';
import { generateWithRetry } from '../lib/gemini-retry';

describe('generateWithRetry', () => {
  it('retries Gemini busy errors and eventually returns a result', async () => {
    const generator = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('{"error":{"code":503,"status":"UNAVAILABLE"}}'))
      .mockRejectedValueOnce(new Error('{"error":{"code":503,"status":"UNAVAILABLE"}}'))
      .mockResolvedValueOnce('updated resume');

    const result = await generateWithRetry(generator, {
      retries: 3,
      sleep: async () => undefined,
    });

    expect(result).toBe('updated resume');
    expect(generator).toHaveBeenCalledTimes(3);
  });

  it('does not retry non-retryable errors', async () => {
    const generator = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('Invalid API key'));

    await expect(
      generateWithRetry(generator, {
        retries: 3,
        sleep: async () => undefined,
      }),
    ).rejects.toThrow('Invalid API key');

    expect(generator).toHaveBeenCalledTimes(1);
  });

  it('stops after the configured retry budget for repeated busy errors', async () => {
    const generator = vi
      .fn<() => Promise<string>>()
      .mockRejectedValue(new Error('{"error":{"code":503,"status":"UNAVAILABLE"}}'));

    await expect(
      generateWithRetry(generator, {
        retries: 3,
        sleep: async () => undefined,
      }),
    ).rejects.toThrow('UNAVAILABLE');

    expect(generator).toHaveBeenCalledTimes(3);
  });
});
