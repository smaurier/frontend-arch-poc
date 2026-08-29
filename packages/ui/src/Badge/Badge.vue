<script setup lang="ts">
import { computed } from 'vue';
import type { BadgeProps } from './Badge.types';

const props = defineProps<BadgeProps>();

const statusClasses: Record<BadgeProps['status'], string> = {
  ok: 'bg-status-ok text-text-primary',
  warning: 'bg-status-warning text-text-primary',
  critical: 'bg-status-critical text-white',
  neutral: 'bg-bg-surface text-text-muted border border-border',
};

const ariaLabel = computed(() => `${props.status} — ${props.label}`);
</script>

<template>
  <span
    role="status"
    :aria-label="ariaLabel"
    :class="[
      'inline-flex items-center gap-xs px-sm py-xs rounded-sm text-sm font-medium uppercase tracking-wide',
      statusClasses[status],
    ]"
  >
    {{ label }}
  </span>
</template>
