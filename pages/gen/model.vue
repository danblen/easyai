<template>
  <view class="">
    <view>大模型选择</view>
    <u-checkbox-group @change="checkboxGroupChange">
      <u-checkbox
        @change="checkboxChange"
        v-model="item.checked"
        v-for="(item, index) in list"
        :key="index"
        :name="item.name"
      >
        {{ item.name }}
      </u-checkbox>
    </u-checkbox-group>
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
export default {
  data() {
    return {models:[],
      list: [
        {
          name: 'sd',
          checked: true,
          disabled: false,
        },
      ],
    };
  },
  mounted() {
    this.sizeDeal();
    this.getSdModels();
    this.getSdLoRA();
    this.getSdSamplers();
    this.resetQulitys(this.qualitys[0].param);
  },
  methods: {
    getSdModels() {
      getSdModels()
        .then((res) => {
          this.models = [];
          res.forEach((item, index) => {
            if (index == 0) {
              item.selected = true;
              this.formData.sd_model_hash = item.hash;
            } else {
              item.selected = false;
            }
            this.models.push(item);
          });
        })
        .catch((err) => {});
    },
    // 选中某个复选框时，由checkbox时触发
    checkboxChange(e) {
      //console.log(e);
    },
    // 选中任一checkbox时，由checkbox-group触发
    checkboxGroupChange(e) {
      // console.log(e);
    },
  },
};
</script>
