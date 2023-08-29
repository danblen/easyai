<template>
  <view>
    <u-navbar :is-back="false" :border-bottom="false" title="作品"></u-navbar>
    <scroll-view
      class="container-index"
      style="overflow-y: scroll"
    >
    <ztxt></ztxt>
    </scroll-view>
  </view>
</template>

<script>
// import grid from './grid.vue';
// 在页面中定义插屏广告
let interstitialAd = null;

export default {
  // components: { grid, lazy, zswiper },
  data() {
    return {
      isReachBottom: false,
    };
  },
  methods: {},
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
