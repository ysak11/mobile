<template>
	<view class="warpper">
		<uni-collapse accordion="true">
		    <uni-collapse-item v-for="item in areaList"  :key="item._id"
				:title="item.name" :showAnimation="true" :open="true">
						<uni-card
						    :title="item.name" 
						    mode="basic" 
						    :is-shadow="true" 
								:extra="parseInt(item.waterQuantity) >= parseInt(item.warnValue) ? '状态正常' : '状态异常'"
						>
						    <view class="content">
						        	<view><text>种类： </text>{{item.type}}</view>
						    			<view><text>具体植株： </text>{{item.plant}}</view>
						    			<view><text>区域水量： </text>{{item.waterQuantity}}</view>
						    			<view><text>预警水量： </text>{{item.warnValue}}</view>
						    		<!-- <view class="status">
						    			<text>状态：{{item.waterQuantity >= item.warnValue ? "正常" : "异常"}}</text>
						    		</view> -->
						    </view>
						</uni-card>
		    </uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	// import {reqUserInfo} from '@/api';
	
	export default {
		data() {
			return {
				// key: 'c655296e4f6184c0cab57bbcc4395c49'				//小程序KEY
			}
		},
		created() {
			//更新用户信息
			this.$store.dispatch('getUserInfo');
			//发送请求更新区域信息
			this.$store.dispatch('getAreaInfo');
		},
		computed: {
			...mapState(['areaList'])
		}
		
	}
</script>

<style lang="scss">
	.warpper {
		.uni-collapse {
			
			.uni-card {
				view {
					padding:  12rpx;
					
					text {
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
