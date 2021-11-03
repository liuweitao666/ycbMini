<template>
	<view class="enterprise_intro introduce">
		<view class="content">
			<view class="item">
				<text>公司：</text>
				<text class="name">{{data.tenantName||'暂未录入'}}</text>
			</view>
			<view class="item">
				<text>官网：</text>
				<text style="color:#00A4FF" @click="handleCopy(data.officialWebsite || 'www.tianya.cn',)">{{ data.officialWebsite||'www.tianya.cn'}}</text>
			</view>
			<view class="item">
				<text>地址：</text>
				<text class="name">{{data.address||'暂未录入地址'}}</text>
			</view>
			<view class="item_card">
				<view class="card_title" style="padding-left: 0;">
					公司简介
				</view>
				<view class="card_desc">
						{{data.companyProfile||'暂无简介'}}
				</view>
			</view>
			
		</view>
		<view class="card">
			<view class="card_title">
				公司相册
			</view>
			<view class="photo" v-if="data.companyPhotos.length>0">
				<view class="company_img" v-for="(item,index) in data.companyPhotos" :key="key">
					<image :src="item.url" mode=""></image>
				</view>
			</view>
			<u-empty text="数据为空" v-else></u-empty>
		</view>
	</view>
</template>

<script>
	export default{
		props:['data'],
		methods:{
			openWeb(url){
				uni.navigateTo({
					url:`/pages/webView/webView?url=${encodeURIComponent(url)}`
				})	
			},
			// 复制文本
			handleCopy(value) {
				uni.setClipboardData({
					data: value, //要被复制的内容
					success: () => {
						//复制成功的回调函数
						uni.showToast({
							//提示
							title: '复制成功,请移步至浏览器打开',
							icon: 'none'
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.enterprise_intro{
		.content{
			.item{
				font-size: 28rpx;
				padding: 20rpx 30rpx;
				border-bottom: 1px solid #EDEDED;
				.name{
					color: #999;
				}
			}
			.item_card{
				padding: 30rpx;
			}
		}
		.card_title{
			padding:0 0 30rpx 20rpx;
		}
		.card{
			padding: 30rpx 0 10rpx;
		}
	}
	.photo{
		display: flex;
		flex-wrap: wrap;
		padding-left: 8rpx;
	}
	.company_img{
		width: 200rpx;
		height: 200rpx;
		margin-left: 18rpx;
		margin-bottom: 18rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
