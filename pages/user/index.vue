<template>
  <view>
    <u-navbar :is-back="false" :border-bottom="false"></u-navbar>

    <view v-if="isLogin" class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
      <view class="u-m-r-10">
        <u-avatar :src="userInfo.avatarUrl" size="140"></u-avatar>
      </view>

      <view class="u-flex-1">
        <view class="u-font-18 u-p-b-20">{{ userInfo.nickName }}</view>
        <view class="u-font-14 u-tips-color">ID:{{ userInfo.code }}</view>
      </view>
      <view class="u-m-l-10 u-p-10">
        <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
      </view>
    </view>
    <view v-else class="user-box u-p-l-30 u-p-r-20 u-p-b-40">
      <view class="u-m-r-10" :style="{ textAlign: 'center', fontSize: '20px' }">
        欢迎来到AI写真
      </view>
      <view>
        <button
          type="primary"
          size="medium"
          :style="{ width: '50%' }"
          class="u-d-b w-100 mb-30"
          @click="login"
        >
          微信一键登陆
        </button>
      </view>
    </view>

    <!-- <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="rmb-circle" title="支付"></u-cell-item>
      </u-cell-group>
    </view> -->

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="star" title="签到"></u-cell-item>
        <!-- <u-cell-item icon="photo" title="相册"></u-cell-item> -->
        <!-- <u-cell-item icon="coupon" title="卡券"></u-cell-item>
        <u-cell-item icon="heart" title="关注"></u-cell-item> -->
      </u-cell-group>
    </view>

    <!-- <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="setting" title="设置"></u-cell-item>
      </u-cell-group>
    </view> -->
    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item
          icon="question-circle"
          title="问题反馈"
          @click="on"
        ></u-cell-item>
      </u-cell-group>
    </view>
    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item
          icon="question-circle"
          title="联系我们"
          @click="onContact"
        ></u-cell-item>
      </u-cell-group>
    </view>

    <view
      style="
        text-align: center;
        position: fixed;
        bottom: 0;
        margin-bottom: 120rpx;
        width: 100%;
        font-size: 18rpx;
      "
    >
      <text class="version">版本号 v1.0.0</text>
    </view>
  </view>
</template>

<script>
// import version from './version.vue';
import { getUserInfo } from '../common/user.js';
export default {
  components: {
    // version,
  },
  data() {
    return {
      pic: 'https://uviewui.com/common/logo.png',
      show: true,
      isLogin: false,
      userInfo: {
        nickName: '',
        avatarUrl: '',
        code: '',
      },
    };
  },
  onLoad() {
    uni.getStorageSync('userId')
      ? (this.isLogin = true)
      : (this.isLogin = false);
  },
  methods: {
    login() {
       getUserInfo();
    },
    onContact() {
      uni.showModal({
        title: '联系我们',
        content: '请联系邮箱:1920669740@qq.com',
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #ededed;
}

.user-box {
  background-color: #fff;
}
</style>
