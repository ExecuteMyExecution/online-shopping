1、编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误是因为？
--路由跳转有两种形式：声明式导航（router-link）、编程式导航（$router.push）
--声明式的导航没有这类问题，因为vue-router底层已经处理好了

1.1为什么编程式导航进行路由跳转 的时候，会有这类警告错误？
答："vue-router": "^3.6.5"：最新的vue-router引入了promise

1.2通过给push方法传递相应的成功、失败回调函数，可以捕获当前错误，可以解决
this.$router.push({}, () => {}, () => {})
这种写法治标不治本，将来在别的组件当中push|replace，编程式导航还是有类似错误

1.3通过重写底层代码的push方法可以解决（治本）
push是VueRouter类上的一个方法

// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
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


2、Home模块组件拆分
--先把静态页面完成
--拆分出静态组件
--获取服务器的数据进行展示
--动态业务


3、三级联动组件
--由于三级联动，再Home、Search、Detail，把三级联动注册为全局组件
好处：只需注册一次，就可以在项目任意地方使用


4、完成其余静态组件
HTML + CSS + 图片资源 --- 信息【结构、样式、图片资源】


5、postman测试接口
--经过postman工具测试，接口无问题
--如果服务器返回的数据code字段200，代表服务器返回数据成功
--整个项目，接口前缀都有/api字样


6、axios二次封装
XMLHttpRequest、fetch、JQ、axios

6.1为什么需要进行axios二次封装？
请求拦截器：可以在发送请求之前处理一些业务
响应拦截器：可以在数据返回以后处理一些业务

6.2在项目当中经常创建API文件夹放置【axios】
接口当中：路径都带有/api
baseURL："/api"


7、接口统一管理

项目很小：完全可以再组件的生命周期函数中发送请求
项目很大：需要在一个文件中统一管理

7.1跨域问题
什么是跨域：协议、域名、端口号不同的请求，称之为跨域
http://localhost:8080/#/home      --前端项目本地服务器
http://gmall-h5-api.atguigu.cn    --后台服务器

解决方案：JSONP、CROS、代理


8、nprogress进度条的使用
start：进度条开始
done：进度条结束
进度条颜色可以修改，需要修改对应的nprogress.css的样式


9、vuex状态管理库

9.1vuex是什么？
vuex是官方提供的一个插件，状态管理库，集中式管理项目中组件公用的数据
如果项目很小，可以不使用vuex

9.2vuex的使用
// state：仓库存储数据的地方
// mutations：修改state的唯一手段
// actions：处理mutations，可以书写自己的业务逻辑，也可以处理异步，不能修改state，
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
// modules：模块是开发

9.3vuex实现模块式开发
如果项目过大、组件过多、接口过多、数据也很多，可以让vuex实现模块式开发

modules: {
    home: {},
    search: {}
}


10、完成TypeNav三级联动展示数据业务

{
    {
        id: 1,
        name: '电子书',
        child: [
            {id: 11, name: 'xxxx', child: []},
            {}
        ]
    }
}