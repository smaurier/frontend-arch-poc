<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const sidebarOpen = ref(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

function closeSidebar() {
  sidebarOpen.value = false;
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && sidebarOpen.value) closeSidebar();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div class="min-h-screen grid grid-rows-[64px_1fr] md:grid-cols-[240px_1fr]">
    <header
      class="md:col-span-2 flex items-center justify-between px-lg border-b border-border bg-bg-surface"
    >
      <div class="flex items-center gap-md">
        <button
          type="button"
          class="md:hidden p-sm rounded-sm hover:bg-bg-canvas"
          :aria-label="sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'"
          :aria-expanded="sidebarOpen"
          aria-controls="app-sidebar"
          data-testid="burger-button"
          @click="toggleSidebar"
        >
          <span aria-hidden="true">{{ sidebarOpen ? '✕' : '☰' }}</span>
        </button>
        <slot name="header" />
      </div>
    </header>

    <!-- Backdrop (mobile only, visible when sidebar open) -->
    <div
      v-if="sidebarOpen"
      class="md:hidden fixed inset-0 top-[64px] bg-black/40 z-10"
      aria-hidden="true"
      data-testid="sidebar-backdrop"
      @click="closeSidebar"
    />

    <nav
      id="app-sidebar"
      class="row-start-2 md:col-start-1 border-r border-border bg-bg-surface p-md z-20 fixed md:static top-[64px] left-0 bottom-0 w-[240px] transition-transform duration-200 md:transition-none"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
      :aria-hidden="!sidebarOpen && undefined"
    >
      <slot name="nav" />
    </nav>

    <main class="row-start-2 md:col-start-2 p-lg overflow-auto">
      <slot />
    </main>
  </div>
</template>
