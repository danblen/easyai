<template>
  <view class="image-cover" v-if="outputImages.length">
    <view class="image-cover-close">已制作图集</view>
    <scroll-view scroll-x style="height: 100%; width: 100%" class="xsms-scroll">
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
</template>

<script>
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {
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
  methods: {
    onPreviewImage(index) {
      uni.previewImage({
        current: index, // 当前显示图片的索引
        urls: this.outputImages.map((image) => image.path), // 图片列表
      });
    },

    async uploadImg(imagePaths, successCallback, errorCallback) {
      let that = this;

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
  },
};
</script>

<style lang="scss" scoped></style>
