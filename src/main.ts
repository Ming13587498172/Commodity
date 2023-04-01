import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/css'
import '@/element'

// //引入element-plus插件
import ElementPlus from 'element-plus'
// //引入element-plus组件样式
// import 'element-plus/dist/index.css'
//引入汉化语言包
import locale from 'element-plus/lib/locale/lang/zh-cn'


// 完整引入element-plus---------------------------------------
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// createApp(App).use(router).use(ElementPlus).mount('#app')

const app = createApp(App)

app.use(router).use(ElementPlus, { locale }).mount('#app')
// createApp(App).use(router).mount('#app')

