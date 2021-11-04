<template>
	<view class="person_intro introduce" v-if="data">
		<view class="content">
			<view class="top">
				<!-- <view class="item">
					<text class="label">服务订单：</text>
					<text>637单</text>
				</view>
				<view class="item">
					<text class="label">服务订单：</text>
					<u-rate :current="3.7" active-color="#FFA501" inactive-color="#FFA501" :disabled="true"></u-rate>
					<text style="color:#FFA501;padding-left:8rpx">3.7</text>
				</view>
				<view class="item">
					<text class="label">服务订单：</text>
					<view class="item_right">
						<u-icon name="checkmark-circle"></u-icon>
						<text>
							执业认证
						</text>
						<u-icon name="checkmark-circle"></u-icon>
						<text class="">实名认证</text>
					</view>
				</view> -->
				<view class="intro_for_audio item">
					<view style="height: 90rpx;"><u-avatar size="90"></u-avatar></view>
					<view class="audio_wrap" @click="playAudio">
						<u-icon name="wifi" v-show="isPause" class="audio_icon"></u-icon>
						<u-icon name="pause-circle" v-show="!isPause"></u-icon>
					</view>
					<text v-show="isPause" class="audio_time">点击播放</text>
					<text class="audio_time" v-show="!isPause">{{ playJd + '/' + audioDuration }}</text>
				</view>
			</view>
			<view class="bottom">
				<view class="card_title">个人职称</view>
				<view class="card_desc title">
					<view class="flex_li" v-for="(item, index) in data.personalRank.split(',')" :key="index">·{{ item }}</view>
				</view>
			</view>
		</view>

		<view class="card">
			<view class="card_title">个人经历</view>
			<view class="card_desc">{{ data.workExperience || '暂无' }}</view>
		</view>
		<view class="card">
			<view class="card_title">服务范围</view>
			<view class="card_desc">{{ data.serverScope || '暂未录入' }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['data'],
	data() {
		return {
			innerAudioContext: null,
			// 是否暂停状态
			isPause: true,
			audioDuration: 0,
			playJd: 0
		};
	},
	created() {
		console.log(this.data);
		setTimeout(() => {
			this.innerAudioContext = uni.createInnerAudioContext();
			this.innerAudioContext.src = this.data.personalProfileInvoice;
			this.audioDuration = this.innerAudioContext.duration;
		}, 600);
	},
	destroyed() {
		this.scrollTop = null;
		this.innerAudioContext.pause();
		this.innerAudioContext=null
	},
	methods: {
		formatSeconds(value) {
		    let result = parseInt(value)
		    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
		    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
		    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

		    let res = '';
		    if(h !== '00') res += `${h}h`;
		    if(m !== '00') res += `${m}分钟`;
		    res += `${s}秒`;
		    return res;
		  },
		playAudio() {
			if(!this.data.personalProfileInvoice){
				uni.showToast({
					title:'未上传语音',
					icon:'none'
				})
			}
			this.innerAudioContext.onCanplay(() => {
				console.log(this.innerAudioContext)
				var time = this.innerAudioContext.duration.toFixed(0);
				var min = Math.floor(time / 60);
				var second = time % 60;
				this.audioDuration = (min > 10 ? min : '0' + min) + ':' + (second > 10 ? second : '0' + second);
				console.log('可以播放了', this.duration);
			});

			if (this.isPause) {
				this.innerAudioContext.play();
			} else {
				this.innerAudioContext.pause();
			}
			this.innerAudioContext.onPlay(() => {
				console.log('开始播放');
				this.isPause = false;
			});
			this.innerAudioContext.onPause(() => {
				console.log('暂停播放');
				this.isPause = true;
			});
			this.innerAudioContext.onError(res => {
				console.log(res.errMsg);
				console.log(res.errCode);
			});
			this.innerAudioContext.onTimeUpdate(() => {
				var time = this.innerAudioContext.currentTime.toFixed(0);
				this.audioDuration = this.formatSeconds(this.innerAudioContext.duration)
				//计算进度
				this.playJd = this.formatSeconds(this.innerAudioContext.currentTime);
				// console.log('播放进度', this.playJd);
			});
			// this.innerAudioContext.onTimeUpdate(res=>{
			// 	console.log(res)
			// })
		}
	}
};
</script>

<style lang="scss" scoped>
.person_intro {
	.content {
		.top {
			padding: 20rpx 30rpx;
			.item {
				padding-top: 20rpx;
				.label {
					padding-right: 6rpx;
					color: #999;
				}
				.item_right {
					color: #ffa501;
					display: inline-block;
					text {
						padding: 0rpx 15rpx;
					}
				}
			}
			.intro_for_audio {
				display: flex;
				align-items: center;
				.audio_wrap {
					width: 290rpx;
					height: 70rpx;
					background: #a0e75a;
					border: 1px solid #84d55a;
					position: relative;
					padding-left: 30rpx;
					margin-left: 40rpx;
					border-radius: 6rpx;
					display: flex;
					align-items: center;
					&::before {
						content: '';
						position: absolute;
						width: 30rpx;
						height: 30rpx;
						border-radius: 4rpx;
						background-color: #a0e75a;
						left: -15rpx;
						top: 50%;
						transform: translateY(-50%) rotate(45deg);
					}
					.audio_icon {
						color: #70a13f;
						font-size: 30rpx;
						transform: rotate(90deg);
					}
				}
				.audio_time {
					padding-left: 20rpx;
					color: #999999;
					font-size: 24rpx;
				}
			}
		}
		// 底部
		.bottom {
			border-top: 1px solid #ededed;
			padding: 30rpx;
			.title {
				display: flex;
				flex-wrap: wrap;
				.flex_li {
					width: 50%;
				}
			}
		}
	}
}
</style>
