<template>
  <view>
    <u-navbar :is-back="false" :border-bottom="false"></u-navbar>

    <view style="background: transparent">
      <view
        v-if="userInfo.userId"
        class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30"
      >
        <view class="u-m-r-10">
          <u-avatar :src="userInfo.avatarUrl" size="140"></u-avatar>
        </view>

        <view class="u-flex-1">
          <view class="u-font-18 u-p-b-20">微信用户</view>
          <view class="u-font-14 u-tips-color">ID:{{ userInfo.userId }}</view>
        </view>
        <view class="u-m-l-10 u-p-10">
          <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
        </view>
      </view>
      <view v-else class="user-box u-p-l-30 u-p-r-20 u-p-b-40">
        <view :style="{ textAlign: 'center', fontSize: '20px' }">
          欢迎来到AI写真
        </view>
        <u-button
          type="primary"
          style="position: relative; width: 30%; animation: swap 1s infinite"
          shape="circle"
          :customStyle="{
            width: '240rpx',
          }"
          class="swap"
          :loading="loading"
          @click="login"
        >
          微信一键登陆
        </u-button>
      </view>
    </view>

    <view style="padding: 20rpx">
      <view class="u-m-t-20" style="border-radius: 20rpx">
        <u-cell-group>
          <u-cell-item
            icon="photo"
            title="剩余次数"
            :value="userInfo.points"
          ></u-cell-item>
          <getPoint
            :isCheck="userInfo.isCheck"
            @getCheckUserInfo="getCheckUserInfo"
          />
          <u-cell-item
            title="购买次卡"
            icon="star"
            @click="onBuyPoint"
          ></u-cell-item>
          <u-popup v-model="showBuyPointPopup" mode="bottom">
            <buyPoint />
          </u-popup>
        </u-cell-group>
      </view>

      <view class="u-m-t-20">
        <u-cell-group>
          <u-cell-item
            icon="question-circle"
            title="问题反馈"
            @click="on"
          ></u-cell-item>
          <u-cell-item
            icon="question-circle"
            title="联系我们"
            @click="onContact"
          ></u-cell-item>
        </u-cell-group>
      </view>
      <view class="u-m-t-20">
        <u-cell-group>
          <u-cell-item
            icon="question-circle"
            title="退出登录"
            @click="onLogout"
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
      <u-modal
        title="欢迎登录"
        v-model="showModal"
        :show-confirm-button="false"
        :show-cancel-button="true"
      >
        <view class="slot-content">
          <view style="margin-top: 40rpx"></view>
          <u-button
            type="primary"
            style="position: relative; animation: swap 1s infinite"
            :customStyle="{
              width: '92%',
            }"
            shape="circle"
            class="swap"
            :loading="loading"
            @click="onConfirmLogin"
          >
            微信授权登录
          </u-button>
          <view style="font-size: 24rpx; margin: 40rpx 0">
            <u-checkbox
              v-model="isCheckPolicy"
              style="position: relative; left: 25rpx"
            ></u-checkbox>
            <text>我已阅读并同意</text>
            <text style="color: blue" @click="onViewServicePolicy">
              《服务协议》
            </text>
            和
            <text style="color: blue" @click="onViewPrivacyPolicy">
              《隐私协议》
            </text>
          </view>
        </view>
      </u-modal>
    </view>
  </view>
</template>

<script>
import getPoint from "./getPoint.vue";
import buyPoint from "./buyPoint.vue";
import { wechatLogin } from "../common/user.js";
import { get_user } from "@/services/api.js";
export default {
  components: {
    getPoint,
    buyPoint,
  },
  data() {
    return {
      pic: "https://uviewui.com/common/logo.png",
      showBuyPointPopup: false,
      loading: false,
      showModal: false,
      isCheckPolicy: false,
      userInfo: {
        points: 10,
        userId: "",
        isCheck: false,
        avatarUrl: "",
      },
    };
  },
  async onShow() {
    if (uni.getStorageSync("userInfo").userId) {
      this.getUser();
    } else {
    }
  },
  methods: {
    onBuyPoint() {
      this.showBuyPointPopup = true;
    },
    getCheckUserInfo(user) {
      this.userInfo.isCheck = user.isCheck;
      this.userInfo.points = user.points;
    },
    async getUser() {
      let res = await get_user({
        user_id: uni.getStorageSync("userInfo").userId,
      });
      if (res) {
        this.userInfo.userId = res.user.user_id;
        this.userInfo.points = res.user.points;
        this.userInfo.isCheck = res.user.is_check;
      }
    },
    async login() {
      this.showModal = true;
    },
    async onConfirmLogin() {
      if (!this.isCheckPolicy) {
        uni.showToast({
          title: "请勾选我已阅读并同意《服务协议》和《隐私协议》",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      let res = await wechatLogin();
      if (res) {
        this.userInfo.points = res.user.points;
        this.userInfo.isCheck = res.user.is_check;
        this.userInfo.userId = res.user.user_id;
        uni.setStorageSync("userInfo", this.userInfo);
      }
    },
    onViewServicePolicy() {
      uni.navigateTo({
        url: "/pages/user/servicePolicy", // 用于显示用户协议和服务条款的页面路径
      });
    },
    onLogout() {
      this.userInfo = {
        points: 0,
        userId: "",
        isCheck: false,
        avatarUrl: "",
      };
      uni.setStorageSync("userInfo", this.userInfo);
    },
    onContact() {
      uni.showModal({
        title: "联系我们",
        content: "请联系邮箱:1920669740@qq.com",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-box {
  background-color: #fff;
}
</style>
<style lang="scss">
// weixin
page {
  background: $color-linear2;
}
</style>
