import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { trucks, startMockUpdates } from './trucks-data';

describe('trucks-data', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('exports 5 trucks', () => {
    expect(trucks.value).toHaveLength(5);
  });

  it('exposes a permanent stale truck for E2E determinism', () => {
    const staleTruck = trucks.value.find((t) => t.permanentStale);
    expect(staleTruck).toBeDefined();
    expect(staleTruck?.id).toBe('TRUCK-04');
  });

  it('startMockUpdates returns a timer id that can be cleared', () => {
    const timer = startMockUpdates(1000);
    expect(timer).toBeDefined();
    clearInterval(timer);
  });

  it('startMockUpdates updates non-stale trucks on tick', () => {
    const initialPings = trucks.value.map((t) => t.lastPing);
    const timer = startMockUpdates(1000);
    vi.advanceTimersByTime(1500);
    const staleTruck = trucks.value.find((t) => t.permanentStale);
    expect(staleTruck?.lastPing).toBe(initialPings[trucks.value.indexOf(staleTruck!)]);
    clearInterval(timer);
  });
});
