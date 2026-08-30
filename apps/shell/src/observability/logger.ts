import { captureException, captureMessage } from './sentry';

export const logger = {
  debug(...args: unknown[]): void {
    console.debug('[app]', ...args);
  },
  info(msg: string, ...args: unknown[]): void {
    console.info('[app]', msg, ...args);
    captureMessage(msg, 'info');
  },
  warn(msg: string, ...args: unknown[]): void {
    console.warn('[app]', msg, ...args);
    captureMessage(msg, 'warning');
  },
  error(err: unknown, ...args: unknown[]): void {
    console.error('[app]', err, ...args);
    captureException(err);
  },
};
