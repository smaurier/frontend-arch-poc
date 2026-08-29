export type FreshnessLevel = 'fresh' | 'stale' | 'expired';

export interface FreshnessTimestampProps {
  /** Unix ms of the last known update */
  timestamp: number;
  /** Optional override for "now" (used in tests + shell). Falls back to internal ticker. */
  now?: number;
  /** Threshold ms above which we mark as stale (default: 10_000) */
  staleThreshold?: number;
  /** Threshold ms above which we mark as expired/critical (default: 30_000) */
  expiredThreshold?: number;
}
