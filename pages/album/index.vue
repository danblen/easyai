<template>
  <view class="container-index">
    <u-navbar :is-back="false" :border-bottom="false" title="作品"></u-navbar>
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
          <tasks ref="Ref" />
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view
          scroll-y
          style="height: 100%; width: 100%"
          @scrolltolower="reachBottom"
        >
          <works ref="hotRef" />
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
// 在页面中定义插屏广告

import works from './works.vue';
import tasks from './tasks.vue';
export default {
  components: { works, tasks },
  data() {
    return {
      list: [
        {
          name: '进行中',
        },
        {
          name: '已完成',
        },
      ],
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      dx: 0,
    };
  },
  methods: {
    reachBottom() {},
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

<style scoped>
.container-index {
  /* height: 2000rpx; */
}
.title {
  font-size: 40rpx;
  font-weight: bold;
  margin: 20rpx 0 0 20rpx;
}
.text {
  margin-left: 10rpx;
  margin-bottom: 2rpx;
}
</style>
