<template>
  <scroll-view
    scroll-y
    style="height: 100%; width: 100%"
    :show-scrollbar="false"
    @scrolltolower="reachBottom"
  >
    <u-navbar :border-bottom="false" title="AI写真"></u-navbar>

    <view class="image-wrap">
      <u-image
        class="image"
        :src="src"
        :style="{
          width: '100%',
          height: '100%',
        }"
        mode="widthFix"
      />
    </view>
    <view style="padding: 20rpx">
      <u-section
        color="#68cdc4"
        title="点击上传照片，可上传多张进行选择"
        :right="false"
      ></u-section>
      <view
        style="
          margin: 10rpx 0;
          border-radius: 10rpx;
          background: rgb(226, 223, 226);
        "
      >
        <!-- 样式写在外面才生效 -->
        <imageUpload ref="uploadRef"></imageUpload>
      </view>

      <u-section
        title="已制作图集"
        sub-title="作品集"
        color="#68cdc4"
        @click="goAlbum"
      ></u-section>
      <view
        style="
          margin: 10rpx 0;
          border-radius: 10rpx;
          background: rgb(226, 223, 226);
        "
      >
        <!-- 样式写在外面才生效 -->
        <imageRow ref="imageRowRef" class="image-row" />
      </view>

      <u-button
        type="primary"
        style="
          position: fixed;
          bottom: 60rpx;
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
        :loading="swapLoading"
        @click="swap"
      >
        一键换脸
      </u-button>
      <view style="height: 200rpx"></view>
      <login ref="loginRef"></login>
    </view>
  </scroll-view>
</template>

<script>
import {
  txt2img,
  test,
  uploadImage,
  checkTaskStatus,
  checkTaskStatusByTaskId,
  get_completed_tasks_on_user,
} from '@/services/api.js';
import { URL_SD, URL_BACK } from '@/services/app.js';
import { upload } from '@/pages/common/upload.js';
import imageRow from './imageRow.vue';
import imageUpload from './imageUpload.vue';
import login from '@/pages/comps/login.vue';
export default {
  components: { login, imageUpload, imageRow },
  data() {
    return {
      // title: '选择人脸照片替换原图中人脸',
      // 演示地址，请勿直接使用
      fileList: [],
      fileList2: [],
      images: [],
      showImage: false,
      src: '',
      srcTempFilePath: '',
      taskId: '',
      timers: {},
      outputImages: [],
      swapLoading: false,
      userId: '',
      saved_id: '',
    };
  },
  onLoad(options) {
    this.src = options.src;
    this.downloadImages(this.src);
    this.outputImages = [];
  },
  unMounted() {
    clearInterval(this.timer);
  },
  onUnload() {
    Object.values(this.timers).forEach((timer) => {
      clearInterval(timer);
    });
  },
  methods: {
    goAlbum() {
      uni.reLaunch({
        url: '/pages/album/index',
      });
    },
    downloadImages(imageUrl) {
      let that = this;
      return new Promise((resolve, reject) => {
        uni.downloadFile({
          url: imageUrl,
          success: (res) => {
            if (res.statusCode === 200) {
              that.srcTempFilePath = res.tempFilePath;
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

    async swap() {
      if (!uni.getStorageSync('userInfo').userId) {
        this.$refs.loginRef.show();
        return;
      }
      if (!this.$refs.uploadRef.selectedImageUrl) {
        uni.showToast({
          title: '请选择人脸图片',
          icon: 'none',
        });
        return;
      }
      this.swapLoading = true;
      let res = await upload(
        'upload_first_image/',
        this.$refs.uploadRef.selectedImageUrl,
        'first_image',
        {
          user_id: uni.getStorageSync('userInfo').userId,
          src_face_index: 0,
          dst_face_index: 0,
        },
      ).catch(() => {
        this.swapLoading = false;
      });
      if (res.status === 'SUCCESS') {
        this.saved_id = res.saved_id;
      } else {
        uni.showToast({
          title: res.error_message,
          icon: 'none',
        });
        this.swapLoading = false;
        return;
      }
      // 有些图片下载后调接口会报400 invalid image
      let res2 = await upload(
        'upload_second_image/',
        this.srcTempFilePath,
        'second_image',
        {
          user_id: uni.getStorageSync('userInfo').userId,
          saved_id: this.saved_id,
        },
      ).finally(() => {
        this.swapLoading = false;
      });
      if (res2.status === 'SUCCESS') {
        this.taskId = res2.task_id;
        this.$refs.imageRowRef.getImage(res2.task_id);
      } else {
        uni.showToast({
          title: res2.error_message,
          icon: 'none',
        });
      }
    },
  },
};
</script>

<style lang="scss">
.image-wrap {
  // height: 1000rpx;
  overflow: hidden;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  .image {
    width: 100%;
    vertical-align: middle;
  }
}
// ::-webkit-scrollbar {
// }
// scroll-view {
//   width: 0;
//   height: 0;
//   background-color: transparent;
//   color: transparent;
//   scrollbar-width: none;
//   -webkit-scrollbar: none;
// }

.swap {
}
</style>
