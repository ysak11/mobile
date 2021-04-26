<template>
	<view class="warpper">
		<uni-list>
			<uni-list-item v-for="(item, index) in list" 
			:show-badge="true" :showArrow="true" :border="true" :title="item" :key="index">
			{{item}}
			</uni-list-item>
			
			<!-- <uni-list-item :show-badge="true" title="开启点击反馈" :showArrow="true" :border="true"/> -->
		</uni-list>
	</view>
</template>

<script>
	// import {list} from '@dcloudio/uni-ui'
	export default {
		// components: {
		// 	uni-list
		// },
		data() {
			return {
				list: ['A1', 'B2', 'C3', '日', '月', '星']
			}
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
