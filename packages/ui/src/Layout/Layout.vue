<script setup lang="ts"></script>

<template>
  <div class="min-h-screen grid grid-cols-[240px_1fr] grid-rows-[64px_1fr]">
    <header
      class="col-span-2 flex items-center justify-between px-lg border-b border-border bg-bg-surface"
    >
      <slot name="header" />
    </header>
    <nav class="row-start-2 border-r border-border bg-bg-surface p-md">
      <slot name="nav" />
    </nav>
    <main class="row-start-2 col-start-2 p-lg overflow-auto">
      <slot />
    </main>
  </div>
</template>
