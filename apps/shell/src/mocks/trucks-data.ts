import { ref } from 'vue';

export type TruckStatus = 'driving' | 'idle' | 'stopped';

export interface Truck {
  id: string;
  driver: string;
  status: TruckStatus;
  lastPing: number;
  permanentStale?: boolean;
  lat: number;
  lng: number;
}

const initialNow = Date.now();

export const trucks = ref<Truck[]>([
  {
    id: 'TRUCK-01',
    driver: 'A. Martin',
    status: 'driving',
    lastPing: initialNow,
    lat: 45.7578,
    lng: 4.832,
  },
  {
    id: 'TRUCK-02',
    driver: 'B. Lopez',
    status: 'idle',
    lastPing: initialNow,
    lat: 45.762,
    lng: 4.845,
  },
  {
    id: 'TRUCK-03',
    driver: 'C. Chen',
    status: 'driving',
    lastPing: initialNow,
    lat: 45.745,
    lng: 4.825,
  },
  {
    id: 'TRUCK-04',
    driver: "D. N'Guyen",
    status: 'stopped',
    lastPing: initialNow - 45_000,
    permanentStale: true,
    lat: 45.77,
    lng: 4.815,
  },
  {
    id: 'TRUCK-05',
    driver: 'E. Rossi',
    status: 'driving',
    lastPing: initialNow,
    lat: 45.752,
    lng: 4.85,
  },
]);

/**
 * Simulates realtime pings. Explicitly called from main.ts.
 * Non-permanent-stale trucks get their lastPing refreshed with 70% probability
 * every `intervalMs`.
 */
export function startMockUpdates(intervalMs = 2000): ReturnType<typeof setInterval> {
  return setInterval(() => {
    trucks.value.forEach((truck) => {
      if (!truck.permanentStale && Math.random() > 0.3) {
        truck.lastPing = Date.now();
      }
    });
  }, intervalMs);
}
