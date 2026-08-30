import { describe, it, expect } from 'vitest';
import { initObservability, useObservability } from './useObservability';

describe('useObservability', () => {
  it('generates a session id on first init and reuses it after', () => {
    const first = initObservability();
    expect(first).toBeTruthy();
    expect(typeof first).toBe('string');
    const second = initObservability();
    expect(second).toBe(first);
    const { sessionId } = useObservability();
    expect(sessionId.value).toBe(first);
  });
});
