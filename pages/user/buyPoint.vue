<template>
  <view>
    <u-cell-group>
      <u-cell-item
        icon="integral-fill"
        title="1次卡"
        value="￥0.5（￥0.5/次）"
      ></u-cell-item>
      <u-cell-item
        icon="integral-fill"
        title="5次卡"
        value="￥1.99 （￥0.4/次）"
      ></u-cell-item>
      <u-cell-item
        icon="integral-fill"
        title="10次卡"
        value="￥2.99（￥0.3/次）"
      ></u-cell-item>
      <u-cell-item
        icon="integral-fill"
        title="20次卡"
        value="￥3.99（￥0.2/次）"
      ></u-cell-item>
      <u-cell-item
        icon="integral-fill"
        title="50次卡"
        value="￥8.99（￥0.1/次）"
      ></u-cell-item>
    </u-cell-group>
  </view>
</template>

<script>
// import grid from './grid.vue';
export default {
  // components: { grid },
  props: {},
  data() {
    return {};
  },
  methods: {
    onBuyPoint() {},
  },
};
</script>

<style lang="scss" scoped>
.slot-content {
  font-size: 20rpx;
  margin: 20rpx;
  text-align: center;
  color: $u-content-color;
}
</style>
