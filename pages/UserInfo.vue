<template>
	<view class="warpper">
		<view class="header">
			<view class="img-warp">
				<img src="http://121.41.45.147:5000/public/imgs/header.png" alt="">
			</view>
			<view class="header-text">
				<view class="username">用户名：{{this.userInfo.username}}</view>
				<!-- <view class="permission">职务：职工</view> -->
				<view class="status">状态：{{this.userInfo.status !== 'free' ? '处理任务中' : '空闲'}}</view>
			</view>
		</view>
		
		<view class="detail">
			<view class="text">任务完成情况:</view>
			<view class="finished">
				<view class="item">
					<view class="num">{{waterNum}}</view>
					<view class="item-text">灌溉任务</view>
				</view>
				<view class="item">
					<view class="num">{{subNum}}</view>
					<view class="item-text">问题上报</view>
				</view>
				<view class="item">
					<view class="num">{{solveNum}}</view>
					<view class="item-text">其他任务</view>
				</view>
			</view>
		</view>
		
		<uni-list class="list">
			<uni-list-item clickable :show-badge="true" :showArrow="true" :border="true" title="当前任务" @click="naviTo('/pages/component/NowTask')">
			</uni-list-item>
			<uni-list-item clickable :show-badge="true" :showArrow="true" :border="true" title="任务记录" @click="naviTo('/pages/component/Task')">
			</uni-list-item>
			<uni-list-item clickable :show-badge="true" :showArrow="true" :border="true" title="最近动态" @click="naviTo('/pages/component/Recent')">
			</uni-list-item>
			<uni-list-item clickable :show-badge="true" :showArrow="true" :border="true" title="修改密码" @click="naviTo('/pages/component/Modify')">
			</uni-list-item>
		</uni-list>
		<button type="warn" class="exit" @click="exit">退出登录</button>
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
			//更新信息和用户列表
			this.$store.dispatch('getMessageInfo');
			this.$store.dispatch('getUserInfo');
		},
		methods: {
			//跳转页面
			naviTo(url) {
				uni.navigateTo({
					url,
				})
			},
			//退出登录
			exit() {
				//清除本地储存
				uni.removeStorage({
				    key: 'userInfo'
				});
				//跳转到登陆界面
				uni.redirectTo({
				    url: '/pages/component/Login'
				});
			}
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
			},
			//职工灌溉任务次数
			waterNum() {
				return this.workerRec.filter(item => item.status === 'water').length;
			},
			//上报问题次数
			subNum() {
				return this.workerRec.filter(item => item.status === 'waitting' || item.status === 'invalid').length;
			},
			//解决问题次数
			solveNum() {
				return this.workerRec.filter(item => item.status === 'solved').length;
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.warpper {
		position: relative;
		// height: calc(100vh - 50px - 44px);
		height: 100%;
		background-color: #f0f0f0;
		overflow: hidden;
		
		.header {
			width: calc(100vw - 24px);
			height: 200rpx;
			overflow: hidden;
			display: flex;
			// background-color: #fff;
			border-radius: 8px;
			margin: 12px;
			
			
			.img-warp {
				flex: 2;
				position: relative;
				img {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
				}
			}
			
			.header-text {
				flex: 3;
				color: #34495e;
				font-weight: bold;
				display: flex;
				flex-direction: column;
				justify-content: center;
				
				// .permission {
				// 	font-size: 28rpx;
				// 	padding-top: 16rpx;
				// }
				.status {
					font-size: 18rpx;
					padding-top: 30rpx;
				}
			}
		}
		
		.detail {
			width: calc(100vw - 24px);
			background-color: #fff;
			border-radius: 8px;
			margin: 24px 12px;
			height: 220rpx;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			.text {
				margin: 8px;
				font-size: 16rpx;
				font-weight: bold;
			}
			
			.finished {
				flex: 1;
				display: flex;
				.item {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.num {
						font-size: 56rpx;
					}
				}
			}
		}
		
		.list {
			overflow: hidden;
			margin-top: 60rpx;
			font-weight: bold;
		}
		
		.exit {
			margin-top: 60rpx;
		}
	}
</style>
