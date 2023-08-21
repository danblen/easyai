<template>
  <scroll-view class="container container-index" style="overflow-y: scroll">
    <view v-if="SHOW_TIP">
      <add-tips :statusBarHeight="statusBarHeight" />
    </view>
    <!-- <view :style="{ 'margin-top': statusBarHeight + 80 + 'px' }">
      <view class="row">
        <view class="row-item">
          <view class="tui-grid-icon">
            <tui-icon name="refresh"></tui-icon>
          </view>
          <text class="tui-grid-label">制作数字分身</text>
        </view>
        <view class="row-item">
          <view class="tui-grid-icon">
            <tui-icon name="item.name"></tui-icon>
          </view>
          <text class="tui-grid-label">AI换脸</text>
        </view>
      </view>
      <view class="row">
        <view class="row-item">
          <view class="tui-grid-icon">
            <tui-icon name="item.name"></tui-icon>
          </view>
          <text class="tui-grid-label">制作数字分身</text>
        </view>
      </view>
      <view class="row-item">
        <view class="row-item">
          <view class="tui-grid-icon">
            <tui-icon name="item.name"></tui-icon>
          </view>
          <text class="tui-grid-label">AI换脸</text>
        </view>
      </view>
    </view> -->
    <grid :style="{ 'margin-top': statusBarHeight + 80 + 'px' }"></grid>
  </scroll-view>
</template>

<script>
import grid from './grid.vue';
// import sdGenPic from './sdGenPic.vue';
// 在页面中定义插屏广告
let interstitialAd = null;

export default {
  components: { grid },
  data() {
    return {
      dataList: [
        {
          name: 'refresh',
          size: 30,
        },
        {
          name: 'search',
          size: 30,
        },
        {
          name: 'close-fill',
          size: 30,
        },
        {
          name: 'shut',
          size: 30,
        },
      ],
      windowHeight: 0,
      statusBarHeight: 0,
      SHOW_TIP: false,
      rewardedVideoAdLoaded: false,
    };
  },
  onLoad() {
    uni.request({
      url: 'http://43.139.23.56:7860',
      method: 'GET',
      timeout: 600000,
      // header: header,
      // data: data || {},
      success: (res) => {
        // // console.log("rk===>[requst-suc-url]",Url,res);
        // let statusCode = res.statusCode;
        // if(statusCode == 200){
        // 	reslove(res.data);
        // }else{
        // 	let showErr = '请求失败'+statusCode;
        // 	if (!noAlert) {
        // 		utils.showToast(showErr);
        // 	}
        // 	reject(showErr);
        // }
      },
    });
    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-be801ba020f6edeb',
      });
      interstitialAd.onLoad(() => {});
      interstitialAd.onError((err) => {
        console.log(err);
      });
      interstitialAd.onClose(() => {});
    }
  },
  onShow() {
    this.statusBarHeight = getApp().globalData.statusBarHeight;
    this.windowHeight = getApp().globalData.windowHeight;
    this.SHOW_TIP = getApp().globalData.SHOW_TIP;
    console.log(this.SHOW_TIP);

    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err);
      });
    }
  },
  onShareAppMessage() {
    return {
      title: '我换上了口罩头像，防止疫情蔓延，30款口罩、护目镜任你选！',
      desc: '防传染、戴口罩，从我做起！',
      imageUrl: '/static/image/mask/avatar_mask.png',
      path: '/pages/index/index',
      success: function (res) {
        console.log(res);
      },
    };
  },
  methods: {
    realtimeInfo: function () {
      wx.navigateToMiniProgram({
        appId: 'wx1656b2e5df4e587c',
        path: 'pages/index/index',
        success(res) {
          console.log(res);
        },
        fail(e) {
          console.log(e);
        },
      });
    },
    addMask: function () {
      uni.switchTab({
        url: '/pages/mask/add-mask',
      });
    },
    nasa: function () {
      wx.navigateToMiniProgram({
        appId: 'wxd44e78294c5c5401',
        path: 'pages/board/borad',
        success(res) {
          console.log(res);
        },
        fail(e) {
          console.log(e);
        },
      });
    },
    addSlogan: function () {
      uni.switchTab({
        url: '/pages/slogan/add-slogan',
      });
    },
    addText: function () {
      uni.navigateTo({
        url: '/pages/text/add-text',
      });
    },
    chatBackground: function () {
      uni.navigateTo({
        url: '/page-chat-bg/pages/index/index',
      });
    },

    tucao: function () {
      const Tucao = requirePlugin('tucao').default;
      // 初始化并触发跳转，支持链式调用
      this.wx = uni;
      Tucao.init(this, {
        productId: 120746,
      }).go();
    },
    handleContact: function (e) {
      console.log(e.detail.path);
      console.log(e.detail.query);
    },
  },
};
</script>

<style scoped>
.row {
  /* margin: 10px; */
  display: flex;
  justify-content: space-around;
  /* align-items: flex-start; */
}
.row-item {
  border-radius: 10px;
  height: 80%;
  width: 160px;
  background: #eebebe;
}

.tui-grid-icon {
  width: 64rpx;
  height: 64rpx;
  margin: 0 auto;
  text-align: center;
  vertical-align: middle;
}

.tui-grid-label {
  display: block;
  text-align: center;
  font-weight: 400;
  color: #333;
  font-size: 28rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 10rpx;
}

.container-index {
  height: 2000rpx;
}

.logo-area {
  position: absolute;
  left: 20px;
}
.ad-container {
  width: 690rpx;
}

.about-actions {
  width: 690rpx;
}

.card-menu {
  margin-left: auto;
  margin-right: auto;
}

.free-btn-bordernone {
  background: none !important;
  color: #000 !important;
  display: inline-block !important;
}

.free-btn-bordernone::after {
  border: none;
}
</style>
