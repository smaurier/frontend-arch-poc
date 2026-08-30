<script setup lang="ts">
import { computed } from 'vue';
import { Badge, FreshnessTimestamp, AlarmIndicator, MapView } from '@frontend-arch-poc/ui';
import type { MapMarker } from '@frontend-arch-poc/ui';
import { useFreshnessTicker } from '@frontend-arch-poc/composables';
import { trucks, type TruckStatus } from '../mocks/trucks-data';

const { now } = useFreshnessTicker(1000);

const statusLabels: Record<
  TruckStatus,
  { label: string; badgeStatus: 'ok' | 'warning' | 'critical' | 'neutral' }
> = {
  driving: { label: 'Driving', badgeStatus: 'ok' },
  idle: { label: 'Idle', badgeStatus: 'warning' },
  stopped: { label: 'Stopped', badgeStatus: 'critical' },
};

function isPingLost(lastPing: number): boolean {
  return now.value - lastPing > 30_000;
}

const mapMarkers = computed<MapMarker[]>(() =>
  trucks.value.map((t) => ({
    id: t.id,
    lat: t.lat,
    lng: t.lng,
    label: t.driver,
    status: isPingLost(t.lastPing)
      ? 'critical'
      : statusLabels[t.status].badgeStatus === 'critical'
        ? 'critical'
        : statusLabels[t.status].badgeStatus === 'warning'
          ? 'warning'
          : 'ok',
  })),
);
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-lg">
    <section>
      <h2 class="text-lg font-bold mb-md">
        Fleet {{ trucks.length }} vehicles
      </h2>
      <ul class="space-y-sm">
        <li
          v-for="truck in trucks"
          :key="truck.id"
          data-testid="truck-row"
          class="grid grid-cols-[100px_140px_100px_100px_1fr] items-center gap-md p-sm bg-bg-surface rounded-md"
        >
          <span class="font-mono">{{ truck.id }}</span>
          <span class="text-text-muted">{{ truck.driver }}</span>
          <Badge
            :status="statusLabels[truck.status].badgeStatus"
            :label="statusLabels[truck.status].label"
          />
          <FreshnessTimestamp
            :timestamp="truck.lastPing"
            :now="now"
          />
          <AlarmIndicator
            v-if="isPingLost(truck.lastPing)"
            severity="critical"
            label="ping lost"
            :since="truck.lastPing"
            :now="now"
          />
        </li>
      </ul>
    </section>

    <aside class="min-h-[500px]">
      <MapView :markers="mapMarkers" />
    </aside>
  </div>
</template>
