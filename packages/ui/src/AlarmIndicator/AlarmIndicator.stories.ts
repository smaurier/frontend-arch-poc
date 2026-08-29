import type { Meta, StoryObj } from '@storybook/vue3';
import AlarmIndicator from './AlarmIndicator.vue';

const meta: Meta<typeof AlarmIndicator> = {
  component: AlarmIndicator,
  title: 'DS/AlarmIndicator',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof AlarmIndicator>;

const NOW = Date.now();

export const Critical: Story = {
  args: { severity: 'critical', label: 'Ping lost' },
  render: (args) => ({
    components: { AlarmIndicator },
    setup: () => ({ args }),
    template: '<AlarmIndicator v-bind="args" />',
  }),
};

export const Warning: Story = {
  args: { severity: 'warning', label: 'Slow ping' },
  render: (args) => ({
    components: { AlarmIndicator },
    setup: () => ({ args }),
    template: '<AlarmIndicator v-bind="args" />',
  }),
};

export const WithFreshness: Story = {
  args: { severity: 'critical', label: 'Ping lost', since: NOW - 45_000, now: NOW },
  render: (args) => ({
    components: { AlarmIndicator },
    setup: () => ({ args }),
    template: '<AlarmIndicator v-bind="args" />',
  }),
};
