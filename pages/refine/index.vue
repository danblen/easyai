<template>
  <view>
    <view style="position: relative">
      <u-image
        style="width: 100%; vertical-align: middle"
        :src="curImage"
        mode="widthFix"
        class="background-image"
      />

      <!-- 画布 -->
      <canvas
        :style="
          'width: ' +
          canvasWidth +
          'px; height: ' +
          canvasHeight +
          'px; position: absolute; top: 0; left: 0; z-index: 10'
        "
        canvas-id="myCanvas"
        @touchstart="touchStart"
        @touchmove="touchMove"
      ></canvas>
    </view>

    <u-popup
      v-model="popupVisible"
      :position="popupPosition"
      mode="bottom"
      duration="200"
    >
      <!-- 弹窗选择画质 -->
      <view class="custom-popup">
        <text class="popup-title">选择分辨率</text>
        <view class="resolution-option" @click="sdWith2KParams">
          HD高清画质
        </view>
        <view class="resolution-option" @click="sdWith4KParams">
          HD+超清画质
        </view>
      </view>
    </u-popup>
    <!-- 功能按键：1、显示可选分辨率(调用SD接口) 
      2、局部重绘（涂抹图片区域重绘） 
      3、显示/隐藏笔画工具（笔画大小/清屏） -->
    <u-tabs
      :list="list"
      :is-scroll="false"
      :current="current"
      @change="change"
    ></u-tabs>
    <view v-if="current === 0">
      <u-button style="width: 200rpx" @click="sdWithSwapDetailParams">
        换脸
      </u-button>
    </view>
    <view v-if="current === 1">
      <u-button style="width: 200rpx" @click="showResolutionPopup">
        选择分辨率
      </u-button>
    </view>
    <view v-if="current === 2">
      <div class="collapsible-content">
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
        <button style="width: 240rpx; height: 40px" @click="clearCanvas">
          清屏按键
        </button>

        <!-- 图像比较按键 -->
        <button
          :class="{
            'gray-icon': !canUseCompare,
            'colored-icon': canUseCompare,
          }"
          style="width: 240rpx; height: 40px"
          @click="comparePictrue"
        >
          图像比较按键
        </button>

        <!-- 开始重绘按键 -->
        <button style="width: 340rpx; height: 40px" @click="inpaitUseSD">
          开始重绘按键
        </button>
      </div>
    </view>
    <view v-if="current === 3">
      <u-button style="width: 200rpx" @click="Comments">xx</u-button>
    </view>
  </view>
</template>

<script>
import * as constUrl from "@/pages/const/url.js";
import { faceSwap, getSwapQueueResult } from "@/services/api.js";
import { pathToBase64 } from "@/utils/image-tools.js";
import {
  swap_face_data,
  swap_face_and_add_detail_data,
  scale_data,
  mask_data,
} from "./const";
import UButton from "../../components/uview-ui/components/u-button/u-button.vue";
import UActionSheet from "../../components/uview-ui/components/u-action-sheet/u-action-sheet.vue";

