import {
	UPDATE_AREA_INFO,
	UPDATE_USER_INFO,
	UPDATE_MESSAGE_INFO,
	UPDATE_DEVICE_INFO
} from './mutation-type.js'

export default {
	//更新区域信息
	[UPDATE_AREA_INFO] (state, list) {
		state.areaList = list;
	},
	
	//更新用户信息
	[UPDATE_USER_INFO] (state, user) {
		state.userInfo = user;
	},
	
	//更新信息列表
	[UPDATE_MESSAGE_INFO] (state, list) {
		state.messageList = list;
	},
	
	//更新设备列表
	[UPDATE_DEVICE_INFO] (state, list) {
		state.deviceList = list;
	}
}