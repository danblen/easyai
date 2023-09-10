<template>
  <view class="wrap">
    <view class="item-warp">
      <view
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="go('/pages/index/faceswap/index', item.src)"
      >
        <u-lazy-load
          threshold="-450"
          height="400"
          img-mode="aspectFill"
          border-radius="10"
          :image="item.src"
          :index="index"
          @statusChange="statusChange"
          @clickImg="clickImg"
        ></u-lazy-load>
      </view>
    </view>
    <u-loadmore :status="status" @loadmore="getData"></u-loadmore>
  </view>
</template>

<script>
import { images } from '../const/url.js';
import { HTTP_URL_BACK } from '@/services/app.js';
import { image_list } from '@/services/api.js';
export default {
  data() {
    return {
      list: [],
      status: 'loadmore',
    };
  },
  created() {
    this.getData();
  },
  onReachBottom() {
    this.getData();
  },
  methods: {
    go(url, src) {
      uni.navigateTo({
        url: url + '?src=' + src,
      });
    },

    statusChange(status) {
      console.log(status);
    },
    clickImg(img) {
      //console.log(img);
    },
    async getData() {
      let res = await image_list({
        tag: 'guofeng',
      });
      this.list = res.image_urls.map((url) => {
        return {
          src: HTTP_URL_BACK + url,
        };
      });
      // let index = 0;
      // this.status = 'loading';
      // for (let i = 0; i < 10; i++) {
      //   index = this.$u.random(0, images.length - 1);
      //   this.list.push({
      //     src: images[index].src,
      //   });
      // }
      // this.status = 'loadmore';
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20rpx;
  display: block;
}

.item-warp {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.item-warp .item {
  flex: 0 0 350rpx;
  height: 400rpx;
  margin-bottom: 10rpx;
  border-radius: 10rpx;
  overflow: hidden;
}
</style>
