import type { Preview } from '@storybook/vue3';
import '../src/style.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: 'oklch(98% 0.005 260)' },
        { name: 'canvas-dark', value: 'oklch(15% 0.02 260)' },
      ],
    },
  },
};

export default preview;
