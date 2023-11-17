<template>
  <view>
    <div class="container">
      <div class="collapsible" :class="{ open: isExpanded }">
        <div class="collapsible-content">
          清风明月
          <!-- 滑动条控制笔画大小 -->
          <u-slider
            v-model="sliderValue"
            :min="2"
            :max="20"
            :step="1"
            :block-width="20"
            :height="20"
            inactive-color="#c0c4cc"
            block-color="#ffffff"
          ></u-slider>

          <!-- 清屏按键 -->
          <image
            style="width: 40px; height: 40px"
            src="@/static/image/mall/pay/icon_pay_weixin.png"
            @click="clearCanvas"
          ></image>

          <u-popup
            v-model="showModel"
            mode="right"
            width="600"
            style="background: black"
          >
            <tasks ref="imageRowRef" class="image-row" />
          </u-popup>

          <!-- 图像比较按键 -->
          <image
            :class="{
              'gray-icon': !canUseCompare,
              'colored-icon': canUseCompare,
            }"
            style="width: 40px; height: 40px"
            src="@/static/image/mall/pay/icon_pay_weixin.png"
            @click="comparePictrue"
          ></image>

          <!-- 开始重绘按键 -->
          <image
            style="width: 40px; height: 40px"
            src="@/static/image/mall/pay/icon_pay_weixin.png"
            @click="inpaitUseSD"
          ></image>
        </div>
      </div>
      <!-- 需要修的图 -->
      <image class="background-image" :src="curImage"></image>

      <canvas
        :style="'width: ' + canvasWidth + 'px; height: ' + canvasHeight + 'px'"
        canvas-id="myCanvas"
        @touchstart="touchStart"
        @touchmove="touchMove"
      ></canvas>
    </div>
    <u-popup
      v-model="popupVisible"
      :position="popupPosition"
      mode="bottom"
      duration="200"
    >
      <!-- 弹窗选择画质 -->
      <view class="custom-popup">
        <text class="popup-title">选择分辨率</text>
        <view class="resolution-option" @click="selectResolution(1920, 1080)"
          >HD高清画质</view
        >
        <view class="resolution-option" @click="selectResolution(1280, 720)"
          >HD+超清画质</view
        >
      </view>
    </u-popup>
    <!-- 功能按键：1、显示可选分辨率(调用SD接口) 
      2、局部重绘（涂抹图片区域重绘） 
      3、显示/隐藏笔画工具（笔画大小/清屏） -->
    <view class="icon-container">
      <image
        class="icon"
        src="@/static/image/mall/pay/icon_pay_weixin.png"
        @click="swap"
      ></image>
      <image
        class="icon"
        src="@/static/image/mall/pay/icon_pay_weixin.png"
        @click="showResolutionPopup"
      ></image>
      <image
        class="icon"
        src="@/static/image/mall/pay/icon_pay_weixin.png"
        @click="toggleCollapse"
      ></image>
    </view>
  </view>
</template>

<script>
import * as constUrl from "@/pages/const/url.js";
import { swap } from "@/services/api.js";
import { pathToBase64 } from "@/utils/image-tools.js";
import { data } from "./const";
import tasks from "./tasks.vue";

