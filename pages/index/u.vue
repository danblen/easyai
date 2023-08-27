<template>
  <view>
    <button @click="uploadFile">Choose Image</button>
    <button @click="uploadFile">Upload</button>
  </view>
</template>

<script>
import { HTTP_URL_SD } from '@/services/app.js';
export default {
  methods: {
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
.reference-box {
  .refer-content {
    margin-top: 10rpx;
    display: flex;

    .refer-item {
      background-color: #323232;
      width: 80px;
      height: 80px;
      border-radius: 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .refer-normal {
      .iconfont {
        color: #969696;
        font-size: 20px;
      }
    }

    .refer-sel {
      image {
        border-radius: 10rpx;
      }

      position: relative;

      .clear-image {
        position: absolute;
        top: -15rpx;
        right: -15rpx;

        .iconfont {
          font-size: 16px;
          color: beige;
        }
      }
    }
  }
}
</style>
