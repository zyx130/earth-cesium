import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入elementUl
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/element-variables.scss'
Vue.use(ElementUI);

//引入video.js
import "video.js/dist/video-js.css";
import "videojs-flash";
import video from "video.js";
Vue.prototype.$video = video;

// 引入全局样式
import './style/index.scss'

//引入echarts
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

//引入全局方法
import globalFunction from "@/lib/glFun.js";
Vue.prototype.$gf = globalFunction;

// 引入全局过滤器
import filters from '@/lib/glFilter.js'
let filter = filters
for (const key in filter) {
  Vue.filter(key, filter[key])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
