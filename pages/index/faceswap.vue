<template>
  <scroll-view
    scroll-y
    style="height: 100%; width: 100%"
    @scrolltolower="reachBottom"
  >
    <u-navbar :border-bottom="false" title="AI写真"></u-navbar>
    <view
      class="tip"
      :style="{
        padding: '20rpx',
        fontSize: '24rpx',
      }"
    >
      {{ description }}
    </view>
    <view class="image-wrap">
      <u-image
        :src="src"
        :style="{
          width: '100%',
          height: '100%',
        }"
        mode="widthFix"
      />
      <self class="avatar" ref="selfRef"></self>
    </view>
    <view class="image-cover" v-if="outputImages.length">
      <view class="image-cover-close">已制作图集</view>
      <scroll-view
        scroll-x
        style="height: 100%; width: 100%"
        class="xsms-scroll"
      >
        <view
          v-for="(image, index) in outputImages"
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
      </scroll-view>
    </view>

    <u-button
      class="swap"
      type="primary"
      :custom-style="customStyle"
      :ripple="true"
      shape="circle"
      @click="swap"
    >
      一键换脸
    </u-button>
    <!-- <u-button type="primary" :ripple="true" shape="circle" @click="click">
      aaa
    </u-button> -->
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
// import { HTTP_URL_SD, HTTP_URL_BACK } from '@/utils/base64.js';
import { pathToBase64, base64ToBlob } from '@/utils';
import self from './self.vue';
import login from '../comps/login.vue';
export default {
  components: { self,login },
  data() {
    return {
      // title: '选择人脸照片替换原图中人脸',
      description:
        '请选择一张人脸清晰的照片，生成图片需要等待一段时间，可在作品页查看生成作品和进度，作品将在12小时后删除，请及时保存图片',
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
    async change(event) {
      const file = event.target.files[0]; // 获取选中的文件
      if (file) {
        const formData = new FormData();
        formData.append('image', file); // 将文件添加到 FormData

        try {
          const response = await fetch('/upload_image/', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data); // 上传成功后的响应数据
          } else {
            console.error('上传失败');
          }
        } catch (error) {
          console.error('上传出错：', error);
        }
      }
    },
    onPreviewImage(index) {
      uni.previewImage({
        current: index, // 当前显示图片的索引
        urls: this.outputImages.map((image) => image.path), // 图片列表
      });
    },

    async uploadImg(imagePaths, successCallback, errorCallback) {
      let that = this;
      // let first_image = await pathToBase64(imagePaths[0]);
      // first_image = base64ToBlob(first_image);
      // let second_image = await pathToBase64(imagePaths[1]);
      // second_image = base64ToBlob(second_image);

      uni.uploadFile({
        url: HTTP_URL_BACK + '/' + 'upload_first_image/',
        // files: [
        //   { uri: imagePaths[1], name: 'first_image' },
        //   { uri: imagePaths[0], name: 'second_image' },
        // ],
        filePath: imagePaths[0],
        name: 'first_image',
        // fileType: 'image',
        formData: {
          user_id: uni.getStorageSync('userId'),
          // csrfmiddlewaretoken:
          //   'rbgtf3YupolnomLnB8MsIupKaMb82JdSRajYLMTZm5RVbhvGdDjyFA7mRpakbehb',
          // first_image_base64: first_image,
          // second_image_base64: second_image,
          src_face_index: 0,
          dst_face_index: 0,
        },
        header: {
          accept: 'application/json',
          contentype: 'multipart/form-data',
          // enctype:	'multipart/form-data',
        },
        success: function (res) {
          if (res.statusCode == 200) {
            let data = res.data ? JSON.parse(res.data) : {};
            // that.taskId = data.task_id;
            that.saved_id = data.saved_id;
            // that.outputImages.push({
            //   path: '',
            //   status: 'pending',
            //   taskId: data.task_id,
            // });
            that.uploadSecond(imagePaths);
          }
        },
        fail: function (res) {
          uni.showToast({
            icon: 'none',
            title: '上传图片失败',
          });
        },
      });
    },
    uploadSecond(imagePaths) {
      let that = this;
      uni.uploadFile({
        url: HTTP_URL_BACK + '/' + 'upload_second_image/',
        // files: [
        //   { uri: imagePaths[1], name: 'first_image' },
        //   { uri: imagePaths[0], name: 'second_image' },
        // ],
        filePath: this.srcTempFilePath,
        name: 'second_image',
        // fileType: 'image',
        formData: {
          user_id: uni.getStorageSync('userId'),
          saved_id: this.saved_id,
          // csrfmiddlewaretoken:
          //   'rbgtf3YupolnomLnB8MsIupKaMb82JdSRajYLMTZm5RVbhvGdDjyFA7mRpakbehb',
          // first_image_base64: first_image,
          // second_image_base64: second_image,
          // src_face_index: 0,
          // dst_face_index: 0,
        },
        header: {
          accept: 'application/json',
          contentype: 'multipart/form-data',
          // enctype:	'multipart/form-data',
        },
        success: function (res) {
          if (res.statusCode == 200) {
            let data = res.data ? JSON.parse(res.data) : {};
            that.taskId = data.task_id;
            that.outputImages.push({
              path: '',
              status: 'pending',
              taskId: data.task_id,
            });
            that.getImage(data.task_id);
          }
        },
        fail: function (res) {
          uni.showToast({
            icon: 'none',
            title: '上传图片失败',
          });
        },
      });
    },
    async getImage(taskId) {
      this.timers[taskId] = setInterval(async () => {
        let res = await checkTaskStatusByTaskId(taskId);
        if (res.status === 'SUCCESS') {
          let image =
            this.outputImages.find((image) => image.taskId === taskId) || {};
          image.path = HTTP_URL_BACK + res.processed_image_url;
          image.status = 'SUCCESS';
          clearInterval(this.timers[taskId]);
        }
      }, 4000);
    },

    async swap() {
      if (!uni.getStorageSync('userId')) {
				this.$refs.loginRef.show();
        return;
      }

      if (!this.$refs.selfRef.isSelfUpload) {
        uni.showToast({
          title: '请选择人脸图片',
          icon: 'none',
        });
        return;
      }

      this.uploadImg(this.$refs.selfRef.imagePaths);
    },
  },
};
</script>

<style lang="scss">
.tip {
  // margin: 20rpx 20rpx 20rpx 20rpx;
  /deep/ .u-alert-title {
    font-size: 26rpx !important;
  }
  /deep/ .u-alert-desc {
    font-size: 22rpx !important;
  }
  background: #f5e6ef;
}
.image-wrap {
  position: relative;
  .avatar {
    position: absolute;
    right: 20rpx;
    bottom: 30rpx;
  }
  .image {
    width: 100%;
  }
}
.xsms-scroll {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.swap {
  position: fixed;
  bottom: 60rpx;
  margin: 0 40rpx;
  width: 90%;
}
</style>
