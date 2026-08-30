/* eslint-disable vue/one-component-per-file */
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';
import { createI18n } from 'vue-i18n';
import { useLocale } from './useLocale';

const makeI18n = () =>
  createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en: {}, fr: {} },
  });

describe('useLocale', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('exposes availableLocales including en and fr', () => {
    const Host = defineComponent({
      setup() {
        return useLocale();
      },
      template: '<div>{{ availableLocales.join(",") }}</div>',
    });
    const i18n = makeI18n();
    const wrapper = mount(Host, { global: { plugins: [i18n] } });
    expect(wrapper.text()).toContain('en');
    expect(wrapper.text()).toContain('fr');
  });

  it('setLocale changes currentLocale and writes localStorage', async () => {
    const Host = defineComponent({
      setup() {
        return useLocale();
      },
      template: '<button @click="setLocale(\'fr\')">go fr</button><span>{{ currentLocale }}</span>',
    });
    const i18n = makeI18n();
    const wrapper = mount(Host, { global: { plugins: [i18n] } });
    expect(wrapper.text()).toContain('en');
    await wrapper.find('button').trigger('click');
    expect(wrapper.text()).toContain('fr');
    expect(localStorage.getItem('locale')).toBe('fr');
  });
});
