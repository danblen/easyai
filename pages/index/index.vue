<template>
  <view class="wrap">
    <u-navbar :is-back="false" :border-bottom="false" title="AI写真"></u-navbar>
    <view class="u-tabs-box">
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
      <!-- <swiper-item class="swiper-item">
        <scroll-view
          scroll-y
          style="height: 100%; width: 100%"
          @scrolltolower="reachBottom"
        ></scroll-view>
      </swiper-item> -->
    </swiper>
  </view>
</template>

<script>
import waterfall from './waterfall.vue';
import hot from './hot.vue';
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
        // {
        //   name: '最新',
        // },
      ],
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      dx: 0,
    };
  },
  onLoad() {},
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

<style>
/* #ifndef H5 */
page {
  height: 100%;
}
/* #endif */
</style>

<style lang="scss" scoped>
.wrap {
  background-color: #f588cb;
  background-color: #fff;
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
</style>
