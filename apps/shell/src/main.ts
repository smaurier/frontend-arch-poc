import { createApp } from 'vue';
import App from './App.vue';
import { startMockUpdates } from './mocks/trucks-data';
import './style.css';

createApp(App).mount('#app');

// Start realtime mock ONLY after mount, not at import time.
startMockUpdates(2000);
