<template>
	<view>
		<view :class="['mask-wrap-item',{avtive:item.value===selectValue}]" v-for="(item,index) in dropList" @click.stop="selected(index,item.value)" :key="index">
			<text>{{item.label}}</text>
			<u-icon name="checkbox-mark" v-show="item.value===selectValue"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name:"dropdownItem",
		props:['dropList','selectValue'],
		data() {
			return {
			};
		},
		methods:{
			selected(index,value){
				if(this.selectValue === value) return
				this.$emit('update:selectValue',value)
				this.$parent.selected()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mask-wrap-item{
		line-height: 80rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
		display: flex;
		font-size: 26rpx;
		justify-content: space-between;
		transition: color .28s ease;
		border-bottom: 1px solid #f8f8f8;
		&:last-child{
			border-bottom: none;
		}
	}
	.avtive{
		color: #2979ff;
	}
</style>
