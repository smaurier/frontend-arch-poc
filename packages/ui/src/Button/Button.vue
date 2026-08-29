<script setup lang="ts">
import type { ButtonProps, ButtonVariant } from './Button.types';

const props = withDefaults(defineProps<ButtonProps>(), {
  disabled: false,
  variant: 'primary',
});

const emit = defineEmits<{
  click: [];
}>();

function handleClick() {
  if (!props.disabled) emit('click');
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-status-ok text-text-primary hover:opacity-90',
  secondary: 'bg-bg-surface text-text-primary border border-border hover:bg-bg-canvas',
};
</script>

<template>
  <button
    :class="[
      'px-md py-sm rounded-md font-medium',
      'transition-opacity',
      variantClasses[variant ?? 'primary'],
      { 'opacity-50 cursor-not-allowed': disabled },
    ]"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
