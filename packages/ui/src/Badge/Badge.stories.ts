import type { Meta, StoryObj } from '@storybook/vue3';
import Badge from './Badge.vue';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'DS/Badge',
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['ok', 'warning', 'critical', 'neutral'] },
    label: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Ok: Story = {
  args: { status: 'ok', label: 'Driving' },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args" />',
  }),
};

export const Warning: Story = {
  args: { status: 'warning', label: 'Idle' },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args" />',
  }),
};

export const Critical: Story = {
  args: { status: 'critical', label: 'Stopped' },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args" />',
  }),
};

export const Neutral: Story = {
  args: { status: 'neutral', label: 'Unknown' },
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args" />',
  }),
};

export const AllStatuses: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex gap-md">
        <Badge status="ok" label="Driving" />
        <Badge status="warning" label="Idle" />
        <Badge status="critical" label="Stopped" />
        <Badge status="neutral" label="Unknown" />
      </div>
    `,
  }),
};
