import {
	UPDATE_AREA_INFO,
	UPDATE_MESSAGE_INFO,
	UPDATE_USER_INFO
} from './mutation-type.js'

import {reqAreaInfo, reqMessageInfo, reqUserInfo} from '@/api';

export default {
	//异步获取区域列表信息
	async getAreaInfo({commit}) {
		let result = await reqAreaInfo();
		result = result.data;
		if(result.status === 0) {
			const list = result.data;
			commit(UPDATE_AREA_INFO, list);
		}
	},
	
	//异步获取信息列表
	async getMessageInfo({commit}) {
		let result = await reqMessageInfo();
		result = result.data;
		if(result.status === 0) {
			const list = result.data;
			commit(UPDATE_MESSAGE_INFO, list);
		}
	},
	
	//异步获取用户信息
	async getUserInfo({commit}) {
		const user = uni.getStorageSync('userInfo');
		let result = await reqUserInfo(user._id);
		result = result.data;
		if(result.status === 0) {
			const data = result.data;
			commit(UPDATE_USER_INFO, data);
		}
	}
}