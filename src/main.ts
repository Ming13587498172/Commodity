import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css'

// 完整引入element-plus---------------------------------------
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// createApp(App).use(router).use(ElementPlus).mount('#app')

createApp(App).use(router).mount('#app')

