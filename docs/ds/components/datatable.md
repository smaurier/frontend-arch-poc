# DataTable

Generic virtualized table for lists of any shape.

## Import

```ts
import { DataTable, type DataTableColumn } from '@frontend-arch-poc/ui';
```

## Basic usage

```vue
<script setup lang="ts">
import { h } from 'vue';
import { Badge } from '@frontend-arch-poc/ui';
import type { DataTableColumn } from '@frontend-arch-poc/ui';

interface User {
  id: string;
  name: string;
  status: 'ok' | 'warning' | 'critical';
}

const rows: User[] = [
  { id: 'u1', name: 'Alice', status: 'ok' },
  { id: 'u2', name: 'Bob', status: 'warning' },
];

const columns: DataTableColumn<User>[] = [
  { key: 'id', header: 'ID', width: '100px' },
  { key: 'name', header: 'Name' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => h(Badge, { status: row.status, label: row.status }),
  },
];
</script>

<template>
  <DataTable :rows="rows" :columns="columns" :row-key="(r) => r.id" aria-label="Users" />
</template>
```

## API

| Prop                 | Type                   | Description          |
| -------------------- | ---------------------- | -------------------- |
| `rows`               | `T[]`                  | Data                 |
| `columns`            | `DataTableColumn<T>[]` | Column config        |
| `rowKey`             | `(row: T) => string`   | Stable key extractor |
| `estimatedRowHeight` | `number`               | Default 40           |
| `ariaLabel`          | `string`               | Accessible name      |

## Virtualization

Uses `@tanstack/vue-virtual`. Even with 10 000 rows, only the visible viewport is rendered.
