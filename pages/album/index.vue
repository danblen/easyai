<template>
  <view class="container-index">
    <u-navbar
      :is-back="false"
      :border-bottom="false"
      style="background: transparent"
      title="作品"
    ></u-navbar>
    <u-tabs-swiper
      activeColor="#555"
      inactive-color="#777"
      :active-item-style="{ color: '#555', fontSize: '32rpx' }"
      style="background: transparent"
      height="70"
      swiperWidth="750"
      :list="list"
      :current="current"
      ref="tabs"
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
          <view
            v-if="pendingLoading"
            style="display: flex; justify-content: center; margin-top: 400rpx"
          >
            <u-loading mode="circle" :show="pendingLoading"></u-loading>
          </view>
          <imageList v-else :images="pendingImages" />
        </scroll-view>
      </swiper-item>
      <swiper-item class="swiper-item">
        <scroll-view
          scroll-y
          style="height: 100%; width: 100%"
          @scrolltolower="reachBottom"
        >
          <view
            v-if="completeLoading"
            style="display: flex; justify-content: center; margin-top: 400rpx"
          >
            <u-loading mode="circle" :show="completeLoading"></u-loading>
          </view>
          <imageList v-else :images="completeImages" />
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import {
  checkTaskStatusByTaskId,
  get_pending_tasks_on_user,
  get_completed_tasks_on_user,
  test,
} from '@/services/api.js';
import imageList from './imageList.vue';
import { URL_SD, URL_BACK } from '@/services/app.js';
export default {
  components: { imageList },
  data() {
    return {
      pendingImages: [],
      completeImages: [],
      list: [
        {
          name: '进行中',
        },
        {
          name: '已完成',
        },
      ],
      pendingLoading: false,
      completeLoading: false,
      current: 0,
      swiperCurrent: 0,
      tabsHeight: 0,
      dx: 0,
    };
  },
  onShow() {
    this.get_pending_tasks();
    this.get_completed_tasks();
  },

  methods: {
    async get_pending_tasks() {
      this.pendingLoading = true;
      let res = await get_pending_tasks_on_user(
        uni.getStorageSync('userInfo').userId,
      ).finally(() => {
        this.pendingLoading = false;
      });
      this.pendingImages = res.pending_tasks.map((item) => ({
        url: URL_BACK + item.processed_image_url,
      }));
    },
    async get_completed_tasks() {
      this.completeLoading = true;
      let res = await get_completed_tasks_on_user(
        uni.getStorageSync('userInfo').userId,
      ).finally(() => {
        this.completeLoading = false;
      });
      this.completeImages = res.completed_tasks.map((item) => ({
        url: URL_BACK + item.processed_image_url,
      }));
      this.completeLoading = false;
    },
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

<style scoped lang="scss">
.container-index {
  /* height: 2000rpx; */
}
.swiper-box {
  height: 1200rpx;
}
.title {
  font-size: 40rpx;
  font-weight: bold;
  margin: 20rpx 0 0 20rpx;
}
.text {
  margin-left: 10rpx;
  margin-bottom: 2rpx;
}
</style>
<style lang="scss">
// weixin
page {
  background: $color-linear2;
}
</style>
