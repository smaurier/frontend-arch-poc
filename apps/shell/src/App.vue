<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { Layout, Button } from '@frontend-arch-poc/ui';
import FleetTrackingView from './views/FleetTrackingView.vue';
import LoginView from './views/LoginView.vue';
import CallbackView from './views/CallbackView.vue';
import { useTheme } from './composables/useTheme';
import { useLocale } from './composables/useLocale';
import { useAuth } from './auth/useAuth';

const { t } = useI18n();
const { theme, toggle } = useTheme();
const { currentLocale, setLocale, availableLocales } = useLocale();

const authEnabled = import.meta.env.VITE_AUTH_ENABLED === 'true';
const auth = useAuth();

const isCallback = computed(() => window.location.pathname === '/callback');

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
  <CallbackView v-if="authEnabled && isCallback" />
  <LoginView v-else-if="authEnabled && !auth.isAuthenticated.value" />
  <Layout v-else>
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
        <Button
          v-if="authEnabled && auth.isAuthenticated.value"
          variant="secondary"
          :aria-label="t('auth.signOut')"
          data-testid="signout-button"
          @click="auth.signOut"
        >
          {{ t('auth.signOut') }}
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
