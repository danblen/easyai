<template>
	<view class="container" :style="{height:windowHeight+'px'}">
		<view class="content-wrapper">
			<view>
				<view class="ad-container margin-top cu-list menu sm-border card-menu">
					<ad unit-id="adunit-b7df91d4367e062b"></ad>
				</view>
			</view>
			
			<view @click="showModal" data-target="Modal"  id="btn-footer-oa">
				<tui-footer :fixed="true" style="margin-bottom:40px" :copyright="copyright"></tui-footer>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapState,
		mapMutations
	} from "vuex";
	// import tuiFooter from "@/components/tui/footer";
	// import tuiFooter from "@/components/tui-footer/tui-footer.vue"
	// import tuiIcon from "@/components/tui-icon/tui-icon.vue"

	// 在页面中定义插屏广告
	let interstitialAd = null

	export default {
		components: {
			// tuiFooter,
			// tuiIcon
		},
		data() {
			return {
				copyright: " Copyright © 2020-2023",
				officialAccountUrl: "https://mina-img-store-1258554429.cos.ap-shanghai.myqcloud.com/new-year-wish/renwenzhichuang.png",
				windowHeight: 0,
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				modalName: null
			}
		},
		onLoad() {
			this.windowHeight = getApp().globalData.windowHeight;
			// 在页面onLoad回调事件中创建插屏广告实例
			if (wx.createInterstitialAd) {
				interstitialAd = wx.createInterstitialAd({
					adUnitId: 'adunit-28338c7d91d145af'
				})
				interstitialAd.onLoad(() => {})
				interstitialAd.onError((err) => {
					console.log(err);
				})
				interstitialAd.onClose(() => {})
			}
		},
		onShow() {
			// 在适合的场景显示插屏广告
			console.log('interstitialAd', !!interstitialAd);
			if (interstitialAd) {
				interstitialAd.show().catch((err) => {
					console.error(err)
				})
			}
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			})
		},
		methods: {
			tucao: function() {
				const Tucao = requirePlugin('tucao').default;
				// 初始化并触发跳转，支持链式调用
				this.wx = uni;
				Tucao.init(this, {
					productId: 120746
				}).go();
			},
			addHappiness: function() {
				console.log('addHappiness');
				wx.navigateToMiniProgram({
					appId: 'wxb8055d6d942b3690',
					path: 'pages/happiness/add-happiness',
					success(res) {
						console.log(res);
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			showModal: function(e) {
				console.log(e.currentTarget.dataset);
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal: function(e) {
				this.modalName = null;
			},
			handleContact: function(e) {
				console.log(e.detail.path)
				console.log(e.detail.query)
			}
		},
		onShareAppMessage() {
			return {
				title: '头像加福贺新春',
				desc: '贺新春，贴福字，为你的头像加个福字吧',
				imageUrl: '/static/image/redirect-cover.jpg',
				path: '/pages/happiness/add-happiness',
				success: function(res) {
					console.log(res);
				}
			}
		}
	}
</script>

<style scoped>
	.content-wrapper {
		margin-top: 150rpx;
	}
	
	.about-actions{
		/* position: fixed; */
		/* bottom: 80px; */
		width: 500rpx;
		/* left: 125rpx; */
	}

	.card-menu {
		margin-left: auto;
		margin-right: auto;
	}

	.free-btn-bordernone {
		background: none !important;
		color: #000 !important;
		display: inline-block !important;
	}

	.free-btn-bordernone::after {
		border: none;
	}
	
	.ad-container {
		width: 690rpx;
	}
</style>
