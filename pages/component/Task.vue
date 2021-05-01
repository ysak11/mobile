<template>
	<view class="warpper">
		<uni-card v-for="item in workerRec" :key="item._id"
		:title="item.areaName"  mode="basic"  :is-shadow="true"  :extra="item.date"  >
		    {{item.message}}
				<view class="imgContent">
					<cover-image class="img" src="/static/1.jpg" @click="previewImg('/static/1.jpg')"></cover-image>
					<cover-image class="img" src="/static/2.jpg"></cover-image>
					<cover-image class="img" src="/static/3.jpg"></cover-image>
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
			},
			//职工的记录(注意是反转后的)
			workerRec() {
				return this.reverseList.filter(item => item.workerName === this.user.username);
			}
		}
	}
</script>

<style lang="scss">
	.warpper {
		position: relative;
		height: 100%;
		overflow: hidden;
		background-color: #f0f0f0;
		
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
		}
	}
</style>
