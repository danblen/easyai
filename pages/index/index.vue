<template>
  <scroll-view class="container-index" style="overflow-y: scroll">
    <view style="height: 200rpx"></view>

    <zswiper></zswiper>
    <grid></grid>
    <view class="title">
      <u-icon name="heart" :size="40"></u-icon>
      <text class="text">热门</text>
    </view>
    <lazy ref="lazyRef"></lazy>
  </scroll-view>
</template>

<script>
import grid from './grid.vue';
import lazy from './lazy.vue';
import zswiper from './zswiper.vue';
// 在页面中定义插屏广告
let interstitialAd = null;

export default {
  components: { grid, lazy, zswiper },
  data() {
    return {
      isReachBottom: false,
    };
  },
  onReachBottom() {
    this.$refs.lazyRef.getData();
  },
  // onLoad() {
  //   uni.request({
  //     url: 'http://43.139.23.56:7860',
  //     method: 'GET',
  //     timeout: 600000,
  //     // header: header,
  //     // data: data || {},
  //     success: (res) => {
  //     },
  //   });
  //   // 在页面onLoad回调事件中创建插屏广告实例
  //   if (wx.createInterstitialAd) {
  //     interstitialAd = wx.createInterstitialAd({
  //       adUnitId: 'adunit-be801ba020f6edeb',
  //     });
  //     interstitialAd.onLoad(() => {});
  //     interstitialAd.onError((err) => {
  //       console.log(err);
  //     });
  //     interstitialAd.onClose(() => {});
  //   }
  // },
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
