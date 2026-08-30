<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuth } from '../auth/useAuth';

const { handleCallback } = useAuth();

onMounted(handleCallback);
</script>

<template>
  <main class="min-h-screen flex items-center justify-center">
    <p class="text-text-muted">
      Signing you in...
    </p>
  </main>
</template>
