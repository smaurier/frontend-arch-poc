import { createI18n } from 'vue-i18n';
import en from './messages/en.json';
import fr from './messages/fr.json';

export type AppLocale = 'en' | 'fr';

export const availableLocales: AppLocale[] = ['en', 'fr'];

const stored = (): AppLocale => {
  try {
    const t = localStorage.getItem('locale');
    return t === 'fr' ? 'fr' : 'en';
  } catch {
    return 'en';
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: stored(),
  fallbackLocale: 'en',
  messages: { en, fr },
});
