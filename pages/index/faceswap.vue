<template>
  <view>
    <u-navbar :border-bottom="false" title="一键换脸"></u-navbar>
    <u-alert-tips
      class="tip"
      type="warning"
      :title="title"
      :description="description"
    ></u-alert-tips>
    <view class="area"></view>
    <view class="image-wrap">
      <!-- <u-image class="image" :src="src"></u-image> -->
      <img :src="src" class="image" />
      <self class="avatar" ref="selfRef"></self>
    </view>

    <u-button class="swap" type="primary" @click="swap">一键换脸</u-button>
  </view>
</template>

<script>
import { txt2img, test } from '@/services/api.js';
import self from './self.vue';
export default {
  components: { self },
  data() {
    return {
      // title: '选择人脸照片替换原图中人脸',
      description:
        '请选择一张人脸清晰的照片，生成图片需要等待一段时间，可在作品页查看生成作品和进度，作品将在12小时后删除，请及时保存图片',
      // 演示地址，请勿直接使用
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
      if (!this.$refs.selfRef.isSelfUpload) {
        uni.showToast({
          title: '请选择人脸图片',
          icon: 'none',
        });
        return;
      }

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

<style lang="scss">
.tip {
  margin: 20rpx 20rpx 20rpx 20rpx;
  /deep/ .u-alert-title {
    font-size: 26rpx !important;
  }
  /deep/ .u-alert-desc {
    font-size: 22rpx !important;
  }
}
.image-wrap {
  position: relative;
  .avatar {
    position: absolute;
    right: 20rpx;
    bottom: 40rpx;
  }
  .image {
    width: 100%;
  }
}
.swap {
  position: absolute;
  bottom: 20rpx;
  margin: 0 40rpx;
  width: 90%;
}
</style>
