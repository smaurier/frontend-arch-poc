<script setup lang="ts">
import { computed } from 'vue';
import FreshnessTimestamp from '../FreshnessTimestamp/FreshnessTimestamp.vue';
import type { AlarmIndicatorProps } from './AlarmIndicator.types';

const props = defineProps<AlarmIndicatorProps>();

const severityClasses = {
  critical: 'bg-status-critical text-white',
  warning: 'bg-status-warning text-text-primary',
};

const ariaLabel = computed(() => `${props.severity} alarm: ${props.label}`);
</script>

<template>
  <div
    role="alert"
    :data-severity="severity"
    :aria-label="ariaLabel"
    :class="[
      'inline-flex items-center gap-sm px-sm py-xs rounded-sm text-sm font-medium',
      severityClasses[severity],
    ]"
  >
    <span aria-hidden="true">⚠</span>
    <span>{{ label }}</span>
    <FreshnessTimestamp
      v-if="since !== undefined"
      :timestamp="since"
      v-bind="now !== undefined ? { now } : {}"
      class="opacity-90"
    />
  </div>
</template>
