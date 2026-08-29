import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FreshnessTimestamp from './FreshnessTimestamp.vue';

describe('FreshnessTimestamp', () => {
  const FIXED_NOW = 1_700_000_000_000; // fixed ms epoch

  it('renders "just now" when timestamp is < 2s old', () => {
    const wrapper = mount(FreshnessTimestamp, {
      props: { timestamp: FIXED_NOW - 500, now: FIXED_NOW },
    });
    expect(wrapper.text()).toMatch(/just now|0s ago/i);
  });

  it('renders seconds ago when < 60s', () => {
    const wrapper = mount(FreshnessTimestamp, {
      props: { timestamp: FIXED_NOW - 15_000, now: FIXED_NOW },
    });
    expect(wrapper.text()).toMatch(/15s ago/);
  });

  it('marks as fresh when < 10s', () => {
    const wrapper = mount(FreshnessTimestamp, {
      props: { timestamp: FIXED_NOW - 5_000, now: FIXED_NOW },
    });
    expect(wrapper.attributes('data-freshness')).toBe('fresh');
  });

  it('marks as stale when 10-30s', () => {
    const wrapper = mount(FreshnessTimestamp, {
      props: { timestamp: FIXED_NOW - 20_000, now: FIXED_NOW },
    });
    expect(wrapper.attributes('data-freshness')).toBe('stale');
  });

  it('marks as expired when > 30s', () => {
    const wrapper = mount(FreshnessTimestamp, {
      props: { timestamp: FIXED_NOW - 45_000, now: FIXED_NOW },
    });
    expect(wrapper.attributes('data-freshness')).toBe('expired');
  });

  it('has role="time" for a11y', () => {
    const wrapper = mount(FreshnessTimestamp, {
      props: { timestamp: FIXED_NOW - 5_000, now: FIXED_NOW },
    });
    expect(wrapper.attributes('role')).toBe('time');
  });

  it('exposes datetime attribute for machine readability', () => {
    const wrapper = mount(FreshnessTimestamp, {
      props: { timestamp: FIXED_NOW - 5_000, now: FIXED_NOW },
    });
    expect(wrapper.attributes('datetime')).toBeDefined();
  });

  it('respects custom staleThreshold', () => {
    const wrapper = mount(FreshnessTimestamp, {
      props: { timestamp: FIXED_NOW - 5_000, now: FIXED_NOW, staleThreshold: 3_000 },
    });
    expect(wrapper.attributes('data-freshness')).toBe('stale');
  });

  it('exposes accessible aria-label describing freshness', () => {
    const wrapper = mount(FreshnessTimestamp, {
      props: { timestamp: FIXED_NOW - 45_000, now: FIXED_NOW },
    });
    expect(wrapper.attributes('aria-label')).toMatch(/expired|ping lost|45/i);
  });
});
