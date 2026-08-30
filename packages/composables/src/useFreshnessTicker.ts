import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export interface FreshnessTicker {
  now: Ref<number>;
}

/**
 * Returns a reactive `now` timestamp that ticks every `intervalMs`.
 * Cleans up its interval on unmount.
 */
export function useFreshnessTicker(intervalMs = 1000): FreshnessTicker {
  const now = ref(Date.now());
  let timer: ReturnType<typeof setInterval> | null = null;

  onMounted(() => {
    timer = setInterval(() => {
      now.value = Date.now();
    }, intervalMs);
  });

  onUnmounted(() => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  });

  return { now };
}
