<template>
  <view>
    <view class="area">
      <u-upload
        class="upload"
        :action="action"
        max-count="1"
        :file-list="fileList2"
        upload-text="选择人脸照"
      ></u-upload>
    </view>
    <ux></ux>
    <view v-if="!showImage" class="tip-exp">换脸示例</view>
    <view   class="image-wrap">

    <u-image class="image" v-if="showImage" width="95%" :src="src"></u-image>
    <image v-else :src="src" class="image" />
    </view>

    <u-button class="swap" type="primary" @click="swap">一键换脸</u-button>
  </view>
</template>

<script>
import { txt2img, test } from '@/services/api.js';
import ux from './u.vue';
export default {
  components: { ux },
  data() {
    return {
      // 演示地址，请勿直接使用
      action: 'http://43.139.23.56:8014/upload_image',
      fileList: [],
      fileList2: [],
      images: [],
      showImage: false,
      src: '',
    };
  },
  onLoad(options) {
    this.src = options.src;
  },
  methods: {
    async swap() {
      //   let params = {
      //     denoising_strength: 0,
      //     prompt: 'puppy dogs', //提示词
      //     negative_prompt: '', //反向提示词
      //     seed: -1, //种子，随机数
      //     batch_size: 2, //每次张数
      //     n_iter: 1, //生成批次
      //     steps: 50, //生成步数
      //     cfg_scale: 7, //关键词相关性
      //     width: 512, //宽度
      //     height: 512, //高度
      //     restore_faces: false, //脸部修复
      //     tiling: false, //可平埔
      //     override_settings: {
      //       sd_model_checkpoint: 'wlop-any.ckpt [7331f3bc87]',
      //     }, // 一般用于修改本次的生成图片的stable diffusion 模型，用法需保持一致
      //     script_args: [
      //       0,
      //       true,
      //       true,
      //       'LoRA',
      //       'dingzhenlora_v1(fa7c1732cc95)',
      //       1,
      //       1,
      //     ], // 一般用于lora模型或其他插件参数，如示例，我放入了一个lora模型， 1，1为两个权重值，一般只用到前面的权重值1
      //     sampler_index: 'Euler', //采样方法
      //   };
      //   let res = await txt2img(params);
      //   console.log(res);
      //   this.images.push(res.images);
      //   this.src = 'data:image/png;base64,' + res.images[1];
      //   this.showImage = true;
    },
  },
};
</script>

<style>
.area {
  display: flex;
  margin-bottom: 40rpx;
}
.tip-exp {
  text-align: center;
  color: burlywood;
}
.image-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500rpx;
}
.image {
  /* width: 95%;
  height: auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0); */
  /* max-width: 95%;
  height: auto; */
}
.exp {
}
.swap {
  position: absolute;
  bottom: 20rpx;
  margin: 0 40rpx;
  width: 90%;
}
</style>
