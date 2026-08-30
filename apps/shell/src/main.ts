import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './i18n';
import { startTrucksSource } from './data/trucks-source';
import { initSentry } from './observability/sentry';
import { initObservability } from './observability/useObservability';
import { logger } from './observability/logger';
import './style.css';

const app = createApp(App);

// Feature-flagged. Silent no-op if VITE_SENTRY_DSN is not set.
const sentryOn = initSentry(app);
initObservability();

app.use(i18n).mount('#app');

if (sentryOn) {
  logger.info('sentry initialized');
}

startTrucksSource(2000);
