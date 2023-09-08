<template>
  <view class="wrap">
    <view v-if="list.length" class="item-warp">
      <view class="item" v-for="(item, index) in list" :key="index">
        <u-image
          :src="item.src"
          :style="{
            width: '100%',
            height: '100%',
          }"
          mode="widthFix"
        />
      </view>
    </view>
    <u-empty
      v-else
      text="没有已完成的作品"
      mode="list"
      style="margin-top: 100rpx"
    ></u-empty>
  </view>
</template>

<script>
import {
  checkTaskStatusByTaskId,
  get_pending_tasks_on_user,
  get_completed_tasks_on_user,
} from '@/services/api.js';
import { HTTP_URL_SD, HTTP_URL_BACK } from '@/services/app.js';
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {
      userId: '',
      list: [],
    };
  },
  created() {
    this.userId = uni.getStorageSync('userId') || 1222;
    this.getPending();
  },
  onLoad() {
    this.userId = uni.getStorageSync('userId') || 1222;
    this.getPending();
  },
  
  methods: {
    clickImg() {},
    async getPending() {
      let res = await get_completed_tasks_on_user(this.userId);
      this.list = res.completed_tasks.map((item) => ({
        src: HTTP_URL_BACK + item.processed_image_url,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20rpx;
  display: block;
}

.item-warp {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.item-warp .item {
  flex: 0 0 350rpx;
  height: 400rpx;
  margin-bottom: 10rpx;
  border-radius: 10rpx;
  overflow: hidden;
}
</style>
