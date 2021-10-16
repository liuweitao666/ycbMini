<template>
	<view class="mine">
		<!-- 名片 -->
		<view class="business_card">
			<view class="mine_card">
				<image src="../../static/image/personalCenter/card_back.png" class="background" mode=""></image>
				<view class="content">
					<u-avatar src="" size="120"></u-avatar>
					<view class="name">
						{{personData.name}}
					</view>
					<view class="intro">
						技术总监CTO<br/>
						深圳市金信恒企业管理有限公司
					</view>
					<u-icon name="zhuanfa" class="zhuanfa" size="50"></u-icon>
				</view>
			</view>
		</view>
		<view class="Kanban">
			<performance />
		</view>
	</view>
</template>

<script>
	import performance from './components/performance.vue';
	import { getUserInfo,getTenantInfo } from "@/api/personalCenter/index.js"
	import { mapGetters } from 'vuex';
	export default {
		components:{
			performance
		},
		data() {
			return {
				personData:{}
			};
		},
		computed:{
			...mapGetters(['userInfo'])
		},
		created() {
			this.getUserInfo()
		},
		methods:{
			// 获取用户信息
			async getUserInfo(){
				const {user_id} = this.userInfo
				const {data:res} = await getUserInfo(user_id)
				this.personData = res
				console.log(this.personData)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.background{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 26rpx;
	}
	.mine{
		background-color: #FFFFFF;
		min-height: 100vh;
		.business_card{
			padding:48rpx 30rpx 128rpx;
			background-color: #292B4D;
			border-top: 1px solid rgba($color: #000000, $alpha: 0.1);
			.mine_card{
				padding: 44rpx 48rpx;
				background-color: #ccc;
				border-radius: 26rpx;
				position: relative;
				.content{
					position: relative;
					z-index: 9;
					.name{
						font-size: 54rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #9EE8FF;
						line-height: 74rpx;
					}
					.intro{
						color: #FFFFFF;
						line-height: 46rpx;
						font-size: 24rpx;
					}
					.zhuanfa{
						position: absolute;
						right: 0rpx;
						top: 0rpx;
						color: #FFFFFF;
					}
				}
				
			}
			
		}
		.Kanban{
			margin-top: -80rpx;
		}
	}
</style>
