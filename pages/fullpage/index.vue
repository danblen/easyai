<template>
  <view
    style="background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9)"
  >
    <image mode="widthFix" style="width: 100%" src="./index.jpg"></image>
    <view style="display: flex; justify-content: center">
      <!-- 优化样式 -->
      <view>
        <view
          style="
            overflow: hidden;
            width: 150rpx;
            height: 260rpx;
            border: 2rpx solid #aaa;
            border-radius: 75rpx;
            background: #fff;
            margin: 20rpx;
          "
        >
          <image
            style="height: 150rpx"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            mode="aspectFill"
          />
          <view style="height: 100rpx">选择艺术照</view>
        </view>
        <view
          style="
            width: 150rpx;
            height: 100rpx;
            border-radius: 20%;
            -webkit-text-stroke: 1px black;
            font-size: 40rpx;
            font-weight: bold;
            color: transparent;
          "
        >
          STEP 1
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
