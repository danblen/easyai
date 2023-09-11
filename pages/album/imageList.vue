<template>
  <view class="wrap">
    <view v-if="images.length" class="item-warp">
      <view class="item" v-for="(item, index) in images" :key="index">
        <u-image
          :src="item.url"
          :style="{
            width: '100%',
            height: '100%',
          }"
          @click="onPreviewImage(index)"
          mode="widthFix"
        />
      </view>
    </view>
    <u-empty
      v-else
      text="没有进行中的作品"
      mode="list"
      style="margin-top: 100rpx"
    ></u-empty>
  </view>
</template>

<script>
import {
  checkTaskStatusByTaskId,
  get_pending_tasks_on_user,
  get_completed_tasks_on_user,
  test,
} from '@/services/api.js';
import { HTTP_URL_SD, HTTP_URL_BACK } from '@/services/app.js';
// import grid from './grid.vue';
export default {
  // components: { grid },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  onLoad() {
    this.getData();
  },
  created() {
    this.getData();
  },

  methods: {
    onPreviewImage(index) {
      uni.previewImage({
        current: index, // 当前显示图片的索引
        urls: this.images.map((image) => image.url), // 图片列表
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20rpx;
  height: 1200rpx;
  // height: 100%;
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
