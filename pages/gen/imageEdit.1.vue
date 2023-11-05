<template>
  <view>
    <z-upload
      ref="uploadRef"
      :previewFullImage="false"
      :isTapSelect="true"
      :needConfirmDelete="false"
      :width="750"
      :height="750"
      :auto-upload="false"
      :max-count="1"
      @on-choose-complete="onChooseComplete"
      @onPreview="onPreview"
    ></z-upload>
    <view class="image-wrap">
      <!-- <u-image
        class="image"
        :src="url"
        :style="{
          width: '100%',
          height: '100%',
        }"
        mode="widthFix"
      /> -->
    </view>
    <u-button
      type="primary"
      style="
        position: fixed;
        bottom: 120rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 70%;
        animation: swap 1s infinite;
        opacity: 0.8;
        font-weight: bold;
      "
      :custom-style="{
        background: 'linear-gradient(to right, #00467f, #a5cc82)',
        boxShadow: '0 0 10rpx #a5cc82',
      }"
      :ripple="true"
      shape="circle"
      class="swap"
      :loading="loading"
      @click="onEdit"
    >
      修图
    </u-button>
  </view>
</template>

<script>
import { img2img2 } from '../const/app.js';
import {
  getSdModels,
  getSdLoRA,
  getSdSamplers,
  getTranslate,
  postTxt2img,
  img2img,
} from '@/services/api.js';
export default {
  data() {
    return {
      url: '',
      tempFilePath: '',
      selectedImageUrl: '',
    };
  },
  onLoad(options) {},
  methods: {
    async onEdit() {
      await img2img(img2img2);
    },

    onChooseComplete(list, name) {
      this.selectedImageUrl = list[0].url;
      this.downloadImages(this.selectedImageUrl);
    },
    downloadImages(imageUrl) {
      let that = this;
      return new Promise((resolve, reject) => {
        uni.downloadFile({
          url: imageUrl,
          success: (res) => {
            if (res.statusCode === 200) {
              that.tempFilePath = res.tempFilePath;
              resolve();
            } else {
              reject();
            }
          },
          fail: (error) => {
            reject();
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
