<template>
	<view class="warpper">
		<uni-list>
			<uni-list-item v-for="item in list" clickable 
			:show-badge="true" :showArrow="true" :border="true" :title="item.name" :key="item._id">
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		// components: {
		// 	uni-list
		// },
		data() {
			return {
				list: []
			}
		},
		async mounted() {
			// let option = {};
			// option.url = '/area/list';
			// let res = await myRequest(option);
			// res = res.data;
			// if(res.status === 0) {
			// 	console.log(res.data);
			// 	this.list = res.data;
			// }
			
		},
		//触发下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				//关闭下拉刷新
				uni.stopPullDownRefresh();
			}, 2000)
		}
	}
</script>

<style>
	uni-list-item {
		display: block;
		height: 78rpx;
		line-height: 78rpx;
		box-sizing: border-box;
	}
</style>
