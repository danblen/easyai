<template>
  <view class="box-container">
			<view class="title-box">
				<view class="title">火力值<text v-if="score != -1">({{ score }})</text></view>
				<view class="btn">
					<u-button v-if="mobileStatus == 1" openType="getPhoneNumber" @getphonenumber="getPhoneNumber" type="primary" text="答题+5" shape="circle" plain></u-button>
					<u-button v-if="mobileStatus == 2" type="primary" text="答题+5" shape="circle" plain @click="dati"></u-button>
				</view>
			</view>
			<view class="profile2">火力值可以免费兑换本店菜品～</view>
			<view class="h32"></view>
		</view>
</template>

<script>
export default {
 data(){}
}
</script>

<style>

</style>