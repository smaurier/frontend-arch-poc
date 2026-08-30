import type { Meta, StoryObj } from '@storybook/vue3';
import MapView from './MapView.vue';

const meta: Meta<typeof MapView> = {
  component: MapView,
  title: 'DS/MapView',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof MapView>;

const sampleMarkers = [
  { id: 'TRUCK-01', lat: 45.7578, lng: 4.832, label: 'A. Martin', status: 'ok' as const },
  { id: 'TRUCK-02', lat: 45.762, lng: 4.845, label: 'B. Lopez', status: 'warning' as const },
  { id: 'TRUCK-03', lat: 45.745, lng: 4.825, label: 'C. Chen', status: 'ok' as const },
  { id: 'TRUCK-04', lat: 45.77, lng: 4.815, label: "D. N'Guyen", status: 'critical' as const },
  { id: 'TRUCK-05', lat: 45.752, lng: 4.85, label: 'E. Rossi', status: 'ok' as const },
];

export const LyonCenter: Story = {
  args: { markers: sampleMarkers },
  render: (args) => ({
    components: { MapView },
    setup: () => ({ args }),
    template: '<div style="height:500px;"><MapView v-bind="args" /></div>',
  }),
};

export const SingleMarker: Story = {
  args: { markers: [sampleMarkers[0]] },
  render: (args) => ({
    components: { MapView },
    setup: () => ({ args }),
    template: '<div style="height:400px;"><MapView v-bind="args" /></div>',
  }),
};
