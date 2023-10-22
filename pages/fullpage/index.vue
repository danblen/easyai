<template>
  <view :style="{ backgroundColor: max_backgroundColor, marginTop: '-12px' }">
    <!-- 左侧弹窗，服务条款等 -->
    <view
      style="
        position: fixed;
        width: 60rpx;
        height: 60rpx;
        left: 50rpx;
        top: 100rpx;
        z-index: 2;
      "
      @click="openPopup"
    >
      <u-icon name="list" size="32"></u-icon>
    </view>
    <view>
      <u-popup v-model="showPopup">
        <div style="padding: 10px; width: 200px">
          <hr style="margin: 10px 0; width: 200px; border: 1px solid #ccc" />
          <p>使用教程</p>
          <hr style="margin: 10px 0; border: 1px solid #ccc" />
          <p>用户服务协议</p>
          <hr style="margin: 10px 0; border: 1px solid #ccc" />
          <p>隐私政策</p>
          <hr style="margin: 10px 0; border: 1px solid #ccc" />
          <p>客服咨询</p>
          <hr style="margin: 10px 0; border: 1px solid #ccc" />
          <p>退出账号</p>
          <hr style="margin: 10px 0; border: 1px solid #ccc" />
          <p style="color: red">注销账号</p>
        </div>
      </u-popup>
    </view>
    <view :style="{ marginTop: '12px', background: backgroundColor }">
      <swiper
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        circular="true"
        style="height: 330px"
      >
        <block :wx:for="images_swiper" wx:key="index">
          <swiper-item style="width: 98%">
            <image
              :src="item"
              style="
                object-fit: cover;
                width: 95%;
                height: 300px;
                margin-top: 32px;
                border-radius: 14px;
                object-fit: cover;
                margin-bottom: 20px;
                margin-left: 10px;
                margin-right: 10px;
              "
              mode="aspectFill"
            ></image>
          </swiper-item>
        </block>
      </swiper>
    </view>
    <!-- 顶部swiper -->
    <!-- <view style="display: flex">
      <u-swiper
        style="width: 428px"
        height="600"
        :list="images_swiper"
        @change="onSwiperChange"
        :effect3d="false"
        :indicator-dots="true"
        :title="true"
        border-radius="100px"
        indicator-dots-class="round-indicator"
        :effect3d-previous-margin="60"
      ></u-swiper>
    </view> -->
    <!-- 推荐part -->
    <div
      :style="{
        background: card_backgroundColor,
        border: '5px solid ' + card_backgroundColor,
        borderRadius: '8px',
        marginTop: '5px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px',
      }"
    >
      <view>
        <!-- <u-loading mode="circle"></u-loading>
      <u-loading mode="flower"></u-loading> -->
        <text style="font-size: 24px; color: rgb(0, 0, 0)">热门推荐</text>
        <u-icon name="arrow-down-fill" color="#000000" size="32"></u-icon>
      </view>

      <!-- 推荐图片+图片文案 -->
      <scroll-view
        scroll-x
        style="
          white-space: nowrap;
          display: flex;
          width: 100%;
          margin-bottom: '-35px';
        "
      >
        <view
          style="
            width: 40%;
            margin-right: '2%';
            margin-bottom: '20rpx';
            border-radius: '10rpx';
            overflow: hidden;
            display: inline-block;
          "
          v-for="(image, index) in images_slide"
          :key="index"
          @click="go_display_pic(image)"
        >
          <u-lazy-load
            :border-radius="10"
            :image="image.indexSrc"
            :index="index"
            @statusChange="statusChange"
            @clickImg="clickImg"
          ></u-lazy-load>
          <text
            style="
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              height: '50px';
            "
            >{{ image.text }}</text
          >
        </view>
      </scroll-view>
    </div>

    <view
      :style="{
        background: card_backgroundColor,
        border: '5px solid ' + card_backgroundColor,
        borderRadius: '8px',
        marginTop: '10px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginRight: '10px',
      }"
    >
      <text style="font-size: 24px; color: rgb(0, 0, 0)">更多风格</text>
      <u-icon name="arrow-down-fill" color="#000000" size="32"></u-icon>
      <!-- tabs风格选择 -->
      <view style="width: '100%'">
        <u-tabs
          name="cate_name"
          count="cate_count"
          :list="listTabs"
          :is-scroll="true"
          :current="current"
          @change="change"
          active-color="#000000"
          inactive-color="#000000"
          font-size="30"
          :bg-color="card_backgroundColor"
          bold="true"
        ></u-tabs>
      </view>
      <!-- 懒加载多行多列图片 -->
      <view
        style="display: flex; justify-content: space-between; flex-wrap: wrap"
        mode="aspectFit"
      >
        <view
          style="
            flex: 0 0 49%;
            margin-bottom: 20rpx;
            border-radius: 10rpx;
            overflow: hidden;
          "
          mode="aspectFit"
          v-for="(image, index) in images_slide"
          :key="index"
          @click="go_display_pic(image)"
        >
          <u-lazy-load
            border-radius="10"
            :image="image.indexSrc"
            :index="index"
            @statusChange="statusChange"
            @clickImg="clickImg"
          ></u-lazy-load>
        </view>
      </view>
    </view>

    <!-- <div v-for="(title, index) in typpe_pic_index1" :key="index">
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
          v-for="(image, index) in getImagesByType(title)"
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
            @click="go('/pages/index/display/index', image.src)"
          ></image>
        </view>
      </scroll-view>
    </div> -->
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
      @click="start('/pages/index/faceswap/index', currentImageIndex)"
    >
      开始制作
    </u-button>
  </view>
</template>

<script>
import {
  type_pic,
  type_pic1,
  imageUrl_cover,
  imageUrl_rixi,
  typpe_pic_index,
} from "@/pages/const/url.js";
import step from "./step.vue";
export default {
  components: { step },
  data() {
    return {
      rows: [0, 1, 2, 3, 4],
      cols: [0, 1],
      images_slide: type_pic,
      images_swiper: imageUrl_cover,
      currentImageIndex: 0,
      typpe_pic_index1: typpe_pic_index,
      showPopup: false,
      listTabs: [
        {
          cate_name: "清风明月",
          cate_count: 45,
        },
        {
          cate_name: "伞",
          cate_count: 32,
        },
        {
          cate_name: "芭蕾",
          cate_count: 100,
        },
        {
          cate_name: "身材",
          cate_count: 66,
        },
        {
          cate_name: "民国风",
          cate_count: 54,
        },
        {
          cate_name: "地铁",
          cate_count: 23,
        },
        {
          cate_name: "日系",
          cate_count: 88,
        },
      ],
      current: 0,
      max_backgroundColor: "#232824",
      card_backgroundColor: "#85afa3",
    };
  },
  methods: {
    change(index) {
      this.current = index;
      if (this.current) {
        this.images_slide = type_pic1;
      }
    },
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    start(url, src) {
      const currentImage = imageUrl_cover[this.currentImageIndex];
      uni.navigateTo({
        url: url + "?src=" + currentImage,
      });
    },
    onSwiperChange(currentIndex) {
      this.currentImageIndex = currentIndex;
    },

    go_display_pic(image) {
      uni.navigateTo({
        url:
          "/pages/index/display/index" +
          "?src=" +
          image.indexSrc +
          "&images111=" +
          image.srcs,
      });
    },
  },
};
</script>

<style scoped>
.color {
  background: #f8f8f8;
}
</style>
