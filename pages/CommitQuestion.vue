<template>
	<view class="warpper">
		<uni-card 
		    title="A1" 
		    mode="basic" 
		    :is-shadow="true" 
		    extra="等待处理" 
		    
		>
		    uni-app 是一个使用 Vue.js 开发所有前端应用的框架
				<view class="imgContent">
					<cover-image class="img" src="/static/1.jpg" @click="previewImg('/static/1.jpg')"></cover-image>
					<cover-image class="img" src="/static/2.jpg"></cover-image>
					<cover-image class="img" src="/static/3.jpg"></cover-image>
				</view>
				
				<view class="accept">
					<button type="default">接受</button>
				</view>
		</uni-card>
		
		<uni-card
		    title="A1" 
		    mode="basic" 
		    :is-shadow="true" 
		    extra="等待处理" 
		    note="Tips"
		>
		    uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5、以及各种小程序等多个平台。即使不跨端，uni-app同时也是更好的小程序开发框架。
		</uni-card>
		
		<uni-card
		    title="A1" 
		    mode="basic" 
		    :is-shadow="true" 
		    extra="职工test1正在处理" 
		    note="Tips"
		>
		    uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可编译到iOS、Android、H5、以及各种小程序等多个平台。即使不跨端，uni-app同时也是更好的小程序开发框架。
		</uni-card>
		
		
		<view class="sub" @click="naviTo('/pages/component/Submit')">上报</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//修改密码
			naviTo(url) {
				url = url + 
				uni.navigateTo({
					url,
				})
			},
			//点击放大图片（预览）
			previewImg(index) {
				console.log(index)
				let imgArray = [];
				
				// 预览单张图片
				// imgArray[0] = index;
				// uni.previewImage({
				// 	current:0,
				// 	urls:imgArray
				// })
				
				for(let i = 0, len = imgArray.length; i < len; i++) {
					this.imgArray.push(this.imgList[i].imgUrl);
				}
				
				uni.previewImage({
						current: index - 1,
						urls: imgsArray,
						indicator: 'number',
						loop: true
				});
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
