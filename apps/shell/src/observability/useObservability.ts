import { ref } from 'vue';
import { setSentryTag } from './sentry';

function generateSessionId(): string {
  // RFC4122-like v4 approximation using crypto when available.
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `sess-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

const sessionId = ref<string>('');

export function initObservability(): string {
  if (!sessionId.value) {
    sessionId.value = generateSessionId();
    setSentryTag('session_id', sessionId.value);
  }
  return sessionId.value;
}

export function useObservability() {
  return { sessionId };
}
