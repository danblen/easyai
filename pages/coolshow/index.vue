<template>
<view>

<u-navbar :is-back="false"   :border-bottom="false">热门 </u-navbar>
  <scroll-view class="container container-index" style="overflow-y: scroll">
    <view v-if="SHOW_TIP">
      <add-tips :statusBarHeight="statusBarHeight" />
    </view>
    <grid :style="{ 'margin-top': statusBarHeight + 80 + 'px' }"></grid>
    <waterfall ref="fallRef"></waterfall>
  </scroll-view>
</view>
</template>

<script>
import waterfall from './waterfall.vue';
// 在页面中定义插屏广告
let interstitialAd = null;

export default {
  components: { waterfall },
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
  onReachBottom() {
    this.$refs.fallRef.reachBottom();
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
  },
};
</script>

<style scoped>
/*  */
</style>
