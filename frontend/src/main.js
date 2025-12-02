import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueMask from '@devindex/vue-mask'

import 'reset-css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(VueMask);
app.use(createPinia())
app.use(router)

app.mount('#app')
