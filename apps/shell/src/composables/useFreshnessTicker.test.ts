/* eslint-disable vue/one-component-per-file */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { useFreshnessTicker } from './useFreshnessTicker';

describe('useFreshnessTicker', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('exposes now as reactive number', () => {
    const HostComponent = defineComponent({
      setup() {
        const { now } = useFreshnessTicker(1000);
        return { now };
      },
      template: '<div>{{ now }}</div>',
    });

    const wrapper = mount(HostComponent);
    expect(typeof wrapper.vm.now).toBe('number');
  });

  it('updates now on each tick', async () => {
    const HostComponent = defineComponent({
      setup() {
        const { now } = useFreshnessTicker(1000);
        return { now };
      },
      template: '<div>{{ now }}</div>',
    });

    const wrapper = mount(HostComponent);
    const initialNow = wrapper.vm.now;
    vi.advanceTimersByTime(1500);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.now).toBeGreaterThan(initialNow);
  });

  it('cleans up interval on unmount', async () => {
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    const HostComponent = defineComponent({
      setup() {
        const { now } = useFreshnessTicker(1000);
        return { now };
      },
      template: '<div>{{ now }}</div>',
    });

    const wrapper = mount(HostComponent);
    wrapper.unmount();
    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
