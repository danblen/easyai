<template>
  <view class="wrap">
    <view class="grid-container">
      <view class="grid-item" @click="go('/pages/index/zsdGenPic')">
        <u-icon name="photo" :size="46"></u-icon>
        <view class=" ">专业模式</view>
      </view>
      <view class="grid-item" @click="go('/pages/faceswap/index')">
        <u-icon name="lock" :size="46"></u-icon>
        <view class=" ">AI换脸</view>
      </view>
      <view class="grid-item" @click="go('/pages/index/lazy')">
        <u-icon name="hourglass" :size="46"></u-icon>
        <view>制作数字分身</view>
      </view>
      <view class="grid-item" @click="go()">
        <u-icon name="hourglass" :size="46"></u-icon>
        <view>制作数字分身</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    go(url) {
      uni.navigateTo({
        url,
      });
    },
  },
};
</script>

<style>
.wrap {
  display: flex;
  justify-content: center;
}
.grid-container {
  width: 95%;
  margin-top: 20rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30rpx; /* 添加项之间的边距 */
}

.grid-item {
  border-radius: 14px;
  background-color: #b9cad8;
  padding: 20px;
  text-align: center;
}
</style>
