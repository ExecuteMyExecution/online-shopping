import Vue from 'vue';
import App from './App.vue';
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
// 第一个参数：全局组件名字；第二个参数：组件实例
Vue.component(TypeNav.name, TypeNav);
// 轮播图全局组件
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name, Carousel);
// 引入仓库
import store from './store';
// 引入路由
import router from './router';
// 引入mock数据
import '@/mock/mockServer';
// 引入swiper样式
import 'swiper/css/swiper.min.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  // 注册路由
  router,
  // 注册仓库：组件实例身上会多出一个$store属性
  store,
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
