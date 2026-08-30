<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed, ref, h, type VNode } from 'vue';
import { useVirtualizer } from '@tanstack/vue-virtual';
import type { DataTableProps } from './DataTable.types';

const props = withDefaults(defineProps<DataTableProps<T>>(), {
  estimatedRowHeight: 40,
});

const parentRef = ref<HTMLDivElement | null>(null);

const rowVirtualizer = useVirtualizer(
  computed(() => ({
    count: props.rows.length,
    getScrollElement: () => parentRef.value,
    estimateSize: () => props.estimatedRowHeight,
    overscan: 8,
  })),
);

const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());
const totalSize = computed(() => rowVirtualizer.value.getTotalSize());

// Option A fallback: happy-dom / JSDOM don't compute layout so the virtualizer
// returns 0 items. If that happens, synthesize virtual items for all rows so
// unit tests stay meaningful.
const rowsToRender = computed(() => {
  if (virtualRows.value.length > 0) return virtualRows.value;
  return props.rows.map((_, i) => ({
    index: i,
    start: i * props.estimatedRowHeight,
    size: props.estimatedRowHeight,
    key: i,
  }));
});

const gridCols = computed(() => props.columns.map((c) => c.width ?? '1fr').join(' '));

function getRow(index: number): T {
  const row = props.rows[index];
  if (row === undefined) throw new Error(`Row at index ${index} is undefined`);
  return row;
}

function renderCell(row: T, col: (typeof props.columns)[number]): VNode | string {
  if (col.render) {
    const result = col.render(row);
    if (result === null || result === undefined) return '';
    // If it's a VNode (object with __v_isVNode), return as-is for <component :is>
    if (typeof result === 'object') return result as VNode;
    // String or number — render as text
    return String(result);
  }
  const val = row[col.key];
  return val === null || val === undefined ? '' : String(val);
}
</script>

<template>
  <div
    role="table"
    :aria-label="ariaLabel"
    class="rounded-md border border-border overflow-hidden bg-bg-surface"
  >
    <!-- Header -->
    <div
      role="row"
      class="grid gap-md px-md py-sm bg-bg-canvas border-b border-border font-semibold text-sm text-text-muted"
      :style="{ gridTemplateColumns: gridCols }"
    >
      <div
        v-for="col in columns"
        :key="col.key"
        role="columnheader"
      >
        {{ col.header }}
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="rows.length === 0"
      class="p-lg text-center text-text-muted"
    >
      No data
    </div>

    <!-- Virtualized body -->
    <div
      v-else
      ref="parentRef"
      class="overflow-auto max-h-[500px]"
      role="rowgroup"
    >
      <div :style="{ height: `${totalSize}px`, position: 'relative', width: '100%' }">
        <div
          v-for="vRow in rowsToRender"
          :key="rowKey(getRow(vRow.index))"
          data-testid="datatable-row"
          role="row"
          class="grid gap-md px-md py-sm border-b border-border items-center absolute top-0 left-0 w-full"
          :style="{
            height: `${vRow.size}px`,
            transform: `translateY(${vRow.start}px)`,
            gridTemplateColumns: gridCols,
          }"
        >
          <div
            v-for="col in columns"
            :key="col.key"
            role="cell"
            class="truncate"
          >
            <component
              :is="
                typeof renderCell(getRow(vRow.index), col) === 'string'
                  ? () => h('span', renderCell(getRow(vRow.index), col))
                  : renderCell(getRow(vRow.index), col)
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
