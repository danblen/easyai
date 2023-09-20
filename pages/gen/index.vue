<template>
  <view class="wrap">
    <u-navbar :is-back="false" :border-bottom="false" title="AI写真"></u-navbar>
    <u-tabs-swiper
      activeColor="#555"
      inactive-color="#777"
      :active-item-style="{ color: '#555', fontSize: '32rpx' }"
      height="70"
      swiperWidth="750"
      ref="tabs"
      class="aaa"
      style="background: transparent"
      :list="list"
      :current="current"
      @change="change"
      :is-scroll="true"
    ></u-tabs-swiper>

    <swiper
      class="swiper-box"
      :current="swiperCurrent"
      @transition="transition"
      @animationfinish="animationfinish"
    >
      <swiper-item class="swiper-item">
        <scroll-view
          scroll-y
          style="height: 100%; width: 100%"
          @scrolltolower="reachBottom"
        >
          <txt2img ref="Ref" />
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view
          scroll-y
          style="height: 100%; width: 100%"
          @scrolltolower="reachBottom"
        >
          <imageEdit ref="hotRef" />
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view
          scroll-y
          style="height: 100%; width: 100%"
          @scrolltolower="reachBottom"
        >
          <txt2img2 ref="Ref" />
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import txt2img from './txt2img.vue';
import imageEdit from './imageEdit.vue';
import txt2img2 from './txt2img/index.vue';
import txt from './txt2img/txt.vue';
export default {
  components: { imageEdit, txt2img, txt },
  data() {
    return {
      list: [
        {
          name: '文生图',
        },
        {
          name: 'AI修图',
        },
        // {
        //   name: '图片去背景',
        // },
      ],
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      dx: 0,
    };
  },
  onLoad() {},
  computed: {},
  methods: {
    reachBottom() {},
    // tab栏切换
    change(index) {
      this.swiperCurrent = index;
    },
    transition({ detail: { dx } }) {
      this.$refs.tabs.setDx(dx);
    },
    animationfinish({ detail: { current } }) {
      this.$refs.tabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--window-top));
}
.swiper-box {
  padding: 0 20rpx;
  flex: 1;
}
.swiper-item {
  height: 100%;
}
</style>

<style lang="scss">
// weixin
page {
  background: $color-linear2;
}
</style>
