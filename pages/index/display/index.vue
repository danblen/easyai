<template>
  <div>
    <image
      style="width: 100vh; height: 30vh"
      :src="src"
      mode="aspectFill"
    ></image>
    <view
      style="
        position: fixed;
        width: 60rpx;
        height: 60rpx;
        left: 50rpx;
        top: 100rpx;
        z-index: 2;
        color: rgb(255, 255, 255);
      "
      @click="goBack"
    >
      <u-icon name="arrow-left" size="32"></u-icon>
    </view>

    <view class="image-grid" style="margin-top: 20rpx; margin-left: 5rpx">
      <view class="row" :wx:for="rows" wx:for-index="rowIndex">
        <view class="col" :wx:for="cols" wx:for-index="colIndex">
          <view class="image-container">
            <block
              :wx:if="rowIndex * cols.length + colIndex < images111.length"
            >
              <image
                style="
                  width: 200px;
                  height: 280px;
                  border-radius: 10rpx;
                  margin-right: 10rpx;
                "
                :src="images111[rowIndex * cols.length + colIndex]"
                mode="aspectFill"
              ></image>
            </block>
          </view>
        </view>
      </view>
    </view>
    <u-button
      class="swap"
      type="primary"
      style="
        position: fixed;
        bottom: 40rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 70%;
        animation: swap 1s infinite;
        opacity: 0.8;
        font-weight: bold;
      "
      :custom-style="{
        background: 'linear-gradient(to right, #00467f, #a5cc82)',
        boxShadow: '0 0 10rpx #a5cc82',
      }"
      :ripple="true"
      shape="circle"
      @click="start('/pages/faceswap/index', currentImageIndex)"
    >
      开始制作
    </u-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: '',
      images111: [],
      rows: [0, 1, 2, 3, 4],
      cols: [0, 1],
      images_clo: [
        // '/static/image/weibo_pic/aaaa.png',
        '/static/image/weibo_pic/伞.png',
        '/static/image/weibo_pic/水中芭蕾.png',
        '/static/image/weibo_pic/身材.png',
        '/static/image/weibo_pic/国民风2.png',
        '/static/image/weibo_pic/地铁.png',
        '/static/image/weibo_pic/日系.png',
        '/static/image/weibo_pic/青涩初恋.png',
        '/static/image/weibo_pic/轻氧少女.png',
        '/static/image/weibo_pic/青苹果.png',
      ],
    };
  },
  onLoad(options) {
    this.src = options.src;
    const images111String = options.images111;
    this.images111 = images111String.split(',');
    console.log('src1111:', this.src);
    console.log('pic1111:', this.images111);
  },
  methods: {
    start(url, src) {
      const currentImage = this.src;
      uni.navigateTo({
        url: url + '?src=' + currentImage,
      });
    },
    goBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
    go(url, src) {
      console.log('url:----', url);
      console.log('src:----', src);
      uni.navigateTo({
        url: url + '?src=' + src,
      });
    },
  },
};
</script>
<style scoped>
.image-grid {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
}
.row {
  display: flex;
  width: 100%;
  height: 100%;
}

.col {
  width: 100%;
  height: 100%;
}
.col-spacing {
  width: 10px;
}
.image-container {
  margin: 5px;
}
</style>
