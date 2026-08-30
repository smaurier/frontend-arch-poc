import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FleetTrackingView from './FleetTrackingView.vue';

// Mock Leaflet: happy-dom lacks canvas/geometry APIs Leaflet requires.
vi.mock('leaflet', () => {
  const chainable = {
    addTo: vi.fn().mockReturnThis(),
    setView: vi.fn().mockReturnThis(),
    remove: vi.fn(),
    bindPopup: vi.fn().mockReturnThis(),
  };
  return {
    default: {
      map: vi.fn(() => chainable),
      tileLayer: vi.fn(() => chainable),
      marker: vi.fn(() => chainable),
      divIcon: vi.fn(() => ({})),
      Icon: { Default: { prototype: {}, mergeOptions: vi.fn() } },
    },
    map: vi.fn(() => chainable),
    tileLayer: vi.fn(() => chainable),
    marker: vi.fn(() => chainable),
    divIcon: vi.fn(() => ({})),
    Icon: { Default: { prototype: {}, mergeOptions: vi.fn() } },
  };
});

describe('FleetTrackingView', () => {
  it('renders one row per truck', () => {
    const wrapper = mount(FleetTrackingView);
    const rows = wrapper.findAll('[data-testid="datatable-row"]');
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

  it('renders the map container', () => {
    const wrapper = mount(FleetTrackingView);
    expect(wrapper.find('[data-testid="map-container"]').exists()).toBe(true);
  });
});
