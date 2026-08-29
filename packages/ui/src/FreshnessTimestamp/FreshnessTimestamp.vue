<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import type { FreshnessTimestampProps, FreshnessLevel } from './FreshnessTimestamp.types';

const props = withDefaults(defineProps<FreshnessTimestampProps>(), {
  now: undefined,
  staleThreshold: 10_000,
  expiredThreshold: 30_000,
});

// Fallback internal ticker when parent doesn't provide `now`
const internalNow = ref(Date.now());
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  if (props.now === undefined) {
    timer = setInterval(() => {
      internalNow.value = Date.now();
    }, 1000);
  }
});

onUnmounted(() => {
  if (timer !== null) clearInterval(timer);
});

const effectiveNow = computed(() => props.now ?? internalNow.value);
const ageMs = computed(() => effectiveNow.value - props.timestamp);
const ageSec = computed(() => Math.floor(ageMs.value / 1000));

const freshness = computed<FreshnessLevel>(() => {
  if (ageMs.value < props.staleThreshold) return 'fresh';
  if (ageMs.value < props.expiredThreshold) return 'stale';
  return 'expired';
});

const humanAge = computed(() => {
  if (ageSec.value < 2) return 'just now';
  if (ageSec.value < 60) return `${ageSec.value}s ago`;
  const min = Math.floor(ageSec.value / 60);
  return `${min}m ago`;
});

const iso = computed(() => new Date(props.timestamp).toISOString());

const ariaLabel = computed(() => {
  const state =
    freshness.value === 'fresh'
      ? 'fresh data'
      : freshness.value === 'stale'
        ? 'data is stale'
        : 'ping lost, expired data';
  return `${state}, ${ageSec.value} seconds ago`;
});

const freshnessClasses: Record<FreshnessLevel, string> = {
  fresh: 'text-status-ok',
  stale: 'text-status-warning',
  expired: 'text-status-critical font-semibold',
};
</script>

<template>
  <time
    role="time"
    :datetime="iso"
    :data-freshness="freshness"
    :aria-label="ariaLabel"
    :class="['inline-block text-sm tabular-nums', freshnessClasses[freshness]]"
  >
    {{ humanAge }}
  </time>
</template>
