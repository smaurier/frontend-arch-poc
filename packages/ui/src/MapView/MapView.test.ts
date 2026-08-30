import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MapView from './MapView.vue';

// Mock Leaflet since happy-dom lacks canvas/geometry APIs Leaflet expects.
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

describe('MapView', () => {
  const sampleMarkers = [
    { id: 'T1', lat: 45.75, lng: 4.83, label: 'Truck 1' },
    { id: 'T2', lat: 45.76, lng: 4.84, label: 'Truck 2' },
  ];

  it('renders a container div for the map', () => {
    const wrapper = mount(MapView, { props: { markers: sampleMarkers } });
    expect(wrapper.find('[data-testid="map-container"]').exists()).toBe(true);
  });

  it('has role="region" and aria-label for a11y', () => {
    const wrapper = mount(MapView, { props: { markers: sampleMarkers } });
    const container = wrapper.find('[data-testid="map-container"]');
    expect(container.attributes('role')).toBe('region');
    expect(container.attributes('aria-label')).toContain('map');
  });

  it('accepts custom center and zoom props', () => {
    const wrapper = mount(MapView, {
      props: { markers: sampleMarkers, center: [45.75, 4.83], zoom: 12 },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
