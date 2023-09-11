<template>
  <view>
    <u-cell-group>
      <u-cell-item
        title="点击签到"
        icon="question-circle"
        @click="onGetPoint"
      ></u-cell-item>
    </u-cell-group>
    <u-modal
      v-model="show"
      :title-style="{}"
      :content-style="{ fontSize: '10rpx', color: 'red' }"
      title="恭喜你，获得1次自定义机会"
      :content="content"
      :show-cancel-button="false"
      :mask-close-able="true"
    >
      <view class="slot-content">
        <rich-text :nodes="content"></rich-text>
      </view>
    </u-modal>
  </view>
</template>

<script>
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {
      show: false,
      content: `
					成功分享给群好友也可以获得1次自定义机会哦
				`,
    };
  },
  methods: {
    onGetPoint() {
      this.show = true;
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
