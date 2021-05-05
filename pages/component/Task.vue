<template>
	<view class="warpper">
		<uni-card v-for="item in workerRec" :key="item._id"
		:title="item.areaName"  mode="basic"  :is-shadow="true"  :extra="item.date"  >
		    {{item.message}}
				<view class="imgContent">
						<cover-image v-for="img in item.imgs" :key="img"
						class="img" :src="img" @click="previewImg(img)"></cover-image>
				</view>
		</uni-card>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
				
			}
		},
		created() {
			this.$store.dispatch('getMessageInfo');
			//更新用户信息
			this.$store.dispatch('getUserInfo');
		},
		computed: {
			...mapState(['messageList', 'userInfo']),
			//反转数组才能让数组第一条是最新的信息
			reverseList() {
				return this.messageList.slice().reverse();
			},
			//职工的记录(注意是反转后的)
			workerRec() {
				return this.reverseList.filter(item => item.workerName === this.userInfo.username);
			}
		},
		methods: {
			//点击放大图片（预览）
			previewImg(url) {
				let imgArray = [];
				
				// 预览单张图片
				imgArray[0] = url;
				uni.previewImage({
					current:0,
					urls:imgArray
				})
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
