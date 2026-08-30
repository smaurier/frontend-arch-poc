/* eslint-disable vue/one-component-per-file */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { useSSE } from './useSSE';

class FakeEventSource {
  static instances: FakeEventSource[] = [];
  readonly url: string;
  listeners: Record<string, ((e: unknown) => void)[]> = {};
  constructor(url: string) {
    this.url = url;
    FakeEventSource.instances.push(this);
  }
  addEventListener(name: string, cb: (e: unknown) => void): void {
    (this.listeners[name] ??= []).push(cb);
  }
  removeEventListener(): void {
    /* noop */
  }
  close(): void {
    /* noop */
  }
  emit(name: string, payload: unknown): void {
    (this.listeners[name] ?? []).forEach((cb) => cb(payload));
  }
}

beforeEach(() => {
  FakeEventSource.instances = [];
  (globalThis as unknown as { EventSource: typeof FakeEventSource }).EventSource = FakeEventSource;
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useSSE', () => {
  it('opens an EventSource on mount', () => {
    const Host = defineComponent({
      setup() {
        useSSE({ url: '/events', onEvent: () => {} });
        return () => h('div');
      },
    });
    mount(Host);
    expect(FakeEventSource.instances).toHaveLength(1);
    expect(FakeEventSource.instances[0].url).toBe('/events');
  });

  it('parses JSON events and calls onEvent', () => {
    const onEvent = vi.fn();
    const Host = defineComponent({
      setup() {
        useSSE<{ v: number }>({ url: '/events', eventName: 'ping', onEvent });
        return () => h('div');
      },
    });
    mount(Host);
    const es = FakeEventSource.instances[0];
    es.emit('ping', { data: '{"v":42}' });
    expect(onEvent).toHaveBeenCalledWith({ v: 42 });
  });

  it('reconnects with exponential backoff on error', () => {
    const Host = defineComponent({
      setup() {
        useSSE({ url: '/events', onEvent: () => {}, minBackoffMs: 100, maxBackoffMs: 10_000 });
        return () => h('div');
      },
    });
    mount(Host);
    expect(FakeEventSource.instances).toHaveLength(1);

    FakeEventSource.instances[0].emit('error', {});
    // First backoff attempt: 100 * 2^1 = 200ms
    vi.advanceTimersByTime(250);
    expect(FakeEventSource.instances).toHaveLength(2);

    FakeEventSource.instances[1].emit('error', {});
    // Second attempt: 100 * 2^2 = 400ms
    vi.advanceTimersByTime(500);
    expect(FakeEventSource.instances).toHaveLength(3);
  });
});
