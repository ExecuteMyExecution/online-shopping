// 配置路由的地方
import Vue from "vue";
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);

// 引入路由组件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

// 先把VueRouter原型对象的push|replace保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace方法
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递那些参数）
// call和apply比较
// 相同点：都可以调用函数一次，并且篡改函数的上下文
// 不同点：call传递的参数用逗号隔开，apply传递的参数是数组形式
// 改变this指向，保证上下文不变
VueRouter.prototype.push = function(location, resolve, reject) {
    if(resolve && reject) {
        originPush.call(this, location, resolve, reject);
    }else {
        originPush.call(this, location, _ => {}, _ => {});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if(resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    }else {
        originReplace.call(this, location, _ => {}, _ => {});
    }
}

// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {show: true}
        }, {
            path: '/search/:keyword?',
            component: Search,
            meta: {show: true},
            name: 'search',
        }, {
            path: '/login',
            component: Login,
            meta: {show: false}
        }, {
            path: '/register',
            component: Register,
            meta: {show: false}
        }, {
            // 重定向
            path: '*',
            redirect: '/home'
        }
    ]
})