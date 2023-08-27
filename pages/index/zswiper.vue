<template>
  <u-swiper :list="list"></u-swiper>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
        },
        {
          image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
        },
      ],
    };
  },
};
</script>

<style></style>
