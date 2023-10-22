<template>
  <view style="">
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
      @click="showPopup"
    >
      会员购买
    </u-button>

    <view v-if="popupVisible" class="popup-container">
      <view class="popup-content" 
        style="
          text-align: center;
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background: #1b1817;
          border-radius: 20px;
          padding: 0px;
          box-shadow: 0 2px 4px #1b1817;
          width: 100%;
          height: 60%;
        "
      >
        <!-- 弹窗内容 -->
        <button @click="closePopup" class="close-button"></button>
        <view 
          class="title-logo" 
          style="
            position: absolute; 
            top: 12px; 
            left: 25px; 
            width: 128px; 
            height: 64px;
          "
        >
          <text 
            class="image-text" 
            style="
              position: absolute; 
              top: 2px; 
              left: 0px;
              width: 24px;
              height: 24px;
            "
          >
          </text>

          <text 
            class="top-text"   
            style="
              position: absolute; 
              top: 0px; 
              left: 25px;
              font-family: 'Georgia', sans-serif;
              font-size: 16px;
              color: #f5eef1;
            "
          >
            粉钻VIP
          </text>

        </view>

        <view 
          class="title-text" 
          style="
            position: absolute; 
            top: 60px; 
            left: 25px; 
            width: 128px; 
            height: 128px;
          "
        >
          <text 
            class="middle-text" 
            style="
            position: absolute; 
            top: 0px; 
            left: 0px;
            font-size: 24px;
            color: #f5eef1;
          "
          >
            每日仅需
          </text>
          <view style="position: absolute; top: -10px; left: 100px; font-size: 32px; color: #f5eef1;"> ¥0.3 </view>
          <view class="gradient-text" style="position: absolute; top: 40px;">{{ customText }}</view>
        </view>

        <scroll-view 
          scroll-x 
          style="
            white-space: nowrap; 
            overflow: auto; 
            width: 100%;
            position: absolute; 
            top: 40%;
          "
          >
          <view
            v-for="(item, index) in textList"
            :key="index"
            style="
              display: inline-block; 
              padding: 10px; 
              border: 1px solid #1b1817cc; 
              border-radius: 8px; 
              background-color: #3833317c;
              width: 123px;
              height:150px;
              margin-left: 10px;
              margin-right: 10px; 
            "
            :style="{
              borderColor: selectedIdx === index ? '#FFC0CB' : '#1b1817cc',
            }"
            @tap="handleTap(index)"
          >
            <text style="color: #ffffff;">{{ item }}</text>
          </view>
        </scroll-view> 

      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    
    return {
      popupVisible: false,

      selectedIdx: -1,
      customText: '未选择',
      textList: ['连续包月', '连续包年', '连续包季', '1个月', '2个月']
    };
  },
  methods: {
    showPopup() {
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    },

    handleTap(index) {
      // 更新选中的索引
      this.selectedIdx = index;

        this.customText = this.textList[index];
    },
  }
};
</script>

<style scoped>

.close-button {
  position: absolute; /* 将按钮设置为绝对定位，相对于其最近的已定位祖先元素 */
  top: 10px; /* 距离顶部的距离 */
  left: 50%; /* 将按钮水平居中 */
  transform: translateX(-50%); /* 通过transform实现水平居中 */
  width: 40px; /* 设置关闭按钮宽度 */
  height: 40px; /* 设置关闭按钮高度 */
  background-color: transparent; /* 设置关闭按钮背景色 */
  border: none; /* 移除按钮的默认边框 */
  background-image: url('@/pages/vip/arrow-down.png'); /* 添加关闭图标 */
  background-repeat: no-repeat;
  background-size: contain;
}

.image-text{
  background-color: transparent;
  border: none; 
  background-image: url('@/pages/vip/pink-diamond.png');
  background-repeat: no-repeat;
  background-size: contain;
}

.gradient-text{
  position: absolute;
  font-size: 16px;
  background-image: linear-gradient(to right, #FFC0CB, #FF69B4);
  -webkit-background-clip: text;
  color: transparent; 
}
</style>
