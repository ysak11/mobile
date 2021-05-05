<template>
	<view class="warpper">
		<uni-card v-for="item in waitList" :key="item._id"
		:title="item.areaName" mode="basic" :is-shadow="true" extra="等待处理">
		  {{item.message}}
				<view class="imgContent">
					<img v-for="(img, index) in item.imgs" :key="index"
					class="img" :src="img" @click="previewImg(img)"></img>
				</view>
				
				<view class="accept">
					<button type="default" @click="accept(item)">接受</button>
				</view>
		</uni-card>
		
		
		<uni-card v-for="item in solvingList" :key="item._id"
		:title="item.areaName" mode="basic" :is-shadow="true" extra='正在处理中'>
			{{item.message}}
			
			<view class="imgContent"> 
					<cover-image v-for="img in item.imgs" :key="img"
					class="img" :src="img" @click="previewImg(img)"></cover-image>
			</view>
		</uni-card>
		
		
		<view class="sub" @click="naviTo('/pages/component/Submit')">上报</view>
		
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-message type="success" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import { reqUpdateUser, reqUpdateMessage} from '@/api';
	import { mapState } from 'vuex';
	
	export default {
		data() {
			return {
				message: '',				//提示信息
			}
		},
		created() {
			//更新信息和用户列表
			this.$store.dispatch('getMessageInfo');
			this.$store.dispatch('getUserInfo');
		},
		computed: {
			...mapState(['messageList', 'userInfo']),
			//反转列表，让最新的消息在最上面显示
			reverseList() {
				return this.messageList.slice().reverse();
			},
			//等待解决的问题列表
			waitList() {
				return this.reverseList.filter(item => item.status === 'waitting');
			},
			//正在解决的问题列表
			solvingList() {
				return this.reverseList.filter(item => item.status === 'solving');
			}
		},
		methods: {
			//跳转页面
			naviTo(url) {
				uni.navigateTo({
					url,
				})
			},
			//点击放大图片（预览）
			previewImg(url) {
				// console.log(url)
				let imgArray = [];
				
				// 预览单张图片
				imgArray[0] = url;
				uni.previewImage({
					current:0,
					urls:imgArray
				})
				
				// for(let i = 0, len = arr.length; i < len; i++) {
				// 	imgArray.push(arr[i]);
				// }
				
				// uni.previewImage({
				// 		current: index - 1,
				// 		urls: imgsArray,
				// 		indicator: 'number',
				// 		loop: true
				// });
			},
			
			//接受任务
			async accept(item) {
				if(this.userInfo.status !== 'free') {
					this.message = '当前还有任务没有完成';
					this.$refs.popup.open();
				} else {
					//改变用户状态
					this.userInfo.status = 'working';
					this.userInfo.solveId = item._id;
					
					//将问题的状态改为正在解决
					item.status = 'solving';
					
					//修改数据库中的相关信息
					await reqUpdateMessage(item);
					await reqUpdateUser(this.userInfo);
					
					//更新用户信息
					this.$store.dispatch('getUserInfo');
					//发送请求更新区域信息
					this.$store.dispatch('getAreaInfo');
					
					this.message = '任务已接受';
					this.$refs.popup.open();
				}
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
			
			.accept {
				border-top: 1px solid #c8c7cc;
				width: 100%;
				height: 50rpx;
				padding-top: 12rpx;
				position: relative;
					
				button {
					width: 160rpx;
					height: 60rpx;
					right: 0;
					position: absolute;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 30rpx;
					background-color: #2ed573;
					color: #fff;
				}
				button:active {
					background-color: #7bed9f;
				}
			}
		}
		
		.sub {
			position: fixed;
			background-color: #1e90ff;
			z-index: 9;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			right: 60rpx;
			bottom: 160rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			font-size: 30rpx;
		}
		.sub:active {
			background-color: #70a1ff;
		}
	}
</style>
