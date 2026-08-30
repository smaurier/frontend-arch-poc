<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Button } from '@frontend-arch-poc/ui';
import { useAuth } from '../auth/useAuth';

const { t } = useI18n();
const { signIn, loading, error } = useAuth();
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center gap-md p-lg">
    <h1 class="text-lg font-bold">
      {{ t('app.title') }}
    </h1>
    <p class="text-text-muted">
      {{ t('auth.pleaseSignIn') }}
    </p>
    <Button
      variant="primary"
      data-testid="signin-button"
      @click="signIn"
    >
      {{ loading ? t('auth.signingIn') : t('auth.signInWithOidc') }}
    </Button>
    <p
      v-if="error"
      role="alert"
      class="text-status-critical"
    >
      {{ error.message }}
    </p>
  </main>
</template>
