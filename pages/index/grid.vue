<template>
  <view>
    <view style="height:50px"></view>
      <tui-card :title="card.title">
        <template v-slot:body>
          <view class="tui-default">
            <view class="image">
              <image
                style="width: 180rpx; height: 140rpx"
                src="/static/image/logo/nasa.jpeg"
                mode="aspectFill"
              ></image>
            </view>
            <view class="desc">专业模式</view>
          </view>
        </template>
      </tui-card>
    <view style="height:10rx"></view>

    <tui-card :title="card2.title" style="margin-top: 20px">
      <template v-slot:body>
        <view class="tui-default">
          <view class="image">
            <image
              style="width: 180rpx; height: 140rpx"
              src="/static/image/logo/nasa.jpeg"
              mode="aspectFill"
            ></image>
          </view>
          <view class="desc">使用AI技术换脸</view>
        </view>
      </template>
    </tui-card>

    <tui-card :title="card3.title" style="margin-top: 20px">
      <template v-slot:body>
        <view class="tui-default">
          <view class="image">
            <image
              style="width: 180rpx; height: 140rpx"
              src="/static/image/logo/nasa.jpeg"
              mode="aspectFill"
            ></image>
          </view>
          <view class="desc">制作数字分身</view>
        </view>
      </template>
    </tui-card>
  </view>
</template>

<script>
export default {
  data() {
    return {
      card: {
        title: {
          text: '专业模式',
        },
      },
      card2: {
        title: {
          text: 'AI换脸',
        },
      },
      card3: {
        title: {
          text: '制作数字分身',
        },
      },
    };
  },
};
</script>

<style>
.tui-default {
  padding: 20rpx 30rpx;
}
.image {
  display: inline-block;
}
.desc {
  display: inline-block;
  position: absolute;
  padding-left: 10px;
}
</style>
