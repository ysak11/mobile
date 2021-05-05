<template>
	<view class="warrper">
		<view class="header">
			请输入原密码
		</view>
		<view class="content">
			<text>原密码：</text>
			<input type="password" v-model="oldPass">
		</view>
		<view class="header">
			请输入新密码
		</view>
		<view class="content">
			<text>新密码：</text>
			<input type="password" v-model="newPass">
		</view>
		<view class="content">
			<text>再次输入：</text>
			<input type="password" v-model="reNewPass">
		</view>
		
		<button type="warn" @click="modifyClick">修改</button>
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-message type="success" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {reqConfirm, reqModifyPassword} from '@/api'
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
				oldPass: '',
				newPass: '',
				reNewPass: '',
				message: ''
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			//修改密码
			async modifyClick() {
				let old = this.oldPass.trim();
				let newOne = this.newPass.trim();
				let reNew = this.reNewPass.trim();
				if(!old || !newOne || !reNew) {
					this.message = '密码不能为空';
					this.$refs.popup.open();
				} else if(newOne !== reNew){
					//两次密码要一致
					this.message = '新密码不一致';
					this.$refs.popup.open();
				} else {
					//确认密码是否正确
					let result = await reqConfirm(this.userInfo._id, old);
					result = result.data;
					
					if(result.status === 0) {
						await reqModifyPassword(this.userInfo._id, newOne);
						this.message = '密码修改成功';
						this.$refs.popup.open();
						this.oldPass = '';
						this.newPass = '';
						this.reNewPass = '';
					} else {
						this.message = '原密码错误';
						this.$refs.popup.open();
					}
				}
			}
		}
	}
</script>


<style lang="scss">
	page {
		height: 100%;
	}
	.warrper {
		position: relative;
		height: 100%;
		// background-color: #f0f0f0;
		
		.header {
			height: 88rpx;
			background-color: #dfe6e9;
			line-height: 88rpx;
			padding-left: 12rpx;
			font-size: 22rpx;
			font-weight: bold;
		}
		
		.content {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-left: 22rpx;
			height: 120rpx;
			line-height: 120rpx;
			margin: 0 22rpx;
			text {
				flex: 1;
			}
		}
		
		input {
			border:  1px solid #b2bec3;
			box-sizing: border-box;
			padding: 8px;

			height: 60rpx;
			flex: 3;
			border-radius: 8px;
		}
		
		
		button {
			margin-top: 45rpx;
		}
	}
</style>
