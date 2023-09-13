<template>
  <view>
    <!-- <zswiper></zswiper> -->
    <u-swiper :list="swipers"></u-swiper>

    <view class="title">
      <u-icon name="heart" :size="36"></u-icon>
      <text class="text">推荐</text>
    </view>
    <u-tabs
      :list="list"
      :current="current"
      :active-item-style="{
        color: '#b20a2c',
      }"
      :bar-style="{
        backgroundColor: '#0170ff',
      }"
      height="50"
      @change="change"
    ></u-tabs>
    <lazy ref="lazyRef"></lazy>
  </view>
</template>

<script>
import lazy from './lazy.vue';
import zswiper from './zswiper.vue';
import { image_list } from '@/services/api.js';
import { URL_BACK } from '@/services/app.js';
import { tags } from '../const/app.js';
export default {
  components: { lazy, zswiper },
  data() {
    return {
      current: 0,
      swipers: [],
      list: tags.map((item) => {
        return {
          name: item,
        };
      }),
    };
  },
  mounted() {
    this.getData();
    this.getSwipers();
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
    async getSwipers() {
      let res = await image_list({ tag: '封面' });
      this.swipers = res.image_urls.map((url) => {
        return {
          image: URL_BACK + url,
        };
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
