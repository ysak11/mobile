<template>
	<view class="warrper">
		<map :latitude="latitude" :longitude="longitude" :markers="covers" @markertap="test">
		</map>
		
<!-- 		<button class="pos">
			定位
		</button> -->
	</view>
	
</template>


<script>
	export default {
		data() {
			return {
				key: "c995267d9dac026620c9547996d75322",			//安卓端
				wx: "c655296e4f6184c0cab57bbcc4395c49"				,//微信小程序端
				latitude: 34.831152,
				longitude: 113.549843,
				bool: true,
				covers: [{
									latitude: 34.831152,
									longitude: 113.549843,
									iconPath: '../../static/logo.png'
							}]
			}
		},
		mounted() {

		},
		methods: {
			test() {
				console.log("12124")
			}
		}
	}
</script>

<style lang="scss"> 
	page {
		height: 100%;
		width: 100%;
	}
	.warrper {
		position: relative;
		height: 100%;
		map {
			width: 100%;
			height: 100%;
		}
		
		.pos {
			position: absolute;
			bottom: 50px;
			right: 12px;
			background-color: #fff;
			width: 40px;
			height: 40px;
			font-size: 14px;
			z-index: 999;
		}
	}

</style>
