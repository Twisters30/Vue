import { createApp } from 'vue';
import mitt from 'mitt';
import App from './App.vue';

const eventBus = mitt();
const app = createApp(App);

app.config.globalProperties.eventBus = eventBus;
app.mount('#app');
