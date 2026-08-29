import { ref, watch, onMounted } from 'vue';

export type Theme = 'light' | 'dark';

const stored = (): Theme => {
  try {
    const t = localStorage.getItem('theme');
    return t === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

const theme = ref<Theme>(stored());

export function useTheme() {
  onMounted(() => {
    document.documentElement.setAttribute('data-theme', theme.value);
  });

  watch(theme, (value) => {
    document.documentElement.setAttribute('data-theme', value);
    try {
      localStorage.setItem('theme', value);
    } catch {
      /* localStorage unavailable */
    }
  });

  const toggle = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  return { theme, toggle };
}
