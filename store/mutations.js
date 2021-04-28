import {
	UPDATE_AREA_INFO,
	UPDATE_USER_INFO
} from './mutation-type.js'

export default {
	//更新区域信息
	[UPDATE_AREA_INFO] (state, list) {
		state.areaList = list;
	},
	
	//更新用户信息
	[UPDATE_USER_INFO] (state, user) {
		state.userInfo = user;
	}
}