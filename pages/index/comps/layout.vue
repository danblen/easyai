<template>
  <view class="wrap">
    <u-row gutter="16">
      <u-col span="6">
        <view class="demo-layout bg">
          <u-icon name="photo" :size="46"></u-icon>
          <view class=" ">专业模式</view>
        </view>
      </u-col>
      <u-col span="6">
        <view class="demo-layout bg"></view>
      </u-col>
    </u-row>
    <u-row gutter="16" justify="space-between">
      <u-col span="6">
        <view class="demo-layout bg"></view>
      </u-col>
      <u-col span="6">
        <view class="demo-layout bg"></view>
      </u-col>
    </u-row>
  </view>
</template>

<style scoped lang="scss">
.wrap {
  padding: 24rpx;
}

.u-row {
  margin: 40rpx 0;
}

.demo-layout {
  height: 180rpx;
  border-radius: 18rpx;
  padding: 24rpx;
  text-align: center;
}

.bg {
  background: #d3dce6;
  // background: #e5e9f2;
}
</style>
