<template>
  <view>
    <u-navbar :border-bottom="false" title="一键换脸"></u-navbar>
    <u-alert-tips
      class="tip"
      type="warning"
      :title="title"
      :description="description"
    ></u-alert-tips>
    <view class="area"></view>
    <view class="image-wrap">
      <img :src="src" class="image" />
      <self class="avatar" ref="selfRef"></self>
    </view>
    <view class="image-cover">
      <view class="image-cover-close">已制作图片</view>
      <!-- <img
        v-for="(image, index) in outputImages"
        :key="index"
        width="100"
        :src="image.path"
        class="image"
      /> -->
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
                top: '20%',
              }"
            ></u-loading>
            <view
              :style="{
                position: 'relative',
                top: '20%',
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

    <u-button class="swap" type="primary" @click="swap">一键换脸</u-button>
  </view>
</template>

<script>
import { txt2img, test, uploadImage, checkTaskStatus } from '@/services/api.js';
import { HTTP_URL_SD, HTTP_URL_BACK } from '@/services/app.js';
import self from './self.vue';
export default {
  components: { self },
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
      taskId: '',
      timers: {},
      outputImages: [],
    };
  },
  onLoad(options) {
    this.src = options.src;
    this.outputImages = [
      // { path: options.src, status: 'su' },
      // { path: 'https://cdn.uviewui.com/uview/swiper/2.jpg', status: 's' },
      // { path: options.src, status: 's' },
      // { path: options.src, status: 's' },
      // { path: options.src, status: 's' },
      // { path: 'asd', status: 'pending' },
    ];
  },
  unmounted() {
    clearInterval(this.timer);
  },
  methods: {
    onPreviewImage(index) {
      uni.previewImage({
        current: index, // 当前显示图片的索引
        urls: this.outputImages.map((image) => image.path), // 图片列表
      });
    },
    uploadImg(imagePaths, successCallback, errorCallback) {
      let that = this;
      let server_url = HTTP_URL_BACK + '/' + 'upload_image/';
      uni.uploadFile({
        url: server_url,
        files: [
          { uri: this.src, name: 'first_image' },
          { uri: imagePaths[1], name: 'second_image' },
        ],
        // filePath: this.images[0],
        // name: 'file',
        // name: ['image1', 'image2'],
        formData: {
          user_id: '123',
          // csrfmiddlewaretoken:
          //   'rbgtf3YupolnomLnB8MsIupKaMb82JdSRajYLMTZm5RVbhvGdDjyFA7mRpakbehb',
          // image1: this.images[0],
          // image2: this.images[1],
          src_face_index: 0,
          dst_face_index: 0,
        },
        header: {
          accept: 'application/json',
          contentype: 'multipart/form-data',
        },
        // fileType: 'image',
        success: function (res) {
          if (res.statusCode == 200) {
            let data = res.data ? JSON.parse(res.data) : {};
            that.taskId = data.task_id;
            that.outputImages.push({
              path: '',
              status: 'pending',
              taskId: data.task_id,
            });
            that.getImage(data.taskId);
          }
        },
        fail: function (res) {
          showToast('上传图片失败');
        },
      });
    },
    async getImage(taskId) {
      this.timers[taskId] = setInterval(async () => {
        let res = await checkTaskStatus(taskId);
        if (res.status === 'SUCCESS') {
          let image =
            this.outputImages.find((image) => image.taskId === taskId) || {};
          image.path = HTTP_URL_BACK + res.processed_image;
          image.status = 'SUCCESS';
          clearInterval(this.timers[taskId]);
        }
      }, 2000);
    },
    async swap() {
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
  margin: 20rpx 20rpx 20rpx 20rpx;
  /deep/ .u-alert-title {
    font-size: 26rpx !important;
  }
  /deep/ .u-alert-desc {
    font-size: 22rpx !important;
  }
}
.image-wrap {
  position: relative;
  .avatar {
    position: absolute;
    right: 20rpx;
    bottom: 40rpx;
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
  position: absolute;
  bottom: 20rpx;
  margin: 0 40rpx;
  width: 90%;
}
</style>
