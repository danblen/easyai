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
          :style="{ width: '50%' }"
          class="u-d-b w-100 mb-30"
          @click="getUserInfo"
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
        <u-cell-item icon="coupon" title="卡券"></u-cell-item>
        <u-cell-item icon="heart" title="关注"></u-cell-item>
      </u-cell-group>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="setting" title="设置"></u-cell-item>
      </u-cell-group>
    </view>
    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="question-circle" title="帮助与反馈"></u-cell-item>
      </u-cell-group>
    </view>
    <footer></footer>
  </view>
</template>

<script>
import footer from './footer.vue';
export default {
  components: {
    footer,
  },
  data() {
    return {
      pic: 'https://uviewui.com/common/logo.png',
      show: true,
      isLogin: false,
      userInfo: {
        nickName: '',
        avatarUrl: '',
				code:''
      },
    };
  },
  onLoad() {},
  methods: {
    getUserInfo() {
      const that = this;
      uni.getUserInfo({
        success: (res) => {
          const userInfo = res.userInfo;

          // 调用微信登录接口
          uni.login({
            success: (loginRes) => {
              if (loginRes.code) {
                // 登录成功，获取到用户的 code
                // 接下来可以将 code 发送到服务器，服务器通过 code 获取用户的 openid 和 session_key
                // 在这里可以编写发送请求的代码，向服务器发送 code
                // 一般情况下，服务器会返回一个用户标识，例如 openid

                // 获取到 openid 后，可以保存到本地缓存，用于识别用户
                uni.setStorageSync('userId', loginRes.code);
                that.isLogin = true;
                that.userInfo = userInfo;
                that.userInfo.code = loginRes.code;
                console.log('userInfo', res.userInfo.openId,res);

                // 进行其他操作，例如跳转到首页
                // uni.switchTab({
                //   url: '/pages/index/index',
                // });
              } else {
                // 登录失败
                console.log('登录失败', loginRes);
              }
            },
            fail: (loginError) => {
              // 登录失败
              console.log('登录失败', loginError);
            },
          });
        },
        fail: (error) => {
          // 用户拒绝了授权
          console.log('用户拒绝了授权', error);
        },
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
