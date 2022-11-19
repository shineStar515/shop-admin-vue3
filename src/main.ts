import { createApp } from 'vue';

import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';
import 'normalize.css'
import 'nprogress/nprogress.css'
import pinia from '@/stores'
import App from './App.vue';
import router from './router';

const app = createApp(App);
Object.keys(Icons).forEach(key => {
	app.component(key, Icons[key as keyof typeof Icons]);
});
app.use(pinia);
app.use(router);

app.mount('#app');
