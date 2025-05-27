import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/shared/assets/css/tailwind.css';

import App from './App.vue'
import router from './app/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
