<template>
	<view>
		<!-- 图片展示区域 -->
		<z-upload
			ref="uploadRef"
			:previewFullImage="false"
			:isTapSelect="true"
			:needConfirmDelete="false"
			:width="694"
			:height="700"
			:auto-upload="false"
			:max-count="1"
			@on-choose-complete="onChooseComplete"
			@select="select"
			style="margin-top:20rpx;color: blue;background: burlywood;"
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

		<u-tabs
			:list="list"
			:is-scroll="false"
			:current="curTabIndex"
      style="background: transparent;"
			@change="change"
		></u-tabs>

		<view v-if="curTabIndex===0" style="display: flex; justify-content: space-around; padding: 10px">
			<u-button
				size="small"
				style="flex: 1; margin: 0 5px"
				@click="applyFilter('brightness')"
				>抠图</u-button
			>
			<u-button
				size="small"
				style="flex: 1; margin: 0 5px"
				@click="applyFilter('contrast')"
				>去背景</u-button
			>
			<u-button
				size="small"
				style="flex: 1; margin: 0 5px"
				@click="applyFilter('saturation')"
				>清晰化</u-button
			>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imageSrc: 'path-to-your-image.jpg',
			list: [
				{
					name: '换脸',
				},
				{
					name: '去背景',
				},
				{
					name: '清晰化',
					count: '新',
				},
			],
			curTabIndex: 0,
		};
	},
	methods: {change(index) {
				this.curTabIndex = index;
			},
		applyFilter(type) {
			// TODO: Implement API call to apply filter
		},
	},
};
</script>
