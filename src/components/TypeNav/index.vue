<template>
    <div class="type-nav">
        <div class="container">
            <!-- 事件委派 | 事件委托 -->
            <!-- 将子元素要执行的事件交给父亲执行 -->
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item bo" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                        c1.categoryName }}</a>
                                </h3>
                                <!-- 第二、三级分类 -->
                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{
                                                    c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// import _ from 'lodash';
import throttle from 'lodash/throttle';
export default {
    name: 'TypeNav',
    data() {
        // 存储用户鼠标移到哪一个一级分类
        return {
            currentIndex: -1,
            show: true
        }
    },
    methods: {
        // 鼠标移入某个一级菜单时的回调
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),
        // 鼠标移出某个一级菜单时的回调
        leaveIndex() {
            this.currentIndex = -1;
            // 鼠标移开时，对分类列表进行隐藏
            if (this.$route.path != '/home') {
                this.show = false;
            }
        },
        // 进行路由跳转
        goSearch(event) {
            // 第一个问题：把子节点当中的a标签，加上自定义属性data-categoryName
            const element = event.target;
            // 节点有一个dataset属性，可以获取节点的自定义属性
            const { categoryname, category1id, category2id, category3id } = element.dataset;
            // 如果标签上有categoryname那么一定是a标签
            let location = { name: 'search' };
            if (categoryname) {
                // 整理路由跳转参数
                let query = { categoryName: categoryname };
                // 一、二、三级分类的标签
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                location.query = query;
                // 判断：如果路由跳转的时候，带有params
                if(this.$route.params) {
                    location.params = this.$route.params;
                }
                this.$router.push(location);
            }
        },
        // 当鼠标移入时，将商品分类列表进行展示
        enterShow() {
            if (this.$route.path != '/home') {
                this.show = true;
            }
        }
    },
    computed: {
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
            // 注入一个参数state，即为大仓库中的数据
            categoryList: state => state.home.categoryList
        })
    },
    // 组件挂载完毕，可以向服务器发请求
    mounted() {
        // 如果当前路由不是home，将TypeNav进行隐藏
        if (this.$route.path != '/home') {
            this.show = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }
        // 过渡动画样式
        // 过渡动画开始状态（进入）
        .sort-enter {
            height: 0;
        }
        // 过渡动画结束状态（进入）
        .sort-enter-to {
            height: 461px;
        }
        // 定义动画的时间、速率
        .sort-enter-active {
            transition: all .5s linear;
        }
    }
}</style>