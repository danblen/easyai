<template>
  <u-popup mode="bottom" v-model="isShow">
    <view>您好，请登录</view>
    <button
      type="primary"
      size="medium"
      :style="{ width: '50%' }"
      class="u-d-b w-100 mb-30"
      @click="login"
    >
      微信一键登陆
    </button>
    <disclaimer />
  </u-popup>
</template>

<script>
import { getUserInfo } from '../common/user.js';
import disclaimer from './disclaimer.vue';
export default {
  components: { disclaimer },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
   async login() {
      const res = await getUserInfo();
      if (res) {
        this.isShow = false;
        this.$emit('login', res);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
