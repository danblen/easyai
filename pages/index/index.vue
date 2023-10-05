<template>
  <view class="view">
    <!-- <u-navbar
      style="background-color: rgba(0, 0, 0, 0)"
      :is-back="false"
      :border-bottom="false"
      title="AI写真"
    ></u-navbar> -->
    <!-- <view class="u-tabs-box">
      <u-tabs-swiper
        activeColor="#f588cb"
        ref="tabs"
        :list="list"
        :current="current"
        @change="change"
        :is-scroll="true"
        swiperWidth="750"
      ></u-tabs-swiper>
    </view>
    <swiper
      class="swiper-box"
      :current="swiperCurrent"
      @transition="transition"
      @animationfinish="animationfinish"
    >
      <swiper-item class="swiper-item">
        <scroll-view
          scroll-y
          style="height: 100%; width: 100%"
          @scrolltolower="reachBottom"
        >
          <hot ref="hotRef" />
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view
          scroll-y
          style="height: 100%; width: 100%"
          @scrolltolower="reachBottom"
        >
          <waterfall ref="fallRef"></waterfall>
        </scroll-view>
      </swiper-item>
    </swiper> -->
    <hot ref="hotRef" />
  </view>
</template>

<script>
import waterfall from './waterfall.vue';
import hot from './hot/index.vue';
import { init } from '../common/init.js';
export default {
  components: { hot, waterfall },
  data() {
    return {
      list: [
        {
          name: '热门',
        },
        {
          name: '精选',
        },
      ],
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      dx: 0,
    };
  },
  onLoad() {
    init();
  },
  computed: {},
  methods: {
    reachBottom() {
      this.$refs.hotRef.getData();
      this.$refs.fallRef.reachBottom();
    },
    // tab栏切换
    change(index) {
      this.swiperCurrent = index;
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
  },
};
</script>

<style lang="scss" scoped>
.view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
  width: 100%;
}
.swiper-box {
  flex: 1;
}
.swiper-item {
  height: 100%;
}
.uni-nav-bar {
  background-color: rgba(0, 0, 0, 0);
  border-bottom: none;
}
</style>
<style lang="scss">
// weixin
page {
  background: $color-linear2;
  height: 100vh;
}
</style>
