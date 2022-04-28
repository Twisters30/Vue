import { createApp } from 'vue';
import App from './App.vue';
import { data, data2 } from './hello';
import greetings from './greetings';

createApp(App).mount('#app');

greetings(data, data2);
