import type { VNode } from 'vue';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  width?: string; // CSS width, e.g. '100px' or '1fr'
  render?: (row: T) => VNode | string | number | null | undefined;
}

export interface DataTableProps<T> {
  rows: T[];
  columns: DataTableColumn<T>[];
  rowKey: (row: T) => string;
  estimatedRowHeight?: number;
  ariaLabel?: string;
}
