<template>
  <view>
    <!-- <u-swiper :list="swipers"></u-swiper> -->

    <view style="background: linear-gradient(to bottom, #ebf4f8, #f8fafa)">
      <!-- <banner /> -->
      <u-sticky>
        <u-tabs
          activeColor="#555"
          :active-item-style="{
            color: '#444',
            fontSize: '32rpx',
          }"
          height="60"
          style="background: linear-gradient(to bottom, #ebf4f8, #f8fafa)"
          class="tabs"
          :list="list"
          :current="current"
          @change="change"
        ></u-tabs>
      </u-sticky>
      <lazy ref="lazyRef" />
    </view>
  </view>
</template>

<script>
import lazy from './lazy.vue';
import banner from './banner.vue';
import { image_list } from '@/services/api.js';
import { URL_BACK } from '@/services/app.js';
import { tags } from '../../const/app.js';
export default {
  components: { lazy, banner },
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
<style lang="scss">
.tabs {
  background: $color-linear2;
}
</style>