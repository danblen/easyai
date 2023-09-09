<template>
  <view class="view" style="backgroud-color: #123">
    点击上传照片，可上传多张进行选择
    <z-upload
      :class="{
        upload1: fileList.length === 1,
        upload2: fileList.length === 2,
        upload3: fileList.length === 3,
        upload4: fileList.length === 4,
        upload5: fileList.length === 5,
      }"
      :max-count="5"
      :width="150"
      :height="150"
      @on-choose-complete="onChooseComplete"
      @on-remove.stop="onRemove"
      @on-preview.stop="onPreview"
      :auto-upload="false"
    ></z-upload>
    <scroll-view
      scroll-x
      style="height: 100%; width: 100%; backgroud: #123"
      class="xsms-scroll wrap"
    >
      <view
        v-for="(image, index) in images"
        :key="index"
        :style="{
          width: '100rpx',
          height: '100rpx',
          marginRight: '10rpx',
          display: 'inline-block',
        }"
      >
        <u-image
          style="
            width: 100rpx;
            height: 100rpx;
            display: inline-block;
            textalign: center;
            vertical-align: middle;
          "
          :style="{
            border: chosedImage === image ? '4rpx solid #f06666' : '',
          }"
          :src="image"
          mode="widthFix"
          @click="onChoose(index)"
        ></u-image>
        <u-icon
          name="close"
          style="font: 20rpx bold; color: red; position: absolute; left: 80rpx"
          inactive-color="white"
        ></u-icon>
      </view>
      <view
        @click="uploadFile"
        style="
          width: 100rpx;
          height: 100rpx;
          display: inline-block;
          textalign: center;
          vertical-align: middle;
        "
        :style="{
          border: '1px solid #ccc',
        }"
      >
        <u-icon
          name="plus"
          style="position: relative; top: 25rpx; left: 35rpx"
        ></u-icon>
        <!-- <view
          :style="{
            position: 'relative',
            top: '30rpx',
          }"
        >
          上传照片
        </view> -->
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { HTTP_URL_SD, HTTP_URL_BACK } from '@/services/app.js';
import { checkTaskStatus } from '@/services/api.js';
export default {
  data() {
    return { fileList: [], isSelfUpload: false, images: [], chosedImage: '' };
  },
  created() {
    // 监听从裁剪页发布的事件，获得裁剪结果
    uni.$on('uAvatarCropper', (path) => {
      this.avatar = path;
      // 可以在此上传到服务端
      uni.uploadFile({
        url: 'http://www.example.com/upload',
        filePath: path,
        name: 'file',
        complete: (res) => {
          console.log(res);
        },
      });
    });
  },
  methods: {
    onChooseComplete(list,name){
      this.fileList = list;
    },
    onPreview(){
      console.log('onPreview');
    },
    onRemove(){
      console.log('onRemove');
    },

    onChoose(index) {
      this.chosedImage = this.images[index];
    },
    clearImage() {
      this.formData.have_img = false;
      this.formData.image_path = '';
    },
    uploadFile() {
      let that = this;
      uni.chooseImage({
        count: 2, //最多可以选择的图片总数
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          that.images.push(...res.tempFilePaths);
          if (that.images.length === 1) {
            this.chosedImage = that.images[1];
          }
          // that.src = res.tempFilePaths[0];
          that.isSelfUpload = true;
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.view {
  padding: 10rpx;
}
.wrap {
  padding: 10rpx;
  background: rgb(186, 173, 194);
}
.upload1 /deep/ .u-preview-wrap:nth-child(1) {
  border: 2px solid red;
}
.upload2 /deep/ .u-preview-wrap:nth-child(2) {
  border: 2px solid red;
}
.upload3 /deep/ .u-preview-wrap:nth-child(3) {
  border: 2px solid red;
}
.xsms-scroll {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  // background: #f06666;
}
</style>
