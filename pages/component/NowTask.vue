<template>
	<view class="warpper">
		<uni-card title="areaName"  mode="basic"  :is-shadow="true"  extra="2019/10/10"  >
		   uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5
				<view class="imgContent">
					<cover-image class="img" src="/static/1.jpg" @click="previewImg('/static/1.jpg')"></cover-image>
					<cover-image class="img" src="/static/2.jpg"></cover-image>
					<cover-image class="img" src="/static/3.jpg"></cover-image>
				</view>
				
				<view class="finished">
					<button type="default">已完成</button>
				</view>
				<view class="give-up">
					<button type="warn">放弃任务</button>
				</view>
		</uni-card>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
				user: {}
			}
		},
		mounted() {
			const value = uni.getStorageSync('userInfo');
			if (value) {
				// console.log(value)
				this.user = value;
			}
		},
		computed: {
			...mapState(['messageList']),
			//反转数组才能让数组第一条是最新的信息
			reverseList() {
				return this.messageList.slice().reverse();
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.warpper {
		height: 100%;
		background-color: #f0f0f0;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.uni-card {
			.imgContent {
				padding: 16rpx 0;
				display: flex;
				.img {
					width: 160rpx;
					height: 160rpx;
					padding-right: 16rpx;
				}
			}
			
			.finished {
				margin-top: 66rpx;
				
				button {
					color: #fff;
					background-color: #2980b9;
				}
				button:active {
					background-color: #3498db;
				}
				
			}
			
			.give-up {
				margin-top: 22rpx;
			}
		}
	}
</style>