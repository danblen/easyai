<template>
  <view> 
    <txt ref="modelRef" />
    <model ref="modelRef" />
    <sampler ref="modelRef" />
    <pic ref="modelRef" />
    <a ref="modelRef" />
    <b/>
  </view>
</template>

<script>
import model from './model.vue';
import sampler from './sampler.vue';
import txt from './txt.vue';
import pic from './pic.vue';
import a from './a.vue';
import b from './b.jsx';
export default {
  components: {b, model, sampler, txt,pic,a },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
