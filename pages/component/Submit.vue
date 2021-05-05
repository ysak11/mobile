<template>
	<view class="warpper">
		<view class="header">请输入问题描述：</view>
		<view class="content">
			<textarea class="text-input" @blur="blurMsg"/>
		</view>
		
		<view>
			<view class="area">选择区域：</view>
				<picker-view indicator-style="height: 50px;" :value="[0]" class="picker-view" @change="changeArea">
						<picker-view-column>
								<view class="item" v-for="item in areaList" :key="item._id">{{item.name}}</view>
						</picker-view-column>
				</picker-view>
		</view>
		<view class="img-tip">
			图片信息:  {{imageList.length === 0 ? '暂无' : ''}}
		</view>
		
		<view class="img-content">
			<image v-for="(item, index) in imageList" :src="item" :key="index" alt="" class="img"  @click="previewImg(item)"></image>
		</view>
		
		<button @click="onGetImgClick" class="selete">选择图片</button>
		<view class="submit">
			<button type="warn" @click="sub()">上报问题</button>
		</view>
	</view>
</template>

<script>
	import {getDate} from '@/util';
	import {reqAddMessage} from '@/api';
	import {mapState} from 'vuex';
	
	export default {
		data() {
			return {
				message: '',						//问题描述
				imageList:[],						//图片列表(预览)
				imageFiles: [],					//图片文件列表(上传)
				areaName: '',						//选择区域
				res: []
			}
		},
		created() {
			this.$store.dispatch('getUserInfo');
			this.$store.dispatch('getAreaInfo');
		},
		computed: {
			...mapState(['userInfo', 'areaList']),

		},
		methods: {
			//问题描述
			blurMsg(e) {
				this.message = e.detail.value;
			},
			//选中区域
			changeArea(e) {
				//获取的是选中的索引值(数组类型返回值)
				let index = e.detail.value;
				// console.log(index);
				// console.log(this.areaList[index[0]].name);
				this.areaName = this.areaList[index[0]].name;
			},
			
			//上报问题
			async sub() {
				let message = this.message.trim();
				this.areaName = this.areaName === '' ? this.areaList[0].name : this.areaName;
				if(!message) {
					uni.showToast({
						title: '请输入问题描述'
					})
				} else {
					const date = getDate();
					const msg = {
						message: message,
						status: 'waitting',
						date,
						areaName: this.areaName,
						workerName: this.userInfo.username,
						imgs: []
					}

					if(this.imageFiles.length !== 0) {
						let result = await this.subImg();
						// console.log(result);
						
						let arr = this.res;
						for(let i = 0, len = arr.length; i < len; i++) {
							arr[i] = 'http://121.41.45.147:5000' + arr[i];
						}
						// console.log(arr);
						msg.imgs = arr;
						
					}
					
					await reqAddMessage(msg);
					uni.showToast({
						title: '上报成功'
					})
					uni.switchTab({
					    url: '/pages/CommitQuestion'
					});
				}
			},
			
			//图片上传功能
			subImg() {
				return  new Promise((resolve,reject)=>{
					let len = this.imageList.length; 
					
					let count = 0;
					let that = this;
					for(let i = 0; i < len; i++) {
						uni.uploadFile({
							url: 'http://121.41.45.147:5000/upload/img',
							filePath: that.imageList[i],
							name: 'img',
							success: (res)=>{
								count++;
								//返回来的是json字符串，而不是对象，需要转成对象
								let url = JSON.parse(res.data).url;
								// console.log(url)
								that.res.push(url);
								if(count === len) {
									resolve(res);
								}
							}
						})
					}

					
				})
			},
			
			//预览图片
			previewImg(img) {
				let imgArray = [];
				
				// 预览单张图片
				imgArray[0] = img;
				uni.previewImage({
					current:0,
					urls:imgArray
				})

			},
			
			//选择图片
			onGetImgClick() {
					const that = this
					uni.chooseImage({
						count: 3, // 最多可以选择的图片张数，默认9
						sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
						sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
						success: function (res) {
							const len = that.imageList.length
							if (len >= 3) { 
								uni.showToast({
									title: '图片最多上传3张'
								})
							} else {
								for (let i = 0; i < 6 - len; i++) {
									if (res.tempFilePaths[i]) {
										that.imageFiles.push(res.tempFiles[i]);
										that.imageList.push(res.tempFilePaths[i]);
									} 
								}
							}
						}
					})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		width: 100%;
		background-color: #f0f0f0;
	}
	.warpper {
		width: 100%;
		// height: 100%;
		box-sizing: border-box;
		background-color: #f0f0f0;
		padding: 16px;
		
		.header {
			font-size: 14px;
			font-weight: bold;
		}
		
		.content {
			width: 100%;
			display: flex;
			
			.text-input {
				flex: 1;
				height: 150px;
				margin-top: 12px;
				background-color: #fff;
				border-radius: 8px;
				border: 3px solid #bdc3c7;
				padding: 12px;
			}
		}
		
		.area {
			margin-top: 12px;
			font-size: 14px;
			font-weight: bold;
			
		}
		
		.picker-view {
			width: 100%;
			height: 120px;
			margin: 12px 0;
			// display: flex;
			.item {
				line-height: 50px;
				align-items: center;
				justify-content: center;
				text-align: center;
			}
		}
		
		.img-tip {
			margin-top: 16px;
			font-size: 14px;
			font-weight: bold;
		}
		
		.img-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			
			.img {
				margin-top: 12px;
				margin-right: 16px;
				height: 200px;
				width: 200px;
			}
		}
		
		.selete {
			margin-top: 22px;	
			color: #fff;
			background-color: #27ae60;
		}
		
		.selete:active {
			background-color: #2ecc71;
		}
		
		.submit {
			margin-top: 16px;
		}
	}
</style>
