<template>
  <view class="wrap">
    <u-waterfall v-model="flowList" ref="uWaterfall">
      <template v-slot:left="{ leftList }">
        <view
          class="demo-warter"
          v-for="(item, index) in leftList"
          :key="index"
          @click="go('/pages/index/faceswap', item.src)"
        >
          <!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
          <u-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.src"
            :index="index"
          ></u-lazy-load>
          <view class="demo-title">
            {{ item.title }}
          </view>
          <view class="demo-tag">
            <view class="demo-tag-owner">new</view>
            <view class="demo-tag-text">立即制作</view>
          </view>
        </view>
      </template>
      <template v-slot:right="{ rightList }">
        <view
          class="demo-warter"
          v-for="(item, index) in rightList"
          :key="index"
          @click="go('/pages/index/faceswap', item.src)"
        >
          <u-lazy-load
            threshold="-450"
            border-radius="10"
            :image="item.src"
            :index="index"
          ></u-lazy-load>
          <view class="demo-title">
            {{ item.title }}
          </view>
          <view class="demo-tag">
            <view class="demo-tag-owner">new</view>
            <view class="demo-tag-text">立即制作</view>
          </view>
        </view>
      </template>
    </u-waterfall>
    <u-loadmore
      bg-color="rgb(240, 240, 240)"
      :status="loadStatus"
      @loadmore="addRandomData"
    ></u-loadmore>
  </view>
</template>

<script>
import { images2 } from './const.js';
export default {
  data() {
    return {
      loadStatus: 'loadmore',
      flowList: [],
      list: [
        {
          title: '唯美',
          image:
            'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
        },
        {
          title: '写真',
          image:
            'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',
        },
      ],
    };
  },
  created() {
    this.addRandomData();
  },
  methods: {
    go(url, src) {
      uni.navigateTo({
        url: url + '?src=' + src,
      });
    },
    reachBottom() {
      this.loadStatus = 'loading';
      // 模拟数据加载
      setTimeout(() => {
        this.addRandomData();
        this.loadStatus = 'loadmore';
      }, 1000);
    },
    addRandomData() {
      for (let i = 0; i < 10; i++) {
        let index = this.$u.random(0, images2.length - 1);
        // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
        let item = JSON.parse(JSON.stringify(images2[index]));
        item.id = this.$u.guid();
        this.flowList.push(item);
      }
    },
    remove(id) {
      this.$refs.uWaterfall.remove(id);
    },
    clear() {
      this.$refs.uWaterfall.clear();
    },
  },
};
</script>

<style>
/* page不能写带scope的style标签中，否则无效 */
page {
  background-color: rgb(240, 240, 240);
}
</style>

<style lang="scss" scoped>
.demo-warter {
  border-radius: 8px;
  // margin: 5px;
  background-color: #ffffff;
  padding: 8px;
  position: relative;
}

.u-close {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
}

.demo-title {
  font-size: 30rpx;
  margin-top: 5px;
  color: $u-main-color;
}

.demo-tag {
  display: flex;
  margin-top: 5px;
  justify-content: space-between;
}

.demo-tag-owner {
  background-color: $u-type-warning;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 4rpx 14rpx;
  border-radius: 50rpx;
  font-size: 20rpx;
  line-height: 1;
}

.demo-tag-text {
  border: 1px solid $u-type-primary;
  color: $u-type-primary;
  margin-left: 10px;
  border-radius: 50rpx;
  line-height: 1;
  padding: 4rpx 14rpx;
  display: flex;
  // align-items: flex-end;
  border-radius: 50rpx;
  font-size: 20rpx;
}
</style>
