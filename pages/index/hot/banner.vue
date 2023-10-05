<template>
  <scroll-view scroll-x style="width: 100%; padding: 20rpx" class="xsms-scroll">
    <view
      v-for="(image, index) in images"
      :key="index"
      style="display: inline-block; border-radius: 18rpx"
    >
      <image
        :src="image.src"
        mode="aspectFill"
        style="
          width: 300rpx;
          height: 180rpx;
          display: inline-block;
          margin-right: 20rpx;
          border-radius: 15rpx;
        "
        @click="go('/pages/index/faceswap/index', image.src)"
      ></image>
    </view>
  </scroll-view>
</template>

<script>
import {
  checkTaskStatusByTaskId,
  get_completed_tasks_on_user,
} from '@/services/api.js';
import { URL_SD, URL_BACK } from '@/services/app.js';
import { images2 } from '@/pages/const/url.js';
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {
      images: images2,
    };
  },
  methods: {
    go(url, src) {
      uni.navigateTo({
        url: url + '?src=' + src,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.xsms-scroll {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  // background: #f06666;
}
</style>
