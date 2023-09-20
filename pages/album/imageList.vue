<template>
  <view class="view">
    <view v-if="images.length" class="item-warp">
      <view class="item" v-for="(item, index) in images" :key="index">
        <u-image
          :src="item.url"
          @click="onPreviewImage(item.url)"
          mode="widthFix"
        />
      </view>
    </view>

    <u-empty v-else mode="list" style="margin-top: 400rpx"></u-empty>
  </view>
</template>

<script>
// import grid from './grid.vue';
export default {
  // components: { grid },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  // onLoad() {
  //   this.getData();
  // },
  // created() {
  //   this.getData();
  // },

  methods: {
    onPreviewImage(url) {
      // uni.previewImage({
      //   current: index, // 当前显示图片的索引
      //   urls: this.images.map((image) => image.url), // 图片列表
      // });
      uni.navigateTo({
        url: `/pages/album/imageEdit?url=${url}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.view {
  padding: 20rpx;
  // height: 1200rpx;
  // height: 100%;
  // display: block;
}

.item-warp {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    flex: 0 0 350rpx;
    // height: 400rpx;
    margin-bottom: 10rpx;
    border-radius: 10rpx;
    overflow: hidden;
  }
}
</style>
