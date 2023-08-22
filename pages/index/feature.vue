<template>
  <u-grid :col="3">
    <u-grid-item @click="go('/pages/index/sd-gen-pic')">
      <u-icon name="photo" :size="46"></u-icon>
      <view class="grid-text">专业模式</view>
    </u-grid-item>
    <u-grid-item>
      <u-icon name="lock" :size="46"></u-icon>
      <view class="grid-text">AI换脸</view>
    </u-grid-item>
    <u-grid-item>
      <u-icon name="hourglass" :size="46"></u-icon>
      <view class="grid-text">制作数字分身</view>
    </u-grid-item>
  </u-grid>
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

<style></style>
