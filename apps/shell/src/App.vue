<script setup lang="ts">
import { Layout, Button } from '@frontend-arch-poc/ui';
import FleetTrackingView from './views/FleetTrackingView.vue';
import { useTheme } from './composables/useTheme';

const { theme, toggle } = useTheme();
</script>

<template>
  <Layout>
    <template #header>
      <h1 class="text-lg font-bold">
        Fleet Tracker
      </h1>
      <Button
        variant="secondary"
        :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`"
        @click="toggle"
      >
        {{ theme === 'light' ? '🌙' : '☀️' }}
      </Button>
    </template>
    <template #nav>
      <ul class="space-y-sm text-text-muted">
        <li class="text-text-primary font-medium">
          &#9658; Fleet
        </li>
        <li>&#9658; Trips</li>
        <li>&#9658; Alerts</li>
      </ul>
    </template>
    <FleetTrackingView />
  </Layout>
</template>
