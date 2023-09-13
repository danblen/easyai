<template>
  <view>
    <u-cell-item
      title="点击签到"
      icon="star"
      :value="isCheck ? '已签到' : ''"
      @click="onGetPoint"
    ></u-cell-item>
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
import { get_points_by_check } from '@/services/api.js';
export default {
  // components: { grid },
  props: {
    isCheck: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      isGetPoint: false,
      content: `
					成功分享给群好友也可以获得1次自定义机会哦
				`,
    };
  },
  methods: {
    async onGetPoint() {
      if (this.isCheck) {
        uni.showToast({
          title: '今日已签到啦~',
          icon: 'none',
          duration: 2000,
        });
        return;
      }
      let res = await get_points_by_check({
        user_id: uni.getStorageSync('userInfo').userId,
      });
      if (res) {
        this.$emit('getCheckUserInfo', {
          isCheck: true,
          points: res.user.points,
        });
        this.show = true;
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
