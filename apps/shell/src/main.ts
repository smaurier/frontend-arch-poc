import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from './i18n';
import { startMockUpdates } from './mocks/trucks-data';
import './style.css';

createApp(App).use(i18n).mount('#app');

startMockUpdates(2000);
