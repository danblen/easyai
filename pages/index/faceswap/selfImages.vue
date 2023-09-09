<template>
  <view>
    <scroll-view scroll-x style="height: 100%; width: 100%" class="xsms-scroll">
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
        <u-image
          :style="{
            width: '200rpx',
            height: '200rpx',
            display: 'inline-block',
            textAlign: 'center',
            verticalAlign: 'middle',
            border: chosedImage===image?'4rpx solid #f06666':'',
          }"
          :src="image"
          mode="widthFix"
          @click="onChoose(index)"
        ></u-image>
      </view>
      <view
        @click="uploadFile"
        :style="{
          width: '200rpx',
          height: '200rpx',
          display: 'inline-block',
          textAlign: 'center',
          verticalAlign: 'middle',
          border: '1px solid #ccc',
        }"
      >
        <u-icon
          name="plus"
          :style="{
            position: 'relative',
            top: '50rpx',
          }"
        ></u-icon>
        <view
          :style="{
            position: 'relative',
            top: '55rpx',
          }"
        >
          上传
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { HTTP_URL_SD, HTTP_URL_BACK } from '@/services/app.js';
import { checkTaskStatus } from '@/services/api.js';
export default {
  data() {
    return {
      isSelfUpload: false,
      images: [],
      chosedImage: '',
    };
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
          if(that.images.length===1){
            this.chosedImage=that.images[1]
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
.xsms-scroll {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  // background: #f06666;
}
</style>
