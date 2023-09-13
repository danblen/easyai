<template>
  <view>asd</view>
</template>

<script>
import { img2img } from '@/services/api.js';
export default {
  // components: { grid },
  data() {
    return {};
  },
  created() {
    this.gen();
  },
  methods: {
    gen() {
      img2img();
    },
  },
};
</script>

<style lang="scss" scoped></style>
