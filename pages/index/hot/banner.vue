<template>
  <div>
    <u-swiper
      height="500"
      :list="[
        { image: '/static/image/weibo_pic/photo_2376@02-06-2023_12-37-15.jpg' },
        { image: '/static/image/weibo_pic/photo_2377@02-06-2023_12-45-40.jpg' },
        { image: '/static/image/weibo_pic/photo_2382@02-06-2023_12-45-40.jpg' },
        { image: '/static/image/weibo_pic/photo_2384@02-06-2023_12-45-40.jpg' },
        { image: '/static/image/weibo_pic/photo_2386@02-06-2023_20-27-11.jpg' },
        { image: '/static/image/weibo_pic/photo_2390@02-06-2023_20-27-11.jpg' },
        { image: '/static/image/weibo_pic/photo_2391@03-06-2023_17-55-35.jpg' },
        { image: '/static/image/weibo_pic/photo_2394@03-06-2023_17-55-35.jpg' },
        { image: '/static/image/weibo_pic/photo_2395@03-06-2023_17-55-35.jpg' },
      ]"
    ></u-swiper>
    <div class="steps-container">
      <step
        text="1.上传照片"
        imageSrc="/static/image/weibo_pic/photo_2391@03-06-2023_17-55-35.jpg"
      ></step>
      <step
        text="2.选择写真集"
        imageSrc="/static/image/weibo_pic/photo_2379@02-06-2023_12-45-40.jpg"
      ></step>
      <step
        text="3.下载写真集"
        imageSrc="/static/image/weibo_pic/photo_2394@03-06-2023_17-55-35.jpg"
      ></step>
    </div>
    <div v-for="(title, index) in titles" :key="index">
      <view class="icon-container">
        <image
          class="icon"
          style="width: 20px; height: 20px"
          src="/static/image/tabbar/hot1.png"
        ></image>
        <text class="title">{{ title }}</text>
      </view>
      <scroll-view
        scroll-x
        style="width: 100%; padding: 20rpx"
        class="xsms-scroll"
      >
        <view
          v-for="(image, index) in getImagesByTitle(title)"
          :key="index"
          style="display: inline-block; border-radius: 18rpx"
        >
          <image
            :src="image.src"
            mode="aspectFill"
            style="
              width: 220rpx;
              height: 300rpx;
              display: inline-block;
              margin-right: 20rpx;
              border-radius: 15rpx;
            "
            @click="go('/pages/faceswap/index', image.src)"
          ></image>
        </view>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import {
  checkTaskStatusByTaskId,
  get_completed_tasks_on_user,
} from '@/services/api.js';
import { URL_SD, URL_BACK } from '@/services/app.js';
import {
  images0,
  images1,
  images2,
  images3,
  images4,
  images5,
  images6,
} from '@/pages/const/url.js';
import step from './step.vue';
// import grid from './grid.vue';
export default {
  components: { step },
  // components: { grid },
  data() {
    return {
      titles: [
        '近期热门',
        '国风',
        '清风明月',
        '青花瓷',
        '慵懒风',
        '运动少女',
        '夏日写真',
      ],
    };
  },
  methods: {
    go(url, src) {
      uni.navigateTo({
        url: url + '?src=' + src,
      });
    },
  },
  computed: {
    getImagesByTitle() {
      return (title) => {
        switch (title) {
          case '近期热门':
            return images0;
          case '国风':
            return images1;
          case '清风明月':
            return images2;
          case '青花瓷':
            return images3;
          case '慵懒风':
            return images4;
          case '运动少女':
            return images5;
          case '夏日写真':
            return images6;
          default:
            return []; // 默认为空数组
        }
      };
    },
  },
};
</script>

<style scoped>
.steps-container {
  display: flex; /* 使用 Flex 布局 */
  justify-content: space-between; /* 使步骤之间平均分布 */
  align-items: center; /* 垂直居中对齐 */
  margin-bottom: 50rpx;
}
</style>

<style scoped>
.custom-content {
  position: relative;
  top: -50rpx;
  background: #fff;
  text-align: center;
}

.custom-inner {
  display: flex;
  justify-content: center;
}
</style>

<style lang="scss" scoped>
.xsms-scroll {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  background: #ffffff; /*  */
}
</style>
<style lang="scss" scoped>
.icon-container {
  display: flex; /* 使用 Flex 布局 */
  align-items: center; /* 垂直居中对齐 */
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 5px; /* 可根据需要调整图标和标题之间的距离 */
}

.title {
  display: flex; /* 使用 Flex 布局 */
  flex-direction: column;
  font-size: 14px; /* 根据需要调整标题的字体大小 */
}
</style>
