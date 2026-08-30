import type { Meta, StoryObj } from '@storybook/vue3';
import DataTable from './DataTable.vue';

const meta: Meta<typeof DataTable> = {
  component: DataTable,
  title: 'DS/DataTable',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DataTable>;

const users = [
  { id: 'u1', name: 'Alice', score: 92 },
  { id: 'u2', name: 'Bob', score: 71 },
  { id: 'u3', name: 'Carol', score: 88 },
];

const columns = [
  { key: 'id', header: 'ID', width: '80px' },
  { key: 'name', header: 'Name' },
  { key: 'score', header: 'Score', render: (r: (typeof users)[number]) => `${r.score}%` },
];

export const Small: Story = {
  render: () => ({
    components: { DataTable },
    setup: () => ({
      rows: users,
      columns,
      rowKey: (r: (typeof users)[number]) => r.id,
    }),
    template: '<DataTable :rows="rows" :columns="columns" :row-key="rowKey" aria-label="Users" />',
  }),
};

export const LargeVirtualized: Story = {
  render: () => ({
    components: { DataTable },
    setup: () => ({
      rows: Array.from({ length: 10000 }, (_, i) => ({
        id: `u${i}`,
        name: `User ${i}`,
        score: (i * 7) % 100,
      })),
      columns,
      rowKey: (r: { id: string }) => r.id,
    }),
    template:
      '<DataTable :rows="rows" :columns="columns" :row-key="rowKey" aria-label="Users large" />',
  }),
};

export const Empty: Story = {
  render: () => ({
    components: { DataTable },
    setup: () => ({
      rows: [],
      columns,
      rowKey: (r: { id: string }) => r.id,
    }),
    template:
      '<DataTable :rows="rows" :columns="columns" :row-key="rowKey" aria-label="Users empty" />',
  }),
};
