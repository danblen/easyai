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
import { HTTP_URL_SD } from '@/services/app.js';
export default {
  data() {
    return {
      src: '',
      mode: 'circle',
      size: '90',
      showLevel: true,
      isSelfUpload:false
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
        count: 1, //最多可以选择的图片总数
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          that.src = res.tempFilePaths[0];
          that.isSelfUpload=true
          
          //启动上传等待中...
          uni.showLoading({
            title: '图片上传中',
            mask: true,
          });

          let imgPath = res.tempFilePaths[0];

          that.uploadImgWithPath('upload_image/', imgPath);
        },
      });
    },
    uploadImgWithPath(uploadUrl, imgPath, successCallback, errorCallback) {
      let that = this;
      // 默认sd上传
      let server_url = HTTP_URL_SD + '/' + uploadUrl;

      uni.uploadFile({
        url: server_url,
        filePath: imgPath,
        name: 'image',
        formData: {
          user_id: '123456',
          csrfmiddlewaretoken:
            'dV4ksJkxJdx1VWkD737opGmHQNOQf8DJzFeyCpuD1ZxB80lyXqXDsvyPJ55PWP0i',
        },
        header: {
          accept: 'application/json',
          contentype: 'multipart/form-data',
        },
        // fileType: 'image',
        success: function (res) {
          // console.log('图片上传成功', res)

          uni.hideLoading();
          if (res.statusCode == 200) {
            let data = res.data ? JSON.parse(res.data) : {};
          } else {
            // console.log("rk===>[传完了Err:data]", res);
            let data = res.data ? JSON.parse(res.data) : {};
            // console.log("rk===>[传完了Err:data]", data);
            if (uploadType == 'mj') {
              showToast(data.message);
            } else {
              showToast(res.data);
            }
          }
        },
        fail: function (res) {
          // console.log('=====errr==>',res)
          uni.hideLoading();
          showToast('上传图片失败');
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
