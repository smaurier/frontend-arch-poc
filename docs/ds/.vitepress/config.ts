import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'frontend-arch-poc DS',
  description: 'Design system reference for real-time fleet tracking dashboards',
  cleanUrls: true,
  themeConfig: {
    logo: undefined,
    nav: [
      { text: 'Guide', link: '/getting-started' },
      { text: 'Tokens', link: '/tokens' },
      { text: 'Components', link: '/components/' },
      { text: 'Theming', link: '/theming' },
      { text: 'Storybook', link: 'https://frontend-arch-poc-storybook.netlify.app' },
      { text: 'App demo', link: 'https://frontend-arch-poc-shell.netlify.app' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Getting started',
          items: [
            { text: 'Install', link: '/getting-started' },
            { text: 'Design tokens', link: '/tokens' },
            { text: 'Theming', link: '/theming' },
          ],
        },
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/' },
            { text: 'Button', link: '/components/button' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'FreshnessTimestamp', link: '/components/freshness-timestamp' },
            { text: 'AlarmIndicator', link: '/components/alarm-indicator' },
            { text: 'Layout', link: '/components/layout' },
            { text: 'MapView', link: '/components/mapview' },
            { text: 'DataTable', link: '/components/datatable' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/smaurier/frontend-arch-poc' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright (c) 2026 Sylvain Maurier',
    },
    search: { provider: 'local' },
  },
});
