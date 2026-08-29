import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import FleetTrackingView from './FleetTrackingView.vue';

describe('FleetTrackingView', () => {
  it('renders one row per truck', () => {
    const wrapper = mount(FleetTrackingView);
    const rows = wrapper.findAll('[data-testid="truck-row"]');
    expect(rows.length).toBe(5);
  });

  it('renders an AlarmIndicator for permanent stale trucks', () => {
    const wrapper = mount(FleetTrackingView);
    const alarms = wrapper.findAll('[role="alert"]');
    expect(alarms.length).toBeGreaterThanOrEqual(1);
  });

  it('renders Badge for each truck status', () => {
    const wrapper = mount(FleetTrackingView);
    const badges = wrapper.findAll('[role="status"]');
    expect(badges.length).toBe(5);
  });
});
