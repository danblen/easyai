<template>
  <view> 
    <txt ref="modelRef" />
    <model ref="modelRef" />
    <sampler ref="modelRef" />
    <pic ref="modelRef" />
  </view>
</template>

<script>
import model from './model.vue';
import sampler from './sampler.vue';
import txt from './txt.vue';
import pic from './pic.vue';
export default {
  components: {  model, sampler, txt,pic  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
