<template>
  <view>
    <view class="label">绘画描述词</view>
    <u-input
      v-model="prompt"
      :type="type"
      :border="border"
      :height="height"
      :auto-height="autoHeight"
    />
    <view class="label">反向描述词</view>

    <u-input
      v-model="value"
      :type="type"
      :border="border"
      :height="height"
      :auto-height="autoHeight"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      prompt: '',
      type: 'textarea',
      border: true,
      height: 100,
      autoHeight: true,
    };
  },
};
</script>
<style lang="scss" scoped>
.label {
  color: #552929;
}
</style>
