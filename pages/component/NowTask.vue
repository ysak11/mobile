<template>
	<view class="warpper">
		<view v-if="solving" class="content">
			<uni-card :title="solving.areaName"  mode="basic"  :is-shadow="true"  :extra="solving.date"  >
				 {{solving.message}}
				<view class="imgContent"> 
						<cover-image v-for="img in solving.imgs" :key="img"
						class="img" :src="img" @click="previewImg(img)"></cover-image>
				</view>
					
					<view class="finished">
						<button type="default" @click="finish(solving)">已完成</button>
					</view>
					<view class="give-up">
						<button type="warn" @click="giveup(solving)">放弃任务</button>
					</view>
			</uni-card>
		</view>
		
		<view class="nothing" v-else>
			目前没有要处理的任务
		</view>
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-message type="success" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {reqUpdateUser, reqUpdateMessage, reqAddMessage } from '@/api';
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
				message: '',		//提示信息
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
			
			//查找与职工处理的问题的Id一致的问题
			solving() {
				if(this.userInfo.status !== 'free') {
					let temp = this.messageList.filter(item => item._id === this.userInfo.solveId);
					return temp.length !== 0 ? temp[0] : null;
				} else {
					return null;
				}
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
			},
			
			//完成任务
			async finish(item) {
				//用户状态变为空闲
				this.userInfo.status = 'free';
				this.userInfo.solveId = '';
				
				//将问题状态改为无效
				item.status = 'invalid';
	
				//创建一个新的已解决问题的信息
				const date = this.getDate();
				const msg = {
					message: item.message,
					status: 'solved',
					date,
					areaName: item.areaName,
					workerName: this.userInfo.username,
					imgs: item.imgs
				}
				//添加一条新的信息
				await reqAddMessage(msg);
				//修改数据库中的相关信息
				await reqUpdateMessage(item);
				await reqUpdateUser(this.userInfo);
				
				//更新用户信息
				this.$store.dispatch('getUserInfo');
				this.$store.dispatch('getMessageInfo');
				
				this.message = '任务已完成';
				this.$refs.popup.open();
			},
			
			//放弃任务
			async giveup(item) {
				//用户状态变为空闲
				this.userInfo.status = 'free';
				this.userInfo.solveId = '';

				//将问题状态重新改为待解决
				item.status = 'waitting';
				
				//修改数据库中的相关信息
				await reqUpdateMessage(item);
				await reqUpdateUser(this.userInfo);
				
				//更新用户信息
				this.$store.dispatch('getUserInfo');
				this.$store.dispatch('getMessageInfo');
				
				this.message = '任务已放弃';
				this.$refs.popup.open();
			},
			
			//获取日期
			getDate() {
			  const date = new Date();
			  const year = date.getFullYear();
			  const month = date.getMonth() + 1;
			  const day = date.getDate();
			  const hour = date.getHours();
			  const minutes = date.getMinutes();
			  const seconds = date.getSeconds();
			  
			  // console.log(`${year}/${month}/${day}  ${hour}:${minutes}:${seconds}`);
			  //将不足两位数的数字前面补个0
			  return `${year}/${this.twoFix(month)}/${this.twoFix(day)} ${this.twoFix(hour)}:${this.twoFix(minutes)}:${this.twoFix(seconds)}`;
			},
			
			//将小于10的数字前面加个0
			twoFix(num) {
			  let temp = num;
			  if(parseInt(temp) < 10) {
			    temp = '0' + temp;
			  }
			  return temp;
			}

		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		width: 100%;
	}
	.warpper {
		height: 100%;
		width: 100%;
		background-color: #f0f0f0;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.content {
			overflow: hidden;
			display: flex;
			width: 100vw;
		}
		
		.nothing {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 20px;
			font-weight: bold;
		}
		.uni-card {
			width: 100%;
			.imgContent {
				padding: 32rpx;
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