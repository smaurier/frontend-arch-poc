import type { Meta, StoryObj } from '@storybook/vue3';
import FreshnessTimestamp from './FreshnessTimestamp.vue';

const meta: Meta<typeof FreshnessTimestamp> = {
  component: FreshnessTimestamp,
  title: 'DS/FreshnessTimestamp',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FreshnessTimestamp>;

const NOW = Date.now();

export const Fresh: Story = {
  args: { timestamp: NOW - 2000, now: NOW },
  render: (args) => ({
    components: { FreshnessTimestamp },
    setup: () => ({ args }),
    template: '<FreshnessTimestamp v-bind="args" />',
  }),
};

export const Stale: Story = {
  args: { timestamp: NOW - 20_000, now: NOW },
  render: (args) => ({
    components: { FreshnessTimestamp },
    setup: () => ({ args }),
    template: '<FreshnessTimestamp v-bind="args" />',
  }),
};

export const Expired: Story = {
  args: { timestamp: NOW - 45_000, now: NOW },
  render: (args) => ({
    components: { FreshnessTimestamp },
    setup: () => ({ args }),
    template: '<FreshnessTimestamp v-bind="args" />',
  }),
};

export const LiveTicker: Story = {
  args: { timestamp: NOW },
  render: (args) => ({
    components: { FreshnessTimestamp },
    setup: () => ({ args }),
    template: `
      <div>
        <p>Below: no 'now' prop passed → component uses its own ticker.</p>
        <FreshnessTimestamp v-bind="args" />
      </div>
    `,
  }),
};

export const AllStages: Story = {
  render: () => ({
    components: { FreshnessTimestamp },
    template: `
      <div class="flex flex-col gap-sm">
        <div>Fresh: <FreshnessTimestamp :timestamp="${NOW - 2000}" :now="${NOW}" /></div>
        <div>Stale: <FreshnessTimestamp :timestamp="${NOW - 20000}" :now="${NOW}" /></div>
        <div>Expired: <FreshnessTimestamp :timestamp="${NOW - 45000}" :now="${NOW}" /></div>
      </div>
    `,
  }),
};
