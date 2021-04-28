<template>
	<view class="warpper">
		<view class="title">
					<text>河工大</text>
					<text>绿化管理系统</text>
		</view>

		
		<view class="content">
			<view class="input">
				<text class="warn" v-show="this.warn.length !== 0">* {{warn}}</text>
				
				<view class="input-content">
					<uni-icons type="person" size="24"></uni-icons>
					<input type="text" v-model="username" placeholder="请输入用户名">
				</view>
				<view class="input-content">
					<uni-icons type="locked" size="24"></uni-icons>
					<input type="password" v-model="password" placeholder="请输入密码">
				</view>

			</view>
			<button @click="loginClick">登录</button>
		</view>
	</view>
</template>

<script>
	import {reqLogin} from '@/api';
	import {UPDATE_USER_INFO} from '@/store/mutation-type';
	
	export default {
		data() {
			return {
				username: '',
				password: '',
				warn: ''
			}
		},
		//页面加载
		onLoad() {
			//查看是否已经登录过
			uni.getStorage({
			    key: 'userId',
			    success: function (res) {
						//已经登录过则直接跳转到区域页面
			      uni.switchTab({
			          url: '/pages/component/Message'
			      });
			    }
			});
		},
		methods: {

			//点击登录按钮
			async loginClick() {
				let username = this.username.trim();
				let password = this.password.trim();
				
				if(username && password) {
					let result = await reqLogin(username, password);
					result = result.data;
					if(result.status === 0) {
						this.warn = '';
						//把用户信息保存到vuex
						this.$store.commit(UPDATE_USER_INFO, result.data);
						//跳转到Tab的页面需要用这个API
						uni.switchTab({
						    url: '/pages/component/Message'
						});
						//本地存储用户信息
						uni.setStorage({
						    key: 'userId',
						    data: result.data._id
						});
					} else {
						this.warn = "登录失败，用户名或密码错误";
					}
				} else {
					this.warn = "用户名或密码为空";
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.warpper {
		position: absolute;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background: url(/static/bc.jpg) repeat 0 0;
		/* background-image: url(../../static/bc.jpg); */
		
		.title {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 160rpx;
			color: #fff;
			font-size: 60rpx;
		}
		
		.content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: calc(100vw - 120rpx);
			
			background-color: rgba($color: #fff, $alpha: 0.7);
			border-radius: 10rpx;
			.input {
				height: 180rpx;
				display: flex;
				flex-direction: column;
				.warn {
					position: absolute;
					top: -50rpx;
					color: #c0392b;
					font-size: 28rpx;
					font-weight: bold;
				}
				
				.input-content {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					padding-left: 10rpx;
					input {
						flex: 1;
						padding: 16rpx;
						font-size: 30rpx;
					}
				}
			}
			
			button {
				position: absolute;
				bottom: -160rpx;
				height: 90rpx;
				width: 100%;
				color: #fff;
				// background-color: #2ed573;
				background-color: rgba($color: #2ed573, $alpha: 0.9);
			}
			
			button:active {
				// background-color: #7bed9f;
				background-color: rgba($color: #7bed9f, $alpha: 0.9);
			}
		}
	}
</style>
