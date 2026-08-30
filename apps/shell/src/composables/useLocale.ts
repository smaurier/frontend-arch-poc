import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { AppLocale } from '../i18n';
import { availableLocales } from '../i18n';

export function useLocale() {
  const { locale } = useI18n();

  const currentLocale = computed<AppLocale>(() => locale.value as AppLocale);

  function setLocale(next: AppLocale) {
    locale.value = next;
    try {
      localStorage.setItem('locale', next);
    } catch {
      /* localStorage unavailable */
    }
  }

  return { currentLocale, setLocale, availableLocales };
}
