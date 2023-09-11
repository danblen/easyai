<template>
  <view class="">
    <view class="label">大模型选择</view>
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
    <view class="label">LoRA模型选择</view>
    <u-checkbox-group @change="checkboxGroupChange">
      <u-checkbox
        @change="checkboxChange"
        v-model="item.checked"
        v-for="(item, index) in loras"
        :key="index"
        :name="item.name"
      >
        {{ item.name }}
      </u-checkbox>
    </u-checkbox-group>
  </view>
</template>

<script>
import { getSdModels, getSdLoRA } from '@/services/api.js';
export default {
  data() {
    return {
      models: [],
      list: [
        {
          name: 'sd',
          checked: true,
          disabled: false,
        },
      ],
      loras: [
        {
          name: 'sd',
          checked: true,
          disabled: false,
        },
      ],
    };
  },
  mounted() {
    this.getSdModels();
    this.getSdLoRA();
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
    getSdLoRA() {
      getSdLoRA()
        .then((res) => {
          this.loras = [];
          let no_item = {
            name: '',
            path: '',
            iconfont: 'icon-no-full',
            isnone: true,
            selected: true,
          };
          this.selLora = no_item;
          this.loras.push(no_item);

          let temps = res.split(/[(\r\n)\r\n]+/);
          temps.forEach((item, index) => {
            if (!item) {
              temps.splice(index, 1);
            }
            let new_item = {
              name: item,
              // path: this.lora_dir + "\\" + item + '.png',
              path: URL_SD + '/file=models/Lora/' + item + '.png',
              iconfont: '',
              isnone: false,
              selected: false,
            };
            this.loras.push(new_item);
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
