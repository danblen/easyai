<template>
  <view
    style="height: 100%; width: 100%"
    :show-scrollbar="false"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- <u-navbar :border-bottom="false" title="AI写真"></u-navbar> -->
    <!-- <page-meta> -->
    <navigation-bar
      :title-icon-radius="titleIconRadius"
      :subtitle-text="subtitleText"
      :subtitle-color="nbFrontColor"
      :loading="nbLoading"
      :color-animation-duration="2000"
      color-animation-timing-func="easeIn"
      style="background: transparent"
    />
    <!-- </page-meta> -->

    <view
      class="image-wrap"
      style="width: 100%; height: 100vh; display: flex; align-items: center"
    >
      <u-image class="image" :src="src" style="" mode="widthFix" />
    </view>

    <view
      style="
        position: fixed;
        width: 60rpx;
        height: 60rpx;
        left: 50rpx;
        top: 110rpx;
        color: white;
      "
      @click="goBack"
    >
      <u-icon name="arrow-left" size="32"></u-icon>
    </view>
    <view
      style="
        position: fixed;
        right: 0;
        top: 300rpx;
        opacity: 0.3;
        padding-left: 8rpx;
        font-size: 24rpx;
        color: white;
        background: black;
        border-radius: 10rpx 0 0 10rpx;
      "
      @click="showModel = true"
    >
      左滑查看作品
      <u-icon name="arrow-right" size="24"></u-icon>
    </view>

    <u-popup
      v-model="showModel"
      mode="right"
      width="600"
      style="background: black"
    >
    
      <tasks ref="imageRowRef" class="image-row" />
    </u-popup>

    <view style="position: fixed; width: 100%; padding: 0 30rpx; bottom: 0rpx">
      <view
        style="
          margin-bottom: 40rpx;
          border-radius: 20rpx;
          background: grey;
          opacity: 0.5;
          color: white;
        "
      >
        <!-- 样式写在外面才生效 -->
        <imageUpload ref="uploadRef"></imageUpload>
      </view>

      <u-button
        type="primary"
        style="
          width: 100%;
          animation: swap 1s infinite;
          opacity: 0.8;
          font-weight: bold;
        "
        :custom-style="{
          background: 'linear-gradient(to right, #00467f, #a5cc82)',
        }"
        :ripple="true"
        shape="circle"
        class="swap"
        :loading="swapLoading"
        @click="swap"
      >
        一键换脸
      </u-button>
      <view style="height: 100rpx"></view>
      <login ref="loginRef"></login>
    </view>
  </view>
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
import tasks from './tasks.vue';
import imageUpload from './imageUpload.vue';
import login from '@/pages/comps/login.vue';
export default {
  components: { login, imageUpload, tasks },
  data() {
    return {
      titleIcon: '/static/logo.png',
      titleIconRadius: '20px',
      subtitleText: 'subtitleText',
      nbLoading: false,
      nbFrontColor: '#000000',
      nbBackgroundColor: '#ffffff',
      // title: '选择人脸照片替换原图中人脸',
      // 演示地址，请勿直接使用
      showModel: false,
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
      startX: 0,
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
    goBack() {
      // 使用uni.navigateBack()方法返回上一级页面
      uni.navigateBack({
        delta: 1, // 返回的页面数，1表示返回上一级
      });
    },
    onTouchStart(event) {
      this.startX = event.touches[0].clientX; // 记录触摸起始点的X坐标
    },
    onTouchEnd(event) {
      const endX = event.changedTouches[0].clientX; // 记录触摸结束点的X坐标
      const deltaX = endX - this.startX; // 计算X轴位移距离

      if (deltaX < -50) {
        this.showModel = true;
      } else if (deltaX > 50) {
        this.showModel = false;
      }
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

<style lang="scss" scoped>
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
</style>
<style>
page {
  background-color: #000;
}
</style>
