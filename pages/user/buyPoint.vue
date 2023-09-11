<template>
  <view>
    <u-cell-item
      title="购买次卡"
      icon="star"
      @click="onGetPoint"
    ></u-cell-item>
  </view>
</template>

<script>
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {
    };
  },
  methods: {
    onBuyPoint() {
      if (!this.isGetPoint) {
        this.isGetPoint = true;
        this.show = true;
      } else {
        uni.showToast({
          title: '今日已签到啦~',
          icon: 'none',
          duration: 2000,
        });
      }
    },
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
