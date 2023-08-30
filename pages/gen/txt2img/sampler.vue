<template>
  <view>
    <view class="label">提示词相关性</view>
    <u-slider v-model="formData.cfg_scale" min="1" max="30"></u-slider>
    <view class="label">采样迭代步数</view>
    <u-slider v-model="formData.steps" min="1" max="150"></u-slider>
    <view class="label">采样方法</view>
    <u-button @click="show = true">选择</u-button>
    <u-select v-model="show" :list="samplers" @confirm="confirm"></u-select>

    <view class="label">随机种子(选填)</view><u-input
      v-model="seed_num"
      type="number"
      :border="true"
      :height="height"
    />
  </view>
</template>

<script>
import {
  getSdModels,
  getSdLoRA,
  getSdSamplers,
  getTranslate,
  postTxt2img,
} from '@/services/api.js';
// import grid from './grid.vue';
export default {
  // components: { grid },
  data() {
    return {
      show: false,
      samplers: [
      ],
      formData: {
        cfg_scale: 1,
        steps: 2,
        samplerVal: 3,
        sampler_name: '',
      },
      seed_num: '',
    };
  },
  mounted() {
    // this.getSdSamplers();
  },
  methods: {
    confirm(e) {
      this.formData.samplerVal = e[0];
    },
    getSdSamplers() {
      getSdSamplers()
        .then((res) => {
          this.samplers = [];
          res.forEach((item, index) => {
            let new_item = {
              label: item.name,
              value: index,
              ...item,
            };
            if (index == this.samplerVal) {
              this.formData.sampler_name = item.name;
            }
            this.samplers.push(new_item);
          });
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  color: #552929;
}
</style>