export default {
  components: { UButton },
  data() {
    return {
      popupVisible: false,
      // popupPosition: 'bottom',
      context: null,
      //改成当前需要修图的图片
      displayImage: "/static/image/index.jpg",
      inpaintImage: "",
      curImage: "/static/image/index.jpg",
      // curImage: `${constUrl.imageUrl_cover[1]}`,
      canvasWidth: 0,
      canvasHeight: 0,
      drawing: false,
      inpaintColor: "red",
      lastX: 0,
      lastY: 0,
      isExpanded: false,
      isDispalyeInpaitPic: false,
      sliderValue: 5,
      initialDistance: 0, // 两个手指的初始距离
      currentDistance: 0, // 当前两个手指的距离
      scale: 1, // 图片的缩放比例
      canUseCompare: false,
      srcTempFilePath: `/pages/refine/index.jpg`,
      // srcTempFilePath: `${constUrl.imageUrl_cover[1]}`,
      roopTempFilePath: `/pages/refine/index.jpg`,
      // roopTempFilePath: `${constUrl.imageUrl_cover[1]}`,
      showModel: true,
      genImagePath: "",
      timer: "",
      list: [
        {
          name: "换脸",
        },
        {
          name: "超分",
        },
        {
          name: "局部重绘",
        },
        {
          name: "待评价",
        },
      ],
      current: 0,
    };
  },
  unMounted() {
    clearInterval(this.timer);
  },
  onUnload() {
    Object.values(this.timers).forEach((timer) => {
      clearInterval(timer);
    });
  },
  methods: {
    change(index) {
      if (this.current == 2) this.toggleCollapse();
      this.current = index;
      if (this.current == 2) this.toggleCollapse();
    },
    async sdWithSwapParams() {
      const data = swap_face_data;
      data.alwayson_scripts.roop.args[0] = await pathToBase64(
        "/static/image/index.jpg"
      );
      console.log("roop file path:", data.alwayson_scripts.roop);
      this.requestSdTransform(data);
    },
    async sdWithSwapDetailParams() {
      const data = swap_face_and_add_detail_data;
      // 细节:Range[0~1]
      data.alwayson_scripts.ADetailer.args[1].ad_denoising_strength = 0.4;
      data.alwayson_scripts.roop.args[0] = await pathToBase64(
        "/static/image/index.jpg"
      );
      console.log("roop file path:", data.alwayson_scripts.roop);
      this.requestSdTransform(data);
    },
    async sdWith2KParams() {
      const data = scale_data;
      const scaleFactor = 1.5;
      // ad_denoising_strength:Range[0-1],
      data.denoising_strength = 0.4;
      data.script_args[data.script_args.length - 1] = scaleFactor;
      this.popupVisible = false;
      uni.showToast({
        title: "图像处理中...",
        icon: "none",
        duration: 1000,
      });
      this.requestSdTransform(data);
    },
    async sdWith4KParams() {
      const data = scale_data;
      const scaleFactor = 2;
      // denoising_strength:Range[0-1],
      data.denoising_strength = 0.4;
      data.script_args[data.script_args.length - 1] = scaleFactor;
      this.popupVisible = false;
      uni.showToast({
        title: "图像处理中...",
        icon: "none",
        duration: 1000, // ms
      });
      this.requestSdTransform(data);
    },
    async requestSdTransform(data) {
      try {
        console.log("srcTempFilePath:", this.srcTempFilePath);
        this.srcBase64 = await pathToBase64("/static/image/index.jpg");
        data.init_images = [this.srcBase64];
        // data.user_id = "唯一的用户ID";
        console.log("start convert");
        const startTime = performance.now();
        let result = await faceSwap(data);
        console.log("complete convert", performance.now() - startTime, "ms");
        this.timers[result.request_id] = setInterval(async () => {
          const request_data = {
            user_id: "",
            request_id: result.request_id,
            sql_query: {
              request_status: "",
              user_id: "",
            },
          };
          let res = await getSwapQueueResult(request_data).catch(() => {
            clearInterval(this.timers[request_id]);
          });
          if (res.status === "finishing") {
            console.log(
              "complete convert",
              performance.now() - startTime,
              "ms"
            );
            this.genImagePath = "data:image/png;base64," + res.result.images[0];
            console.log("genImagePath:", this.genImagePath);
            this.curImage = this.genImagePath;
            clearInterval(this.timers[result.request_id]);
          }
        }, 4000);
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
        console.log("进入画板");
        uni.showToast({
          title: "涂抹你想重绘的区域~",
          icon: "none", // 可以根据需要选择不同的图标
          duration: 2000, // 错误消息显示时间（以毫秒为单位）
        });
        this.inpaintImage = "";
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
        console.log("退出画板");
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
    async getImageInfo(src) {
      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src: src,
          success: (res) => resolve(res),
          fail: (err) => reject(err),
        });
      });
    },
    async canvasToTempFilePath(options) {
      return new Promise((resolve, reject) => {
        uni.canvasToTempFilePath({
          ...options,
          success: resolve,
          fail: reject,
        });
      });
    },
    async saveFile(options) {
      return new Promise((resolve, reject) => {
        uni.saveFile({
          ...options,
          success: (res) => resolve(res),
          fail: (err) => reject(err),
        });
      });
    },
    async inpaitUseSD() {
      if (this.isExpanded) {
        if (this.drawing) {
          uni.showToast({
            title: "图像重绘中...",
            icon: "none", // 可以根据需要选择不同的图标
            duration: 1000, // 错误消息显示时间（以毫秒为单位）
          });
          const originalImageInfo = await this.getImageInfo(
            "/static/image/index1.jpg"
          );
          console.log("Original Image width: ", originalImageInfo.width);
          console.log("Original Image height: ", originalImageInfo.height);
          const canvasRes = await this.canvasToTempFilePath({
            canvasId: "myCanvas",
            destWidth: originalImageInfo.width,
            destHeight: originalImageInfo.height,
          });

          const maskImageInfo = await this.getImageInfo(canvasRes.tempFilePath);
          console.log("Redrawn Image width: ", maskImageInfo.width);
          console.log("Redrawn Image height: ", maskImageInfo.height);

          mask_data.init_images = [await pathToBase64(this.curImage)];
          mask_data.mask = await pathToBase64(canvasRes.tempFilePath);
          while (mask_data.mask.length % 4 !== 0) {
            mask_data.mask += "=";
          }
          const saveResult = await this.saveFile({
            tempFilePath: canvasRes.tempFilePath,
          });
          console.log("文件保存成功", saveResult.savedFilePath);
          // console.log("mask_data.mask: ", mask_data.mask);
          // await faceSwap(mask_data);
          await this.requestSdTransform(mask_data);

          // uni.previewImage({
          //   urls: [canvasResTempFilePath],
          // });
          uni.showToast({
            title: "图像重绘完成",
            icon: "none", // 可以根据需要选择不同的图标
            duration: 1000, // 错误消息显示时间（以毫秒为单位）
          });

          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 清除整个Canvas
          this.context.draw(true);
          this.drawing = false;
          this.inpaintImage = "/static/image/index1.jpg";
          this.curImage = this.inpaintImage;
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
    touchStart(e) {
      console.log("touchStart:", e.touches[0].x, e.touches[0].y);
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
      if (this.isExpanded && this.curImage == this.displayImage) {
        console.log("setLineWidth:");
        const { x, y } = e.touches[0];
        this.context.setLineWidth(this.sliderValue);
        this.context.beginPath();
        this.context.arc(x, y, this.sliderValue / 2, 0, 2 * Math.PI);
        this.context.setFillStyle(this.inpaintColor);
        this.context.fill();
        this.context.draw(true);
        this.lastX = x;
        this.lastY = y;
        this.drawing = true;
      }
    },
    touchMove(e) {
      // if (e.touches.length === 2) {
      //   // 计算当前两个手指的距离
      //   const x1 = e.touches[0].x;
      //   const y1 = e.touches[0].y;
      //   const x2 = e.touches[1].x;
      //   const y2 = e.touches[1].y;
      //   this.currentDistance = Math.sqrt(
      //     Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
      //   );

      //   // 计算缩放比例
      //   this.scale = this.currentDistance / this.initialDistance;

      //   // 更新画布和图像的缩放
      //   this.context.scale(this.scale, this.scale);
      //   this.context.draw(true);
      // }
      if (this.isExpanded && this.curImage == this.displayImage) {
        const { x, y } = e.touches[0];
        this.context.setLineWidth(this.sliderValue);
        this.context.setStrokeStyle(this.inpaintColor);
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
          this.curImage = this.inpaintImage;
        } else {
          //切换显示重绘后的图像
          this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 清除整个Canvas
          this.context.draw(true);
          this.drawing = false;
          this.curImage = this.displayImage;
        }
        this.isDispalyeInpaitPic = !this.isDispalyeInpaitPic;
      }
    },
    Comments() {
      uni.showToast({
        title: "哥哥给个好评~",
        icon: "none", // 可以根据需要选择不同的图标
        duration: 1000, // 错误消息显示时间（以毫秒为单位）
      });
    },
  },
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
  background-color: #b32d2d;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}
.popup-title {
  font-size: 20px;
  font-weight: bold;
}
.resolution-option {
  font-size: 15px;
  text-align: center;
  margin-top: 30px;
  cursor: pointer;
}
/*
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
.icon-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.icon {
  width: 40px;
  height: 40px;
  cursor: pointer;
  top: 675px;
}*/
.gray-icon {
  filter: grayscale(100%);
}
.colored-icon {
  filter: none;
}
</style>