export default {
  components: { tasks },
  data() {
    return {
      popupVisible: false,
      popupPosition: "bottom",
      context: null,
      //改成当前需要修图的图片
      curImage: `${constUrl.imageUrl_cover[1]}`,
      canvasWidth: 0,
      canvasHeight: 0,
      drawing: false,
      lastX: 0,
      lastY: 0,
      isExpanded: false,
      isDispalyeInpaitPic: false,
      sliderValue: 5,
      initialDistance: 0, // 两个手指的初始距离
      currentDistance: 0, // 当前两个手指的距离
      scale: 1, // 图片的缩放比例
      canUseCompare: false,
      srcTempFilePath: `${constUrl.imageUrl_cover[1]}`,
      roopTempFilePath: `${constUrl.imageUrl_cover[1]}`,
      showModel: true,
    };
  },
  methods: {
    async swap() {
      try {
        // 打印路径信息，用于调试

        console.log("srcTempFilePath:", this.srcTempFilePath);
        console.log("roopTempFilePath:", this.roopTempFilePath);

        // 尝试读取并转换为 base64
        this.srcBase64 = await pathToBase64(this.srcTempFilePath);
        this.tarBase64 = await pathToBase64(this.roopTempFilePath);

        data.init_images = [this.srcBase64];
        // data.alwayson_scripts.roop.args[0] = this.tarBase64;
        console.log(3324);
        let res1 = await swap(data);
        console.log(12313, res1);
        if (res1.status === "pending") {
          this.$refs.imageRowRef.getImage(res1.request_id);
        } else {
          uni.showToast({
            title: res1.error_message,
            icon: "none",
          });
        }
        return;
      } catch (error) {
        // 错误处理：在控制台打印错误信息
        console.error("Error in swap method:", error);
      }
    },
    //局部重绘：可以涂抹图片、显示擦除按键、显示画笔大小滑动条
    toggleCollapse() {
      this.isExpanded = !this.isExpanded; // 切换折叠状态
      this.canUseCompare = false;
      if (this.isExpanded) {
        uni.showToast({
          title: "涂抹你想重绘的区域~",
          icon: "none", // 可以根据需要选择不同的图标
          duration: 2000, // 错误消息显示时间（以毫秒为单位）
        });

        this.context = uni.createCanvasContext("myCanvas", this);
        this.context.setFillStyle("transparent");

        uni
          .createSelectorQuery()
          .select(".background-image")
          .fields({ size: true }, (res) => {
            if (res.width && res.height) {
              console.log("res. w/h:", res.width, res.height);
              this.canvasWidth = res.width;
              this.canvasHeight = res.height;
            }
          })
          .exec();
        console.log("w/h:", this.canvasWidth, this.canvasHeight);
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.context.draw(true);
      } else {
        if (this.context) {
          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.context.draw(true);
          this.context = null; // 将Canvas上下文对象置为null，让它被垃圾回收
        }
      }
    },
    showResolutionPopup() {
      this.popupVisible = true;
    },
    inpaitUseSD() {
      if (this.isExpanded) {
        if (this.drawing) {
          uni.showToast({
            title: "图像重绘中...",
            icon: "none", // 可以根据需要选择不同的图标
            duration: 1000, // 错误消息显示时间（以毫秒为单位）
          });
          //这里调用SD局部重绘功能:
          //SD输入：当前图片和蒙版图片

          // debug功能：可以预览蒙版图像
          uni.canvasToTempFilePath({
            canvasId: "myCanvas",
            success: (res) => {
              const tempFilePath = res.tempFilePath;
              uni.previewImage({
                urls: [tempFilePath],
              });
            },
            fail: (error) => {
              console.error(error);
            },
          });

          uni.showToast({
            title: "图像重绘完成",
            icon: "none", // 可以根据需要选择不同的图标
            duration: 1000, // 错误消息显示时间（以毫秒为单位）
          });

          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 清除整个Canvas
          this.context.draw(true);
          this.drawing = false;
          this.curImage = `../..${constUrl.imageUrl_cover[1]}`;
          this.isDispalyeInpaitPic = true;
          this.canUseCompare = true;
        } else {
          uni.showToast({
            title: "涂抹你想重绘的区域~",
            icon: "none", // 可以根据需要选择不同的图标
            duration: 1000, // 错误消息显示时间（以毫秒为单位）
          });
        }
      }
    },
    selectResolution(width, height) {
      this.selectedResolution = { width, height };
      this.popupVisible = false;
      console.log("select w/h:", width, height);
      uni.showToast({
        title: "图像处理中...",
        icon: "none", // 可以根据需要选择不同的图标
        duration: 2000, // 错误消息显示时间（以毫秒为单位）
      });
      // 可以在这里执行其他操作，如后端更新分辨率等
    },
    touchStart(e) {
      if (e.touches.length === 2) {
        // 计算两个手指的初始距离
        const x1 = e.touches[0].x;
        const y1 = e.touches[0].y;
        const x2 = e.touches[1].x;
        const y2 = e.touches[1].y;
        this.initialDistance = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
        );
      }
      if (
        this.isExpanded &&
        this.curImage == `../..${constUrl.imageUrl_cover[0]}`
      ) {
        const { x, y } = e.touches[0];
        this.context.setLineWidth(this.sliderValue);
        this.context.beginPath();
        this.context.arc(x, y, this.sliderValue / 2, 0, 2 * Math.PI);
        this.context.setFillStyle("white");
        this.context.fill();
        this.context.draw(true);
        this.lastX = x;
        this.lastY = y;
        this.drawing = true;
      }
    },
    touchMove(e) {
      if (e.touches.length === 2) {
        // 计算当前两个手指的距离
        const x1 = e.touches[0].x;
        const y1 = e.touches[0].y;
        const x2 = e.touches[1].x;
        const y2 = e.touches[1].y;
        this.currentDistance = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
        );

        // 计算缩放比例
        this.scale = this.currentDistance / this.initialDistance;

        // 更新画布和图像的缩放
        this.context.scale(this.scale, this.scale);
        this.context.draw(true);
      }
      if (
        this.isExpanded &&
        this.curImage == `../..${constUrl.imageUrl_cover[0]}`
      ) {
        const { x, y } = e.touches[0];
        this.context.setLineWidth(this.sliderValue);
        this.context.setStrokeStyle("white");
        this.context.beginPath();
        this.context.moveTo(this.lastX, this.lastY);
        this.context.quadraticCurveTo(
          (this.lastX + x) / 2,
          (this.lastY + y) / 2,
          x,
          y
        );
        this.context.stroke();
        this.context.draw(true);
        this.lastX = x;
        this.lastY = y;
      }
    },
    clearCanvas() {
      this.drawing = false;
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 清除整个Canvas
      this.context.draw(true); // 将变更应用到Canvas
    },
    comparePictrue() {
      if (this.canUseCompare) {
        if (this.isDispalyeInpaitPic) {
          this.curImage = `../..${constUrl.imageUrl_cover[0]}`;
        } else {
          //切换显示重绘后的图像
          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 清除整个Canvas
          this.context.draw(true);
          this.drawing = false;
          this.curImage = `../..${constUrl.imageUrl_cover[1]}`;
        }
        this.isDispalyeInpaitPic = !this.isDispalyeInpaitPic;
      }
    },
  },
  mounted() {},
  onUnload() {
    // 在页面卸载时清理资源
    if (this.context) {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.context.draw(true);
      this.context = null; // 将Canvas上下文对象置为null，让它被垃圾回收
    }
  },
};
</script>

