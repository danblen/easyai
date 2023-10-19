<template>
  <view style="">
    <u-swiper
      height="1100"
      :list="[
        { image: 'https://danblen.github.io/static/index.jpg' },
        { image: 'https://danblen.github.io/static/index.jpg' },
        { image: 'https://danblen.github.io/static/index.jpg' },
      ]"
    ></u-swiper>
    <view style="position: relative; top: -50rpx;background:#fff">
      <view style="display: flex; justify-content: center">
        <step text="1.选择写真集"></step>
        <step text="2.上传照片"></step>
        <step text="3.下载写真集"></step>
      </view>
    </view>
    <!-- <image
      mode="widthFix"
      style="width: 100%"
      src="https://danblen.github.io/static/index.jpg"
    ></image> -->

    <!-- <image
      mode="widthFix"
      style="width: 100%; position: absolute; bottom: 20rpx"
      src="./index.jpg"
    ></image>
    <image
      mode="widthFix"
      style="width: 100%; position: absolute; top: 60rpx"
      src="./vmake2.jpg"
    ></image> -->
    <u-button
      class="swap"
      type="primary"
      style="
        position: fixed;
        bottom: 40rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 70%;
        animation: swap 1s infinite;
        opacity: 0.8;
        font-weight: bold;
      "
      :custom-style="{
        background: 'linear-gradient(to right, #00467f, #a5cc82)',
        boxShadow: '0 0 10rpx #a5cc82',
      }"
      :ripple="true"
      shape="circle"
      @click="start"
    >
      开始制作
    </u-button>
  </view>
</template>

<script>
import step from './step.vue';
export default {
  components: { step },
  data() {
    return {};
  },
  methods: {
    start() {},
  },
};
</script>

<style lang="scss" scoped></style>
<style lang="scss">
// weixin
page {
  background: $color-linear2;
}
</style>
