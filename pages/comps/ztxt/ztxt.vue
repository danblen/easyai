<template>
  <view>
    绘画描述词
    <u-input
      v-model="prompt"
      :type="type"
      :border="border"
      :height="height"
      :auto-height="autoHeight"
    />
    反向描述词
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
