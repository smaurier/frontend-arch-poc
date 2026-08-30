<script setup lang="ts">
import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
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

const { t } = useI18n();
const { now } = useFreshnessTicker(1000);

const statusInfo: Record<
  TruckStatus,
  { badgeStatus: 'ok' | 'warning' | 'critical' | 'neutral'; labelKey: string }
> = {
  driving: { badgeStatus: 'ok', labelKey: 'truck.status.driving' },
  idle: { badgeStatus: 'warning', labelKey: 'truck.status.idle' },
  stopped: { badgeStatus: 'critical', labelKey: 'truck.status.stopped' },
};

function isPingLost(lastPing: number): boolean {
  return now.value - lastPing > 30_000;
}

const mapMarkers = computed<MapMarker[]>(() =>
  trucks.value.map((row) => ({
    id: row.id,
    lat: row.lat,
    lng: row.lng,
    label: row.driver,
    status: isPingLost(row.lastPing)
      ? 'critical'
      : statusInfo[row.status].badgeStatus === 'critical'
        ? 'critical'
        : statusInfo[row.status].badgeStatus === 'warning'
          ? 'warning'
          : 'ok',
  })),
);

const columns = computed<DataTableColumn<(typeof trucks.value)[number]>[]>(() => [
  { key: 'id', header: t('fleet.columns.id'), width: '100px' },
  { key: 'driver', header: t('fleet.columns.driver'), width: '140px' },
  {
    key: 'status',
    header: t('fleet.columns.status'),
    width: '100px',
    render: (row) =>
      h(Badge, {
        status: statusInfo[row.status].badgeStatus,
        label: t(statusInfo[row.status].labelKey),
      }),
  },
  {
    key: 'lastPing',
    header: t('fleet.columns.lastPing'),
    width: '100px',
    render: (row) =>
      h(FreshnessTimestamp, {
        timestamp: row.lastPing,
        now: now.value,
      }),
  },
  {
    key: 'alarm',
    header: t('fleet.columns.alarm'),
    render: (row) =>
      isPingLost(row.lastPing)
        ? h(AlarmIndicator, {
            severity: 'critical',
            label: t('alarm.pingLost'),
            since: row.lastPing,
            now: now.value,
          })
        : null,
  },
]);
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-lg">
    <section>
      <h2 class="text-lg font-bold mb-md">
        {{ t('fleet.sectionTitle', { count: trucks.length }) }}
      </h2>
      <DataTable
        :rows="trucks"
        :columns="columns"
        :row-key="(t) => t.id"
        :aria-label="t('fleet.sectionTitle', { count: trucks.length })"
      />
    </section>

    <aside class="min-h-[500px]">
      <MapView :markers="mapMarkers" />
    </aside>
  </div>
</template>
