<template>
  <view>
    <zswiper></zswiper>
    <view class="title">
      <u-icon name="heart" :size="36"></u-icon>
      <text class="text">推荐</text>
    </view>
    <u-tabs :list="list" :current="current" @change="change"></u-tabs>
    <lazy ref="lazyRef"></lazy>
  </view>
</template>

<script>
import lazy from './lazy.vue';
import zswiper from './zswiper.vue';
import { tags } from '../const/app.js';
export default {
  components: { lazy, zswiper },
  data() {
    return {
      current: 0,
      list: tags.map((item) => {
        return {
          name: item,
        };
      }),
    };
  },
  mounted() {
    this.getData();
  },

  methods: {
    change(index) {
      this.current = index;
      console.log(tags[this.current]);
      this.getData();
    },
    getData() {
      this.$refs.lazyRef.getData({
        tag: tags[this.current],
      });
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
