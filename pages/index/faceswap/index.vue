<template>
  <scroll-view
    scroll-y
    style="height: 100%; width: 100%"
    @scrolltolower="reachBottom"
  >
    <u-navbar :border-bottom="false" title="AI写真"></u-navbar>

    <view class="image-wrap">
      <u-image
        :src="src"
        :style="{
          width: '100%',
          height: '100%',
        }"
        mode="widthFix"
      />
    </view>

    <imageUpload class="image-upload" ref="uploadRef"></imageUpload>
    <view class="image-output">
      <view
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <view>已制作图集</view>
        <view
          class="goAlbum"
          @click="goAlbum"
          style="postion: absolute; right: 0; color: #f083c6"
        >
          去作品查看
          <u-icon name="arrow-right-double"></u-icon>
        </view>
      </view>
      <imageRow ref="imageRowRef" />
    </view>

    <u-button
      class="swap"
      type="primary"
      :custom-style="customStyle"
      :ripple="true"
      shape="circle"
      :loading="swapLoading"
      @click="swap"
    >
      一键换脸
    </u-button>
    <view style="height: 200rpx"></view>
    <login ref="loginRef"></login>
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
import { HTTP_URL_SD, HTTP_URL_BACK } from '@/services/app.js';
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
      customStyle: {
        background: '#f083c6',
      },
    };
  },
  onLoad(options) {
    this.src = options.src;
    this.downloadImages(this.src);
    this.outputImages = [
      // { path: options.src, status: 'su' },
      // { path: 'https://cdn.uviewui.com/uview/swiper/2.jpg', status: 's' },
      // { path: options.src, status: 's' },
      // { path: options.src, status: 's' },
      // { path: options.src, status: 's' },
      // { path: 'asd', status: 'pending' },
    ];
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
      uni.navigateTo({
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
      // if (!uni.getStorageSync('userId')) {
      //   this.$refs.loginRef.show();
      //   return;
      // }
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
          user_id: uni.getStorageSync('userId') || 123,
          src_face_index: 0,
          dst_face_index: 0,
        },
      );
      if (res) {
        this.saved_id = res.saved_id;
      }
      // 有些图片下载后调接口会报400 invalid image
      let res2 = await upload(
        'upload_second_image/',
        this.srcTempFilePath,
        'second_image',
        {
          user_id: uni.getStorageSync('userId') || 123,
          saved_id: this.saved_id,
        },
      );
      if (res2) {
        this.taskId = res2.task_id;
        this.$refs.imageRowRef.getImage(res2.task_id);
      }
      this.swapLoading = false;
    },
  },
};
</script>

<style lang="scss">
.image-wrap {
  position: relative;
  .image {
    width: 100%;
  }
}
.image-upload {
  padding: 10rpx;
  background: rgb(186, 173, 194);
}
.image-output {
  padding: 10rpx;
  margin-top: 10rpx;
  background: rgb(186, 173, 194);
}

.swap {
  position: fixed;
  bottom: 60rpx;
  margin: 0 40rpx;
  width: 90%;
}
</style>
