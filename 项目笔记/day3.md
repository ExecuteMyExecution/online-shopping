1、完成一级分类动态添加背景颜色
Ⅰ 采用样式完成 css
Ⅱ 通过行为控制 js

2、通过js控制二、三级商品分类的显示与隐藏

判断currentIndex == index，切换display属性


3、演示卡顿现象
正常：事件触发非常频繁，而且每一次触发，回调函数都要去执行
不正常：如果触发间隔时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿

解决方案：
节流：在规定的时间范围内不会重新触发回调，只有大于这个时间间隔才会触发，把频繁触发变为少量触发
防抖：前面的所有触发都被取消，最后一次执行在规定时间之后才会触发，也就是说如果连续快速的触发，只会执行一次

4、三级联动组件的路由跳转与参数传递
用户点击【一级分类、二级分类、三级分类】的时候，Home模块跳转到Search模块，同时把当前的产品名字和ID进行传递

路由跳转方式：
声明式导航：router-link
编程式导航：push|replace

如果使用声明式导航router-link标签，会出现卡顿现象
因为router-link是一个组件，当服务器数据返回后，循环出很多router-link组件实例
一瞬间闯将1000+组件实例，极大消耗内存，因此出现了卡顿

最好的解决方案：编程式导航 + 事件委派
但会存在一些问题：①点击怎么保证是a标签；②如何获取参数【1、2、3级分类的产品名字和ID】

解决方案：
给a标签加入相同的自定义属性categoryName，并且不同级的加入不同的自定义属性标识ID
节点有一个dataset属性，可以获取节点的自定义属性，即event.target.dataset
解构出来后便可拿到自定义的属性，于是就可以判断了