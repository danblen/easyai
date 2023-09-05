<template>
  <view>
    <!-- <view class="photo" @click="uploadFile">
      <u-icon  class="camera"  name="photo" size="50"></u-icon>
      <u-icon class="plus" name="plus"></u-icon>
    </view> -->
    <!-- <view class="wrap">
      <view class="u-avatar-wrap">
        <image class="u-avatar-demo" :src="avatar" mode="aspectFill"></image>
      </view>
      <u-button @tap="chooseAvatar">进入裁剪页</u-button>
    </view> -->
    <u-avatar
      class="avatar"
      :src="src"
      :showLevel="showLevel"
      @click="uploadFile"
    ></u-avatar>
  </view>
</template>

<script>
import { HTTP_URL_SD, HTTP_URL_BACK } from '@/services/app.js';
import { checkTaskStatus } from '@/services/api.js';
export default {
  data() {
    return {
      src: '',
      mode: 'circle',
      size: '90',
      showLevel: true,
      isSelfUpload: false,
      imagePaths: [],
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
    chooseAvatar() {
      // 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
      this.$u.route({
        // 关于此路径，请见下方"注意事项"
        url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
        // 内部已设置以下默认参数值，可不传这些参数
        params: {
          // 输出图片宽度，高等于宽，单位px
          destWidth: 300,
          // 裁剪框宽度，高等于宽，单位px
          rectWidth: 200,
          // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
          fileType: 'jpg',
        },
      });
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
          that.src = res.tempFilePaths[0];
          that.isSelfUpload = true;
          that.imagePaths = res.tempFilePaths;
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.photo {
  width: 100rpx;
  height: 100rpx;
  border-radius: 100rpx;
  background: $u-bg-color;
  .camera {
    position: absolute;
    left: 25rpx;
    top: 25rpx;
  }
  .plus {
    position: absolute;
    right: 10rpx;
    top: 15rpx;
  }
}
</style>
