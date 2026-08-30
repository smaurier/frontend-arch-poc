<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { Layout, Button } from '@frontend-arch-poc/ui';
import FleetTrackingView from './views/FleetTrackingView.vue';
import { useTheme } from './composables/useTheme';
import { useLocale } from './composables/useLocale';

const { t } = useI18n();
const { theme, toggle } = useTheme();
const { currentLocale, setLocale, availableLocales } = useLocale();

watchEffect(() => {
  document.documentElement.setAttribute('lang', currentLocale.value);
});

const themeToggleLabel = computed(() =>
  t('app.themeToggle', {
    mode: theme.value === 'light' ? t('app.themeDark') : t('app.themeLight'),
  }),
);
</script>

<template>
  <Layout>
    <template #header>
      <h1 class="text-lg font-bold">
        {{ t('app.title') }}
      </h1>
      <div class="flex items-center gap-sm">
        <label class="flex items-center gap-xs text-sm">
          <span class="sr-only">{{ t('app.localeSwitcher') }}</span>
          <select
            :value="currentLocale"
            :aria-label="t('app.localeSwitcher')"
            class="bg-bg-surface border border-border rounded-sm px-sm py-xs text-sm"
            data-testid="locale-switcher"
            @change="(e) => setLocale((e.target as HTMLSelectElement).value as 'en' | 'fr')"
          >
            <option
              v-for="l in availableLocales"
              :key="l"
              :value="l"
            >
              {{ l.toUpperCase() }}
            </option>
          </select>
        </label>
        <Button
          variant="secondary"
          :aria-label="themeToggleLabel"
          @click="toggle"
        >
          {{ theme === 'light' ? '🌙' : '☀️' }}
        </Button>
      </div>
    </template>
    <template #nav>
      <ul class="space-y-sm text-text-muted">
        <li class="text-text-primary font-medium">
          {{ t('nav.fleet') }}
        </li>
        <li>{{ t('nav.trips') }}</li>
        <li>{{ t('nav.alerts') }}</li>
      </ul>
    </template>
    <FleetTrackingView />
  </Layout>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
