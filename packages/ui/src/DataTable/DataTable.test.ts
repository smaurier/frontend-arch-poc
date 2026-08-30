import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DataTable from './DataTable.vue';
import type { DataTableColumn } from './DataTable.types';

interface Row {
  id: string;
  name: string;
  score: number;
}

const rows: Row[] = [
  { id: 'r1', name: 'Alice', score: 92 },
  { id: 'r2', name: 'Bob', score: 71 },
  { id: 'r3', name: 'Carol', score: 88 },
];

const columns: DataTableColumn<Row>[] = [
  { key: 'id', header: 'ID', width: '80px' },
  { key: 'name', header: 'Name' },
  { key: 'score', header: 'Score', render: (r) => `${r.score}%` },
];

describe('DataTable', () => {
  it('renders one row per data item', () => {
    const wrapper = mount(DataTable, {
      props: { rows, columns, rowKey: (r: Row) => r.id },
    });
    const rowNodes = wrapper.findAll('[data-testid="datatable-row"]');
    expect(rowNodes.length).toBe(3);
  });

  it('renders column headers', () => {
    const wrapper = mount(DataTable, {
      props: { rows, columns, rowKey: (r: Row) => r.id },
    });
    expect(wrapper.text()).toContain('ID');
    expect(wrapper.text()).toContain('Name');
    expect(wrapper.text()).toContain('Score');
  });

  it('uses render function for custom cells', () => {
    const wrapper = mount(DataTable, {
      props: { rows, columns, rowKey: (r: Row) => r.id },
    });
    expect(wrapper.text()).toContain('92%');
  });

  it('falls back to key lookup when render absent', () => {
    const wrapper = mount(DataTable, {
      props: { rows, columns, rowKey: (r: Row) => r.id },
    });
    expect(wrapper.text()).toContain('Alice');
  });

  it('has role="table" for a11y', () => {
    const wrapper = mount(DataTable, {
      props: { rows, columns, rowKey: (r: Row) => r.id },
    });
    expect(wrapper.find('[role="table"]').exists()).toBe(true);
  });

  it('exposes aria-label when provided', () => {
    const wrapper = mount(DataTable, {
      props: { rows, columns, rowKey: (r: Row) => r.id, ariaLabel: 'Users' },
    });
    expect(wrapper.find('[role="table"]').attributes('aria-label')).toBe('Users');
  });

  it('renders empty state when rows is empty', () => {
    const wrapper = mount(DataTable, {
      props: { rows: [], columns, rowKey: (r: Row) => r.id },
    });
    expect(wrapper.text()).toContain('No data');
  });
});
