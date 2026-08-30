import * as Sentry from '@sentry/vue';
import type { App } from 'vue';

let initialized = false;

export function initSentry(app: App): boolean {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) return false;

  Sentry.init({
    app,
    dsn,
    release: import.meta.env.VITE_APP_VERSION ?? 'dev',
    environment: import.meta.env.MODE,
    integrations: [Sentry.browserTracingIntegration(), Sentry.browserProfilingIntegration()],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,
    tracePropagationTargets: [/^\/api\//],
    sendDefaultPii: false,
  });

  initialized = true;
  return true;
}

export function isSentryEnabled(): boolean {
  return initialized;
}

export function setSentryUser(user: { id: string; email?: string } | null): void {
  if (!initialized) return;
  if (user === null) {
    Sentry.setUser(null);
  } else {
    Sentry.setUser(user.email !== undefined ? { id: user.id, email: user.email } : { id: user.id });
  }
}

export function setSentryTag(key: string, value: string): void {
  if (!initialized) return;
  Sentry.setTag(key, value);
}

export function captureException(err: unknown): void {
  if (!initialized) {
    console.error(err);
    return;
  }
  Sentry.captureException(err);
}

export function captureMessage(msg: string, level: Sentry.SeverityLevel = 'info'): void {
  if (!initialized) return;
  Sentry.captureMessage(msg, level);
}
