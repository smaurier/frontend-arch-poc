import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import { applySseMiddleware } from './src/dev/sse-middleware';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'fap-sse-dev',
      configureServer(server) {
        applySseMiddleware(server);
      },
      configurePreviewServer() {
        // Not registering on preview - previews should not open unbounded event streams
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
