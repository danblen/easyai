<template>
  <view>
    <scroll-view scroll-x style="height: 100%; width: 100%" class="xsms-scroll">
      <view
        v-for="(image, index) in images"
        :key="index"
        :style="{
          width: '200rpx',
          height: '200rpx',
          marginRight: '10rpx',
          display: 'inline-block',
        }"
      >
        <view
          v-if="image.status === 'pending'"
          :style="{
            width: '200rpx',
            height: '200rpx',
            display: 'inline-block',
            textAlign: 'center',
            verticalAlign: 'middle',
            border: '1px solid #ccc',
          }"
        >
          <u-loading
            :style="{
              position: 'relative',
              top: '50rpx',
            }"
          ></u-loading>
          <view
            :style="{
              position: 'relative',
              top: '55rpx',
            }"
          >
            制作中
          </view>
        </view>
        <u-image
          v-else
          :style="{
            width: '200rpx',
            height: '200rpx',
            display: 'inline-block',
            textAlign: 'center',
            verticalAlign: 'middle',
          }"
          :src="image.path"
          mode="widthFix"
          @click="onPreviewImage(index)"
        ></u-image>
      </view>
    </scroll-view>
  </view>
</template>

<script>
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {
      images: [],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
