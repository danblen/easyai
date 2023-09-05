<template>
  <view class="container-index">
    <view class="title">
      <u-icon name="heart" :size="36"></u-icon>
      <text class="text">推荐</text>
    </view>
  </view>
</template>
<script>
// 在页面中定义插屏广告

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
