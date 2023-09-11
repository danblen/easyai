<template>
  <view class="view">
    <view class="desc"></view>
    <z-upload
      ref="uploadRef"
      :max-count="4"
      :previewFullImage="false"
      :isTapSelect="true"
      :needConfirmDelete="false"
      :width="150"
      :height="150"
      :auto-upload="false"
      @on-choose-complete="onChooseComplete"
      @onPreview="onPreview"
    ></z-upload>
  </view>
</template>

<script>
import { URL_SD, URL_BACK } from '@/services/app.js';
export default {
  data() {
    return {
      selectedImageUrl: '',
    };
  },
  created() {},
  methods: {
    onChooseComplete(list, name) {
      if (list.length == 1) {
        this.$refs.uploadRef.selectImage(list[0].url, 0);
        this.selectedImageUrl = list[0].url;
      }
    },
    onPreview(url) {
      this.selectedImageUrl = url;
    },
  },
};
</script>
<style scoped lang="scss">
// .view {
//   padding: 10rpx;
//   background: rgb(186, 173, 194);
// }
// .desc {
// }
</style>
