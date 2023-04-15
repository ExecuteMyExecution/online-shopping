<template>
  <div>
    <!-- 三级联动全局组件：已经注册为全局组件，因此不需要再引用 -->
    <TypeNav />
    <ListContainer />
    <Recommand />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
// 引入其余组件
import ListContainer from '@/pages/Home/ListContainer';
import Recommand from '@/pages/Home/Recommand';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';

import { mapState } from 'vuex';
export default {
  components: {
    ListContainer,
    Recommand,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    // 发送action，获取floor组件的数据
    this.$store.dispatch('getFloorList');
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style>

</style>