<style scoped>
.custom-popup {
  background-color: #ffffff; /* 设置弹窗背景颜色 */
  border-radius: 10px; /* 设置弹窗圆角 */
  padding: 20px; /* 设置内边距 */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  text-align: center; /* 设置文本水平居中 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}
.popup-title {
  font-size: 20px; /* 设置标题字体大小 */
  font-weight: bold; /* 设置标题文字加粗 */
}
.resolution-option {
  font-size: 15px;
  text-align: center;
  margin-top: 30px; /* 设置分辨率选项之间的上边距 */
  cursor: pointer; /* 鼠标悬停时显示指针样式 */
}
.collapsible {
  margin: 10px;
  overflow: hidden;
  z-index: 9999;
}
.collapsible .collapsible-header {
  background-color: #db5151;
  padding: 10px;
  cursor: pointer;
}
.collapsible .collapsible-content {
  display: none;
  padding: 10px;
}
.collapsible.open .collapsible-content {
  display: block;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #c26464;
}
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #9bc078;
}
/* 图标容器样式 */
.icon-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* 图标样式 */
.icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  top: 675px;
}
.gray-icon {
  filter: grayscale(100%); /* 使用CSS的grayscale滤镜将图标置为灰色 */
}
.colored-icon {
  filter: none; /* 使用CSS的grayscale滤镜将图标置为灰色 */
}
</style>
