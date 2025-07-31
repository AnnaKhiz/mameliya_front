import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/shared/assets/css/main.css';
import { i18n } from '@/shared/config/i18n';
import FloatingVue from 'floating-vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import App from './App.vue';
import router from './app/router';

const app = createApp(App);
const pinia = createPinia();

app.component('QuillEditor', QuillEditor)
app
  .use(pinia)
  .use(i18n)
  .use(router)
  .use(FloatingVue)
  .mount('#app')

