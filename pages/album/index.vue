<template>
  <view class="container-index">
    <u-navbar :is-back="false" :border-bottom="false" title="作品"></u-navbar>
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
          <view
            v-if="pendingLoading"
            style="display: flex; justify-content: center; margin-top: 500rpx"
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
            style="display: flex; justify-content: center; margin-top: 500rpx"
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
import { HTTP_URL_SD, HTTP_URL_BACK } from '@/services/app.js';
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
        uni.getStorageSync('userId'),
      ).finally(() => {
        this.pendingLoading = false;
      });
      this.pendingImages = res.pending_tasks.map((item) => ({
        url: HTTP_URL_BACK + item.processed_image_url,
      }));
    },
    async get_completed_tasks() {
      this.completeLoading = true;
      let res = await get_completed_tasks_on_user(uni.getStorageSync('userId'));
      this.completeImages = res.completed_tasks.map((item) => ({
        url: HTTP_URL_BACK + item.processed_image_url,
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

<style scoped>
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
