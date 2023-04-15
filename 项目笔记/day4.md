复习
1）商品分类的三级列表由静态变为动态模式【获取服务器数据：解决跨域问题】
2）函数的防抖和节流【面试频率很高】
3）路由跳转：声明式导航（router-link）、编程式导航
编程式导航解决问题：使用自定义属性


1、开发Search模块中的TypeNav商品分类菜单（过渡动画效果）
过渡动画前提：组件或元素务必要有v-if|v-show指令才可以产生过渡动画

2、对商品分类三级列表数据的获取进行优化
在App根组件当中发送请求【根组件mounted】执行一次

3、合并params和query参数

4、开发Home当中的ListContainer组件与Floor组件
注意：服务器返回的数据（接口）只有商品分类菜单数据，对于ListContainer组件和Floor组件数据，服务器没有提供
mock（模拟）数据：需要安装mockjs库

使用步骤：
1）在项目中src文件夹中创建mock文件夹
2）第二步准备JSON数据（在mock文件夹中创建相应的JSON文件）--需要格式化
3）把mock数据需要的图片放置到public文件夹中【public文件夹在打包的时候，会把相应的资源原封不动地打包到dist文件夹】
4）创建mockServer.js，通过mockjs插件实现数据模拟
5）mockServer.js文件在入口文件（main.js）中引入（至少执行一次，才能模拟数据）


5、swiper轮播图
第一步：引导（引入JS和CSS）
第二步：布局页面结构
第三步：new Swiper实例【轮播图添加动态效果】