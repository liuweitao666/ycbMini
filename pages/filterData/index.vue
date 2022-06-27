<template>
	<screen :dataTree="categoryList" v-if="categoryList.length > 0" @resetData="resetData" @submit="handleSubmit" />
</template>

<script>
import screen from '@/components/screen/index.vue';
import { mapGetters } from 'vuex';
export default {
	components: {
		screen
	},
	data() {
		return {
			type: ''
		};
	},
	computed: {
		...mapGetters(['categoryList'])
	},
	onShow() {},
	onLoad({ title }) {
		// 1 业务类型 2 办理地区
		uni.setNavigationBarTitle({
			title
		});
	},
	methods: {
		// 刷新上一个页面
		async handleSubmit() {
			uni.navigateBack()
		},
		// 重置
		resetData() {
			this.$store.commit('SET_FILTER_GOODS', []);
			uni.navigateBack()
		}
	}
};
</script>

<style lang="scss" scoped></style>
