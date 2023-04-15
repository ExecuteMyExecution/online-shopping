1、vue-cli脚手架初始化项目：vue create [your project name]
node + webpack + 镜像

项目原始文件：

node_modules文件夹：项目依赖文件夹

public文件夹：一般放置一些静态资源（图片）
需要注意，放在publice文件夹中的静态资源，webpack进行打包时，会原封不动打包到dist文件夹中

src文件夹（程序员源代码文件夹）

    assets文件夹：一般放置静态资源（放置多个组件公用的静态资源）
    需要注意，放置在assets文件夹里面的静态资源，在webpack打包的时候，会被当作一个模块，打包到JS文件里面

    components文件夹：一般放置非路由组件（全局组件）

    App.vue：唯一的跟组件，Vue当中的组件（.vue）

    main.js：程序入口文件，也是整个程序当中最先执行的文件

babel.config.js：配置文件（babel相关）

package.json：可认为是项目的“身份证”，记录项目叫做什么、项目当中有哪些依赖、项目如何运行等

package-lock.json：缓存性文件

README.md：说明性文件


2、项目的其他配置

2.1 项目运行时，让浏览器自动打开
vue.config.js文件的module.export中，加入以下代码
    devServer: {
        host: 'localhost',
        open: true
    }

2.2 eslint校验功能关闭
vue.config.js文件的module.export中，加入以下代码
    lintOnSave: false

2.3 src文件夹简写方法，配置别名（现在已经默认配置）
jsconfig.json文件compilerOptions对象中，加入如下属性
    "paths": {
      "@/*": [
        "src/*"
      ]
    }


3、项目路由分析
vue-router
前端所谓路由：KV键值对
key：URL（地址栏中的路径）
value：相应的路由组件
注意：项目上中下结构

路由组件：
Home首页路由组件、Search搜索路由组件、Login登录路由组件、Register注册路由组件
非路由组件：
Header 【以上4个页面均存在】
Footer 【在首页、搜索页存在】


4、完成非路由组件Header与Footer业务
企业项目中，不再以HTML+CSS为主，主要搞业务、逻辑
开发项目流程：
(1)书写 静态页面（HTML+CSS）
(2)拆分组件
(3)获取服务器的数据动态展示
(4)完成相应的动态业务逻辑

注意1：创建组件的时候，组件结构 + 组件样式 + 图片资源
注意2：本人项目采用scss样式，浏览器不识别scss，需要通过sass、sass-loader进行处理，把scss样式变为css样式，浏览器才能识别
注意3：如果想让组件识别scss样式，需要在style标签上加上 lang="scss"

4.1使用组件的步骤
-创建或定义
-引入
-注册
-使用


5、路由组件的搭建
vue-router（vue2中要安装3.x版本）
分析项目，路由组件应该有四个：Home、Search、Login、Register
-components文件夹：存放非路由组件（共用全局组件）
-pages|views文件夹：经常存放路由组件

5.1配置路由
项目当中配置的路由一般放在router文件夹中

5.2总结
路由组件与非路由组件的区别
(1)路由组件一般放置在pages|views文件夹，非路由组件一般放置在components文件夹
(2)路由组件一般需要在router文件夹中进行注册（使用的即为组件的名字），非路由组件在使用的时候，一般都是以标签的形式使用
(3)注册完路由，不管是路由组件还是非路由组件，身上都有$router、$route属性
$route：一般获取路由信息【路径、query、params等等】
$router：一般在编程式导航中进行路由跳转【push|replace】

5.3路由的跳转
路由跳转有两种形式：
(1)声明式导航：<router-link></router-link>标签
(2)编程式导航：$router.push，$router.replace

编程式导航：
声明式导航能做的，编程式导航都能做
但是编程式导航除了可以进行路由跳转，还可以做一些其他的业务逻辑


6、Footer组件的显示与隐藏
显示或者隐藏组件：v-if|v-show
Footer在Home、Search显示，在Login、Register隐藏

6.1我们可以根据组件身上的$route获取当前的路由信息，通过路由路径判断Footer的显示与隐藏
6.2配置路由的时候，可以给路由添加路由元信息【meta】，路由需要配置对象，它的key不能瞎写、胡写、乱写


7、路由传参
(1)params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位（不占位后续处理会出现问题）
(2)不属于路径的一部分，类似于ajax的queryString，即url的查询参数    /home?k1=v1&k2=v2，不需要占位


8、路由传参相关面试题
(1)路由传递参数（对象写法）path是否可以结合params参数一起使用？
答：不能，路由传参的时候，对象写法可以式name或path的形式，但path不能和params一起使用
(2)如果指定params参数可传可不传
答：如果路由要求传递params参数，但是你不传递，就出现URL有问题
可以在占位后面加上一个问号，表示params参数可传可不传
(3)params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
答：使用undefined解决：params参数可以传递、可以不传递（空串）
params: {
    keyword: this.keyword || undefined
}
(4)路由组件能不能传递props数据？
答：能，有三种形式
// 路由传递props参数
// Ⅰ 布尔值：只能传递params参数
props: true
// Ⅱ 对象：额外给路由组件传递一些props
props: {a: 1, b: 2}
// Ⅲ 函数：可以传递params和query参数
props: ($route) => {
    return {
        keyword: $route.params.keyword,
        k: $route.query.k
    }
}
