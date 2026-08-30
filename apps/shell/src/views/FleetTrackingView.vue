<script setup lang="ts">
import { computed, h } from 'vue';
import {
  Badge,
  FreshnessTimestamp,
  AlarmIndicator,
  MapView,
  DataTable,
} from '@frontend-arch-poc/ui';
import type { MapMarker, DataTableColumn } from '@frontend-arch-poc/ui';
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

type Truck = (typeof trucks.value)[number];

const columns: DataTableColumn<Truck>[] = [
  { key: 'id', header: 'ID', width: '100px' },
  { key: 'driver', header: 'Driver', width: '140px' },
  {
    key: 'status',
    header: 'Status',
    width: '100px',
    render: (row) =>
      h(Badge, {
        status: statusLabels[row.status].badgeStatus,
        label: statusLabels[row.status].label,
      }),
  },
  {
    key: 'lastPing',
    header: 'Last ping',
    width: '100px',
    render: (row) =>
      h(FreshnessTimestamp, {
        timestamp: row.lastPing,
        now: now.value,
      }),
  },
  {
    key: 'alarm',
    header: 'Alarm',
    render: (row) =>
      isPingLost(row.lastPing)
        ? h(AlarmIndicator, {
            severity: 'critical',
            label: 'ping lost',
            since: row.lastPing,
            now: now.value,
          })
        : null,
  },
];
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-lg">
    <section>
      <h2 class="text-lg font-bold mb-md">
        Fleet {{ trucks.length }} vehicles
      </h2>
      <DataTable
        :rows="trucks"
        :columns="columns"
        :row-key="(t) => t.id"
        aria-label="Fleet vehicles table"
      />
    </section>

    <aside class="min-h-[500px]">
      <MapView :markers="mapMarkers" />
    </aside>
  </div>
</template>
