<template>
  <view>
    <!-- 需要修的图 -->
    <u-image
      style="width: 100%; vertical-align: middle"
      :src="curImage"
      mode="widthFix"
    />

    <canvas
      :style="'width: ' + canvasWidth + 'px; height: ' + canvasHeight + 'px'"
      canvas-id="myCanvas"
      @touchstart="touchStart"
      @touchmove="touchMove"
    ></canvas>

    <u-popup
      v-model="popupVisible"
      :position="popupPosition"
      mode="bottom"
      duration="200"
    >
      <!-- 弹窗选择画质 -->
      <view class="custom-popup">
        <text class="popup-title">选择分辨率</text>
        <view class="resolution-option" @click="selectResolution(1920, 1080)">
          HD高清画质
        </view>
        <view class="resolution-option" @click="selectResolution(1280, 720)">
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
      <u-button style="width: 200rpx" @click="swap">换脸</u-button>
    </view>
    <view v-if="current === 1">
      <u-button style="width: 200rpx" @click="showResolutionPopup">
        选择分辨率
      </u-button>
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
    </view>
    <view v-if="current === 2">
      <u-button style="width: 200rpx" @click="toggleCollapse">xx</u-button>
    </view>
  </view>
</template>

<script>
import * as constUrl from '@/pages/const/url.js';
import { faceSwap, getSwapQueueResult } from '@/services/api.js';
import { pathToBase64 } from '@/utils/image-tools.js';
import { data } from './const';
import UButton from '../../components/uview-ui/components/u-button/u-button.vue';
import UActionSheet from '../../components/uview-ui/components/u-action-sheet/u-action-sheet.vue';

export default {
  components: { UButton },
  data() {
    return {
      popupVisible: false,
      // popupPosition: 'bottom',
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
      srcTempFilePath: `/pages/refine/index.jpg`,
      // srcTempFilePath: `${constUrl.imageUrl_cover[1]}`,
      roopTempFilePath: `/pages/refine/index.jpg`,
      // roopTempFilePath: `${constUrl.imageUrl_cover[1]}`,
      showModel: true,
      genImagePath: '',
      timer: '',
      list: [
        {
          name: '换脸',
        },
        {
          name: '超分',
        },
        {
          name: '待评价',
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
      this.current = index;
    },
    async swap() {
      try {
        // 打印路径信息，用于调试

        console.log('srcTempFilePath:', this.srcTempFilePath);
        console.log('roopTempFilePath:', this.roopTempFilePath);

        // 尝试读取并转换为 base64
        this.srcBase64 = await pathToBase64('/static/image/index.jpg');
        this.tarBase64 = await pathToBase64('/static/image/index.jpg');
        // this.srcBase64 = await pathToBase64(this.srcTempFilePath);
        // this.tarBase64 = await pathToBase64(this.roopTempFilePath);

        data.init_images = [this.srcBase64];
        data.alwayson_scripts.roop.args[0] = this.tarBase64;
        console.log(3324);
        let res1 = await faceSwap(data);
        console.log(12313, res1);

        this.timers[res1.request_id] = setInterval(async () => {
          const request_data = {
            user_id: '',
            request_id: res1.request_id,
            sql_query: {
              request_status: '',
              user_id: '',
            },
          };
          let res = await getSwapQueueResult(request_data).catch(() => {
            clearInterval(this.timers[request_id]);
          });
          if (res.status === 'finishing') {
            this.genImagePath = 'data:image/png;base64,' + res.result.images[0];
            console.log('genImagePath:', this.genImagePath);
            this.curImage = this.genImagePath;
            clearInterval(this.timers[res1.request_id]);
          }
        }, 4000);
      } catch (error) {
        // 错误处理：在控制台打印错误信息
        console.error('Error in swap method:', error);
      }
    },
    //局部重绘：可以涂抹图片、显示擦除按键、显示画笔大小滑动条
    toggleCollapse() {
      this.isExpanded = !this.isExpanded; // 切换折叠状态
      this.canUseCompare = false;
      if (this.isExpanded) {
        uni.showToast({
          title: '涂抹你想重绘的区域~',
          icon: 'none', // 可以根据需要选择不同的图标
          duration: 2000, // 错误消息显示时间（以毫秒为单位）
        });

        this.context = uni.createCanvasContext('myCanvas', this);
        this.context.setFillStyle('transparent');

        uni
          .createSelectorQuery()
          .select('.background-image')
          .fields({ size: true }, (res) => {
            if (res.width && res.height) {
              console.log('res. w/h:', res.width, res.height);
              this.canvasWidth = res.width;
              this.canvasHeight = res.height;
            }
          })
          .exec();
        console.log('w/h:', this.canvasWidth, this.canvasHeight);
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
            title: '图像重绘中...',
            icon: 'none', // 可以根据需要选择不同的图标
            duration: 1000, // 错误消息显示时间（以毫秒为单位）
          });
          //这里调用SD局部重绘功能:
          //SD输入：当前图片和蒙版图片

          // debug功能：可以预览蒙版图像
          uni.canvasToTempFilePath({
            canvasId: 'myCanvas',
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
            title: '图像重绘完成',
            icon: 'none', // 可以根据需要选择不同的图标
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
            title: '涂抹你想重绘的区域~',
            icon: 'none', // 可以根据需要选择不同的图标
            duration: 1000, // 错误消息显示时间（以毫秒为单位）
          });
        }
      }
    },
    selectResolution(width, height) {
      this.selectedResolution = { width, height };
      this.popupVisible = false;
      console.log('select w/h:', width, height);
      uni.showToast({
        title: '图像处理中...',
        icon: 'none', // 可以根据需要选择不同的图标
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
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2),
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
        this.context.setFillStyle('white');
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
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2),
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
        this.context.setStrokeStyle('white');
        this.context.beginPath();
        this.context.moveTo(this.lastX, this.lastY);
        this.context.quadraticCurveTo(
          (this.lastX + x) / 2,
          (this.lastY + y) / 2,
          x,
          y,
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
/* .custom-popup {
  background-color: #ffffff; 
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
}
.gray-icon {
  filter: grayscale(100%); 
}
.colored-icon {
  filter: none;  
} */
</style>
