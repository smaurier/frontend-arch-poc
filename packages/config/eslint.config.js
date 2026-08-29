import eslintPluginVue from 'eslint-plugin-vue';
import vueTypescriptConfig from '@vue/eslint-config-typescript';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/storybook-static/**', '**/playwright-report/**', '**/test-results/**', '**/.turbo/**', '**/coverage/**'],
  },
  ...eslintPluginVue.configs['flat/recommended'],
  ...vueTypescriptConfig(),
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
          message: 'No hardcoded hex colors. Use semantic tokens from packages/tokens.',
        },
        {
          selector: "TemplateElement[value.raw=/\\b\\d+px\\b/]",
          message: 'No hardcoded px values. Use spacing tokens from packages/tokens.',
        },
      ],
    },
  },
];
