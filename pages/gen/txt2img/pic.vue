<template>
  <view>
    <view class="box-content ratio-box">
      <view class="item-section">尺寸比例</view>
      <u-grid :col="5">
        <u-grid-item v-for="item in sizeRatios" :key="item">
          <view
            :style="{
              width: '40rpx',
              height: (item.height / item.width) * 40 + 'rpx',
              border: '1px solid #aaa',
            }"
          ></view>

          <view class="grid-text">{{ item.ratio }}</view>
        </u-grid-item>
      </u-grid>
    </view>

    <!-- <view class="box-content generate-box">
      <view class="item-section">生成数量</view>
      <view class="generate-content">
        <view
          class="generate-list"
          v-for="(item, index) in generates"
          :key="index"
        >
          <view
            class="generate-item"
            :class="item.selected ? 'generate-sel' : ''"
            @click="clickGenerateChange(item, index)"
          >
            {{ item.val }}张
          </view>
        </view>
      </view>
    </view>

    <view class="box-content quality-box">
      <view class="item-section">图片质量</view>
      <view class="quality-content">
        <view
          class="quality-list"
          v-for="(item, index) in qualitys"
          :key="index"
        >
          <view
            class="quality-item"
            :class="item.selected ? 'quality-sel' : ''"
            @click="clickQualityChange(item, index)"
          >
            {{ item.title }}
          </view>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {
      sizeRatios: [
        {
          ratio: '1:1',
          width: 10,
          height: 10,
          val: 0,
          selected: true,
        },
        {
          ratio: '9:16',
          width: 9,
          height: 16,
          val: 2,
          selected: false,
        },
        {
          ratio: '16:9',
          width: 16,
          height: 9,
          val: 3,
          selected: false,
        },
        {
          ratio: '3:4',
          width: 3,
          height: 4,
          val: 4,
          selected: false,
        },
        {
          ratio: '4:3',
          width: 4,
          height: 3,
          val: 5,
          selected: false,
        },
        {
          ratio: '2:3',
          width: 2,
          height: 3,
          val: 6,
          selected: false,
        },
        {
          ratio: '3:2',
          width: 3,
          height: 2,
          val: 7,
          selected: false,
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
