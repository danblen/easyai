<template>
  <scroll-view scroll-x style="height: 100%; width: 100%" class="xsms-scroll">
    <view v-if="images.length">
      <view
        v-for="(image, index) in images"
        :key="index"
        :style="{
          width: '200rpx',
          height: '200rpx',
          marginRight: '10rpx',
          display: 'inline-block',
        }"
      >
        <view
          v-if="image.status === 'pending'"
          :style="{
            width: '200rpx',
            height: '200rpx',
            display: 'inline-block',
            textAlign: 'center',
            verticalAlign: 'middle',
            border: '1px solid #ccc',
          }"
        >
          <u-loading
            :style="{
              position: 'relative',
              top: '50rpx',
            }"
          ></u-loading>
          <view
            :style="{
              position: 'relative',
              top: '55rpx',
            }"
          >
            制作中
          </view>
        </view>
        <u-image
          v-else
          :style="{
            width: '200rpx',
            height: '200rpx',
            display: 'inline-block',
            textAlign: 'center',
            verticalAlign: 'middle',
          }"
          :src="image.path"
          mode="widthFix"
          @click="onPreviewImage(index)"
        ></u-image>
      </view>
    </view>
    <view v-else>
      <u-empty></u-empty>
    </view>
  </scroll-view>
</template>

<script>
import {
  checkTaskStatusByTaskId,
  get_completed_tasks_on_user,
} from '@/services/api.js';
import { URL_SD, URL_BACK } from '@/services/app.js';
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {
      images: [
        { path: 'https://cdn.uviewui.com/uview/swiper/2.jpg', status: 's' },
        { path: 'https://cdn.uviewui.com/uview/swiper/2.jpg', status: 's' },
        { path: 'https://cdn.uviewui.com/uview/swiper/2.jpg', status: 's' },
        { path: 'https://cdn.uviewui.com/uview/swiper/2.jpg', status: 's' },
        { path: 'https://cdn.uviewui.com/uview/swiper/2.jpg', status: 's' },
        { path: 'https://cdn.uviewui.com/uview/swiper/2.jpg', status: 's' },
        { path: 'https://cdn.uviewui.com/uview/swiper/2.jpg', status: 's' },
        { path: 'https://cdn.uviewui.com/uview/swiper/2.jpg', status: 's' },
      ],
      taskId: '',
      timers: {},
      customStyle: {
        background: '#f083c6',
      },
    };
  },
  onUnload() {
    for (let key in this.timers) {
      clearInterval(this.timers[key]);
    }
  },
  methods: {
    onPreviewImage(index) {
      uni.previewImage({
        current: index, // 当前显示图片的索引
        urls: this.images.map((image) => image.path), // 图片列表
      });
    },

    async getImage(taskId) {
      this.images.push({
        path: '',
        status: 'pending',
        taskId,
      });
      this.timers[taskId] = setInterval(async () => {
        let res = await checkTaskStatusByTaskId(taskId).catch(() => {
          clearInterval(this.timers[taskId]);
        });
        if (res.status === 'SUCCESS') {
          let image = this.images.find((image) => image.taskId === taskId);
          if (image) {
            image.path = URL_BACK + res.processed_image_url;
            image.status = 'SUCCESS';
          } else {
            this.images.push({
              path: URL_BACK + res.processed_image_url,
              status: 'SUCCESS',
            });
          }
          clearInterval(this.timers[taskId]);
        }
      }, 4000);
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
