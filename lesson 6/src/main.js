import { createApp } from 'vue';
import mitt from 'mitt';
import router from './router';
import store from './store';
import App from './App.vue';

const eventBus = mitt();
const app = createApp(App);

app.config.globalProperties.eventBus = eventBus;
app.use(router);
app.use(store);
app.mount('#app');
