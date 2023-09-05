<template>
  <view>
    <zswiper></zswiper>
    <view class="title">
      <u-icon name="heart" :size="36"></u-icon>
      <text class="text">推荐</text>
    </view>
    <lazy ref="lazyRef"></lazy>
  </view>
</template>

<script>
import lazy from './lazy.vue';
import zswiper from './zswiper.vue';
import waterfall from './waterfall.vue';
export default {
  components: {  lazy, zswiper, waterfall  },
  data() {
    return {
      list: [
        {
          image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
        },
      ],
    };
  },
  methods: {
    getData() {
      this.$refs.lazyRef.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 36rpx;
  font-weight: bold;
  margin: 20rpx 0 0 20rpx;
  .text {
    margin-left: 10rpx;
    margin-bottom: 2rpx;
  }
}
</style>
