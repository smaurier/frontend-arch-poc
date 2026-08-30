import { useSSE } from '@frontend-arch-poc/composables';
import { trucks, startMockUpdates, type Truck } from '../mocks/trucks-data';

const sseEnabled = import.meta.env.VITE_SSE_ENABLED === 'true';
const sseUrl = import.meta.env.VITE_SSE_URL ?? '/api/events';
const snapshotUrl = import.meta.env.VITE_SNAPSHOT_URL ?? '/api/snapshot';

let started = false;

export function startTrucksSource(pollingMs = 2000): void {
  if (started) return;
  started = true;
  if (sseEnabled) {
    // The useSSE composable must run inside a component setup, so we use it
    // via a tiny bootstrap component defined in App.vue. Here we only expose
    // the config helpers.
    return;
  }
  startMockUpdates(pollingMs);
}

export const trucksSourceConfig = {
  sseEnabled,
  sseUrl,
  snapshotUrl,
};

export function applyTrucksSnapshot(snapshot: Truck[]): void {
  trucks.value = snapshot;
}

export function applyTrucksEvent(payload: Truck[]): void {
  // Full-state event for v0. Deltas = V3+.
  trucks.value = payload;
}

// Re-export useSSE so App.vue can import it from this module when needed
export { useSSE };
