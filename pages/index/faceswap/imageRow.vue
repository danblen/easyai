<template>
  <view>
    <scroll-view style="height: 100%; width: 100%" class="xsms-scroll">
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
  </view>
</template>

<script>
import {
  checkTaskStatusByTaskId,
  get_completed_tasks_on_user,
} from '@/services/api.js';
import { HTTP_URL_SD, HTTP_URL_BACK } from '@/services/app.js';
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {
      images: [],
      taskId: '',
      timers: {},
      customStyle: {
        background: '#f083c6',
      },
    };
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
        let res = await checkTaskStatusByTaskId(taskId);
        if (res.status === 'SUCCESS') {
          let image = this.images.find((image) => image.taskId === taskId);
          if (image) {
            image.path = HTTP_URL_BACK + res.processed_image_url;
            image.status = 'SUCCESS';
          } else {
            this.images.push({
              path: HTTP_URL_BACK + res.processed_image_url,
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

<style lang="scss" scoped></style>
