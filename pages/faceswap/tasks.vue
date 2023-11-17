<template>
  <view
    style="
      background: black;
      height: 100%;
      width: 100%;
      padding: 200rpx 20rpx 20rpx 20rpx;
    "
  >
    <view @click="goAlbum">
      作品集
      <u-icon name="arrow-right" size="26"></u-icon>
    </view>

    <scroll-view class="xsms-scroll">
      <view v-if="images.length">
        <view
          v-for="(image, index) in images"
          :key="index"
          style="
            width: 200rpx;
            height: 200rpx;
            margin-right: 10rpx;
            display: inline-block;
          "
        >
          <view
            v-if="image.status === 'pending'"
            style="
              width: 200rpx;
              height: 200rpx;
              display: inline-block;
              text-align: center;
              vertical-align: middle;
              border: 1px solid #ccc;
            "
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
            style="
              width: 300rpx;
              height: 300rpx;
              display: inline-block;
              text-align: center;
              vertical-align: middle;
            "
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
import { getSwapQueueResult } from '@/services/api.js';
import { URL_SD, URL_BACK } from '@/services/app.js';
export default {
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
  onUnload() {
    for (let key in this.timers) {
      clearInterval(this.timers[key]);
    }
  },
  methods: {
    goAlbum() {
      uni.reLaunch({
        url: '/pages/album/index',
      });
    },
    onPreviewImage(index) {
      uni.previewImage({
        current: index, // 当前显示图片的索引
        urls: this.images.map((image) => image.path), // 图片列表
      });
    },

    async getImage(request_id) {
      this.images.push({
        path: '',
        status: 'pending',
        request_id,
      });
      this.timers[request_id] = setInterval(async () => {
        const request_data = {
          user_id: '',
          request_id: request_id,
          sql_query: {
            request_status: '',
            user_id: '',
          },
        };
        let res = await getSwapQueueResult(request_data).catch(() => {
          clearInterval(this.timers[request_id]);
        });
        if (res.status === 'finishing') {
          let image = this.images.find(
            (image) => image.request_id === request_id,
          );
          if (image) {
            image.path = 'data:image/png;base64,' + res.result.images[0];
            image.status = 'SUCCESS';
          } else {
            this.images.push({
              path: 'data:image/png;base64,' + res.result.images[0],
              status: 'SUCCESS',
            });
          }
          clearInterval(this.timers[request_id]);
        }
      }, 4000);
    },
  },
};
</script>

<style lang="scss" scoped></style>
