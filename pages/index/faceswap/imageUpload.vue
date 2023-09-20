<template>
  <view class="view">
    <view class="desc"></view>
    <z-upload
      ref="uploadRef"
      :previewFullImage="false"
      :isTapSelect="true"
      :needConfirmDelete="false"
      :width="120"
      :height="120"
      :auto-upload="false"
      @on-choose-complete="onChooseComplete"
      @select="select"
    >
      <!-- <view
        slot="addBtn"
        class="slot-btn"
        hover-class="slot-btn__hover"
        style="border-radius: 50%"
        hover-stay-time="150"
      >
        <u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
      </view> -->
    </z-upload>
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
    select(url) {
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
