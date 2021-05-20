<template>
	<view class="warpper">
		<uni-collapse accordion="true">
		    <uni-collapse-item v-for="item in showList"  :key="item._id"
				:title="item.name" :showAnimation="true" :open="true">
						<uni-card
						    :title="item.name" 
						    mode="basic" 
						    :is-shadow="true" 
								:extra="parseInt(item.waterQuantity) >= parseInt(item.warnValue) ? '状态正常' : '状态异常'"
						>
						    <view class="content">
						        	<view><text class="title">种类： </text>{{item.type}}</view>
						    			<view><text class="title">具体植株： </text>{{item.plant}}</view>
						    			<view><text class="title">区域水量： </text>
											<text   :class="{'warn':parseInt(item.waterQuantity) < parseInt(item.warnValue)}">{{item.waterQuantity}}</text></view>
						    			<view><text class="title">预警水量： </text>{{item.warnValue}}</view>
											<view><text class="title">灌溉设备： </text> <text :class="{'warn':item.equip === '暂无'}">{{item.equip}}</text></view>
						    		<!-- <view class="status">
						    			<text>状态：{{item.waterQuantity >= item.warnValue ? "正常" : "异常"}}</text>
						    		</view> -->
						    </view>
								
								<view class="bottom">
									<button class="water" @click="open(item)">灌溉</button>
								</view>
						</uni-card>
		    </uni-collapse-item>
		</uni-collapse>
		
		
		<view class="shape" v-show="showWindow">
			<view class="tips">
				<view class="header">
					灌溉水量
				</view>
				<view class="center">
					<view class="input-content">水表读数：<input class="uni-input" focus v-model="watcher"/>m³</view>
					<view class="fact">=<text>{{waterValue || 0}}</text>升</view>
				</view>
				<view class="bottom-btn">
					<button class="confirm" @click="water">确定</button>
					<button class="cancel" @click="close">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import { getDate } from '@/util';
	import { reqWaterVal, reqAddMessage } from '@/api';
	// import {reqUserInfo} from '@/api';
	
	export default {
		data() {
			return {
				// key: 'c655296e4f6184c0cab57bbcc4395c49'				//小程序KEY
				actItem: null,					//操作中的区域
				showWindow: false,				//灌溉窗口
				watcher: '',            //水表读数
				waterValue: '',         //灌溉量
			}
		},
		created() {
			//更新用户信息
			this.$store.dispatch('getUserInfo');
			//发送请求更新区域信息
			this.$store.dispatch('getAreaInfo');
			//获取设备列表
			this.$store.dispatch('getDeviceInfo');
		},
		watch: {
			watcher: {
				handler(newVal) {
					this.waterValue = Number(newVal) * 1000;
				}
			}
		},
		computed: {
			...mapState(['areaList', 'deviceList', 'userInfo']),
			    // },
					
			showList() {
				let len = this.areaList.length;
				
				for(let i = 0; i < len; i++) {
					let temp = this.deviceList.filter(item => item.toArea === this.areaList[i].name);
					// console.log(temp);
					if(temp.length !== 0) {
						this.areaList[i].equip = temp[0].name;
					} else {
						this.areaList[i].equip = '暂无';
					}
				}
				return this.areaList;
			}
		},
		methods: {
			//打开灌溉窗口
			open(item) {
				this.showWindow = true;
				this.actItem = item;
			},
			
			//关闭窗口
			close() {
				this.watcher = 0;
				this.showWindow = false;
			},
			
			//进行灌溉
			async water() {
				//浇水量加上现有水量
				let val = Number(this.waterValue) + Number(this.actItem.waterQuantity);
				// console.log(this.waterValue+ "  " +item.waterQuantity +"  " + val);
				
				//如果大于上限则水量值等于上限
				val = val > this.actItem.waterTop ? this.actItem.waterTop : val;
				//控制小数位数后再重新转为字符串
				val = String(val.toFixed(2));
				//直接发送请求更新水量，等待结果返回后重新更新区域信息
				await reqWaterVal(this.actItem._id, val);
				//如果是灌溉设备灌溉的则不会发送消息
				if(this.actItem.equip === '暂无') {
					//发送消息到数据库存储
					this.sendMsg(this.actItem, this.waterValue);
				}
	
				//更新区域信息
				this.$store.dispatch('getAreaInfo');
				
				this.close();
			},
			
			//发送浇水消息到数据库
			async sendMsg(item, val) {
				const date = getDate();
				const message = `职工 ${this.userInfo.username} 为区域 ${item.name} 浇水${val}升`
				const msg = {
					message,
					status: 'water',
					date,
					areaName: item.name,
					workerName: this.userInfo.username
				}
				//将消息发送给服务器
				await reqAddMessage(msg);
			}
		}
		
	}
</script>

<style lang="scss">
	.warpper {
		.uni-collapse {
			
			.uni-card {
				view {
					padding:  12rpx;
					
					.title {
						font-weight: bold;
					}
					
					.warn {
						color: red;
						font-weight: bold;
					}
				}
				
				.water {
					background-color: #2980b9;
					color: #fff;
					&:active {
						background-color: #3498db;
					}
				}
				
			}
		}
		
		
		.shape {
			position: fixed;
			top: 0;
			left: 0;
			height: 100vh;
			width: 100vw;
			background-color: rgba($color: #000000, $alpha: 0.5);
			.tips {
				overflow: hidden;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 80%;
				height: 160px;
				background-color: #fff;
				border-radius: 16px;
				.header {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 50px;
					font-weight: bold;
					color: #a4b0be;
				}
				
				.center {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					// font-size: 14px;
					.input-content {
						display: flex;
						align-items: flex-end;
					}
					.uni-input {
						display: inline-block;
						// font-size: 14px;
						text-align: right;
						border-bottom: 1px solid #000;
						height: 16px;
						width: 100px;
						box-sizing: border-box;
						padding: 0 6px;
						
					}
					
					.fact {
						text {
							display: inline-block;
							width: 60px;
							text-align: center;
							box-sizing: border-box;
							padding: 0 6px;
							margin: 10px;
						}
						
					}
					
				}
				
				.bottom-btn {
					position: absolute;
					width: 100%;
					bottom: 0;
					display: flex;
					button {
						background-color: #fff;
						border-radius: 0;
						flex: 1;
					}
					.confirm {
						color: #1e90ff;
						&:active {
							color: #70a1ff;
						}
					}
				}
			}
		}
	}
</style>
