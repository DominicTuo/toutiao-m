import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'  //引入全局样式
import Vant from 'vant';  //引入vant
import 'vant/lib/index.css';
import 'amfe-flexible'  //引入lib-flexible动态设置rem的基准值
// 测试day.js,时间格式化处理函数
import '@/utils/dayjs'

Vue.use(Vant);  //挂载Vant

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
