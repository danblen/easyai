<template>
  <view>
    <view
      style="
        overflow: hidden;
        width: 180rpx;
        height: 180rpx;
        border: 2rpx solid #aaa;
        border-radius: 40rpx;
        background: #fff;
        margin: 20rpx;
      "
    >
      <image
        style="height: 200rpx"
        :src="imageSrc"
        mode="aspectFill"
      />
    </view>
    <view style="text-align: center; color; font-size: 24rpx">
      {{ text }}
    </view>
    <!-- <view
      style="
        width: 150rpx;
        margin-left:20rpx;
        border-radius: 20%;
        -webkit-text-stroke: 1px black;
        font-size: 40rpx;
        font-weight: bold;
        color: transparent;
      "
    >
      {{ text }}
    </view> -->
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    imageSrc: String,
  },
};
</script>

<style></style>
