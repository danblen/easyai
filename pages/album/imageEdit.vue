<template>
  <view>
    <u-navbar
      :border-bottom="false"
      style="background: transparent"
      title="AI修图"
    ></u-navbar>
    <view class="image-wrap">
      <u-image
        class="image"
        :src="url"
        :style="{
          width: '100%',
          height: '100%',
        }"
        mode="widthFix"
      />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      tempFilePath: '',
    };
  },
  onLoad(options) {
    this.url = options.url;
    this.downloadImages(this.url);
  },
  methods: {
    downloadImages(imageUrl) {
      let that = this;
      return new Promise((resolve, reject) => {
        uni.downloadFile({
          url: imageUrl,
          success: (res) => {
            if (res.statusCode === 200) {
              that.tempFilePath = res.tempFilePath;
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
  },
};
</script>

<style lang="scss" scoped></style>
