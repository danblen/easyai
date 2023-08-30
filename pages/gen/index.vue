<template>
  <view class="wrap">
    <u-navbar :is-back="false" :border-bottom="false" title="AI写真"></u-navbar>
    <view class="u-tabs-box">
      <u-tabs-swiper
        activeColor="#f588cb"
        ref="tabs"
        :list="list"
        :current="current"
        @change="change"
        :is-scroll="true"
        swiperWidth="750"
      ></u-tabs-swiper>
    </view>
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
          <txt2img2 ref="Ref" />
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view
          scroll-y
          style="height: 100%; width: 100%"
          @scrolltolower="reachBottom"
        >
          <txt2img ref="hotRef" />
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
import txt2img2 from './txt2img/index.vue';
import txt from './txt2img/txt.vue';
export default {
  components: { txt2img2, txt2img, txt },
  data() {
    return {
      list: [
        {
          name: '文生图',
        },
        {
          name: '图生图',
        },
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
  padding: 0 20rpx;
}
.swiper-box {
  flex: 1;
}
.swiper-item {
  height: 100%;
}
</style>
